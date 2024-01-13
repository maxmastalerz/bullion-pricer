db.spot.insertMany([
	{
		symbol: 'AG',
		price: {
			"CAD": 0,
			"USD": 0
		},
		updatedAt: null
	},
	{
		symbol: 'AU',
		price: {
			"CAD": 0,
			"USD": 0
		},
		updatedAt: null
	},
	{
		symbol: 'PD',
		price: {
			"CAD": 0,
			"USD": 0
		},
		updatedAt: null
	},
	{
		symbol: 'PT',
		price: {
			"CAD": 0,
			"USD": 0
		},
		updatedAt: null
	}
]);

db.createCollection("subscriptions");
db.createCollection("products");
db.createCollection('clusterWorkers');
db.clusterWorkers.createIndex({ hostname: 1 }, { unique: true });