var CronJob = require("cron").CronJob;
const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { connectToDatabase } = require('./db');
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
let jobChunksReceived = {}; // jobId => chunks received mapping

/*
Expects chunks to be confirmed as all present and in the proper order.
*/
function joinChunks(chunks) {
    const jsonString = chunks.join('');
    return JSON.parse(jsonString);
}

/*
When we receive an ordered chunk from the host we have to place it in order as the request may have come in any order.
Later down the road we will see if we indded did receive every chunk we expected.

Note: It's possible to get a chunk resubmitted. We should not count those.
*/
function saveJobChunkData(jobId, chunk) {
	if (!jobChunksReceived[jobId]) {
		jobChunksReceived[jobId] = [];
	}

	const sameChunkPreviouslyReceived = jobChunksReceived[jobId].some(
        existingChunk => existingChunk.order === chunk.order
    );
    if(!sameChunkPreviouslyReceived) { //Only save this chunk if we've never seen it before.
		const index = jobChunksReceived[jobId].findIndex(
			existingChunk => existingChunk.order > chunk.order
		);

		if (index === -1) { // If no chunk with higher order is found, push to the end
			jobChunksReceived[jobId].push(chunk.data);
		} else { // Insert the chunk at the appropriate position based on order
			jobChunksReceived[jobId].splice(index, 0, chunk.data);
		}
	}

    return jobChunksReceived[jobId].length;
}

function clearJob(jobId) {
	jobChunksReceived[jobId] = [];
}

/*
If you submit all your job chunks, you're done your job!
The products can come back fully filled in,
or with an error property like: [{url, title, productType, pricing: null, pricing_last_updated: 0, error: <SOME_ERROR>, dealer: 'CanadianPMX'}, ...]
*/
app.post('/submitJobChunk', (req, res) => {
	const { jobId, hostname, chunk, totalChunksAtStart } = req.body; //the node that completed its chunk.

	const expectedChunks = totalChunksAtStart;
	const numChunksSoFar = saveJobChunkData(jobId, chunk);
	if(numChunksSoFar === expectedChunks) {
		const productsDataPart = joinChunks(jobChunksReceived[jobId]);
		productsFromParts = productsFromParts.concat(productsDataPart);
		numProductScraperNodesDone++;
		clearJob(jobId);

		//BP-TODO: If we add dynamically increasing number of scraper nodes, these variables would need to update live.
		if(numProductScraperNodesDone === numProductScraperNodes) {
			syncProducts(productsFromParts); //DEEPEST STEP OF THE PROCESS.

			productsFromParts = [];
			scrapingProducts = false;
			numProductScraperNodesDone = 0;
		}

		res.status(200).json({
			code: 'COMPLETED_JOB',
			message: `Thank you for completing your job.${numChunksSoFar}/${expectedChunks}`,
		});
		return;
	}

	res.status(200).json({
		code: 'COMPLETED_CHUNK',
		message: `Thank you for your submission.${numChunksSoFar}/${expectedChunks}`
	});
});

// Fetch current products from the database
async function getCurrentProducts() {
	const db = await connectToDatabase();
	const productsCollection = db.collection('products');

	return await productsCollection.find({}).toArray();
}

async function saveErroringProductsToFailed(erroringProducts) {
	//BP-TODO: Make sure failedProducts aren't duplicates when inserting.
	if(erroringProducts.length > 0) {
		const db = await connectToDatabase();
		const failedProductsCollection = db.collection('failedProducts');
		await failedProductsCollection.insertMany(erroringProducts);
		console.log('Saved erroring products to failedProducts collection:', erroringProducts);
	}
}

/*
Sync products database to the most recent products.
Deletes old products if url is no longer found
Creates new product if new url is found
*/
const syncProducts = async (mostRecentProducts) => {
	const db = await connectToDatabase();
	const productsCollection = db.collection('products');

	const currentProducts = await getCurrentProducts();

	// Delete products that are no longer being listed in the category pages
	const deletedByDealer = currentProducts.filter((product) => {
		const nowNotAProductInCat = !mostRecentProducts.map((prod) => prod.url).includes(product.url);
		return nowNotAProductInCat; // Return true if the product should be deleted
	});
	const existingWhichErrored = currentProducts.filter((product) => {
		const nowErroring = mostRecentProducts.filter((el) => el.error).map((prod) => prod.url).includes(product.url);
		return nowErroring; // Return true if the product should be deleted
	});
	const newWhichErrored = mostRecentProducts.filter((el) => el.error)
											  .filter((el) => !existingWhichErrored.map((prod) => prod.url).includes(el.url));

	// Delete products the dealer deleted or those that we couldn't process due to erroring
	const existingProductsToDelete = [...deletedByDealer, ...existingWhichErrored];
	if (existingProductsToDelete.length > 0) {
		const productIdsToDelete = existingProductsToDelete.map(product => product._id);
		if (productIdsToDelete.length > 0) {
			await productsCollection.deleteMany({ _id: { $in: productIdsToDelete } });
			console.log('Deleted old products:', existingProductsToDelete);
		}
	}

	await saveErroringProductsToFailed([...existingWhichErrored, ...newWhichErrored]);

	// Update or insert products
	//TODO: Just do this for products that didn't fail.
	for (const recentProduct of mostRecentProducts) {
		const existingProduct = currentProducts.find(product => product.url === recentProduct.url);

		// Don't insert an errored product.
		// For existing errored products, they are no longer in the products collection and can't be updated anyways.
		if(recentProduct.error) {
			continue;
		}

		if(existingProduct) {
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
			console.log('Updated product:', recentProduct.url);
		} else {
			// Insert new product
			await productsCollection.insertOne(recentProduct);
			console.log('Inserted new product:', recentProduct.url);
		}
	}
	console.log('Done syncing products');
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
		const scrapeJobId = uuidv4();
		console.log(`Submitting ${productsAssignedToScraper.length} products (Job: ${scrapeJobId}) to ${productScraperNode}`);
		const tookJob = await axios.post(`http://${productScraperNode}/submitProductsForScraping`, { scrapeJobId, products: productsAssignedToScraper });

		if(!tookJob) {
			//BP-TODO: What do I do if they didn't take the job?
			console.log(`Scraper couldn't take job ${scrapeJobId}`);
		}

	}
}

const getNewAndRemovedNodes = (oldNodes, newNodes) => {
	const newJoinedNodes = newNodes.filter(node => !oldNodes.includes(node));
	const removedNodes = oldNodes.filter(node => !newNodes.includes(node));
	return { newJoinedNodes, removedNodes };
};

const updateWorkerNodes = async () => {
	const db = await connectToDatabase();
	const clusterWorkers = db.collection('clusterWorkers');
	const workerNodes = await clusterWorkers.find({}).toArray();

	const newProductScraperNodes = workerNodes.map((node) => `${node.hostname}:${node.port}`);

	const { newJoinedNodes, removedNodes } = getNewAndRemovedNodes(productScraperNodes, newProductScraperNodes);

	if(newJoinedNodes.length > 0) {
		console.log('New node(s) joined:', newJoinedNodes);
	}

	if(removedNodes.length > 0) {
		console.log('Node(s) left:', removedNodes);
	}

	productScraperNodes = newProductScraperNodes;
	numProductScraperNodes = productScraperNodes.length;
}

async function initCron() {
	console.log("INITIALIZING CRON");

	const cronJob = new CronJob({ //Every 10 seconds.
		cronTime: '*/10 * * * * *',
		onTick: async () => { await updateWorkerNodes() },
		start: true,
		timeZone: "UTC",
		runOnInit: true,
	});

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
			if(!scrapingProductList && productList.length && !scrapingProducts && numProductScraperNodes !== 0) {
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