const express = require('express')

const User = require("../models/user")

const router = express.Router()

router.post('/delete', (req, result, next) => {
      
})

router.post('/schedule', (req, result, next) => {
    User.find({username: req.body.username}, (err, res) => {
        if (res[0]) {
          console.log(res+ 'boom')
          result.status(200).json(res[0].schedule)
        } else {
          result.status(500).json({
            message: err
          })
        }
    })
})

router.post('/login', (req, result, next) => {
    User.find({$and: [{username: req.body.username}, {password: req.body.password}]}, (err, res) => {
      if (res[0]) {
        result.status(200).json({
          username: req.body.username
        })
      }
      else {
        result.status(500).json({
          message: err
        })
      }
    })
})

router.post('', (req, result, next) => {
    User.find({username: req.body.username},
        (err, res) => {
        if (err) {
            result.status(500).json({
                message: err
            })
        } else if (res.length === 1) {
          result.status(409).json({
                message: 'username taken'
            })
        } else if (res.length === 0) {
            console.log("Success!")
            const newUser = new User({username : req.body.username, 
                                    password: req.body.password, 
                                    qualifications: req.body.qualifications})
          newUser.save()
          result.status(200).json({
            user: newUser,
          })
        }
    })
})

module.exports = router