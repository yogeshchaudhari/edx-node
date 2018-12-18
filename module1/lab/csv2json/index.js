const fs = require('fs');
const path = require('path');
const csvtojson = require("csvtojson");

const inputFileName = process.argv[2] || 'customer-data.csv';
const outputFileName = inputFileName.split('.')[0] + '.json';

const inputFilePath =  path.join(__dirname, inputFileName);

if(!fs.existsSync(inputFilePath)) {
	console.log(`File "${inputFileName}" does not exist`);
} else {
	csvtojson()
		.fromFile(inputFilePath)
		.then((json) => {
			console.log("CSV data converted to JSON.", json);
			const jsonString = JSON.stringify(json);
			fs.writeFileSync(path.join(__dirname, outputFileName), jsonString);
			console.log(`Data saved to the file ${outputFileName}`);
		});
}
