const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// API to receive messages
app.post("/send-message", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
