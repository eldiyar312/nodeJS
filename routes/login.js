const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../model/User')

const router = Router()

/* Login */
router.post(
  '/login',
  [
    check('email', 'НЕ корректный email!').normalizeEmail().isEmail(),
    check('password', 'НЕ корректный пароль! Введите больше 5 символов').exists().isLength({ min: 5, max: 200 })
  ],
  async (req, res) => {
  try {
    validationResult( req )
      .then( errors => {
        !errors.isEmpty() &&
          res.status( 400 ).json({ message: errors })
      })

    const { email, password } = req.body

    const client = await User.findOne({ email })

    !client &&
      res.status( 400 ).json({ message: `Не правильные данные :(` })


    /* hashing password */ 
    const hashPass = bcrypt.compare( password, client.password )

    !hashPass &&
      res.status( 400 ).json({ message: `Не правильные данные :(` })

    const token = jwt.sign(
      { userId: client.id },
      config.get( 'jwtSecret' ),
      { expiresIn: '720h' }
    )

    res.status( 201 ).json({
      token, 
      userID: client.id, 
      message: 'Пользователь успешно вошёл в систему :)'
    })
  } catch (e) {
    res.status( 500 ).json({ message: 'error post' })
    console.log('Error!!!', e.message)
  }
})

module.exports = router