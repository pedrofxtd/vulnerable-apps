# Cryptographic Failures (Secure Example)

This project shows how to prevent cryptographic failures by using secure password storage practices.

---

## 🛑 Vulnerable Pattern (Previously)

In the previous version (`app.js`):

- Passwords were stored in **plain text**
- There was no hashing or encryption
- It violated secure credential handling principles

---

## ✅ Secure Fix (This version - `safeapp.js`)

- Passwords are **hashed using bcrypt**
- No raw password is ever stored or logged
- Secure comparison prevents timing attacks

---

## 🧠 Related CWE Entries

- [CWE-256: Unprotected Storage of Credentials](https://cwe.mitre.org/data/definitions/256.html)
- [CWE-798: Use of Hard-coded Credentials](https://cwe.mitre.org/data/definitions/798.html)
---

## ▶️ How to Run

```bash
npm install express body-parser bcrypt
node safeapp.js

Then visit: http://localhost:3000

