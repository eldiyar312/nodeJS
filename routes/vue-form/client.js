const { Router } = require('express')
const cors = require('cors')
const config = require('config')
const VueForm = require('../../model/VueForm')

const router = Router()


router.post(
  '/form-data', 
  cors( config.get('corsOptions') ),
  async ( req, res ) => {
    try {
      const { firstName, lastName, number } = await req.body

      const newRecord = new VueForm(req.body)
      await newRecord.save()

      res.status( 200 ).json({ message: 'success' })
    }
    catch (e) {
      res.status( 400 ).json({ message: e })
      res.end()
    }
})

module.exports = router