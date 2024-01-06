const axios = require('axios');
const { parse } = require("node-html-parser");
const he = require("he");
const metalWords = ["gold", "silver", "platinum", "palladium"];

// BP-TODO: Get PID like the one here: https://www.bordergold.com/?p=10246 from the url, then send a request to
// https://www.bordergold.com/wp-content/plugins/istpricecontroller/cache/products/Retail_10246_CAD_tiers.json?_=1668453682180
// replacing the PID and the timestamp with now, to get the current price

function parsePrice(strPrice) {
	return parseFloat(strPrice.replace(/^\$|(\sCAD)$|,/g, ""));
}

// Function to scrape basic product info from a given HTML content
function scrapeProductsFromHtml(htmlContent, productType) {
	const smartReview = (productType === 'SMART_REVIEW') ? true : false;
	const root = parse(htmlContent);
	const products = [];

	// Extract products using the appropriate selector
	root.querySelectorAll('div.desktop-product-tile.product .product-wrapper').forEach((element) => {
		const url = element.querySelector('.product-image > a').getAttribute('href');
		const title = he.decode(element.querySelector('h2.product-name > a').innerText).trim();

		if(smartReview) {
			const foundMetals = metalWords.filter(metal => title.toLowerCase().includes(metal));
			if(foundMetals.length === 1) {
				productType = foundMetals;
			} else {
				productType = 'MANUAL_REVIEW';
			}
		}

		products.push({url, title, productType, pricing: null, pricing_last_updated: 0});
	});

	return products;
}

// Function to scrape products from a category page
async function scrapeProductsFromCategory(categoryStart) {
	let products = [];

	console.log(`Getting basic info on products(no pagination) from ${categoryStart.url}`);
	const response = await axios.get(categoryStart.url);
	const productsOnPage = await scrapeProductsFromHtml(response.data, categoryStart.productType); // Scrape products from the page
	products = products.concat(productsOnPage);

	return products;
}

async function scrapeProductsFromCategories() {
	const startingCategories = [
		{url: 'https://bordergold.com/product-category/gold/', productType: ['gold']},
		{url: 'https://bordergold.com/product-category/silver/', productType: ['silver']},
		{url: 'https://bordergold.com/product-category/platinum-palladium/', productType: 'SMART_REVIEW'},
	];
	let products = [];

	for (const categoryStart of startingCategories) {
		// Scrape products for each category and concatenate the results
		const productsFromCategory = await scrapeProductsFromCategory(categoryStart);
		products = products.concat(productsFromCategory);
	}
	console.log("========");
	
	products = products.map((product) => ({...product, dealer: 'Border Gold'}));

	return products;
}

module.exports = {
	scrapeProductsFromCategories
};