var CronJob = require("cron").CronJob;
const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const axios = require('axios');
const { connectToDatabase, client } = require('./db');
const { updateSpotPrices, updateCurrencies } = require('./update-spot-and-currencies');
const getUpdatedProductList = require('./get-updated-product-list');

const app = express();
const port = 8000;
app.use(bodyParser.json());

const doScraping = process.env.DO_SCRAPING === '1' ? true : false;
let productScraperNodes = [];
let numProductScraperNodes = 0;
let numProductScraperNodesDone = 0;
let scrapingProducts = false;
let productsFromParts = [];

app.post('/completedScrapePart', (req, res) => {
	const { hostname, port, products } = req.body; //the node that completed its part.

	productsFromParts = productsFromParts.concat(products);

	numProductScraperNodesDone++;
	if(numProductScraperNodesDone === numProductScraperNodes) {
		syncProducts(productsFromParts); //DEEPEST STEP OF THE PROCESS.

		productsFromParts = [];
		scrapingProducts = false;
		numProductScraperNodesDone = 0;
	}

	res.status(200).json({ message: 'Thanks.'});
});

// This route lets a worker node register into the cluster
app.post('/joinCluster', (req, res) => {
	const { hostname, port } = req.body;
	console.log(`Received cluster join request from ${hostname}:${port}.`);
	productScraperNodes.push(`${hostname}:${port}`);
	numProductScraperNodes++;
	//actually add the node and see if we can communicate later(elsewhere)
	res.status(200).json({ message: `Worker registered successfully.` });
});

// Fetch current products from the database
async function getCurrentProducts() {
	const db = client.db();
	const productsCollection = db.collection('products');

	return await productsCollection.find({}, { projection: { _id: 1, url: 1 } }).toArray();
}

/*
Sync products database to the most recent products.
Deletes old products if url is no longer found
Creates new product if new url is found
*/
const syncProducts = async (mostRecentProducts) => {
	const db = client.db();
	const productsCollection = db.collection('products');

	const currentProducts = await getCurrentProducts();

	// Find products to delete
	const productsToDelete = currentProducts.filter(product => !mostRecentProducts.map((prod) => prod.url).includes(product.url));
	// Delete old products
	if (productsToDelete.length > 0) {
		const productIdsToDelete = productsToDelete.map(product => product._id);
		await productsCollection.deleteMany({ _id: { $in: productIdsToDelete } });
		console.log('Deleted old products:', productsToDelete);
	}

	// Update or insert products
	for (const recentProduct of mostRecentProducts) {
		const existingProduct = currentProducts.find(product => product.url === recentProduct.url);

		if (existingProduct) {
			// Update existing product
			await productsCollection.updateOne(
				{ _id: existingProduct._id },
				{
					$set: {
						pricing: recentProduct.pricing,
						pricing_last_updated: recentProduct.pricing_last_updated
					}
				}
			);
			console.log('Updated product:', recentProduct);
		} else {
			// Insert new product
			await productsCollection.insertOne(recentProduct);
			console.log('Inserted new product:', recentProduct);
		}
	}
};

//Random shuffle an array. Fisher-Yates algorithm.
function randShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function groupProductsByDomain(productList) {
	const urlGroups = {};
	for (const product of productList) {
		const domain = new URL(product.url).hostname;

		if (!urlGroups[domain]) {
			urlGroups[domain] = [];
		}

		urlGroups[domain].push(product);
	}

	return Object.values(urlGroups);
}

/*
Goes through the groups of products by domain name, and distributes the products with that domain name evenly across the scrapers
Returns the mapping so that we know which products to send where.
*/
function distributeProductsByDomainEvenlyToScrapers(productListByDomain) {
	let productScrapeDistribution = {};
	let productI = 0;

	if(numProductScraperNodes === 0) {
		return productScrapeDistribution;
	}

	for(let productListForDomain of productListByDomain) {
		productListForDomain.forEach((product, i) => {
			if(!productScrapeDistribution[productScraperNodes[productI%numProductScraperNodes]]) {//to avoid index not found
				productScrapeDistribution[productScraperNodes[productI%numProductScraperNodes]] = [];
			}

			productScrapeDistribution[productScraperNodes[productI%numProductScraperNodes]].push(product);
			
			if(i===productListForDomain.length-1) {
				//randomise so that the scrapers(especially at the beggining), don't all start hitting the same domain at once.
				randShuffleArray(productScrapeDistribution[productScraperNodes[productI%numProductScraperNodes]]);
			}

			productI++;
		});
	}

	return productScrapeDistribution;
}

//Submit products to scrape to different scrapers
async function divideAndConquerProductSubmitter(productList) {
	//console.log("NEWEST PRODUCT LIST:");
	//console.log(JSON.stringify(productList));

	let productListByDomain = groupProductsByDomain(productList);
	let distributionToScrapers = distributeProductsByDomainEvenlyToScrapers(productListByDomain);

	for(productScraperNode in distributionToScrapers) { //Send out the products a scraper has been assigned.
		let productsAssignedToScraper = distributionToScrapers[productScraperNode];
		await axios.post(`http://${productScraperNode}/submitProductsForScraping`, { products: productsAssignedToScraper });

	}
	//collect the job results.
	//save results to db.
}

async function initCron() {
	console.log("INITIALIZING CRON");
	await connectToDatabase();

	new CronJob({
		cronTime: "0 0 * * * *", // Every hour, on the hour
		onTick: async () => {
			await updateCurrencies();
			await updateSpotPrices();
		},
		start: true,
		timeZone: "UTC",
		runOnInit: true, // Runs when this cron job was first initialized, even if we're not exactly on the hour
	});

	/*The code below schedules a product list scraper typically every 24hrs, and immediately after schedules a product
	scraper typically every hour. The scheduler avoids overlaps between any scraper by offsetting job start times if needed.*/
	let i = 0;
	let productList = [];
	let scrapingProductList = false;
	const job = new CronJob({
		cronTime: "0 0 * * * *", // Every hour, on the hour
		onTick: async () => {
			if(!doScraping) {
				return;
			}

			//Best case we scrape every day at 24 hours. Exceptions:
			//Will shift/delay product-list scraping schedule 1hr each time if there is an existing product scraper running.
			//Will shift/delay product-list scraping schedule 24hrs each time if there is an existing product-list scraper running.
			if(i%24===0 && !scrapingProductList) {
				if(scrapingProducts) {
					i--; //Push off product list scraping to the next hour as the product scraper is still processing :(
					return;
				}

				scrapingProductList = true;
				productList = await getUpdatedProductList();
				scrapingProductList = false;
			}

			//Best case we scrape products every hour. Exceptions:
			//Will shift/delay product scraping schedule 1hr each time if there is an existing product scraper running.
			//Will shift/delay product scraping schedule 1hr each time if there is an existing product-list scraper running.
			if(!scrapingProductList && productList.length && !scrapingProducts) {
				scrapingProducts = true;//this will later change state after the product scrapers all return.
				await divideAndConquerProductSubmitter(productList);
			}

			i++;
		},
		start: true,
		timeZone: "UTC",
		runOnInit: true
	});
}

initCron();

//The cron acts as a leader for any tasks it allocates to processor nodes.
//This means we must run an endpoint for processor nodes to register themselves into the cluster.
app.listen(port, () => {//default host is 0.0.0.0
	console.log(`REST API server listening at http://${os.hostname()}:${port}`);
});