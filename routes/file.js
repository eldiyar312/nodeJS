const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const Image = require('../model/Image')

const router = Router()

// File
router.post('/file', async (req, res, next) => {
  try {
    const form = formidable({multiples: true})
    
    form.parse(req, (err, fields, files) => {
      if(err) {
        console.log('parse err===', err)
        next(err)
        return res.status(400).json({message: err})
      }

      const oldPath = files.image.path
      const newPath = path.join('img') + '/' + files.image.name
      const rawData = fs.readFileSync(oldPath)

      fs.writeFile(newPath, rawData, async err => {
        if(err) {
          console.log('WriteFile error===', err)
          return res.status(400).json({message: err})
        }
        const image = new Image({
          title: fields.title, 
          description: fields.description,
          file: `https://rocky-refuge-77020.herokuapp.com/${newPath}`
        })
        await image.save()
        return res.status(201).json({message: 'success writed, saved :)'})
      })
    })

    res.status(200).json({message: 'success hendled :)'})
  } catch (e) {
    res.status(400).json({message: `cath=== ${e.message}`})
  }
})

module.exports = router