const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//connexion à la DB
var connection = mysql.createConnection({
  multipleStatements: true,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT
});

connection.connect();

//requête test
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
if (err) throw err;
console.log('The solution is: ', rows[0].solution);
});

module.exports = connection;
