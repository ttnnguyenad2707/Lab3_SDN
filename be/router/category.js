const category = require('../controller/category');

const router = require('express').Router();

router.get('/',category.getAllCategory);

module.exports = router