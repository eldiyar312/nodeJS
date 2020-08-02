const { Router } = require('express')
const path = require('path')
const cors = require('cors')


const router = Router()

// Cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/img/:name', cors(corsOptions), (req, res, next) => {
  var options = {
    root: path.join('img'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

module.exports = router