const Job = require('./0301modularEvents');

const job = new Job();

job.on('done', () => {
	console.log('Job was done');
})

job.emit('start');