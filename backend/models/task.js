const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    description: String,
    caregiver: String,
    customer: String,
    qualifications: Array,
})

module.exports = mongoose.model("Task", taskSchema)