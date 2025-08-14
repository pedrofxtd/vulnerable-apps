## 🔗 Open Redirect ➜ XSS Chain (CWE-601 + CWE-79)

- ❌ `vulnerable_app.js`: `res.redirect(req.query.next)` + landing reflects `?msg=` unescaped → attacker uses `/login?next=/landing?msg=<script>...`
- ✅ `safe_app.js`: allowlist internal paths, reject external/dangerous schemes, escape `msg`, add CSP.

**CWE-601**: https://cwe.mitre.org/data/definitions/601.html  
**CWE-79**: https://cwe.mitre.org/data/definitions/79.html

Run:  
`node vulnerable_app.js` → http://localhost:3007  
`node safe_app.js` → http://localhost:3008
