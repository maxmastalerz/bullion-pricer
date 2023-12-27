const axios = require('axios');
const { parse } = require("node-html-parser");

// PP-TODO: Get PID like the one here: https://www.bordergold.com/?p=10246 from the url, then send a request to
// https://www.bordergold.com/wp-content/plugins/istpricecontroller/cache/products/Retail_10246_CAD_tiers.json?_=1668453682180
// replacing the PID and the timestamp with now, to get the current price

function parsePrice(strPrice) {
	return parseFloat(strPrice.replace(/^\$|(\sCAD)$|,/g, ""));
}

function parseMint(mintStr) {
	//PP-TODO: Maybe sanitize and make sure it fits a list of pre-defined mints.
	//Just return as is. We don't have a search by mint functionality so for now possible slight differences are ok.
	return mintStr;
}

/*Can try to parse the weight from either the weight string or the title string*/
function parseWeight({weight, title}) {
	const wordsToGramMap = [
		[["1 g","1g"],1],
		[["2 g","2g"],2],
		[["1/10 oz","1/10oz"],3.11],
		[["5 g","5g"],5],
		[["1/4 oz","1/4oz"],7.78],
		[["10 g","10g"],10],
		[["1/2 oz","1/2oz"],15.55],
		[["1 oz","1oz"],31.1],
		[["5 oz","5oz"],155.52],
		[["10 oz","10oz"],311.04],
		[["1 kg","1kg","1 kilo"],1000],
		[["100 oz","100oz"],3110.35],
		[["1000 oz","1000oz"],31103.5],
	];

	for (const [patterns, grams] of wordsToGramMap) {
		if(title) {
			title = title.toLowerCase();
			if (patterns.some(pattern => title.includes(pattern))) {
				return grams;
			}
		} else if(weight) {
			weight = weight.toLowerCase();
			if (patterns.some(pattern => pattern===weight)) {
				return grams;
			}
		}
	}

	return false;
}

function parsePurities({composition, description}) {
	const wordsToPuritiesMap = [
		[["99.999% pure gold"                           ," 99999"],["99999"]],
		[["99.99% pure gold","99.99% pure silver"       ,".9999"," 9999"],["9999"]],
		[["99.95% pure platinum","99.95% pure palladium","99.95%"],["9995"]],
		[["99.9% pure silver"                           ,".999+",".999","99.9%"],["999"]],
		[["925"],["925"]],
		[[],["less_than_or_equal_90"]],
	];

	for (const [patterns, purities] of wordsToPuritiesMap) {
		if(description) {
			description = description.toLowerCase();
			if (patterns.some(pattern => description.includes(pattern))) {
				return purities;
			}
		} else if(composition) {
			composition = composition.toLowerCase();
			if (patterns.some(pattern => pattern===composition)) {
				return purities;
			}
		}
	}

	return false;
}

function parseIssuance(mint) {
	let knownMints = {
		government_issued: ['royal canadian mint', 'perth mint', 'us mint', 'royal mint uk', 'saint helena mint'],
		not_government_issued: ['various', 'austrian mint']
	};

	if(knownMints.government_issued.includes(mint)) {
		return ['government_issued'];
	} else if(knownMints.not_government_issued.includes(mint)) {
		return ['not_government_issued'];
	}

	return 'MANUAL_REVIEW';
}

function getPricing(document) {
	const priceLine = [];
	const pricing = {
		check: [],
		wire: [],
		creditcard: [],
		paypal: [],
	};
	const catalogTable = document.querySelector(".nfprod-prices.all");
	const catalogRows = catalogTable.querySelectorAll("tr.nfprice-row");

	for (const catalogRow of catalogRows) {
		const qtyRangeText = catalogRow.firstChild.text;
		const quantityRange = qtyRangeText.includes(" - ")
			? qtyRangeText.split(" - ").map((s) => parseInt(s))
			: [parseInt(qtyRangeText.replace("+", "")), Infinity];

		const cashPrice = parsePrice(catalogRow.childNodes[1].text);
		const creditPrice = parsePrice(catalogRow.childNodes[2].text);
		priceLine.push([quantityRange, cashPrice, creditPrice]);
	}

	for (let i = 0; i < priceLine.length; i++) {
		const [qtyRange, cashPrice, creditPrice] = priceLine[i];

		const cashPricing = {
			qtyRange: qtyRange,
			price: cashPrice,
		};

		pricing.wire.push(cashPricing);
		pricing.check.push(cashPricing);

		const creditPricing = {
			qtyRange: qtyRange,
			price: creditPrice,
		};

		pricing.creditcard.push(creditPricing);
		pricing.paypal.push(creditPricing);
	}

	return pricing;
}

async function scrapeProductPage(url) {
	console.log("Scraping: " + url);

	// send request with headers mimicking a user browser
	let html;
	try {
		const res = await axios.get(url, {
			headers: {
				accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9",
				"sec-ch-ua":
					'"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "same-origin",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": "1",
				cookie: "_istrd=https%3A%2F%2Fwww.google.com%2F; initialcurrency=CAD",
				Referer: "https://www.bordergold.com/product-category/gold/",
				"Referrer-Policy": "strict-origin-when-cross-origin",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
			},
			body: null,
			method: "GET",
		});

		html = res.data;
	} catch (error) {
		console.error("Error fetching data:", error.message);
		throw error;
	}

	let purities='MANUAL_REVIEW',issuance='MANUAL_REVIEW',weight='MANUAL_REVIEW',mint='MANUAL_REVIEW',pricing='MANUAL_REVIEW';

	const document = parse(html);

	let productTitle = document.querySelector('div.product .summary h1.product_title').innerText.trim();
	let description = document.querySelector('#tab-description').innerText.trim();

	let foundWeight = parseWeight({weight: null, title: productTitle}); //could be overwritten below by the weight table as that may be more accurate.
	if(foundWeight) { weight=foundWeight; }

	let thElements = document.querySelectorAll('#tab-additional_information table th');
	for(let thElement of thElements) {
		if (thElement.innerText.trim() === "Composition") {
			let compositionStr = thElement.nextElementSibling.innerText.trim(); // Get the next sibling <td> element and its text content.
			let foundPurities = parsePurities({composition: compositionStr, description: null});
			if(foundPurities) { purities=foundPurities; }
		} else if (thElement.innerText.trim() === "Weight") {
			let weightStr = thElement.nextElementSibling.innerText.trim(); // Get the next sibling <td> element and its text content.
			foundWeight = parseWeight({weight: weightStr, title: null});
			if(foundWeight) { weight=foundWeight; }
		} else if (thElement.innerText.trim() === "Mint") {
			let mintStr = thElement.nextElementSibling.innerText.trim(); // Get the next sibling <td> element and its text content.
			let foundMint = parseMint(mintStr);
			if(foundMint) {
				mint=foundMint;
				issuance = parseIssuance(foundMint.toLowerCase());
			}
		}
	}
	
	//For some reason the description seems to be more accurate than the composition field.
	let foundPurities = parsePurities({composition: null, description: description});
	if(foundPurities) { purities=foundPurities; }

	pricing = getPricing(document);

	return { purities, issuance, weight, mint, pricing };
};

module.exports = {
	scrapeProductPage
};