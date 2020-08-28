const { Router } = require('express')
const path = require('path')
const config = require('config')
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
    res.sendFile(fileName, options, err => {
      if (err) {
        next(err)
        res.status( 400 ).json({ message: err })
      }
    })

  })

module.exports = router