const EventEmitter = require('events');

class Job extends EventEmitter {
	constructor() {
		super();
		this.on('start', this.process);
	}
	process() {
		console.log('Job process started');
		setTimeout(() => {
			console.log('Job processed');
			this.emit('done');
		}, 5000 );
	}
}

module.exports = Job;