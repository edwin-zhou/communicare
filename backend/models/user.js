const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    caregivers: Array,
    schedule: Array,
})

module.exports = mongoose.model("User", userSchema)