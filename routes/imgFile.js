const { Router } = require('express')
const path = require('path')
const cors = require('cors')


const router = Router()

// Cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/img/:name', cors(corsOptions), (req, res) => {
  const options = {
    root: path.join('img')
  }

  let fileName = req.params.name
  res.sendFile(fileName, options)
})

module.exports = router