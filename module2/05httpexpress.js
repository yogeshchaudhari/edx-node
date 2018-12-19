const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let user = {};

app.use(bodyParser.json());

app.get('/user', (request, response) => {
	console.log(user);
	response.json(user);
});

app.post('/user', (request, response) => {
	user = request.body;
	response.status(201).send('success');
});

app.delete('/user', (request, response) => {
	user = {};
	response.status(201).send('success');
});

app.patch('/user', (request, response) => {
	Object.assign(user, request.body);
	response.status(201).send('success');
});

app.listen(3000);
