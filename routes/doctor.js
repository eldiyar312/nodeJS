const { Router } = require('express')
const cors = require('cors')
const config = require('config')
const Doctor = require('../model/Doctor')

const router = Router()


router.get(
  '/doctor', 
  cors( config.get('corsOptions') ),
  async ( req, res ) => {
    try {

      Doctor.find()
        .then( doctors => {
          res.json({ doctors })
        })

    }
    catch ( e ) {
      res.status( 400 ).json({ message: e })
      res.end()
    }
})

module.exports = router