const { Schema, model } = require('mongoose')

const Doctor = new Schema({
  fullName: { type: String, required: true, unique: true },
})

module.exports = model('Doctor', Doctor)