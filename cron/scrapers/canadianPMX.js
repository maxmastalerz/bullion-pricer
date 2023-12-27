const axios = require('axios');
const { parse } = require("node-html-parser");
const he = require("he");
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
		const url = element.getAttribute('href');
		const title = he.decode(element.querySelector('h2.woocommerce-loop-product__title').innerText).trim();

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

// Function to scrape products from all pages of a category
async function scrapeProductsFromCategory(categoryStart) {
	let products = [];

	let currentPage = categoryStart.url; // Initialize with the starting link
	let nextPage = true;

	while (nextPage) {
		let indentIfNotFirst = (currentPage === categoryStart.url) ? '' : '\t\t';
		console.log(`${indentIfNotFirst}Getting basic info on products from ${currentPage}`);
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
		products = products.concat(productsFromCategory);
	}
	console.log("========");

	products = products.map((product) => ({...product, dealer: 'CanadianPMX'}));

	return products;
}

module.exports = {
	scrapeProductsFromCategories
};