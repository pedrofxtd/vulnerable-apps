## 🔀 Open Redirect — CWE-601

- ❌ `vulnerable_app.js`: directly redirects to `?next` value → attacker can send users to phishing sites.
- ✅ `safe_app.js`: parses the path, rejects external hosts, uses allowlist of safe routes.

**CWE-601**: https://cwe.mitre.org/data/definitions/601.html

Run:
- `node vulnerable_app.js` → http://localhost:3005/login?next=https://evil.com
- `node safe_app.js` → http://localhost:3006/login?next=https://evil.com (blocked)
