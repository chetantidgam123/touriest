const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const secret = "chetanTest"
const { UserModel } = require('../models/user')

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    try {
        const oldUser = await UserModel.findOne({ email })
        if (oldUser) {
            return res.status(400).send({ code: 400, message: "User Already Exists" })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName} `
        })
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' })
        res.status(200).send({
            code: 200,
            result, token
        })
    } catch (error) {
        res.status(500).send({ code: 500, message: "Something Went Wrong" })
        console.log(error);
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email })
        if (oldUser) {
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
            if (!isPasswordCorrect) return res.status(404).send({ code: 404, message: "Password is Incorrect" })
            const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '1h' })
            res.status(200).send({
                code: 200, result: oldUser
                , token
            })
        } else {
            return res.status(404).send({
                code: 404,
                message: "User Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({ code: 500, message: "Something Went Wrong" })
        console.log(error);
    }
}
module.exports = { signup, signin }