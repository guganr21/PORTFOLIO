const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Rajkumar1", // your MySQL password
  database: "portfolio"
});

db.connect(err => {
  if (err) {
    console.log("DB Error ❌");
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;
