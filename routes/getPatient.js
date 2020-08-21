const { Router } = require('express')
const formidable = require('formidable')
const cors = require('cors')
const config = require('config')
const Patient = require('../model/Patient')

const router = Router()


router.post(
  '/patient', 
  cors( config.get('corsOptions') ),
  ( req, res ) => {
    try {

      const form = formidable({ multiples: true })

      form.parse( req, async ( err, fields, files ) => {

        const patients = await Patient.find( fields )

        // Check copy patients
        if( patients.length == 0 ){
          res.status( 404 ).json({ message: 'Не найденно' })
          return
        }

        res.status( 200 ).json({ patients, message: 'Запись в это время занят. Пожалюста, выбреите другое время' })
      })
    }
    catch (e) {
      res.status( 400 ).json({ message: e })
      res.end()
    }
})

module.exports = router