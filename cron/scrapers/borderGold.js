const fetch = require("node-fetch");
const { parse } = require("node-html-parser");

function parsePrice(strPrice) {
	return parseFloat(strPrice.replace(/^\$|(\sCAD)$|,/g, ""));
}

module.exports = async (scrapeUrl) => {
	console.log("Scraping: " + scrapeUrl);
	const priceLine = [];
	const pricing = {
		cash: [],
		check: [],
		wire: [],
		creditcard: [],
		paypal: [],
	};

	// send request with headers mimicking a user browser
	const res = await fetch(scrapeUrl, {
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

	const html = await res.text();

	const document = parse(html);
	const catalogTable = document.querySelector(".nfprod-prices.all");
	const catalogRows = catalogTable.querySelectorAll("tr.nfprice-row");

	for (const catalogRow of catalogRows) {
		const qtyRangeText = catalogRow.firstChild.text;
		const quantityRange = qtyRangeText.includes(" - ")
			? qtyRangeText.split(" - ")
			: [parseInt(qtyRangeText.replace("+", "")), null];

		const cashPrice = parsePrice(catalogRow.childNodes[1].text);
		const creditPrice = parsePrice(catalogRow.childNodes[2].text);
		priceLine.push([quantityRange, cashPrice, creditPrice]);
	}

	for (let i = 0; i < priceLine.length; i++) {
		const [qtyRange, cashPrice, creditPrice] = priceLine[i];

		const cashPricing = {
			QtyRange: qtyRange,
			price: cashPrice,
		};

		pricing.cash.push(cashPricing);
		pricing.wire.push(cashPricing);
		pricing.check.push(cashPricing);

		const creditPricing = {
			QtyRange: qtyRange,
			price: creditPrice,
		};

		pricing.creditcard.push(creditPricing);
		pricing.paypal.push(creditPricing);
	}

	return { pricing };
};
