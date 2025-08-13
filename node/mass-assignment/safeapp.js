const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3011;

app.use(bodyParser.json());

// In-memory "database"
const users = [];

// ✅ Safe: only accept whitelisted fields
const ALLOWED_FIELDS = ['username', 'password'];

app.post('/register', (req, res) => {
  const sanitized = {};
  for (const field of ALLOWED_FIELDS) {
    if (field in req.body) sanitized[field] = req.body[field];
  }
  // Sensitive values are set server-side
  sanitized.isAdmin = false;
  users.push(sanitized);
  res.status(201).json({ created: sanitized });
});

app.get('/debug/users', (_req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`🔐 Safe mass-assignment running at http://localhost:${PORT}`);
});
