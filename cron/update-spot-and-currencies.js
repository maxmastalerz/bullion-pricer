const axios = require('axios');
const { getCountryList } = require("country-data-codes");
const { client } = require('./db');

let countries = getCountryList().filter((value, index, self) => { // get unique currency codes.
    return self.findIndex(v => v.currency.code === value.currency.code && v.currency.code !== "No Universal Currency") === index;
});

/*
Gets random user agents list from Scrape Ops.
*/
const getRandomUserAgent = async function() {
	const sopsResponse = await axios.get(`http://headers.scrapeops.io/v1/user-agents`, { params: {
		api_key: process.env.SCRAPEOPS_API_KEY
	}});
	const jsonResponse = sopsResponse.data;
	const userAgentList = jsonResponse['result'];
	return userAgentList[Math.floor(Math.random()*userAgentList.length)];
};

async function updateCurrencies() {
	const db = client.db();
	const currencies = db.collection("currencies");

	let rates = null;
	const currencyBeaconResponse = await axios.get(`https://api.currencybeacon.com/v1/latest`, { params: {
		base: 'USD',
		api_key: process.env.CURRENCY_BEACON_API_TOKEN
	}});
	const jsonResponse = currencyBeaconResponse.data;
	if(jsonResponse.meta.code === 200) {
		rates = jsonResponse.response.rates;
	}

	if(rates === null) {
		throw new Error(JSON.stringify(
			{ error: { code: jsonResponse.meta.code, message: `${jsonResponse.meta.error_type} ${jsonResponse.meta.error_detail}`}}
		));
	} else {
		const bulkOps = Object.entries(rates).map(([currency, rate]) => ({
			updateOne: {
				filter: { currency },
				update: { $set: { rate } },
				upsert: true  // Set to true to insert new documents if the currency doesn't exist
			}
		}));

		await currencies.bulkWrite(bulkOps);
	}
}

/*
Takes amounts in USD and returns them with all currencies.
*/
const currencyConvertObj = async function(usdAmounts) {
	let rates = null;

	// Assuming you have a MongoDB client and connection available in your code
	const db = client.db();
	const currencies = db.collection("currencies");

	// Fetch all currency data from MongoDB
	const currencyData = await currencies.find({}).toArray();

	if (currencyData.length > 0) {
		// Merge rates from all documents, assuming each document has a 'rates' field
		rates = Object.assign({}, ...currencyData.map(doc => ({ [doc.currency]: doc.rate })));
	}

	if (rates === null) {
		throw new Error("Currency data not available in MongoDB.");
	} else {
		for (const metal in usdAmounts) {
			let usdAmount = usdAmounts[metal];
			let usdAmountConvertedToAllCurrencies = {};

			Object.keys(rates).forEach((currencyCode) => {
				let countryRate = rates[currencyCode];
				usdAmountConvertedToAllCurrencies[currencyCode] =
				Math.round(usdAmount * countryRate * 100) / 100; // Round to 2 decimals
			});

			usdAmounts[metal] = usdAmountConvertedToAllCurrencies;
		}

		return usdAmounts;
	}
};

async function updateSpotPrices() {
	console.log("== COLLECTING SPOT DATA ==");
	const db = client.db();
	const spotCollection = db.collection("spot");
	let err = false;

	//GET RANDOM USER AGENT
	const randomUserAgent = await getRandomUserAgent();

	//GET KITCO SPOT PRICES USING RANDOM USER AGENT
	try {
		const KitcoReqHeaders = {
			'Accept-Language': 'en-US, en;q=0.9',
			'Host': 'proxy.kitco.com',
			'Origin': 'https://www.kitco.com',
			'Referer': 'https://www.kitco.com/',
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-site',
			'Sec-GPC': '1',
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36',
		};

		const kitcoRes = await axios.get('https://proxy.kitco.com/getPM?symbol=AG,AU,PD,PT', { headers: KitcoReqHeaders });
		const kitcoData = kitcoRes.data;
		const lines = kitcoData.split('\r\n').splice(0,4);

		var USDSpotAG = parseFloat(lines[0].split(',')[4]);
		var USDSpotAU = parseFloat(lines[1].split(',')[4]);
		var USDSpotPD = parseFloat(lines[2].split(',')[4]);
		var USDSpotPT = parseFloat(lines[3].split(',')[4]);
	} catch(error) {
		err = error;
		console.error(`Errored when getting kitco spot price data:`, error.message);
	}

	if(err) { return; }

	//CONVERT KITCO SPOT PRICES TO OTHER CURRENCIES

	try {
		var spotPrices = await currencyConvertObj({AG: USDSpotAG, AU: USDSpotAU, PD: USDSpotPD, PT: USDSpotPT});
	} catch(error) {
		err = error;
		console.error(`Errored converting spot price data into other currencies:`, error);
	}

	if(err) { return; }

	//SAVE SPOT PRICES (MANY CURRENCIES)

	const t = new Date();
	spotCollection.updateOne({ symbol: 'AG'}, { $set:{ price: spotPrices.AG, updatedAt: t}});
	spotCollection.updateOne({ symbol: 'AU'}, { $set:{ price: spotPrices.AU, updatedAt: t}});
	spotCollection.updateOne({ symbol: 'PD'}, { $set:{ price: spotPrices.PD, updatedAt: t}});
	spotCollection.updateOne({ symbol: 'PT'}, { $set:{ price: spotPrices.PT, updatedAt: t}});
};

module.exports = { updateSpotPrices, updateCurrencies };