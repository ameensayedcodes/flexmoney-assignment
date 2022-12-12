const express = require('express')
const router = express.Router()
const { loginCheck } = require('../controller/loginController');

router.post('/', loginCheck);

module.exports = router