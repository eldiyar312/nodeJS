const {Router} = require('express')
const mysql = require('mysql2')
const config = require('../config/default')

const router = Router()
router.get('/', async(req, res) => {
  try {
    res.end('<h1>Home page</h1>')
  } catch (e) {
    
  }
})
router.get('/post', async(req, res) => {
  try {
    res.end('<h1>Post page</h1>')
  } catch (e) {
    
  }
})

router.post('/post', async (req, res) => {
  try {
    const {email, password} = await req.body
    // const email = req.body.email
    // const password = req.body.password
    // const connection = mysql.createConnection(config)
    // const conn = connection.query("INSERT INTO `tbnaprimer` (`id`, `name`, `password`) VALUES (NULL, '",email,"', '",password,"')")
    console.log('DATA auth: ', email, password)
    console.log('Body: ', req.body)
    // console.log('connect-------', conn)
  } catch (e) {
    console.log('Error!!!', e.message)
  }
})

module.exports = router