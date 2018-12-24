const express = require('express');
const router = express.Router();

const commentsHandler = require('../handlers/comments');

router.get('/:postId/comments', commentsHandler.requestValidator(), commentsHandler.getAllComments);
router.get('/:postId/comments/:id', commentsHandler.requestValidator(true), commentsHandler.getComment);
router.post('/:postId/comments', commentsHandler.requestValidator(), commentsHandler.addComment);
router.patch('/:postId/comments/:id', commentsHandler.requestValidator(true), commentsHandler.updateComment);
router.delete('/:postId/comments/:id', commentsHandler.requestValidator(true), commentsHandler.deleteComment);

module.exports = router;