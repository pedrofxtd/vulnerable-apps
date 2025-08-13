## 🗂️ Path Traversal (CWE-22)

Reads files using user input. Attacker uses `../` to escape the allowed folder.

- ❌ `vulnerable-app.js`: `path.join(BASE, req.query.file)` with no checks
- ✅ `safeapp.js`: normalize, block `..`, no absolute paths, resolve+prefix check, **whitelist** (`public.txt`)

**CWE-22**: https://cwe.mitre.org/data/definitions/22.html

Run:
`node vulnerable-app.js` → http://localhost:3020  
`node safeapp.js` → http://localhost:3021
