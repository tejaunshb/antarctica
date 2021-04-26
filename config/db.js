var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6408127",
  password: "8NbXpWd7h2",
  database: "sql6408127",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to database!");
});

module.exports = connection;
