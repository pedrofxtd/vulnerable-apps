// CWE-601: Safe Open Redirect
const express = require('express');
const url = require('url');
const app = express();
const PORT = 3006;

// Allowlist of safe paths
const allowedPaths = ['/home', '/promo', '/dashboard'];

app.get('/login', (req, res) => {
    let next = req.query.next || '/home';

    // ✅ Parse only path, no external domains
    const parsed = url.parse(next);

    if (parsed.host || !allowedPaths.includes(parsed.pathname)) {
        return res.redirect('/home');
    }

    res.redirect(parsed.pathname);
});

app.get('/home', (req, res) => {
    res.send('<h1>Welcome Home</h1>');
});

app.get('/promo', (req, res) => {
    res.send('<h1>Promo Page</h1>');
});

app.listen(PORT, () => {
    console.log(`✅ Safe app running at http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/login?next=https://evil.com (goes to /home)`);
});
