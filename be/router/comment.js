const express = require('express');
const CommentController = require('../controller/comment.controller');
const router  = express.Router();

router.post('/',CommentController.createComment);
router.get('/:productId',CommentController.getCommentByProduct);


module.exports = router