const { Router } = require('express')
const formidable = require('formidable')
const cors = require('cors')
const config = require('config')

const Patient = require('../model/Patient')

const corsOptions = config.get('corsOptions')
const router = Router()


router.post(
  '/delete/patient', 
  cors( corsOptions ),
  ( req, res ) => {
  try {
    const form = formidable({ multiples: true })

    form.parse( req, async ( err, fields, files ) => {

      await Patient.deleteOne( fields )

      res.status( 200 ).json({ message: 'Удалено' })
    })
  }
  catch ( e ) {
    res.status( 400 ).json({ message: e })
    res.end()
  }
})

module.exports = router