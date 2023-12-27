const scrapers = require('./scraper-map');

module.exports = async function() {
	console.log("== Getting updated list of products ==");
	
	let mostRecentProductState = [];
	for(scraperName in scrapers) {
		const scraper = scrapers[scraperName];
		const mostRecentProductsFromDealer = await scraper.scrapeProductsFromCategories(); //Basic 1st pass. Doesn't directly visit the product.
		mostRecentProductState = mostRecentProductState.concat(mostRecentProductsFromDealer);
	}

	return mostRecentProductState;

};
