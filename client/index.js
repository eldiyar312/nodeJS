const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 80;
const filePath = path.join(__dirname, '/', 'front.html')


app.get('/', (req, res) => {
  fs.readFile(filePath, (err, content) => {
    err && console.log('error000')

    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(content)
  })
})

app.listen(PORT, () => {
  console.log('Server started in port: ', PORT)
})