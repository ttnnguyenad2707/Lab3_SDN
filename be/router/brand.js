const brand = require('../controller/brand');

const router = require('express').Router();

router.get('/',brand.getAllBrand);

module.exports = router