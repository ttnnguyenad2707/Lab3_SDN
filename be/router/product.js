const express = require('express');
const Product = require('../controller/product.controller');
const CommentController = require('../controller/comment.controller');
const router  = express.Router();

router.post('/',Product.createProduct);
router.get('/',Product.getAllProduct);
router.get('/:id/comments',CommentController.createComment);


module.exports = router