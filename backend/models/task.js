const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    description: String,
    caregiver: String,
    customer: String,
    rrule: {}
})

module.exports = mongoose.model("Task", taskSchema)