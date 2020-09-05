const express = require('express')

const User = require("../models/User")

const router = express.Router()

router.get('', (req, res, next) => {
    User.find({username: req.query.username}, (err, result) => {
      if (err) {
        res.status(500).json({
          message: err
        })
      } else {
        res.status(200).json({
          user: result
        })
      }
    })
})

router.post('', (req, ress, next) => {
    User.find({username: req.body.username},
        (err, res) => {
        if (err) {
            res.status(500).json({
                message: err
            })
        } else if (res.length === 1) {
            res.status(500).json({
                message: 'username taken'
            })
        } else if (res.length === 0) {
            const newUser = new User({username : req.body.username, 
                                    password: req.body.password, 
                                    qualifications: req.body.qualifications})
            newUser.save()
        }
    })
})

module.exports = router