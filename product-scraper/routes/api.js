const express = require("express");
const os = require('os');
const axios = require('axios');
const scrapers = require('../scraper-map');
var router = express.Router();

//const { MongoClient } = require("mongodb");

// PP-TODO: For all the routes that use the database, see if closing the db connection is explicitly required.

async function scrapeProductsAsync(productsToScrape) {
	
	for(product of productsToScrape) {
		let productId = product._id;
		let scraperName = product.dealer;
		let scraper = scrapers[scraperName];

		try {
			let scrapeResults = await scraper.scrapeProductPage(product.url);
			product.purities = scrapeResults.purities;
			product.issuance = scrapeResults.issuance;
			product.weight = scrapeResults.weight;
			product.mint = scrapeResults.mint;
			product.pricing = scrapeResults.pricing;
			product.pricing_last_updated = new Date().getTime();
			product.boxSize = scrapeResults.boxSize;

		} catch (err) {
			console.error("Scraping failed for", product.url);
			console.error(err);
		}
	}

	var requestData = {
		hostname: os.hostname(),
		port: 8000,
		products: productsToScrape
	};

	var response = await axios.post('http://pp-cron:8000/completedScrapePart', requestData);
}

router.post("/submitProductsForScraping", function (req, res, next) {
	let productsToScrape = req.body.products;
	
	scrapeProductsAsync(productsToScrape);

	res.status(200).json({ message: 'Thanks for your scraping submission'});
});

//more routes.

module.exports = router;
