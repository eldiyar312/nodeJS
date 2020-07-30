const {Router} = require('express')
const Images = require('../model/Image')

const router = Router()

/* Images */
router.get('/images', async (req, res) => {
  try {
    Images.find()
      .then(images => res.status(201).json({images}))
  } catch (e) {
    res.status(500).json({message: 'error post'})
    res.end()
  }
})

module.exports = router