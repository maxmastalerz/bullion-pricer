const { MongoClient } = require("mongodb");
const axios = require('axios');

/*
Currency Converter
*/
const currConv = async function(usdAmount, targetCurrencyCode) {
	let usdToTargetCurrencyRatio = null;

	const currencyBeaconResponse = await axios.get(`https://api.currencybeacon.com/v1/latest`, { params: {
		base: 'USD',
		api_key: process.env.CURRENCY_BEACON_API_TOKEN
	}});
	const jsonResponse = currencyBeaconResponse.data;
	if(jsonResponse.meta.code === 200) {
		usdToTargetCurrencyRatio = jsonResponse.response.rates[targetCurrencyCode];
	}

	if(usdToTargetCurrencyRatio === null) {
		throw new Error(JSON.stringify(
			{ error: { code: jsonResponse.meta.code, message: `${jsonResponse.meta.error_type} ${jsonResponse.meta.error_detail}`}}
		));
	} else {
		return Math.round(usdAmount*usdToTargetCurrencyRatio* 100) / 100; // Round to 2 decimals
	}
}

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

module.exports.updateSpotPrices = async function() {
	console.log("== COLLECTING SPOT DATA ==");
	const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
	await client.connect();
	const db = client.db();
	const spotCollection = db.collection("spot");
	let err = false;

	//GET RANDOM USER AGENT
	const randomUserAgent = await getRandomUserAgent();
	console.log(randomUserAgent);

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
		var spotPrices = {
			AG: {CAD: null, USD: parseFloat(lines[0].split(',')[4])},
			AU: {CAD: null, USD: parseFloat(lines[1].split(',')[4])},
			PD: {CAD: null, USD: parseFloat(lines[2].split(',')[4])},
			PT: {CAD: null, USD: parseFloat(lines[3].split(',')[4])}
		}
	} catch(error) {
		err = error;
		console.error(`Errored when getting kitco spot price data:`, error.message);
	}

	if(err) { return; }

	//CONVERT KITCO SPOT PRICES TO OTHER CURRENCIES

	try {
		for(let symbol in spotPrices) {
			let val = spotPrices[symbol];
			spotPrices[symbol].CAD = await currConv(val.USD, "CAD");
		}
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
