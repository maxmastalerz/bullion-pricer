const axios = require('axios');

async function fetchDataWithExponentialBackoff(url, headers, maxRetries = 6) {
	let retries = 0;
	let res;

	let err = null;
	while (retries < maxRetries) {
		try {
			res = await axios.get(url, { headers: headers, body: null, method: "GET" });
			break; // Break the loop if the request is successful
		} catch (error) {
			err = error;
			// Retry the request with exponential backoff
			const delay = Math.pow(2, retries) * 1000; // Exponential backoff formula
			console.log(`Retrying after ${delay / 1000} seconds...`);
			await new Promise(resolve => setTimeout(resolve, delay));
			retries++;
		}
	}

	if (retries === maxRetries) {
		console.error("Max retries reached. Unable to fetch data.");
		throw err;
	}

	return res;
}


export { fetchDataWithExponentialBackoff };