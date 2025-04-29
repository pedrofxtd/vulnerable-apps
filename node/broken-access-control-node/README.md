# A01 – Broken Access Control

## 🔓 Vulnerable Example (index.js)

The original implementation allowed unrestricted access to sensitive pages (`/admin`, `/user`) by typing the URLs directly, without validating the user's session or role.

### ✅ CWE Reference

- [CWE-284: Improper Access Control](https://cwe.mitre.org/data/definitions/284.html)  
  *The app does not restrict access to protected resources.*

---

## 🔐 Secure Example (`safeindex.js`)

The fixed version introduces proper **role-based access control (RBAC)** using:

- Express sessions to track users
- Role verification middleware before serving protected pages
- Proper logout route to destroy sessions

---

## 🧪 How to Run

1. Install dependencies:
    ```bash
    npm install express express-session body-parser
    ```

2. Start the server:
    ```bash
    node safeindex.js
    ```

3. Visit `http://localhost:3000` and submit a username (`admin` or any other name) to test role-specific access.

---

## 💡 Lessons

- Always verify user roles before serving sensitive content.
- Never rely solely on front-end redirects or URLs for access control.
- Use sessions or JWT for proper authentication.

---

