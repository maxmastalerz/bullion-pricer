require("dotenv-flow").config();
var CronJob = require("cron").CronJob;
const { MongoClient } = require("mongodb");
const spot = require("./spot");

const scrapeBullionSites = async () => {
	console.log("== SCRAPING BULLION SITES ==");

	let scrapers = {
		CanadianPMX: require("./scrapers/canadianPMX.js"),
		"Border Gold": require("./scrapers/borderGold.js"),
		//add other scrapers here
	};

	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const productsCollection = db.collection("products");
	const products = await productsCollection.find().toArray();

	for (let i = 0; i < products.length; i++) {
		let product = products[i];

		let productId = product._id;
		let scraperName = product.dealer;
		let scrape = scrapers[scraperName];

		try {
			let scrapeResults = await scrape(product.url);

			await productsCollection.updateOne(
				{ _id: productId },
				{
					$set: {
						pricing: scrapeResults.pricing,
						pricing_last_updated: new Date().getTime(),
					},
				}
			);
		} catch {
			console.error("Scraping failed for", product.url);
		}
	}

	console.log("== DONE SCRAPING BULLION SITES. FOR NOW... ==");
};

console.log("INITIALIZING CRON JOB(S).");

/*
Sets up the cron job for scraping bullion sites.
Bullion sites are scraped once every hour, on the hour.
If a scraping task takes more than an hour, another scrape job won't start til a previous job is done.
Note: When the docker container running these cron jobs is started/restarted, it will run a cron job
immediately rather than waiting for the spefic x:00 hour mark. This helps with development.
*/
let job = {};
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
});

new CronJob({
	cronTime: "0 0 * * * *", // Every hour, on the hour
	onTick: async () => {
		try {
			await spot.updateSpotPrices();
		} catch (err) {
			console.log(
				"ERROR: There's been an issue with fetching metal spot prices"
			);
			console.log(err);
			// Handle error
		}
	},
	start: true,
	timeZone: "UTC",
	runOnInit: true, // Runs when this cron job was first initialized, even if we're not exactly on the hour
});
