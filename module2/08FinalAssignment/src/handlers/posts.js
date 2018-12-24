const store = require('../store');
const { check, validationResult } = require('express-validator/check');
const postsHandler = {
	requestValidator() {
		return([
			check('id')
				.exists()
				.custom(value => store.posts[value])
		]);
	},
	getAllPosts(request, response) {
		response.send(store.posts);
	},
	getPost(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()){
			response.status(400).send('Invalid parameters');
			return;
		}
		const id = request.params.id;
		response.send(store.posts[id]);
	},
	addPost(request, response) {
		const post = {
			name: request.body.name,
			url: request.body.url,
			text: request.body.text,
		};
		store.posts.push(post);
		response.send('Post added');
	},
	updatePost(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()){
			response.status(400).send('Invalid parameters');
			return;
		}
		const post = {};
		if(request.body.name)
			post.name = request.body.name;
		if(request.body.text)
			post.text = request.body.text;
		if(request.body.url)
			post.url = request.body.url;

		const id = request.params.id;
		Object.assign(store.posts[id], post);
		response.send('Post updated');
	},
	deletePost(request, response) {
		const errors = validationResult(request);
		if(!errors.isEmpty()){
			response.status(400).send('Invalid parameters');
			return;
		}
		const id = request.params.id;
		store.posts.splice(id, 1);
		response.send('Post deleted');
	},
}

module.exports = postsHandler;