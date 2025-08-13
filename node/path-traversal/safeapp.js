const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3021;

// Only serve from this directory
const BASE_DIR = path.join(__dirname, 'files');

// ✅ Defense-in-depth:
// 1) Disallow absolute paths
// 2) Normalize and block '..'
// 3) Resolve and ensure path stays inside BASE_DIR
// 4) Optional filename whitelist for extra safety
const ALLOWED_FILENAMES = new Set(['public.txt']);

app.get('/view', (req, res) => {
  const file = req.query.file;
  if (!file) return res.status(400).send('Missing "file"');

  // 1) Block absolute paths
  if (path.isAbsolute(file)) return res.status(400).send('Invalid path');

  // 2) Normalize
  const normalized = path.normalize(file);

  // 3) Block traversal attempts
  if (normalized.includes('..')) return res.status(400).send('Traversal detected');

  // 4) Whitelist check (optional but strong)
  if (!ALLOWED_FILENAMES.has(normalized)) {
    return res.status(403).send('File not allowed');
  }

  // Final resolve + prefix check
  const finalPath = path.resolve(BASE_DIR, normalized);
  if (!finalPath.startsWith(BASE_DIR + path.sep)) {
    return res.status(400).send('Invalid path');
  }

  fs.readFile(finalPath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.type('text/plain').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`🔐 Safe Path Traversal on http://localhost:${PORT}`);
  console.log('Try:  /view?file=public.txt');
});
