const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const users = {}; // Simulated user store
const SALT_ROUNDS = 10;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Secure Home Page</h1>');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // ✅ Securely hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    users[username] = hashedPassword;

    res.send('<h1>User Registered Securely</h1>');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const storedHash = users[username];

    // ✅ Compare plaintext password with stored hash
    if (storedHash && await bcrypt.compare(password, storedHash)) {
        res.send('<h1>Login Successful</h1>');
    } else {
        res.send('<h1>Invalid Credentials</h1>');
    }
});

app.listen(3000, () => {
    console.log('🔐 Secure server running on http://localhost:3000');
});
