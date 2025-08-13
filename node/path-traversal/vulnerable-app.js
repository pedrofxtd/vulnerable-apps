const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3020;

// Intended: only serve files inside /files
const BASE_DIR = path.join(__dirname, 'files');

// ❌ Vulnerable: directly concatenates user input
app.get('/view', (req, res) => {
  const file = req.query.file; // e.g., public.txt, ../secret.txt
  if (!file) return res.status(400).send('Missing "file"');

  const fullPath = path.join(BASE_DIR, file); // does NOT prevent ../
  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.type('text/plain').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`🚨 Vulnerable Path Traversal on http://localhost:${PORT}`);
  console.log('Try:  /view?file=public.txt  |  /view?file=../secret.txt');
});
