## 🗄️ NoSQL Injection (CWE-943)

- ❌ `vulnerable_app.js`: `users.findOne(req.body)` — attacker can send operator payloads like `{"username":{"$ne":null}}` to bypass auth.
- ✅ `safe_app.js`: whitelist `username/password`, reject keys starting with `$`, enforce types/lengths, build query server-side.

**CWE-943**: https://cwe.mitre.org/data/definitions/943.html

Run these:
`node vulnerable_app.js` → http://localhost:3009  
`node safe_app.js` → http://localhost:3010
