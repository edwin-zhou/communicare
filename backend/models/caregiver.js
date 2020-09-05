const mongoose = require('mongoose')

const caregiverSchema = mongoose.Schema({
    username: String,
    password: String,
    customers: Array,
})

module.exports = mongoose.model("Caregiver", caregiverSchema)