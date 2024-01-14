import { parse } from 'node-html-parser';
import { fetchDataWithExponentialBackoff } from '../scrape-helpers/requests.js';
import { adjustPricingIfBox } from '../scrape-helpers/pricing.js';

const notMints = ['Maple Leaf', 'Hand Poured', '9999'];
const listOfMints = {
	government_issued: [
		[['Royal Canadian Mint'],'Royal Canadian Mint'],
		[['Perth Mint Products', 'Perth Mint Gold'],'Perth Mint'],
		[['The Royal Mint'],'The Royal Mint'],
		[['United States Mint'],'United States Mint'],
		[['South African Mint'],'South African Mint'],
	],
	not_government_issued: [
		[['Pamp Suisse'],'Pamp Suisse'],
		[['Engelhard'],'Engelhard'],
		[['Johnson Matthey'],'Johnson Matthey'],
		[['Republic Metals Corp.','RMC'],'Republic Metals Corp.'],
		[['Scotiabank'],'Scotiabank'],
		[['Austrian Mint'],'Austrian Mint'],
		[['Argentia Precious Metals','Argentia'],'Argentia Precious Metals'],
		[['Canadian PMX Inc.'],'Canadian PMX Inc.'],
		[['Scottsdale Mint'],'Scottsdale Mint'],
		[['Sunshine Mint'],'Sunshine Mint'],
		[['First Majestic'],'First Majestic'],
		[['NTR Metals'],'NTR Metals'],
		[['OPM Metals'],'Ohio Precious Metals'],
		[['CCR'],'Canadian Copper Refinery'],
		[['Beaver Bullion'],'Beaver Bullion'],
		[['Asahi','Asahi Refining'],'Asahi Refining'],
		[['Geiger Edelmetalle'],'Geiger Edelmetalle']
	]
};

function getHeaders(currency) {
	return {
		accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"accept-language": "en-US,en;q=0.9",
		"sec-ch-ua":
			'"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": '"macOS"',
		"sec-fetch-dest": "document",
		"sec-fetch-mode": "navigate",
		"sec-fetch-site": "none",
		"sec-fetch-user": "?1",
		"upgrade-insecure-requests": "1",
		cookie: `storeclosing=Mon, 1 Jan 2099 00:00:00 GMT; aelia_cs_selected_currency=${currency}`,
		"user-agent":
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
	};
}

function parsePrice(strPrice) {
	return parseFloat(strPrice.replace(/^\$|(\sUSD)$|,/g, ""));
}

/*Tries to parse the weight from the weight string*/
function parseWeight({weight, title}) {
	const wordsToGramMap = [
		[["0.0321 tr oz", "1 gram"],1],
		[["0.0643 tr oz"],2],
		[["0.10 tr oz"],3.11],
		[["0.1607 tr oz"],5],
		[["0.25 tr oz"],7.78],
		[["0.3215 tr oz"],10],
		[["0.50 tr oz"],15.55],
		[["1 tr oz", "1 oz"],31.1],
		[["5 Tr Oz","5 oz"],155.52],
		[["10 Tr Oz","10 oz"],311.04],
		[["32.15 tr oz"],1000],
		[["100 tr oz"],3110.35],
		[["1000 tr oz"],31103.5]
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

function parsePurities(fineness) {
	const wordsToPuritiesMap = [
		[[],["99999"]],
		[[".9999"],["9999"]],
		[[".9995"],["9995"]],
		[[".999"],["999"]],
		[[],["925"]],
		[[],["less_than_or_equal_90"]],
	];

	for (const [patterns, purities] of wordsToPuritiesMap) {
		fineness = fineness.toLowerCase();
		if (patterns.some(pattern => pattern===fineness)) {
			return purities;
		}
	}

	return false;
}

function getTags(document) {
	let tags = [];
	let tagEls = document.querySelectorAll('div.product_meta > span.tagged_as a');
	for(let tag of tagEls) {
		tags.push(tag.innerText.trim());
	}
	return tags;
}

function parseMint(tags) {
	//Removing tags that we know for sure aren't dealers. We are not interested in them.
	tags = tags.filter(tag => !notMints.includes(tag));

	let matchingMints = [];

	for (const category in listOfMints) {
		matchingMints = matchingMints.concat(listOfMints[category].filter(entry =>
			entry[0].some(tag => tags.includes(tag))
		));
	}

	if (tags.some(tag => !matchingMints.some(entry => entry[0].includes(tag)))) { // Found a tag that could be a new mint, or it's a tag we should exclude in notMints
		return 'Unknown'; // will become a MANUAL_REVIEW
	} else if (matchingMints.length === 1) { // Single matching mint found
		return [matchingMints[0][1]]; //['someMint']
	} else if (matchingMints.length > 1) { // Multiple matching mints found
		return matchingMints.map((matchingMint) => matchingMint[1]); //['someMintA','someMintB',..]
	} else { // No mint is listed in the tags.
		return false; // will become a MANUAL_REVIEW
	}
}

//We get an array of known mints that we matched and return the issuance.
function parseIssuance(foundMints) {
	let numGovernmentIssued = 0;
	let numNotGovernmentIssued = 0;

	for(let i=0; i<foundMints.length; i++) {
		let mintToSearch = foundMints[i];

		let foundType = false;
		for (const [tags, mint] of listOfMints.government_issued) { // Check government-issued mints
			if (mint === mintToSearch) {
				numGovernmentIssued++;
				foundType = true;
				break;
			}
		}
		if(foundType) { continue; }

		for (const [tags, mint] of listOfMints.not_government_issued) { // Check not government-issued mints
			if (mint === mintToSearch) {
				numNotGovernmentIssued++;
				break;
			}
		}
	}

	if(numGovernmentIssued === foundMints.length) {
		return ['government_issued'];
	} else if(numNotGovernmentIssued === foundMints.length){
		return ['not_government_issued'];
	}
	
	return "MANUAL_REVIEW";
	//return ['government_issued', 'not_government_issued']; //BP-TODO: Returning this would've classified it as a combo product which would be wrong for Misc products as those are a single product.
}

async function getPricingFromPages(pages) {
	/*
	CAD: [url,headers],
	USD: document
	*/

	const priceLine = [];
	const pricing = {
		cash: [],
		check: [],
		wire: [],
		creditcard: [],
		paypal: [],
	};

	for (const currency in pages) {
		let page = pages[currency];
		let document;

		if(Array.isArray(page)) {
			const [url, headers] = page;

			const res = await fetchDataWithExponentialBackoff(url, headers);
			const html = res.data;
			document = parse(html);
		} else {
			document = page;
		}

		const catalogTable = document.querySelector(".nfs_catalog_plugin_table");
		const catalogRows = catalogTable.querySelectorAll("tr").slice(1);
		
		for (const catalogRow of catalogRows) {
			const quantityStep = parseInt(
				catalogRow.firstChild.text.replace("+", "")
			);
			/*const qtyRangeText = catalogRow.firstChild.text;
			const quantityRange = qtyRangeText.includes(" - ")
				? qtyRangeText.split(" - ").map((s) => parseInt(s))
				: [parseInt(qtyRangeText.replace("+", "")), Infinity];*/

			const cashPrice = parsePrice(catalogRow.childNodes[1].text);
			const creditPrice = parsePrice(catalogRow.childNodes[2].text);

			const indexOfQuantityStep = priceLine.findIndex(([existingQuantityStep]) => existingQuantityStep === quantityStep);

			//FYI: We just assume that the quantity ranges are the same across currencies. If they weren't this probably wouldn't work.
			if (indexOfQuantityStep === -1) { // qtyRange not found, so push in
				priceLine.push([quantityStep, { [currency]: cashPrice}, { [currency]: creditPrice } ]);
			} else { // it's an update
				priceLine[indexOfQuantityStep][1][currency] = cashPrice; //cash
				priceLine[indexOfQuantityStep][2][currency] = creditPrice; //credit
			}
		}
	}

	for (let i = 0; i < priceLine.length; i++) {
		const [quantityStep, cashPrice, creditPrice] = priceLine[i];
		const nextQuantityStep = priceLine?.[i + 1]?.[0] - 1 || Infinity;
		const qtyRange = [quantityStep, nextQuantityStep];

		const cashPricing = {
			qtyRange: qtyRange,
			price: cashPrice,
		};

		pricing.cash.push(JSON.parse(JSON.stringify(cashPricing)));
		pricing.wire.push(JSON.parse(JSON.stringify(cashPricing)));
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
		const boxSizeRegex = /(\d+)\s*[xX]\s*\d+\s*(?:oz|tr\s*oz)/i;
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
	
	let purities = 'MANUAL_REVIEW',issuance='MANUAL_REVIEW',weight='MANUAL_REVIEW',mint='MANUAL_REVIEW',pricing='MANUAL_REVIEW';

	const document = parse(html);

	let productTitle = document.querySelector('div.product .summary h1.product_title').innerText.trim();
	const boxSize = getBoxSizeIfBox(productTitle); //Set for items like monster boxes/tubes. Example: boxSize is usually 25 for tubes.
	let tags = getTags(document);

	let foundMints = parseMint(tags);
	if(foundMints && foundMints !== 'Unknown') {
		mint = foundMints.length === 1 ? foundMints[0] : 'Various';
		issuance = parseIssuance(foundMints);
	}

	let foundWeight = parseWeight({weight: null, title: productTitle}); //could be overwritten below by the weight table as that is pretty accurate if its there
	if(foundWeight) { weight=foundWeight; }

	let thElements = document.querySelectorAll('#tab-additional_information table th');
	for(let thElement of thElements) {
		if (thElement.innerText.trim().match(/^Fineness:?$/)) {
			let finenessStr = thElement.nextElementSibling.innerText.trim(); // Get the next sibling <td> element and its text content.
			let foundPurities = parsePurities(finenessStr);
			if(foundPurities) { purities=foundPurities; }
		} else if (thElement.innerText.trim().match(/^Bullion Weight:?$/)) {
			let weightStr = thElement.nextElementSibling.innerText.trim(); // Get the next sibling <td> element and its text content.
			foundWeight = parseWeight({weight: weightStr, title: null});
			if(foundWeight) { weight=foundWeight; }
		}
	}

	pricing = await getPricingFromPages({ USD: document, CAD: [url, getHeaders('CAD')] });
	adjustPricingIfBox(pricing, boxSize);

	return { purities, issuance, weight, mint, pricing, boxSize };
};

export { scrapeProductPage };
