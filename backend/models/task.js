const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: String,
    description: String,
    caregiver: String,
    customer: String,
    frequency: Number,
	time: Date,
	duration: Number,
	nextAppointment: Date,
})

module.exports = mongoose.model("Task", taskSchema)