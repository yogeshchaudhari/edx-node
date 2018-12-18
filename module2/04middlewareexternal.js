const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/test', (req, res) => {
	console.log(req.body);
	res.send('success');
})

app.use((error, req, res, next) => {
	console.log(error);
	next();
})

app.listen(3000);