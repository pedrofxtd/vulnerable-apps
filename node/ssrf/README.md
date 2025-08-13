# Server-Side Request Forgery (SSRF) - CWE-918

**Vulnerable App:** Accepts any URL from user input and fetches it without validation, allowing access to internal resources.  
**Safe App:** Validates the URL against an allowlist of trusted domains before making the request.  
**CWE:** https://cwe.mitre.org/data/definitions/918.html
