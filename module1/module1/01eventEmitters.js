const EventEmitter = require('events');

class Job extends EventEmitter{

}

let job = new Job();

job.on('newEvent', (eventName) => {
	console.log(`The name of the event is ${eventName}`);
});

job.emit('newEvent', 'Name:newEvent');

job.removeAllListeners();