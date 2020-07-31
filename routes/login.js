const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../model/User')
const cors = require('cors')

const router = Router()

// Cors
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* Login */
router.post(
  '/login',
  [
    check('email', 'НЕ корректный email!').normalizeEmail().isEmail(),
    check('password', 'НЕ корректный пароль! Введите больше 5 символов').exists().isLength({min: 5, max: 200})
  ],
  cors(corsOptions),
  async (req, res) => {
  try {
    const errors = validationResult(req)
    !errors.isEmpty() &&
      res.status(400).json({message: `Не корректные данные`, errors})

    const {email, password} = await req.body
    console.log({email, password})

    const client = await User.findOne({ email })
    !client &&
      res.status(404).json({message: `Не правильные данные :(`})


    /* hashing password */ 
    const hashPass = bcrypt.compare(password, client.password)

    !hashPass &&
      res.status(400).json({message: `Не правильные данные :(`})

    const token = jwt.sign(
      {userId: client.id},
      config.get('jwtSecret'),
      {expiresIn: '720h'}
    )

    res.status(201).json({token, userID: client.id, message: 'Пользователь успешно вошёл в систему :)'})
  } catch (e) {
    res.status(500).json({message: 'error post'})
    console.log('Error!!!', e.message)
  }
})

module.exports = router