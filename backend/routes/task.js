const express = require('express')

const Task = require("../models/Task")
const User = require("../models/User")

const router = express.Router()

router.post('/help', (req, result, next) => {
    Task.find({$and: [{caregiver: {$eq: ""}}, {customer: {$ne: req.body.username}}]}, (err, res) => {
        if (err) {
          console.log('xd')
            result.status(500).json({
                message: err
            })
        } else {
            result.status(200).json(res)
        }
    })
})

router.post('', (req, result, next) => {
    console.log('xd')
    const newTask = new Task({start: req.body.start, 
                              end: req.body.end, 
                              title: req.body.title,
                              description: req.body.description,
                              frequency: req.body.frequency,
                              customer: req.body.customer,
                              qualifications: req.body.qualifications})
    newTask.save()
    result.status(200).json({
        message: "Success!"
    })
    console.log(newTask)
})

router.post('/accept', (req, result, next) => {
    Task.findOneAndUpdate({title: req.body.title}, {caregiver: req.body.username},
      (err, task) => {
            task.caregiver = req.body.username
            User.findOneAndUpdate({username: req.body.username}, {$push: {schedule: task}},
        (err, res) => {
            task.caregiver = req.body.username
        if (err) {
            result.status(500).json({
                message: err
            })
        } else {
          User.findOneAndUpdate({username: task.customer}, {$push: {schedule: task}},
            (err, res) => {
              if (err) {
                  result.status(500).json({
                      message: err
                  })
              } else {
                result.status(200).json({
                  message: "Success!"
                })
              }
          })
        }
    })
  })
})

module.exports = router