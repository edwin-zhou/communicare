const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    qualifications: {type: Array, default: []},
    schedule: {type: Array, default: []},
})

module.exports = mongoose.model("User", userSchema)