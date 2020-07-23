const express = require('express');
const config = require('config')
const mongo = require('mongoose')
const register = require('./routes/register')
const login = require('./routes/login')

const app = express()
const PORT = config.get('PORT')

app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use(register)
app.use(login)

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