const axios = require('axios').default;

module.exports = async (scrapeUrl) => {
	console.log("Scraping: "+scrapeUrl);

	// returning results from scrape. For now and into the foreseeable future, we only scrape price data.
	// dummy data. Important, when you're actually scraping data, remember to sanitize it. It could be unsafe.
	return {
		pricing: {
			cash: [
				{
					QtyRange: [1,4],
					price: 100
				},
				{
					QtyRange: [5,9],
					price: 200
				},
				{
					QtyRange: [10,19],
					price: 300
				},
				{
					QtyRange: [20,49],
					price: 400
				},
				{
					QtyRange: [50,null],
					price: 500
				}
			],
			check: [
				{
					QtyRange: [1,4],
					price: 100
				},
				{
					QtyRange: [5,9],
					price: 200
				},
				{
					QtyRange: [10,19],
					price: 300
				},
				{
					QtyRange: [20,49],
					price: 400
				},
				{
					QtyRange: [50,null],
					price: 500
				}
			],
			wire: [
				{
					QtyRange: [1,4],
					price: 100
				},
				{
					QtyRange: [5,9],
					price: 200
				},
				{
					QtyRange: [10,19],
					price: 300
				},
				{
					QtyRange: [20,49],
					price: 400
				},
				{
					QtyRange: [50,null],
					price: 500
				}
			],
			crypto: null,
			creditcard: [
				{
					QtyRange: [1,4],
					price: 110
				},
				{
					QtyRange: [5,9],
					price: 210
				},
				{
					QtyRange: [10,19],
					price: 310
				},
				{
					QtyRange: [20,49],
					price: 410
				},
				{
					QtyRange: [50,null],
					price: 510
				}
			],
			paypal: [
				{
					QtyRange: [1,4],
					price: 110
				},
				{
					QtyRange: [5,9],
					price: 210
				},
				{
					QtyRange: [10,19],
					price: 310
				},
				{
					QtyRange: [20,49],
					price: 410
				},
				{
					QtyRange: [50,null],
					price: 510
				}
			]
		}
	};

};