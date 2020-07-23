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
    check('email', 'НЕ корректный email!').isEmail(),
    check('password', 'НЕ корректный пароль! Введите больше 5 символов').isLength({min: 5, max: 200})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    !errors.isEmpty() &&
      res.status(400).json({message: `Не корректные данные`, errors})

    const {email, password} = await req.body
    console.log('BODY: ', req.body)

    /* Search copy user */
    const client = await User.findOne({ email })  
    client &&
      res.status(400).json({message: `Такой email уже существует :(`})

    /* hashing password */ 
    const hashPass = await bcrypt.hash(password, 0)
    const user = new User({email, password: hashPass})

    await user.save() 

    const token = jwt.sign(
      {userId: client.id},
      config.get('jwtSecret'),
      {expiresIn: '720h'}
    )
    res.status(201).json({token, userID: client.id, message: 'Пользователь успешно вошёл :)'})
  } catch (e) {
    console.log('Error!!!', e.message)
    res.status(500).json({message: 'error post'})
  }
})

module.exports = router