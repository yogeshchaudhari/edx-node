const express = require('express');
const app = express();

app.use((error, req, res, next) => {
	console.log(error.message);
	res.status(500).send(error.message);
	next();
});

app.use((req, res, next) => {
	console.log(req.method);
	console.log(req.url);
	next();
});

app.use((req, res, next) => {
	if(req.query.apikey) {
		next();
	} else {
		res.status(401).send('Not Authorized');
	}
});

app.get('/', (req, res) => {
	res.send('hello');
});

app.get('/account', (req, res) => {
	res.send('account');
});

app.get(
	'/transaction', 
	(req, res, next) => {
		console.log('Route middleware');
		next();
	},
	(req, res) => {
		res.send('transaction');
})
app.get(
	'/error', 
	(req, res, next) => {
		next(new Error('oops'));
	},
	(req, res) => {
		res.send('got error');
})

app.listen(3000);