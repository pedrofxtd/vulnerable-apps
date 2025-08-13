## 🛡️ Mass Assignment (CWE-915)

Attackers can overpost fields (e.g., `isAdmin`) and the server blindly stores them.

- ❌ `vulnerable-app.js`: `const newUser = { ...req.body }`
- ✅ `safeapp.js`: whitelist (`['username','password']`) + server-controlled `isAdmin=false`

**CWE-915**: https://cwe.mitre.org/data/definitions/915.html

Run:
`node vulnerable-app.js` → http://localhost:3010  
`node safeapp.js` → http://localhost:3011

