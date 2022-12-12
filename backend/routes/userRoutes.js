const express = require('express')
const router = express.Router()
const { getUser } = require("../controller/userController")

router.get('/getUser/:username', getUser)

module.exports = router