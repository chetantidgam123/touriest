const { QueryTypes } = require('sequelize')
const db = require('../model/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "touriest"
const User = db.users

const registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        const oldUser = await User.findOne({ where: { email } })
        if (oldUser) {
            return res.status(400).json({ message: "User already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 12)
        let json = {
            firstname,
            lastname,
            email,
            password,
            hashPassword
        }

        const user = await User.create(json)
        const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "1h" });
        res.status(200).json({ user, token })
        console.log(user);
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
        console.log(error);
    }
}

const getAllUser = async (req, res) => {
    // let users = await User.findAll({
    // })
    let query = "SELECT id,firstname,lastname,email FROM `users` ORDER BY id DESC "
    var Agents_row = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    res.status(200).send(Agents_row)
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.hashPassword)
            if (isPasswordCorrect) {
                const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "1h" });
                res.status(200).json({ user, token })
            } else {
                res.status(401).json({ message: "Wrong Password" })
            }
        } else {
            res.status(401).json({ message: "User not found" })
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
        console.log(error);
    }
}

module.exports = { getAllUser, registerUser, login }

