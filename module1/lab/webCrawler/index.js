const http = require('http');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');

const url = process.argv[2] || 'http://www.google.com';

const errorHandler = (error) => {
	console.log('Got error. ', error);
}

const downloadPage = (url) => {
	let data = "";
	http.get(url, (response) => {
		response.on('data', (chunk) => {
			data += chunk;
		});

		response.on('end', () => {
			console.log(`Data fetched from ${url}`);
			saveToFile(data);
		});
		response.on('error', errorHandler);
	}).on('error', errorHandler);
}

const saveToFile = (data) => {
	const folderName = uuid();
	fs.mkdirSync(folderName);
	const filePath = path.join(__dirname, folderName, 'index.html');
	fs.writeFileSync(filePath, data);
	console.log(`Data is saved at ${filePath}`);
}

downloadPage(url);
