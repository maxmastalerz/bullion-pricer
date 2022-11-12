var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

router.get("/", function (req, res, next) {
	res.send(`<h1>PreciousPricer API Working</h1>`);
});

router.get("/products", async (req, res) => {
	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const productsCollection = db.collection("products");
	const products = await productsCollection.find().toArray();

	res.send(products);
});

module.exports = router;
