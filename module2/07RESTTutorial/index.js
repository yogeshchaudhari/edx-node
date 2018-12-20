const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const { check, validationResult } = require('express-validator/check');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errorHandler());

const store = {};

store.accounts = [];

app.get('/accounts', (request, response) => {
	response.send(store.accounts);
});

app.get(
	'/account/:id',
	[
		check('id').exists().custom(value => Number.isInteger(parseInt(value)))
	],
	(request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(400).send("Bad request");
		}
		const id = request.params.id;
		response.send(store.accounts[id]);
});

app.post(
	'/account',
	(request, response) => {
		store.accounts.push(request.body);
		response.send('account added');
	}
);

app.patch(
	'/account/:id',
	[
		check('id').exists().custom(value => Number.isInteger(parseInt(value)))
	],
	(request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(400).send("Bad request");
		}
		const id = request.params.id;
		Object.assign(store.accounts[id], request.body);
		response.send('account updated');
	}
);

app.delete(
	'/account/:id',
	[
		check('id').exists().custom(value => Number.isInteger(parseInt(value)))
	],
	(request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(400).send("Bad request");
		}
		const id = request.params.id;
		store.accounts.splice(id, 1);
		response.send('account deleted');
	}
);

app.listen(3000);
