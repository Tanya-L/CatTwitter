const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const users = require('./routes/users')
const posts = require('./routes/posts')

const serverless = require('serverless-http')

const AWS = require("aws-sdk")
AWS.config.update({
    region: "eu-north-1"
})

// setup environment
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/posts', posts)

//Lambda
module.exports.handler = serverless(app)
