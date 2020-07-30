const express = require('express');
const config = require('config')
const mongo = require('mongoose')
const register = require('./routes/register')
const login = require('./routes/login')
const file = require('./routes/file')
const images = require('./routes/images')

const app = express()
const PORT = config.get('PORT')

//params
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
//routes
app.use(register)
app.use(login)
app.use(file)
app.use(images)

const start = async () => {
  try {
    await mongo.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, () => {
      console.log('Server start ', PORT)
    })
  } catch (e) {
    console.log('Error!!!! ', e.message);
    process.exit(1);
  }
}

start();