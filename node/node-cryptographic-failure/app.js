const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Simulating password storage function
const users = {};  // Store users in memory (plaintext passwords)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1>');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Storing password in plaintext (this is the cryptographic failure!)
    users[username] = password;
    res.send('<h1>User Registered</h1>');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.send('<h1>Login Successful</h1>');
    } else {
        res.send('<h1>Invalid Credentials</h1>');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
