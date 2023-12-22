const axios = require('axios');
const { parse } = require("node-html-parser");
const metalWords = ["gold", "silver", "platinum", "palladium"];

function parsePrice(strPrice) {
	return parseFloat(strPrice.replace(/^\$|(\sCAD)$|,/g, ""));
}

// Function to scrape basic product info from a given HTML content
function scrapeProductsFromHtml(htmlContent, productType) {
	const smartReview = (productType === 'SMART_REVIEW') ? true : false;
	const root = parse(htmlContent);
	const products = [];

	// Extract products using the appropriate selector
	root.querySelectorAll('ul.products > li > div.astra-shop-thumbnail-wrap > a').forEach((element) => {
		const productLink = element.getAttribute('href');
		const productTitle = element.querySelector('h2.woocommerce-loop-product__title').innerText.trim();

		if(smartReview) {
			const foundMetals = metalWords.filter(metal => productTitle.toLowerCase().includes(metal));
			if(foundMetals.length === 1) {
				productType = foundMetals;
			} else {
				productType = 'MANUAL_REVIEW';
			}
		}

		products.push({url: productLink, productTitle, productType, pricing: null, pricing_last_updated: 0});
	});

	return products;
}

// Function to scrape products from all pages of a category
async function scrapeProductsFromCategory(categoryStart) {
	let products = [];

	let currentPage = categoryStart.url; // Initialize with the starting link
	let nextPage = true;

	while (nextPage) {
		console.log(`Getting basic info on products from ${currentPage}`);
		const response = await axios.get(currentPage);
		const productsOnPage = await scrapeProductsFromHtml(response.data, categoryStart.productType); // Scrape products from the current page
		products = products.concat(productsOnPage);

		// Check for the next page
		const root = parse(response.data);
		const nextButton = root.querySelector('a.next.page-numbers');
		nextPage = !!nextButton;

		// Update the current page if there is a next page
		if (nextPage) {
			currentPage = nextButton.getAttribute('href');
		}
	}

	return products;
}

async function scrapeProductsFromCategories() {
	const startingCategories = [
		{url: 'https://canadianpmx.com/product-category/gold/gold-bars/', productType: ['gold']},
		{url: 'https://canadianpmx.com/product-category/gold/gold-coins/', productType: ['gold']},
		{url: 'https://canadianpmx.com/product-category/silver/silver-bars/', productType: ['silver']},
		{url: 'https://canadianpmx.com/product-category/silver/silver-coins/', productType: ['silver']},
		{url: 'https://canadianpmx.com/product-category/platinum-palladium/platinum-palladium-bars/', productType: 'SMART_REVIEW'},
		{url: 'https://canadianpmx.com/product-category/platinum-palladium/platinum-palladium-coins/', productType: 'SMART_REVIEW'}
	];
	let products = [];

	for (const categoryStart of startingCategories) {
		// Scrape products for each category and concatenate the results
		const productsFromCategory = await scrapeProductsFromCategory(categoryStart);
		console.log("--------");
		products = products.concat(productsFromCategory);
	}
	console.log("========");

	products = products.map((product) => ({...product, dealer: 'Border Gold'}));

	return products;
}

async function scrapeProductPage(url) {
	console.log("Scraping: " + url);
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
		const response = await axios.get(url, {
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

module.exports = {
	scrapeProductPage,
	scrapeProductsFromCategories,
};