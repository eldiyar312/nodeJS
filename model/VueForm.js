const {Schema, model, Types} = require('mongoose')

const client = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String},
  number: {type: Number, required: true}
})

module.exports = model('VueForm', client)