const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    start: String,
    end: String,
    title: String,
    description: String,
    frequency: Number,
    caregiver: {type: String, default: ""},
    customer: String,
    qualifications: Array,
})

module.exports = mongoose.model("Task", taskSchema)