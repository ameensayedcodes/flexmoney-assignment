const express = require('express')
const router = express.Router()
const { enroll, paid, removeEnrollment } = require("../controller/enrollController");

router.post('/', enroll);
router.post('/paid', paid);
router.post('/removeEnrollment', removeEnrollment);

module.exports = router