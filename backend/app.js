const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// routes import here
const taskRoute = require('./routes/task')
const userRoute = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    )
    res.setHeader("Access-Control-Allow-Methods", "POST, DELETE, GET, PUT")
    next()
})

app.use("/api/task", taskRoute)
app.use("/api/user", userRoute)

// serve angular
app.use('/', express.static(path.resolve(__dirname, '..', 'frontend', 'dist', 'frontend')))

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'frontend', 'index.html'))
})

// set database URL:
const dbURL = "mongodb+srv://username:username@cluster0.cjgm2.mongodb.net/<communicare>?retryWrites=true&w=majority"


// connect mongoose to Mongodb
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log('mongoose connected')
  }
})


module.exports = app