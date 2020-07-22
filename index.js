const express = require('express');
const config = require('config')
const mongo = require('mongoose')
const router = require('./routes/auth')

const app = express()
const PORT = config.get('PORT')

app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use('/api', router)

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