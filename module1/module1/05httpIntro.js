const https = require('https');

const url = 'https://pokeapi.co/api/v2/type/3/';

const errorHandler = (error) => {
	console.log('got error', error);
}
https.get(url, (response) => {
	let data = '';
	response.on('data', (chunk) => {
		data += chunk;
	});
	response.on('end', () => {
		const json = JSON.parse(data);
		console.log(`Type queried : ${json.name}`);
	});
	response.on('error', errorHandler);

}).on('error', errorHandler);
