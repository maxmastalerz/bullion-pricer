const scrapers = require('./scraper-map');
const { client } = require('./db');

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
		//console.log('Deleted old products:', productsToDelete);
	}

	// Find products to insert
	const productsToInsert = mostRecentProducts.filter(product => !currentProducts.map((prod) => prod.url).includes(product.url));
	// Insert new products
	if (productsToInsert.length > 0) {
		await productsCollection.insertMany(productsToInsert);
		//console.log('Inserted new products:', productsToInsert);
	}
};

module.exports = async function() {
	console.log("== UPDATING/SYNCING PRODUCTS ==");
	const db = client.db();
	const productsCollection = db.collection('products');
	
	let mostRecentProductState = [];
	for(scraperName in scrapers) {
		const scraper = scrapers[scraperName];
		const mostRecentProductsFromDealer = await scraper.scrapeProductsFromCategories(); //Basic 1st pass. Doesn't directly visit the product.
		mostRecentProductState = mostRecentProductState.concat(mostRecentProductsFromDealer);
	}
	//console.log(mostRecentProductState);
	syncProducts(mostRecentProductState);

};
