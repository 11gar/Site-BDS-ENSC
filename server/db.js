const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ronbulle73**",
  database: "task-manager",
});

module.exports = connection;
