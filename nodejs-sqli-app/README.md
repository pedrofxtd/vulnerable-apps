# nodejs-sqli-app

A deliberately vulnerable Node.js app with SQL Injection for educational purposes.

## Vulnerability
This app takes user input from a query parameter and inserts it directly into a SQL query without sanitization.

## Example
Request :/user?username=admin' OR '1'='1


## Disclaimer
**This app is insecure and should only be used in isolated environments for training.**


