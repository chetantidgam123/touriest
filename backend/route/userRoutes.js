
const express = require('express')
const { registerUser, getAllUser } = require('../controller/userController')
const router = express.Router()

router.post('/register', registerUser)
router.get('/', getAllUser)
module.exports = router