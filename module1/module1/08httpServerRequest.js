const http = require('http');

const port = process.argv[2] || 3000;

http.createServer((request, response) => {
	if(request.method === 'POST'){
		let payload = '';
		request.on('data', (chunk) => {
			payload += chunk;
		});
		request.on('end', () => {
			console.log(`Body received : ${payload}`);
			response.end('Accepted posted body');
		});
	} else {
		response.end('Accepted get request');
	}
}).listen(port);

console.log("Server running");