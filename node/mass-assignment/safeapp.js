const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3011;

app.use(bodyParser.json());

const users = [];

// ✅ Seguro: só aceita campos permitidos (whitelist)
const ALLOWED_FIELDS = ['username', 'password'];

app.post('/register', (req, res) => {
  const sanitized = {};
  for (const k of ALLOWED_FIELDS) {
    if (k in req.body) sanitized[k] = req.body[k];
  }
  // valores sensíveis são definidos no servidor
  sanitized.isAdmin = false;
  users.push(sanitized);
  res.status(201).json({ created: sanitized });
});

app.get('/debug/users', (_req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`🔐 Safe mass-assignment on http://localhost:${PORT}`);
});
