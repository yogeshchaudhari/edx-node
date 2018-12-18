const http = require('http');

const postData = JSON.stringify({foo:"bar", bar: "baz"});

const options = {
	hostname: 'mockbin.com',
	port: 80,
	path: '/request?foo=bar&foo=baz',
	method: 'POST',
	headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': Buffer.byteLength(postData)
  	}
};
const errorHandler = (error) => {
	console.log('got error : ', error);
}
const request = http.request(options, (response) => {
	let data = '';
	response.on('data', (chunk) => {
		data += chunk;
	});

	response.on('end', () => {
		try {
			const json = JSON.parse(data);
			console.log(json);
		} catch(error) {
			errorHandler(error);
		}
	});
	response.on('error', errorHandler);
}).on('error', errorHandler);

request.write(postData);
request.end();