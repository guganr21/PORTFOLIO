const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// API to receive message
app.post("/send-message", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.send("Message saved ✅");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
