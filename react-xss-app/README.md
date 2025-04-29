# react-xss-app

A simple React app vulnerable to DOM-based Cross-Site Scripting (XSS).

## Vulnerability

This app uses `dangerouslySetInnerHTML` to render user input directly to the DOM without sanitization.

## How to Exploit

Input(html): <script>alert('XSS')</script>

It will be executed by the browser.

#Disclaimer

This app is for educational use only. Never expose this code in production environments.
