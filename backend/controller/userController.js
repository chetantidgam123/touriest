const { QueryTypes } = require('sequelize')
const dbConfig = require('../config/dbConfig')
const db = require('../model/index')

const User = db.users

const registerUser = async (req, res) => {
    let json = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }

    const user = await User.create(json)
    res.status(200).send(user)
    console.log(user);
}

const getAllUser = async (req, res) => {
    // let users = await User.findAll({
    // })
    let query = "SELECT id,firstname,lastname,email FROM `users` ORDER BY id DESC "
    var Agents_row = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    res.status(200).send(Agents_row)
}

module.exports = { getAllUser, registerUser }

