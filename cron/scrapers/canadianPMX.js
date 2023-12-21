const axios = require('axios');
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
	let html;
	try {
		const response = await axios.get(scrapeUrl, {
			headers: {
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
				cookie: "storeclosing=Mon, 1 Jan 2099 00:00:00 GMT",
				"user-agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
			}
		});
		html = response.data;
	} catch (error) {
		console.error("Error fetching data:", error.message);
		throw error;
	}
	
	const document = parse(html);
	const catalogTable = document.querySelector(".nfs_catalog_plugin_table");
	const catalogRows = catalogTable.querySelectorAll("tr").slice(1);

	for (const catalogRow of catalogRows) {
		const quantityStep = parseInt(
			catalogRow.firstChild.text.replace("+", "")
		);
		const cashPrice = parsePrice(catalogRow.childNodes[1].text);
		const creditPrice = parsePrice(catalogRow.childNodes[2].text);
		priceLine.push([quantityStep, cashPrice, creditPrice]);
	}

	for (let i = 0; i < priceLine.length; i++) {
		const [quantityStep, cashPrice, creditPrice] = priceLine[i];
		const nextQuantityStep = priceLine?.[i + 1]?.[0] - 1 || Infinity;
		const qtyRange = [quantityStep, nextQuantityStep];

		const cashPricing = {
			qtyRange: qtyRange,
			price: cashPrice,
		};

		pricing.cash.push(cashPricing);
		pricing.wire.push(cashPricing);
		pricing.check.push(cashPricing);

		const creditPricing = {
			qtyRange: qtyRange,
			price: creditPrice,
		};

		pricing.creditcard.push(creditPricing);
		pricing.paypal.push(creditPricing);
	}

	return { pricing };
};
