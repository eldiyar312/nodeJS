const { Router } = require('express')
const path = require('path')
const config = require('config')
const Image = require('../model/Image')
const cors = require('cors')


const router = Router()

router.get(
  '/img/:name',
  cors(config.get('corsOptions')),
  (req, res, next) => {

    const options = {
      root: path.join('img'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }

    const fileName = req.params.name
    res.sendFile(fileName, options, async err => {
      if (err) {
        await Image.deleteOne({ file: fileName })
        res.status( 404 ).json({ message: 'not found' })
      }
    })

  })

module.exports = router