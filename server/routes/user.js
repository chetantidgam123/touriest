const express = require('express');
const { signup, signin, googleSign } = require('../controller/user');
const app = express();
const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/googleSignIn', googleSign);
module.exports = userRouter