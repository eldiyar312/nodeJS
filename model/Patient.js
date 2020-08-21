const { Schema, model } = require('mongoose')


const patient = new Schema({
  patient: { type: String, required: true },
  _id_doctor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  complaints: { type: String }
})


module.exports = model('Patient', patient)