const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'databases-auth.000webhost.com',
  user: 'id14353379_eldiyar',
  database: 'id14353379_node',
  password: "America007"
})

// тестирование подключения
 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });
 // закрытие подключения
 connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});