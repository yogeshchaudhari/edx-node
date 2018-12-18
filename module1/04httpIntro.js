const http = require('http');

const url = 'http://nodeprogram.com';

http.get(url, (response) => {
	let data = '';
	response.on('data', (chunk) => {
		data += chunk;
		console.log('got data');
	});
	response.on('end', () => {
		console.log('Complete data is : ');
		setTimeout(() => {
			console.log(data);
		}, 5000);
	})
}).on('error', (error) => {
	console.log('Got error ', error);
});
