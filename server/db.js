const mysql = require("mysql2");
const name = "sql7633633";
const connection = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7633633",
  password: "FKc7Rw15uN",
  database: "sql7633633",
  port: 3306,
});

// const connection = mysql.createConnection(
//   "jdbc:mysql://sql7.freesqldatabase.com:3306/sql7633633"
// );
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ronbulle73**",
//   database: "bds",
// });

module.exports = connection;
