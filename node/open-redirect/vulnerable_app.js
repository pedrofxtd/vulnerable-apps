// CWE-601: Vulnerable Open Redirect
const express = require('express');
const app = express();
const PORT = 3005;

app.get('/login', (req, res) => {
    const next = req.query.next || '/home';
    // ❌ Vulnerable: Directly redirect to unvalidated URL
    res.redirect(next);
});

app.get('/home', (req, res) => {
    res.send('<h1>Welcome Home</h1>');
});

app.listen(PORT, () => {
    console.log(`🚨 Vulnerable app running at http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/login?next=https://evil.com`);
});
