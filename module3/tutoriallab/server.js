const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (error, client) => {
	if(error){
		console.log(error);
		exit();
	}
	const db = client.db('edx');
	app.get('/account', (req, res) => {
		db.collection('account')
		  .find({})
		  .toArray((error, accounts) => {
		  	if(error){
		  		res.status(401).send('Database problem');
		  	} else {
				res.send(accounts);
		  	}
		  });
	});
	app.post('/account', (req, res) => {
		db.collection('account')
		  .insert(req.body, (error, result) => {
		  	if(error){
		  		res.status(401).send('Database problem');
		  	} else {
		  		res.send(result);
		  	}
		  });
	});
	app.patch('/account/:id', (req, res) => {
		db.collection('account')
		  .update({ _id: ObjectId(req.params.id) }, { $set: req.body}, (error, result) => {
			if(error){
		  		res.status(401).send('Database problem');
		  	} else {
		  		res.send(result);
		  	}
		  })
	});
	app.delete('/account/:id', (req, res) => {
		db.collection('account')
		  .remove({ _id: ObjectId(req.params.id) }, (error, result) => {
			if(error){
		  		res.status(401).send('Database problem');
		  	} else {
		  		res.send(result);
		  	}
		  });
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
