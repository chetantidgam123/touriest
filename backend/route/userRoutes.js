
const express = require('express')
const { registerUser, getAllUser, login } = require('../controller/userController')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.get('/', getAllUser)
module.exports = router