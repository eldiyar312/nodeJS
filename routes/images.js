const {Router} = require('express')
const Image = require('../model/Image')

const router = Router()

/* Image */
router.get('/images', async (req, res) => {
  try {
    Image.find()
      .then(images => res.status(201).json({images}))
  } catch (e) {
    res.status(400).json({message: 'error post'})
    res.end()
  }
})

module.exports = router