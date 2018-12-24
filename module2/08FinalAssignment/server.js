const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorHandler());

app.use('/', routes);

app.listen(3000, () => {
	console.log('Server started on port 3000');
});