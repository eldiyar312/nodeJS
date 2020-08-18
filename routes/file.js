const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const Image = require('../model/Image')
const cors = require('cors')


const router = Router()

// CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


// File
router.post( '/file', cors(corsOptions), async (req, res, next) => {
  try {
    const form = formidable({ multiples: true })

    //get files
    form.parse( req, async ( err, fields, files ) => {
      const fileName = files.image.name.split('.')
      const fileType = fileName[fileName.lenght -1]

      if ( fileType !== 'jpg', 'jpeg', 'png', 'webp' ) {
        res.status( 400 ).json({ message: 'No image' })
        return
      }

      const dir = './img';

      !fs.existsSync(dir) &&
        fs.mkdirSync(dir)
        console.log('no folder')

      //path
      const rawData = fs.readFileSync(files.image.path)
      const FilePath = path.join('img') + `/${Date.now()}_${files.image.name}`
      console.log( 'files.image===', files.image )

      //Add file in folder
      fs.writeFile(FilePath, rawData, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      })

      // Create data image
      const image = new Image({
        title: fields.title, 
        description: fields.description,
        file: `https://rocky-refuge-77020.herokuapp.com/${FilePath}`
      })
      await image.save()

      console.log('Add MongoDB')
      res.status( 201 ).json({ message: 'Success handled' })
    })
  } catch (e) {
    res.status( 400 ).json({ message: `cath=== ${e.message}` })
  }
})

module.exports = router