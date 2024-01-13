const adjustPricingIfBox = (pricing, boxSize) => {
	if (!boxSize) {
		return;
	}

	for (const method in pricing) {
		// Iterate over each pricing entry for the current payment method
		for (let i = pricing[method].length - 1; i >= 0; i--) {
			const entry = pricing[method][i];

			// Multiply the first index of qtyRange by the box size
			entry.qtyRange[0] = entry.qtyRange[0]*boxSize;
			// Update the second index based on the next below's first index
			if (i + 1 < pricing[method].length) { //If not last row, updated 2nd val of qtyRange
				entry.qtyRange[1] = pricing[method][i + 1].qtyRange[0] - 1;
			}

			for(currency in entry.price) {
				entry.price[currency] = Math.round((entry.price[currency] / boxSize) * 100) / 100;
			}
		}
	}
};

module.exports = { adjustPricingIfBox };