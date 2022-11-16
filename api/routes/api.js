var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

async function toArray(asyncIterator) { 
    const arr=[]; 
    for await(const i of asyncIterator) arr.push(i); 
    return arr;
}

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
	let paymentPreferenceSelected = paymentPreferencesSelected[0];
	let bulkPricingCouldBuy = Number(req.query.bulkPricingCouldBuy);
	let weightRange = req.query.weightRange.split(',');
	let weightStart = Number(weightRange[0]);
	let weightEnd = Number(weightRange[1]);
	let sortBy = Number(req.query.sortBy);
	let sortByMap = [ // 0:priceLowToHigh 1:priceHighToLow 2:dealerAsc 3:dealerDsc 4:mintAsc 5:mintDsc
		{ ["pricing."+paymentPreferenceSelected+".price"]: 1 },
		{ ["pricing."+paymentPreferenceSelected+".price"]: -1 },
		{ dealer: 1 },
		{ dealer: -1 },
		{ mint: 1 },
		{ mint: -1 },
	];

	console.log("productTypesSelected:"+JSON.stringify(productTypesSelected));
	console.log("productSpecificsSelected: "+JSON.stringify(productSpecificsSelected));
	console.log("paymentPreferenceSelected: "+JSON.stringify(paymentPreferenceSelected));
	console.log("bulkPricingCouldBuy: "+bulkPricingCouldBuy);
	console.log("weightStart: "+weightStart);
	console.log("weightEnd: "+weightEnd);
	console.log("sortBy: "+sortBy);

	const pipeline = [
		{
			$match: {
				productType: {$in: productTypesSelected},
				$and: [{
					productSpecifics: {$in: purityOptionsSelected}}, {productSpecifics: {$in: governmentNotGovernmentOptionsSelected}
				}],
				weight: {$gte: weightStart, $lte: weightEnd}
			}
		},
		{ $unwind: "$pricing" },
		{ $unwind: "$pricing."+paymentPreferenceSelected },
		{ $match : {
			["pricing."+paymentPreferenceSelected+".qtyRange.0"]: { $lte: bulkPricingCouldBuy },
			["pricing."+paymentPreferenceSelected+".qtyRange.1"]: { $gte: bulkPricingCouldBuy }
		}},
		{
			$project: {
				url: 1,
				title: 1,
				dealer: 1,
				mint: 1,
				productSpecifics: 1,
				productType: 1,
				weight: 1,
				["pricing."+paymentPreferenceSelected]: 1
			}
		},
		{ $sort: sortByMap[sortBy] }
	];

	const products = await toArray(productsCollection.aggregate(pipeline));

	console.log("Returning products:");
	console.log(products);

	res.send(products);
});

module.exports = router;
