import axios from 'axios';

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
		if(process.env.SCRAPEOPS_API_KEY) { //If we have access to a scrape ops proxy like we do in prod, try one last request.
			console.log('Trying request with proxy as a final attempt.');
			const proxyUrl = `https://proxy.scrapeops.io/v1/?api_key=${process.env.SCRAPEOPS_API_KEY}&url=${encodeURIComponent(url)}&keep_headers=true`;
			try {
				res = await axios.get(proxyUrl, { headers: headers, body: null, method: 'GET' });
				return res; //our last retry worked, don't error.
			} catch (error) {
				err = error;
			}
		}

		console.error("Max retries reached. Unable to fetch data.");
		throw err;
	}

	return res;
}

export { fetchDataWithExponentialBackoff };