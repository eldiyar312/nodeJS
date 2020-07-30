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
    
    //get files etc.
    form.parse(req, async (err, fields, files) => {

      //path
      const rawData = fs.readFileSync(files.image.path)
      const FilePath = path.join('img') + '/' + files.image.name

      //Add file in folder
      fs.writeFile(FilePath, rawData, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      })

      //Create data image
      const image = new Image({
        title: fields.title, 
        description: fields.description,
        file: `https://rocky-refuge-77020.herokuapp.com/${FilePath}`
      })
      await image.save()

      console.log('Add MongoDB')
      res.status(201).json({message: 'Success handled'})
    })

    return
  } catch (e) {
    res.status(400).json({message: `cath=== ${e.message}`})
  }
})

module.exports = router