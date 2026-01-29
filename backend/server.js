const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your MySQL username (default: root)
    password: '',      // Your MySQL password
    database: 'portfolio_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Route to handle form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Success! Message stored.' });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
