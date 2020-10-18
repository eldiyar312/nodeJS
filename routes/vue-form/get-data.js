const { Router } = require('express')
const cors = require('cors')
const config = require('config')
const VueForm = require('../../model/VueForm')

const router = Router()


router.get(
  '/get-record', 
  cors( config.get('corsOptions') ),
  ( req, res ) => {
    try {

      VueForm.find()
        .then( data => 
          res.status( 200 ).json({ data })
        )
    }
    catch (e) {
      res.status( 400 ).json({ message: e })
      res.end()
    }
})

module.exports = router