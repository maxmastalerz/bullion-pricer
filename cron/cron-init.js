var CronJob = require("cron").CronJob;
const { MongoClient } = require("mongodb");

const scrapers = {
	CanadianPMX: require("./scrapers/canadianPMX.js"),
	"Border Gold": require("./scrapers/borderGold.js"),
	//add other scrapers here
};

/*const scrapeBullionSites = async () => {
	console.log("== SCRAPING BULLION SITES ==");

	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const productsCollection = db.collection("products");
	const products = await productsCollection.find().toArray();

	for (let i = 0; i < products.length; i++) {
		let product = products[i];

		let productId = product._id;
		let scraperName = product.dealer;
		let scraper = scrapers[scraperName];

		try {
			let scrapeResults = await scraper.scrapeProductPage(product.url);

			await productsCollection.updateOne(
				{ _id: productId },
				{
					$set: {
						pricing: scrapeResults.pricing,
						pricing_last_updated: new Date().getTime(),
					},
				}
			);
		} catch (err) {
			console.error("Scraping failed for", product.url);
			console.error(err);
		}
	}

	console.log("== DONE SCRAPING BULLION SITES. FOR NOW... ==");
};*/

console.log("INITIALIZING CRON JOB(S).");

/*
Sets up the cron job for scraping bullion sites.
Bullion sites are scraped once every hour, on the hour.
If a scraping task takes more than an hour, another scrape job won't start til a previous job is done.
Note: When the docker container running these cron jobs is started/restarted, it will run a cron job
immediately rather than waiting for the spefic x:00 hour mark. This helps with development.
*/
/*let job = {};
new CronJob({
	cronTime: "0 0 * * * *", // Every hour, on the hour
	onTick: async () => {
		if (job.taskRunning) {
			return;
		}

		job.taskRunning = true;

		try {
			await scrapeBullionSites();
		} catch (err) {
			console.log(
				"ERROR: There's been an issue with scraping the bullion sites"
			);
			console.log(err);
			// Handle error
		}

		job.taskRunning = false;
	},
	start: true,
	timeZone: "UTC",
	runOnInit: true, // Runs when this cron job was first initialized, even if we're not exactly on the hour
});*/

const spot = require("./spot");

new CronJob({
	cronTime: "0 0 * * * *", // Every hour, on the hour
	onTick: async () => {
		await spot.updateSpotPrices();
	},
	start: true,
	timeZone: "UTC",
	runOnInit: true, // Runs when this cron job was first initialized, even if we're not exactly on the hour
});

new CronJob({
    cronTime: "0 0 * * *", // Every day at midnight
    onTick: async () => {
    	for(scraperName in scrapers) {
    		let scraper = scrapers[scraperName];
    		let links = scraper.scrapeForProductLinks();
    		console.log(links);
    	}
    },
    start: true,
    timeZone: "UTC",
    runOnInit: true,
});