// Vulnerable Open Redirect ➜ XSS chain (CWE-601 + CWE-79)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3007;

app.use(bodyParser.urlencoded({ extended: true }));

// 1) Open Redirect (no validation)
app.get('/login', (req, res) => {
  const next = req.query.next || '/landing';
  // ❌ CWE-601: blindly redirect to any URL or path (keeps query intact)
  return res.redirect(next);
});

// 2) Reflected XSS landing
app.get('/landing', (req, res) => {
  const msg = req.query.msg || 'Welcome!';
  // ❌ CWE-79: unescaped reflection into HTML
  res.send(`
    <h1>Landing</h1>
    <p>Message: ${msg}</p>
    <a href="/login?next=/landing">Back to login</a>
  `);
});

app.listen(PORT, () => {
  console.log(`🚨 Vulnerable chain on http://localhost:${PORT}`);
  console.log('Try: /login?next=/landing?msg=<script>alert(1)</script>');
  console.log('Also works with external: /login?next=https://evil.example/');
});
