# 🛡️ Broken Access Control – OWASP A01:2021

This project is a deliberately vulnerable Node.js web application designed to demonstrate **Broken Access Control** (OWASP Top 10 - A01:2021).

## 🔍 Vulnerability: Broken Access Control

The application lacks proper access control mechanisms. Any user can access restricted pages simply by navigating to the URL.

### ✅ Intended behavior:
- `/admin.html` should only be accessible to the "admin" user.

### ❌ Vulnerable behavior:
- Any user can directly access `/admin.html` even without being logged in as admin.

## 📁 Project Structure

broken-access-control-node/ ├── index.js ├── package.json ├── README.md └── views/ ├── login.html ├── user.html └── admin.html


## 🚀 How to Run

1. Install dependencies:

npm install

2. Start the server:

node index.js

3. Visit:

http://localhost:3000/login.html


🧪 Test the Vulnerability

Login with any username (e.g. "guest")

You’ll be redirected to the user page

Manually visit:

http://localhost:3000/admin.html

➡️ You’ll access the admin page without being authorized.

📚 OWASP Reference
OWASP A01:2021 - Broken Access Control



