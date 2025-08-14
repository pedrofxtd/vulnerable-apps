// Safe Open Redirect + XSS defenses
const express = require('express');
const bodyParser = require('body-parser');
const { URL } = require('url');
const app = express();
const PORT = 3008;

app.use(bodyParser.urlencoded({ extended: true }));

// Allowlist of internal paths only
const ALLOWED_PATHS = new Set(['/landing', '/promo', '/home']);

// Minimal HTML escape
function escapeHtml(s = '') {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Basic CSP (blocks inline scripts by default)
app.use((_req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none'");
  next();
});

// Safe login redirect
app.get('/login', (req, res) => {
  const nextRaw = req.query.next || '/landing';

  // Parse robustly: if absolute URL → block (no external redirects)
  let pathname;
  try {
    // Treat relative as path on our site
    if (/^https?:\/\//i.test(nextRaw) || /^data:|^javascript:/i.test(nextRaw)) {
      // ❌ reject external hosts and dangerous schemes
      return res.redirect('/landing');
    }
    // Build a synthetic absolute URL to get a normalized pathname
    const u = new URL(nextRaw, 'http://localhost');
    pathname = u.pathname;
  } catch {
    return res.redirect('/landing');
  }

  // Allowlist check
  if (!ALLOWED_PATHS.has(pathname)) {
    return res.redirect('/landing');
  }

  // Keep only allowed query key(s) if needed (drop or whitelist)
  // For demo, we keep msg but XSS is handled by escaping + CSP on landing.
  return res.redirect(`${pathname}${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`);
});

// Safe landing (escape + CSP)
app.get('/landing', (req, res) => {
  const raw = req.query.msg || 'Welcome!';
  const msg = escapeHtml(raw); // ✅ neutralize HTML/JS
  res.send(`
    <h1>Landing (Safe)</h1>
    <p>Message: ${msg}</p>
    <a href="/login?next=/landing">Back to login</a>
  `);
});

app.get('/home', (_req, res) => res.send('<h1>Home</h1>'));
app.get('/promo', (_req, res) => res.send('<h1>Promo</h1>'));

app.listen(PORT, () => {
  console.log(`✅ Safe chain on http://localhost:${PORT}`);
  console.log('Try (blocked redirect): /login?next=https://evil.example/');
  console.log('Try (escaped msg): /login?next=/landing?msg=<script>alert(1)</script>');
});
