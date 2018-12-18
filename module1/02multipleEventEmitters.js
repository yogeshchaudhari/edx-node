const EventEmitter = require('events');

class Job extends EventEmitter {

}

let job = new Job();

job.once('init', () => {
	console.log('Initialized. Will not initialize again.');
});

job.on('newEvent', () => {
	console.log("this is listener 1");
});

job.on('newEvent', () => {
	console.log("this is listener 2");
});

job.emit('init');
job.emit('init');

job.emit('newEvent');

job.removeAllListeners();