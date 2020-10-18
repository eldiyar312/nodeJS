const express = require('express');
const config = require('config')
const mongo = require('mongoose')
const cors = require('cors')

const register = require('./routes/register')
const login = require('./routes/login')
const file = require('./routes/file')
const images = require('./routes/images')
const imgFile = require('./routes/imgFile')
const recordPatient = require('./routes/recordPatient')
const getPatient = require('./routes/getPatient')
const doctor = require('./routes/doctor')
const deletePatient = require('./routes/deletePatient')
const client = require('./routes/vue-form/client')
const getData = require('./routes/vue-form/get-data')


// config
const app = express()
const PORT = process.env.PORT || 5000
const SERVER_HOST = process.env.YOUR_HOST || '0.0.0.0'
const mongoUri = config.get('mongoUri')
// params
app.use( express.urlencoded({ extended: true }) )
app.use( express.json({ extended: true }) )

app.use(cors())
// routes
app.use( file )
app.use( images )
app.use( register )
app.use( login )
app.use( imgFile )
app.use( recordPatient )
app.use( getPatient )
app.use( doctor )
app.use( deletePatient )
app.use( client )
app.use( getData )


// Server
const start = async () => {
  try {
    await mongo.connect( mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, SERVER_HOST, () => {
      console.log('Server start in ', PORT)
    })
  } catch (e) {
    console.log('Error!!!! ', e.message)
    process.exit(1)
  }
}

start();