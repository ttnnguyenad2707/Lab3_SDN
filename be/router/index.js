const express = require('express')
const router  = express.Router();


router.use('/brand',require('./brand'));

module.exports = router