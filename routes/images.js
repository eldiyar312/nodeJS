const { Router } = require('express')
const Image = require('../model/Image')
const cors = require('cors')
const config = require('config')

const router = Router()


/* Open API */
router.get(
  '/images', 
  cors( config.get('corsOptions') ), 
  ( req, res ) => {
    try {

      Image.find()
        .then( images => res.status( 200 ).json({ images }) )

    } catch (e) {
      res.status(400).json({ message: e })
      res.end()
    }
})

module.exports = router