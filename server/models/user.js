const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    id: { type: String }
})
const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel }