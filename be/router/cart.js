const express = require('express');
const cartController = require('../controller/cart.controller');
const router  = express.Router();

router.get('/:userId',cartController.getAllCart);
router.post('/',cartController.pushToCart);



module.exports = router