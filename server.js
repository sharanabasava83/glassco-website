const path = require('path');
const fs = require('fs');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dataDirectory = path.join(__dirname, 'data');
const dbPath = path.join(dataDirectory, 'contacts.db');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
});

const createTableSql = `
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);`;

db.run(createTableSql, (err) => {
  if (err) {
    console.error('Failed to create contacts table:', err);
    process.exit(1);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', (req, res) => {
  const { fname, lname, email, company, service, budget, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  const insertSql = `
    INSERT INTO contacts (first_name, last_name, email, company, service, budget, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(insertSql, [fname || '', lname || '', email, company || '', service || '', budget || '', message], function (err) {
    if (err) {
      console.error('Failed to save contact request:', err);
      return res.status(500).json({ error: 'Unable to save your message right now.' });
    }

    res.status(201).json({ message: 'Contact request saved.', id: this.lastID });
  });
});

app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('Failed to load contacts:', err);
      return res.status(500).json({ error: 'Unable to load contacts.' });
    }

    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Glass Co. backend running on http://localhost:${PORT}`);
});
