const express = require('express');
const { signup } = require('../controller/user');
const app = express();
const userRouter = express.Router();

userRouter.post('/signup', signup);
module.exports = userRouter