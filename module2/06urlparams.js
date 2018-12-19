const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

const profiles = [];

app.get('/profiles', (request, response) => {
	response.send(profiles);
});

app.get('/profile/:id', (request, response) => {
	const id = request.params.id;
	response.send(profiles[id]);
});

app.post('/profile', (request, response) => {
	profiles.push(request.body);
	response.status(201).send('posted');
});

app.patch('/profile/:id', (request, response) => {
	const id = request.params.id
	Object.assign(profiles[id], request.body);
	response.status(200).send('patched');
});

app.delete('/profile/:id', (request, response) => {
	const id = request.params.id;
	profiles.splice(id, 1);
	response.status(200).send('deleted');
});

app.listen(3000);