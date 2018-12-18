const http = require('http');

const port = process.argv[2] || 3000;

http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('Hello world\n');
}).listen(port);

console.log(`Server running on port ${port}`);