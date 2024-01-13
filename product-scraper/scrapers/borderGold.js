const { parse } = require("node-html-parser");
const { fetchDataWithExponentialBackoff } = require('../scrape-helpers/requests.js');
const { adjustPricingIfBox } = require('../scrape-helpers/pricing.js');

function getHeaders(currency) {
	return {
		accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"accept-language": "en-US,en;q=0.9",
		"sec-ch-ua": '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": '"macOS"',
		"sec-fetch-dest": "document",
		"sec-fetch-mode": "navigate",
		"sec-fetch-site": "same-origin",
		"sec-fetch-user": "?1",
		"upgrade-insecure-requests": "1",
		cookie: `_istrd=https%3A%2F%2Fwww.google.com%2F; initialcurrency=${currency}`,
		Referer: "https://www.bordergold.com",
		"Referrer-Policy": "strict-origin-when-cross-origin",
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
	};
}

function parsePrice(strPrice) {
	return parseFloat(strPrice.replace(/^\$|,/g, ""));
}

function parseMint(mintStr) {
	//BP-TODO: Maybe sanitize and make sure it fits a list of pre-defined mints.
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
		not_government_issued: ['various', 'austrian mint', 'pamp suisse']
	};

	if(knownMints.government_issued.includes(mint)) {
		return ['government_issued'];
	} else if(knownMints.not_government_issued.includes(mint)) {
		return ['not_government_issued'];
	}

	return 'MANUAL_REVIEW';
}

/*
In the html response of our first request is a piece of javascript code that makes an ajax call to border gold's price controller.
Lets get the link they use for pricing the metals in USD.
*/
function getPricingLinksFromHTML(document) {
	const scriptTags = document.querySelectorAll('script');
	let targetScriptContent = null;

	for(const scriptTag of scriptTags) {
		const scriptContent = scriptTag.innerHTML;
		if (scriptContent.includes("customerGroup='Retail';")) {
			targetScriptContent = scriptContent;
			break;
		}
	}

	const match = targetScriptContent.match(/productView=(\d+);/);
	if (match && match[1]) {
		const productViewVal = parseInt(match[1], 10);
		return {
			USD: [`https://bordergold.com/wp-content/plugins/istpricecontroller/cache_1/products/Retail_${productViewVal}_USD_tiers.json`, getHeaders('USD')],
			CAD: [`https://bordergold.com/wp-content/plugins/istpricecontroller/cache_1/products/Retail_${productViewVal}_CAD_tiers.json`, getHeaders('CAD')]
		};
	} else {
		throw Error("Couldn't Generate Border Gold Pricing Link for Pricing Request");
	}
}



/*
Gets the same pricing a user would see visiting the website.
The pricing a user sees comes from a backend javascript ajax link call

pages is an object of currnecies the site supports
{CAD: [url, headers]|document, USD: [url, headers]|document}. The value under the currency can be a [url, headers] or document.

*/
async function getPricingFromPages(pages) {
	/*
	CAD: [`https://bordergold.com/wp-content/plugins/istpricecontroller/cache_1/products/Retail_${productViewVal}_CAD_tiers.json`,headers],
	USD: [`https://bordergold.com/wp-content/plugins/istpricecontroller/cache_1/products/Retail_${productViewVal}_USD_tiers.json`,headers]
	*/

	const priceLine = [];
	const pricing = {
		check: [],
		billpayment: [],
		creditcard: [],
		paypal: [],
	};

	for (const currency in pages) {
		let page = pages[currency];
		let document;

		if(Array.isArray(page)) {
			const [url, headers] = page;

			const res = await fetchDataWithExponentialBackoff(url, headers);
			const json = res.data;
			const html = json.data;
			document = parse(html);
		} else {
			document = page;
		}

		const catalogTable = document.querySelector(".nfprod-prices.all");
		const catalogRows = catalogTable.querySelectorAll("tr.nfprice-row");
		
		for (const catalogRow of catalogRows) {
			const qtyRangeText = catalogRow.firstChild.text;
			const quantityRange = qtyRangeText.includes(" - ")
				? qtyRangeText.split(" - ").map((s) => parseInt(s))
				: [parseInt(qtyRangeText.replace("+", "")), Infinity];

			const cashPrice = parsePrice(catalogRow.childNodes[1].text);
			const creditPrice = parsePrice(catalogRow.childNodes[2].text);

			const indexOfQtyRange = priceLine.findIndex(([existingQuantityRange]) => {
				return ( existingQuantityRange[0] === quantityRange[0] && existingQuantityRange[1] === quantityRange[1] );
			});

			//FYI: We just assume that the quantity ranges are the same across currencies. If they weren't this probably wouldn't work.
			if (indexOfQtyRange === -1) { // qtyRange not found, so push in
				priceLine.push([quantityRange, { [currency]: cashPrice}, { [currency]: creditPrice } ]);
			} else { // it's an update
				priceLine[indexOfQtyRange][1][currency] = cashPrice; //cash
				priceLine[indexOfQtyRange][2][currency] = creditPrice; //credit
			}
		}

	}

	for (let i = 0; i < priceLine.length; i++) {
		const [qtyRange, cashPrice, creditPrice] = priceLine[i];

		const cashPricing = {
			qtyRange: qtyRange,
			price: cashPrice,
		};

		pricing.billpayment.push(JSON.parse(JSON.stringify(cashPricing)));
		pricing.check.push(JSON.parse(JSON.stringify(cashPricing)));

		const creditPricing = {
			qtyRange: qtyRange,
			price: creditPrice,
		};

		pricing.creditcard.push(JSON.parse(JSON.stringify(creditPricing)));
		pricing.paypal.push(JSON.parse(JSON.stringify(creditPricing)));
	}

	return pricing;
}

const getBoxSizeIfBox = (productTitle) => {
	if(productTitle.match(/box|tube/i)) {
		const boxSizeRegex = /\((\d+)\s*(?:Coins)/i;
		const match = productTitle.match(boxSizeRegex);
		if(match[1]) {
			return Number(match[1]);
		}
	}

	return false; //not a box
}

async function scrapeProductPage(url) {
	console.log("Scraping: " + url);

	const res = await fetchDataWithExponentialBackoff(url, getHeaders('USD'));
	const html = res.data;

	let purities='MANUAL_REVIEW',issuance='MANUAL_REVIEW',weight='MANUAL_REVIEW',mint='MANUAL_REVIEW',pricing='MANUAL_REVIEW';

	const document = parse(html);

	let productTitle = document.querySelector('div.product .summary h1.product_title').innerText.trim();
	const boxSize = getBoxSizeIfBox(productTitle); //Set for items like monster boxes/tubes. Example: boxSize is usually 25 for tubes.
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

	pricing = await getPricingFromPages(getPricingLinksFromHTML(document));
	adjustPricingIfBox(pricing, boxSize);

	return { purities, issuance, weight, mint, pricing, boxSize };
};

module.exports = {
	scrapeProductPage
};