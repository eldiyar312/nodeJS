const {Router} = require('express')
const config = require('config')
const Image = require('../model/Image')

const router = Router()

/* Images */
router.get('/images', async (req, res) => {
  try {
    const image = await Image.find()

    res.status(201).json({image, message: 'картинка получено :)'})
  } catch (e) {
    res.status(500).json({message: 'error post'})
    console.log('Error!!!', e.message)
  }
})

module.exports = router