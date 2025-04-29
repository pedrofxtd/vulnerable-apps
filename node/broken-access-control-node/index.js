const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

// Fake login logic
app.post('/login', (req, res) => {
    const { username } = req.body;

    // No real session handling
    if (username === 'admin') {
        res.redirect('/admin.html');
    } else {
        res.redirect('/user.html');
    }
});

// Anyone can directly access these pages (no access control)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/admin.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/user.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
