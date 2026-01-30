const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",        // change if different
    password: "",        // add password if any
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
