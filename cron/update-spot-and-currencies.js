const axios = require('axios');
const { parse } = require("node-html-parser");
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
	console.log("=[COLLECTING CURRENCY DATA]=");
	const db = client.db();
	const currencies = db.collection("currencies");

	let rates = null;
	try {
		const currencyBeaconResponse = await axios.get(`https://api.currencybeacon.com/v1/latest`, { params: {
			base: 'USD',
			api_key: process.env.CURRENCY_BEACON_API_TOKEN
		}});
		const jsonResponse = currencyBeaconResponse.data;
		
		if(jsonResponse.meta.code === 200) {
			rates = jsonResponse.response.rates;
			console.log('Received currency data.');
		}
	} catch(error) {
		err = error;
		console.error(`Errored when getting currency data:`, error.message);
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
	console.log("=[COLLECTING SPOT DATA]=");
	const db = client.db();
	const spotCollection = db.collection("spot");
	let err = false;

	//GET RANDOM USER AGENT
	const randomUserAgent = await getRandomUserAgent();

	//GET KITCO SPOT PRICES USING RANDOM USER AGENT
	try {
		const KitcoReqHeaders = {
			'Host': 'www.kitco.com',
			'Method': 'GET',
			'Path': '/price/precious-metals',
			'Scheme': 'https',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache',
			'Referer': 'https://www.google.ca/',
			'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
			'Sec-Ch-Ua-Mobile': '?0',
			'Sec-Ch-Ua-Platform': '"Linux"',
			'Sec-Fetch-Dest': 'document',
			'Sec-Fetch-Mode': 'navigate',
			'Sec-Fetch-Site': 'cross-site',
			'Sec-Fetch-User': '?1',
			'Upgrade-Insecure-Requests': 1,
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
		};

		const kitcoRes = await axios.get('https://www.kitco.com/price/precious-metals', { headers: KitcoReqHeaders });
		const kitcoData = kitcoRes.data;
		const root = parse(kitcoData);

		let spotBidPrices = {};
		const tableHeaders = root.querySelectorAll('#__next > main > div.px-2 .contents header');
		for (const header of tableHeaders) {
			if (header.textContent.trim() === 'World Spot Price') {
				const columnTitles = Array.from(header.nextElementSibling.nextElementSibling.querySelectorAll('p')).map(p => p.textContent);
				const bidColumnIndex = columnTitles.indexOf('Bid');

				if (bidColumnIndex !== -1) {
					const metalsValues = Array.from(header.nextElementSibling.nextElementSibling.nextElementSibling.querySelectorAll(`li span:nth-child(1)`)).map(span => span.textContent);
					const bidValues = Array.from(header.nextElementSibling.nextElementSibling.nextElementSibling.querySelectorAll(`li span:nth-child(${bidColumnIndex + 1})`)).map(span => span.textContent);
					
					const combinedValues = metalsValues.map((metal, index) => ({
						metal: metal,
						bid: bidValues[index],
					}));

					let spotBidPricesFiltered = combinedValues.filter(entry =>
						['Gold', 'Silver', 'Platinum', 'Palladium'].includes(entry.metal)
					);

					spotBidPrices = spotBidPricesFiltered.reduce((acc, current) => {
						acc[current.metal] = parseFloat(current.bid.replace(/,/, ""));
						return acc;
					}, {});
				} else {
					console.log('BID COLUMN NOT FOUND');
				}

				break; // Exit the loop once the desired header is found
			}
		}

		console.log('Received spot data.' + JSON.stringify(spotBidPrices));
		var USDSpotAG = spotBidPrices.Silver;
		var USDSpotAU = spotBidPrices.Gold;
		var USDSpotPD = spotBidPrices.Palladium;
		var USDSpotPT = spotBidPrices.Platinum;
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