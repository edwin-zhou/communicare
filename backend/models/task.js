const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: String,
    description: String,
    frequency: Number,
	time: Date,
	duration: Number,
	nextAppointment: Date,
})

module.exports = mongoose.model("Task", taskSchema)