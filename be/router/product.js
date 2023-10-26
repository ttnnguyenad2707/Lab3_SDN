const express = require('express');
const Product = require('../controller/product.controller');
const CommentController = require('../controller/comment.controller');
const router  = express.Router();

router.post('/',Product.createProduct);
router.get('/',Product.getAllProduct);
router.post('/:id/comments',CommentController.createComment);
router.get('/:id',Product.getProductById)


module.exports = router