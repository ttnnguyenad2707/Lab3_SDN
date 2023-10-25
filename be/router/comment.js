const express = require('express');
const CommentController = require('../controller/comment.controller');
const router  = express.Router();

router.post('/',CommentController.createComment);


module.exports = router