const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const secret = "chetanTest"
const { UserModel } = require('../models/user')

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    try {
        const oldUser = await UserModel.findOne({ email })
        if (oldUser) {
            return res.status(400).send({ message: "User Already Exists" })
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName} `
        })
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' })
        res.status(200).send({
            result, token
        })
    } catch (error) {
        res.status(500).send({ message: "Something Went Wrong" })
        console.log(error);
    }
}
module.exports = { signup }