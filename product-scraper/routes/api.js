const express = require("express");
const os = require('os');
const axios = require('axios');
const scrapers = require('../scraper-map');
var router = express.Router();

//Set to whatever job id we've been assigned.
const hostname = os.hostname();
let currentJob = null;
let failedBaseURLS = [];

async function retryablePromiseAll(requestPromises, maxRetries, successCallback, errorCallback) {
	for (let tries = 0; tries < maxRetries; tries++) {
		try {
			const responses = await axios.all(requestPromises);
			successCallback(responses);
			return
		} catch (err) {
			if(tries === maxRetries-1) {
				errorCallback(err);
			}
		}
	}
}

function splitArrayIntoChunks(array, maxSize) {
    const jsonString = JSON.stringify(array);
    const chunks = [];
    let order = 0;

    for (let i = 0; i < jsonString.length; i += maxSize) {
        const data = jsonString.slice(i, i + maxSize);
        chunks.push({ order: order++, data });
    }

    return chunks;
}

function generateChunkNotifications(chunks) {
	const numChunks = chunks.length;

	let chunkCompletionNotifications = [];

	for(let i=0; i<chunks.length; i++) {
		let chunk = chunks[i];

		chunkCompletionNotifications.push(
			axios({
				method: 'post',
				url: 'http://bp-cron:8000/submitJobChunk',
				data: {
					jobId: currentJob,
					hostname: hostname,
					chunk: chunk,
					totalChunksAtStart: numChunks
				}
			})
		);
	}

	return chunkCompletionNotifications;
}

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
			console.error(`Scraping failed for base url: ${product.url}.`);
			failedBaseURLS.push(product.url); //BP-TODO: We don't do anything with these yet.
			console.error(err);
		}
	}
	const scrapedProducts = productsToScrape; //Scraping finished. Renaming for clarity.

	//For our part of the scraping process, we report our progress (in chunks under 100kb).
	const chunks = splitArrayIntoChunks(scrapedProducts, 50*1024);//50kb
	let chunkCompletionNotifications = generateChunkNotifications(chunks);

	retryablePromiseAll(chunkCompletionNotifications, 3, (responses) => {
		console.log('Sent back my part of the scraping process (Transferred in '+chunks.length+' chunks)');
		currentJob = null;
	}, (error) => {
		console.log("Was trying to send:");
		console.log(chunks);
		console.log(error);
		throw Error("Couldn't communicate with leader.");
		//Incomplete job. The scraper now becomes inoperable.
		//Eventually the leader should realise that the scraper node is not communicative. This is a BP-TODO .
	});
}

router.post("/submitProductsForScraping", function (req, res, next) {
	if(currentJob != null) {
		res.status(200).json({
			code: 'DENIED',
			message: "Can't accept products for scraping as I ended with an incomplete job."
		});
	}

	currentJob = req.body.scrapeJobId;
	let productsToScrape = req.body.products;
	
	scrapeProductsAsync(productsToScrape);

	res.status(200).json({ code: 'ACCEPTED', message: 'Thanks for your scraping submission'});
});

//more routes.

module.exports = router;
