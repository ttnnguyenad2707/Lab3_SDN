const router = require('express').Router();
const brand = require('../controller/brand')

router.get('/',brand.getAllBrand);


module.exports = router