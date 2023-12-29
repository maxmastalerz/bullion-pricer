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
			entry.price = Math.round((entry.price / boxSize) * 100) / 100;

			// Update the second index based on the next below's first index
			if (i + 1 < pricing[method].length) { //If not last row, updated 2nd val of qtyRange
				entry.qtyRange[1] = pricing[method][i + 1].qtyRange[0] - 1;
			}
		}
	}
};

module.exports = { adjustPricingIfBox };