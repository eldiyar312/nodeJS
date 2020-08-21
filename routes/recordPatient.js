const { Router } = require('express')
const formidable = require('formidable')
const cors = require('cors')
const config = require('config')
const Patient = require('../model/Patient')

const router = Router()
const corsOptions = config.get('corsOptions')


router.post(
  '/record', 
  cors( corsOptions ),
  ( req, res ) => {
    try {

      const form = formidable({ multiples: true })
      form.parse( 
        req, 
        async ( err, fields ) => {

          const patient = await Patient.find({
            date: fields.date, time: fields.time
          })
        
          if( patient.length == 0){
            const newPatient = new Patient( fields )
            await newPatient.save()

            res.status( 201 ).json({ message: 'Вы успешно записаны :)' })
            return
          }

          res.status( 400 ).json({ message: 'Запись в это время занята' })
      })
    }
    catch (e) {
      res.status( 400 ).json({ message: 'errr',e })
      res.end()
    }
})

module.exports = router