const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");

module.exports.updateSpotPrices = async function () {
	console.log("== COLLECTING SPOT DATA ==");
	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const spotCollection = db.collection("spot");

	const arrayOfPriceObjects = await fetch(
		"https://api.metals.live/v1/spot"
	).then((res) => res.json());

	const priceData = arrayOfPriceObjects.reduce((prev, curr) => ({
		...prev,
		...curr,
	}));

	for (const k of Object.keys(priceData)) {
		if (typeof k === "string") {
			priceData[k] = parseFloat(priceData[k]);
		}
	}

	priceData.timestamp = new Date();

	spotCollection.insertOne(priceData);
	console.log("== DONE COLLECTING SPOT DATA ==");
};
