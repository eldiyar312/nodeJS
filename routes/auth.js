const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../model/User')

const router = Router()


/* Registration */
router.post(
  '/register',
  [
    check('email', 'Email don\'t correct').isEmail(),
    check('password', 'password min length: 5').isLength({min: 5, max: 200})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({message: `validation error: ${errors}`})
    }
    const {email, password} = await req.body
    console.log('BODY: ', req.body)

    /* Search copy user */
    const client = await User.findOne({ email })
    if(client){
      return res.status(400).json({message: `User ${client} exists :(`})
    }

    /* hashing password */ 
    const hashPass = await bcrypt.hash(password, 2003)
    const user = new User({email, password: hashPass})

    await user.save() 
    res.status(201).json({message: 'User created successfull :)'})
  } catch (e) {
    console.log('Error!!!', e.message)
    res.status(500).json({message: 'error post'})
  }
})


/* Login */
router.post(
  '/login',
  [
    check('email', 'Email don\'t correct').normalizeEmail().isEmail(),
    check('password', 'password min length: 5').exists().isLength({min: 5, max: 200})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({message: `auth error: ${errors}`})
    }

    const {email, password} = await req.body

    const client = await User.findOne({ email })
    if(!client){
      return res.status(404).json({message: `User ${client} don\'t exists :(`})
    }

    /* hashing password */ 
    const hashPass = await bcrypt.compare(password, client.password)

    if(!hashPass){
      return res.status(400).json({message: `User ${client} don\'t exists :(`})
    }

    const token = jwt.sign(
      {userId: client.id},
      config.get('jwtSecret'),
      {expiresIn: '720h'}
    )

    res.json({token, userID: client.id, message: 'User successfull authorize :)'})
  } catch (e) {
    res.status(500).json({message: 'error post'})
    console.log('Error!!!', e.message)
  }
})



module.exports = router