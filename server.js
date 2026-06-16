const path = require('path');
const fs = require('fs');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDirectory = path.join(__dirname, 'data');
const dbPath = path.join(dataDirectory, 'contacts.db');

// Email configuration (using environment variables for security)
const EMAIL_USER = process.env.EMAIL_USER || 'your-email@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const ADMIN_EMAIL = 'sharanurs05@gmail.com'; // Your email address

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Function to send email notification
async function sendEmailNotification(contact) {
  try {
    // If EMAIL_PASS is not set, skip email sending (for local dev)
    if (!EMAIL_PASS) {
      console.log('Email service not configured. Contact saved but email not sent.');
      return;
    }

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.first_name} ${contact.last_name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
      <p><strong>Service:</strong> ${contact.service || 'N/A'}</p>
      <p><strong>Budget:</strong> ${contact.budget || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `;

    await transporter.sendMail({
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New Contact Submission from ${contact.first_name} ${contact.last_name}`,
      html: emailContent
    });

    console.log('Email sent successfully to', ADMIN_EMAIL);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
}


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

    // Send email notification
    const contact = {
      first_name: fname || '',
      last_name: lname || '',
      email,
      company: company || '',
      service: service || '',
      budget: budget || '',
      message
    };
    
    sendEmailNotification(contact);

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
