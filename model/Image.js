const {Schema, model} = require('mongoose')

const image = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  file: {type: String, required: true}
})

module.exports = model('Image', image)