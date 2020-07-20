const express = require('express');
const mysql = require('mysql2');
const config = require('./config/default')
const router = require('./routes/auth')

const app = express();


app.use(express.urlencoded({extended: true}))
app.use(router)
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log('Server start', PORT))
  } catch (e) {
    console.log('Error!!!!--- ', e.message);
    process.exit(1);
  }
}

start();