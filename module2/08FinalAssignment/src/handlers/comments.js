const { check, validationResult } = require('express-validator/check');
const store = require('../store');

const commentsHandler = {
	requestValidator(checkId = false) {
		const validators = [];
		validators.push(
			check('postId')
				.exists()
				.custom(value => store.posts[value])
		);
		if(checkId) {
			validators.push(
				check('id')
				.custom((value, { req }) => {
					if(store.posts[req.params.postId])
						return store.posts[req.params.postId].comments[value]
					return false;
				})
			)
		}
		return(validators);
	},
	getAllComments(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()) {
			response.status(400).send('Invalid parameters');
			return;
		}
		const { postId } = request.params;
		response.send(store.posts[postId].comments);
	},
	getComment(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()) {
			response.status(400).send('Invalid parameters');
			return;
		}
		console.log(request.params);
		const { postId, id } = request.params;
		response.send(store.posts[postId].comments[id]);
	},
	addComment(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()) {
			response.status(400).send('Invalid parameters');
			return;
		}
		const { postId } = request.params;
		console.log(store.posts[postId]);
		if(!store.posts[postId].comments) {
			store.posts[postId].comments = [];
		}
		const comment = { text: request.body.text };
		store.posts[postId].comments.push(comment);
		response.send('Comment added');
	},
	updateComment(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()) {
			response.status(400).send('Invalid parameters');
			return;
		}
		const { postId, id } = request.params;
		console.log(request.params);
		const comment = { text: request.body.text };
		Object.assign(store.posts[postId].comments[id], comment);
		response.send('Comment updated');
	},
	deleteComment(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()) {
			response.status(400).send('Invalid parameters');
			return;
		}
		const { postId, id } = request.params;
		store.posts[postId].comments.splice(id, 1);
		response.send('Comment deleted');
	},
}

module.exports = commentsHandler;