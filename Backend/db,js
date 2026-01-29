const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // your MySQL username
  password: "@Rajkumar1",        // your MySQL password
  database: "portfolio_messages"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;
