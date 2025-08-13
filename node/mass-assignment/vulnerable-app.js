const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

// In-memory "database"
const users = [];

// ❌ Vulnerable: copies all fields from req.body to the stored object
app.post('/register', (req, res) => {
  const newUser = { ...req.body }; // accepts isAdmin, balance, etc.
  users.push(newUser);
  res.status(201).json({ created: newUser });
});

// Endpoint to check what’s stored (for demonstration)
app.get('/debug/users', (_req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`🚨 Vulnerable mass-assignment running at http://localhost:${PORT}`);
});
