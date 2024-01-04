var express = require("express");
const { verify } = require('hcaptcha');
const { MongoClient } = require("mongodb");
const axios = require("axios");

var router = express.Router();

async function toArray(asyncIterator) {
	const arr = [];
	for await (const i of asyncIterator) arr.push(i);
	return arr;
}

// PP-TODO: For all the routes that use the database, see if closing the db connection is explicitly required.

router.get("/", function (req, res, next) {
	res.status(200).send('<h1>BullionPricer API Working</h1>');
});

const validEmailAddress = (emailAddress) => {
	// PP-TODO: Make sure to better validate email address and sanitize it.

	if (emailAddress === "") {
		return false;
	}
	return true;
};

const sendEmail = async(emailInfo) => {
	const emailData = {
		From: 'contact@bullionpricer.com',
		To: 'contact@bullionpricer.com',
		Subject: '[BullionPricer]: '+emailInfo.subject,
		TextBody: 'This email was sent via the bullionpricer.com contact form\nFrom: '+emailInfo.name+'\nEmail: '+emailInfo.email+'\n\nMessage:\n'+emailInfo.message,
		HtmlBody: '<u>This email was sent via the bullionpricer.com contact form</u><br><b>From:</b> '+emailInfo.name+'<br><b>Email:</b> '+emailInfo.email+'<br><br><b>Message:</b><br>'+emailInfo.message.replace(/\n/g, '<br>'),
		ReplyTo: emailInfo.email,
	};

	try {
		const response = await axios.post('https://api.postmarkapp.com/email', emailData, {
			headers: {
				'Content-Type': 'application/json',
				'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN
			},
		});

		console.log('Email sent successfully:', response.data);

		return {
			statusCode: 200,
			data: {
				message: "Your message has been sent."
			}
		};
	} catch(error) {
		console.error('Error sending email:', JSON.stringify(error));

		return {
			statusCode: 400,
			error: {
				message: "Error sending email:"+JSON.stringify(error)
			}
		};
	}
};

router.post("/contact", async (req, res) => {
	const { name, email, subject, message, hCaptchaValue } = req.body;

	//Verify captcha
	let { success } = await verify(process.env.HCAPTCHA_SECRET_KEY, hCaptchaValue);

	if(success) {
		const response = await sendEmail({ name, email, subject, message });
		res.status(response.statusCode).json(response);
	} else {
		res.status(400).json({
			statusCode: 400,
			error: {
				message: "Your message couldn't be sent due to a captcha verification issue."
			}
		});
	}
});

router.post("/subscribeToNewsletter", async (req, res) => {
	let emailAddress = req.body.emailAddress;

	if (!validEmailAddress(emailAddress)) {
		res.status(400).json({
			statusCode: 400,
			error: {
				message: `Sorry, please input a valid email address.`,
			},
		});
	}

	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const subscriptionsCollection = db.collection("subscriptions");

	// PP-TODO: Confirm that this email address is not already subscribed before subscribing.

	try {
		subscriptionsCollection.insertOne({ emailAddress: emailAddress });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({
			statusCode: 500,
			error: {
				message: 'Sorry, due to technical issues, we were unable to subscribe you.',
			},
		});
	}

	console.log(`Subscribed ${emailAddress} to newsletter.`);

	res.status(200).json({
		statusCode: 200,
		data: {
			message: `Thanks for subscribing! Stay tuned for news on the best deals.`,
		},
	});
});

router.get("/spotPrices", async (req, res) => {
	const currency = req.query.currency || "USD";

	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const spotCollection = db.collection("spot");
	const lastSpot = await spotCollection
		.find({})
		.project({ _id: 0, symbol: 1, [`price.${req.query.currency}`]: 1})
		.toArray();

	res.status(200).json({
		statusCode: 200,
		data: lastSpot,
	});
});

router.get("/products", async (req, res) => {
	// PP-TODO: Sanitize input data.

	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const productsCollection = db.collection("products");

	/*let purityOptions = [
		"99999",
		"9999",
		"9995",
		"999",
		"925",
		"less_than_or_equal_90",
	];*/
	/*let governmentNotGovernmentOptions = [
		"government_issued",
		"not_government_issued",
	];*/
	let nPerPage = 6;

	let productTypesOperator = req.query.productTypesOperator;
	let productTypesSelected = req.query.productTypesSelected.split(",");
	let productTypesNotSelected = ['gold','silver','platinum','palladium'].filter(value => !productTypesSelected.includes(value));
	
	let puritiesOperator = req.query.puritiesOperator;
	let puritiesSelected = req.query.puritiesSelected.split(",");
	let purityOptionsNotSelected = ['99999','9999','9995','999','925','less_than_or_equal_90'].filter(value=> !puritiesSelected.includes(value));

	let issuanceOperator = req.query.issuanceOperator;
	let issuanceSelected = req.query.issuanceSelected.split(",");
	let issuanceNotSelected = ['government_issued','not_government_issued'].filter(value=> !issuanceSelected.includes(value));

	let paymentPreferenceSelected =
		req.query.paymentPreferencesSelected.split(",")[0];
	let bulkPricingCouldBuy = Number(req.query.bulkPricingCouldBuy);
	let weightRange = req.query.weightRange.split(",");
	let weightStart = Number(weightRange[0]);
	let weightEnd = Number(weightRange[1]);
	let sortBy = Number(req.query.sortBy);
	let currency = req.query.currency;
	let sortByMap = [
		// 0:priceLowToHigh 1:priceHighToLow 2:dealerAsc 3:dealerDsc 4:mintAsc 5:mintDsc
		{ ["pricing." + paymentPreferenceSelected + ".price"]: 1 },
		{ ["pricing." + paymentPreferenceSelected + ".price"]: -1 },
		{ dealer: 1 },
		{ dealer: -1 },
		{ mint: 1 },
		{ mint: -1 },
	];
	let skip =
		req.query.currentPage > 0 ? (req.query.currentPage - 1) * nPerPage : 0;

	console.log("productTypesSelected:" + JSON.stringify(productTypesSelected));
	console.log("puritiesSelected: " + JSON.stringify(puritiesSelected));
	console.log("issuanceSelected: " + JSON.stringify(issuanceSelected));
	console.log(
		"paymentPreferenceSelected: " +
			JSON.stringify(paymentPreferenceSelected)
	);
	console.log("bulkPricingCouldBuy: " + bulkPricingCouldBuy);
	console.log("weightStart: " + weightStart);
	console.log("weightEnd: " + weightEnd);
	console.log("sortBy: " + sortBy);
	console.log("skip: " + skip);
	console.log("currency: "+currency);

	const pipeline = [
		{
			$match: {	
				$and: [
					{
						$or: productTypesOperator === 'XOR' ?
						[{ productType: { $in: productTypesSelected, $size: 1 }}] :
						[{ productType: { $all: productTypesSelected, $size: productTypesSelected.length }}]
					},
					{
						$or: puritiesOperator === 'XOR' ?
						[{ purities: { $in: puritiesSelected, $size: 1 }}] :
						[{ purities: { $all: puritiesSelected , $size: puritiesSelected.length }}]
					},
					{
						$or: issuanceOperator === 'XOR' ?
						[{ issuance: { $in: issuanceSelected, $size: 1 }}] :
						[{ issuance: { $all: issuanceSelected , $size: issuanceSelected.length }}]
					},
				],
				weight: { $gte: weightStart, $lte: weightEnd },
			},
		},
		{ $unwind: "$pricing" },
		{ $unwind: "$pricing." + paymentPreferenceSelected },
		{
			$match: {
				$and: [
					{
						["pricing." + paymentPreferenceSelected + ".qtyRange.0"]: {
							$lte: bulkPricingCouldBuy,
						},
					},
					{
						$or: [
							{
								["pricing." + paymentPreferenceSelected + ".qtyRange.1"]: {
									$gte: bulkPricingCouldBuy,
								},
							},
							{
								["pricing." + paymentPreferenceSelected + ".qtyRange.1"]: null,
							},
						]
					}
				]
			},
		},
		{
			$lookup: {
				from: "currencies",
				let: { currency: { $literal: currency } },
				pipeline: [
					{ $match: { $expr: { $eq: ["$currency", "$$currency"] } } },
					{ $project: { rate: 1 } }
				],
				as: "currencyInfo"
			}
		},
		{
			$project: {
				url: 1,
				title: 1,
				dealer: 1,
				mint: 1,
				purities: 1,
				issuance: 1,
				productType: 1,
				weight: 1,
				["pricing." + paymentPreferenceSelected]: {
					$cond: {
						if: {
							$gte: [ {
								$indexOfArray: [
									{ $map: { input: { $objectToArray: "$pricing." + paymentPreferenceSelected + ".price" }, as: "entry", in: "$$entry.k" } },
									currency
								],
							}, 0]
						},
						then: {
							qtyRange: "$pricing." + paymentPreferenceSelected + ".qtyRange",
							price: "$pricing." + paymentPreferenceSelected+".price."+currency
						},
						else: {
							qtyRange: "$pricing." + paymentPreferenceSelected + ".qtyRange",
							price: {
								$round: [
									{
										$multiply: [
											"$pricing." + paymentPreferenceSelected + ".price.USD",
											{ $arrayElemAt: [ "$currencyInfo.rate", 0 ] }
										]
									},
									2
								]
							}
						}
					}
				}
			},
		},
		{ $sort: sortByMap[sortBy] },
		{
			$facet: {
				totalData: [{ $skip: skip }, { $limit: nPerPage }],
				totalCount: [{ $count: "count" }],
			},
		},
	];

	const products = await toArray(productsCollection.aggregate(pipeline));

	console.log("Returning products:");
	console.log(JSON.stringify(products));

	res.status(200).json({
		statusCode: 200,
		data: products
	});
});

module.exports = router;
