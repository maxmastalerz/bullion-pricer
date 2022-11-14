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

	let purityOptions = ['99999','9999','999','925','less_than_or_equal_90'];
    let governmentNotGovernmentOptions = ['government_issued','not_government_issued'];

	let productTypesSelected = req.query.productTypesSelected.split(',');
	let productSpecificsSelected = req.query.productSpecificsSelected.split(',');    
    let purityOptionsSelected = productSpecificsSelected.filter(item => purityOptions.includes(item));
    let governmentNotGovernmentOptionsSelected = productSpecificsSelected.filter(item => governmentNotGovernmentOptions.includes(item));
	let paymentPreferencesSelected = req.query.paymentPreferencesSelected.split(',');
	let bulkPricingCouldBuy = req.query.bulkPricingCouldBuy;
	let weightRange = req.query.weightRange.split(',');
	let weightStart = Number(weightRange[0]);
	let weightEnd = Number(weightRange[1]);

	console.log("productTypesSelected:"+JSON.stringify(productTypesSelected));
	console.log("productSpecificsSelected: "+JSON.stringify(productSpecificsSelected));
	console.log("paymentPreferencesSelected: "+paymentPreferencesSelected);
	console.log("bulkPricingCouldBuy: "+bulkPricingCouldBuy);
	console.log("weightStart: "+weightStart);
	console.log("weightEnd: "+weightEnd);

	const products = await productsCollection.find({
		productType: {$in: productTypesSelected},
		$and: [{
			productSpecifics: {$in: purityOptionsSelected}}, {productSpecifics: {$in: governmentNotGovernmentOptionsSelected}
		}],
		weight: {$gte: weightStart, $lte: weightEnd}
	}).toArray();

	//console.log(products);

	res.send(products);
});

module.exports = router;
