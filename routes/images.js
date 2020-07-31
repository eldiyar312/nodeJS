const {Router} = require('express')
const Image = require('../model/Image')
const cors = require('cors')

const router = Router()

// Cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


/* Image */
router.get('/images', cors(corsOptions), async (req, res) => {
  try {
    Image.find()
      .then(images => res.status(200).json({images}))
  } catch (e) {
    res.status(400).json({message: 'error post'})
    res.end()
  }
})

module.exports = router