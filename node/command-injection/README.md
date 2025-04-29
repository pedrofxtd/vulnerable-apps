## 🛡️ A03: Injection (CWE-78)

This app demonstrates **OS Command Injection** via `exec("ping " + userInput)`.

- ❌ `app.js`: Vulnerable – unsanitized input allows commands like `; rm -rf /`.
- ✅ `safeapp.js`: Secure – uses DNS lookup + input **whitelist** (e.g. `example.com`, `google.com`) to block dangerous input.

**CWE-78**: [OS Command Injection](https://cwe.mitre.org/data/definitions/78.html)

Run:  
`npm install`  
`node safeapp.js`  
Visit: [http://localhost:3000](http://localhost:3000)
