const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

// "Banco" em memória
const users = [];

// ❌ Vulnerável: copia tudo do body para o objeto salvo
app.post('/register', (req, res) => {
  const newUser = { ...req.body }; // aceita isAdmin, balance, etc.
  users.push(newUser);
  res.status(201).json({ created: newUser });
});

// Endpoint só para visualizar o problema
app.get('/debug/users', (_req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`🚨 Vulnerable mass-assignment on http://localhost:${PORT}`);
});
