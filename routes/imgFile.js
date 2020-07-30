const { Router } = require('express')
const router = Router()
const path = require('path')


router.get('/img/:name', (req, res, next) => {
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