var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

async function toArray(asyncIterator) { 
    const arr=[]; 
    for await(const i of asyncIterator) arr.push(i); 
    return arr;
}

// PP-TODO: For all the routes that use the database, see if closing the db connection is explicitly required.

router.get("/", function (req, res, next) {
	res.send(`<h1>PreciousPricer API Working</h1>`);
});

const validEmailAddress = (emailAddress) => {
	// PP-TODO: Make sure to better validate email address and sanitize it.

	if(emailAddress === "") {
		return false;
	}
	return true;
};

router.post("/subscribeToNewsletter", async (req, res) => {
	let emailAddress = req.body.emailAddress;

	if(!validEmailAddress(emailAddress)) {
		res.send({
			"data": {
				message: `Sorry, please input a valid email address.`
			}
		});
		return;
	}

	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const subscriptionsCollection = db.collection("subscriptions");

	// PP-TODO: Confirm that this email address is not already subscribed before subscribing.

	try {
		subscriptionsCollection.insertOne({ emailAddress: emailAddress });
	} catch(err) {
		res.status(500);
		res.send({
			"error": {
				message: err.message
			}
		});
	}

	console.log(`Subscribed ${emailAddress} to newsletter.`);

	res.send({
		"data": {
			message: `Thanks for subscribing! Stay tuned for news on the best deals.`
		}
	});
});

router.get("/spotPrices", async (req, res) => {
	// PP-TODO: Moe, can you finish this off.

	let currency = null;

	if(req.query.currency === "USD") {
		currency = "USD";
	}

	if(currency === "USD") {
		res.send({
			"data": {
				gold: null, // example : send null if you can't get data for the metal.
				silver: 200,
				platinum: 300
			}
		});
	} else {
		res.status(400);
		res.send({
			"error": {
				message: "ERROR: Please select a valid currency."
			}
		});
	}
});

router.get("/products", async (req, res) => {
	// PP-TODO: Sanitize input data.

	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const productsCollection = db.collection("products");

	let purityOptions = ['99999','9999','9995','999','925','less_than_or_equal_90'];
    let governmentNotGovernmentOptions = ['government_issued','not_government_issued'];
	let nPerPage = 3;

	let productTypesSelected = req.query.productTypesSelected.split(',');
	let productSpecificsSelected = req.query.productSpecificsSelected.split(',');    
    let purityOptionsSelected = productSpecificsSelected.filter(item => purityOptions.includes(item));
    let governmentNotGovernmentOptionsSelected = productSpecificsSelected.filter(item => governmentNotGovernmentOptions.includes(item));
	let paymentPreferenceSelected = req.query.paymentPreferencesSelected.split(',')[0];
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
	let skip = (req.query.currentPage>0) ? ((req.query.currentPage-1)*nPerPage) : 0;

	console.log("productTypesSelected:"+JSON.stringify(productTypesSelected));
	console.log("productSpecificsSelected: "+JSON.stringify(productSpecificsSelected));
	console.log("paymentPreferenceSelected: "+JSON.stringify(paymentPreferenceSelected));
	console.log("bulkPricingCouldBuy: "+bulkPricingCouldBuy);
	console.log("weightStart: "+weightStart);
	console.log("weightEnd: "+weightEnd);
	console.log("sortBy: "+sortBy);
	console.log("skip: "+skip);

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
		{ $sort: sortByMap[sortBy] },
		{ "$facet": {
			"totalData": [
				{ $skip: skip },
				{ $limit: nPerPage }
			],
			"totalCount": [
				{ "$count": "count" }
			]
		}}
	];

	const products = await toArray(productsCollection.aggregate(pipeline));

	console.log("Returning products:");
	console.log(products);

	res.send(products);
});

module.exports = router;
