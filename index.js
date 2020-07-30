const express = require('express');
const config = require('config')
const mongo = require('mongoose')
const register = require('./routes/register')
const login = require('./routes/login')
const file = require('./routes/file')
const images = require('./routes/images')
const imgFile = require('./routes/imgFile')

const app = express()
const PORT = process.env.PORT || config.get('PORT')
const SERVER_HOST = process.env.YOUR_HOST || '0.0.0.0'

//params
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))

//routes
app.use(file)
app.use(images)
app.use(register)
app.use(login)
app.use(imgFile)

// Server
const start = async () => {
  try {
    await mongo.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, SERVER_HOST, () => {
      console.log('Server start in ', PORT)
    })
  } catch (e) {
    console.log('Error!!!! ', e.message);
    process.exit(1);
  }
}

start();