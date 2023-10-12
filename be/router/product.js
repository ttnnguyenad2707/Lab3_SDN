const router = require('express').Router();
const product = require('../controller/product')

router.get('/',product.getAllProduct);
router.post('/',product.createNewProduct);
router.post('/filterByBrand',product.filterProductByBrand)


module.exports = router