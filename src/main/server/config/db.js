//get mysql
const mysql = require("mysql");

//create connection between app and database (call object)
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeesystem",
});

module.exports = db;
