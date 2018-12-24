const express = require('express');
const router = express.Router();

const commentsRouter = require('./comments');
const postsHandler = require('../handlers/posts');

router.get('/', postsHandler.getAllPosts);
router.get('/:id', postsHandler.requestValidator(), postsHandler.getPost);
router.post('/', postsHandler.addPost);
router.patch('/:id', postsHandler.requestValidator(), postsHandler.updatePost);
router.delete('/:id', postsHandler.requestValidator(), postsHandler.deletePost);
router.use('/', commentsRouter);

module.exports = router;