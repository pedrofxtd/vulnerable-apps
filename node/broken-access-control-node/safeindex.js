const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.use(session({
    secret: 'secureAppSecret123', // Change in production
    resave: false,
    saveUninitialized: true
}));

// Middleware to check login
function auth(role) {
    return (req, res, next) => {
        if (req.session.username && req.session.role === role) {
            next();
        } else {
            res.status(403).send('Access Denied');
        }
    };
}

// Login route
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Basic login simulation
    if (username === 'admin') {
        req.session.username = 'admin';
        req.session.role = 'admin';
        res.redirect('/admin');
    } else {
        req.session.username = username;
        req.session.role = 'user';
        res.redirect('/user');
    }
});

// Protected routes
app.get('/admin', auth('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, '/views/admin.html'));
});

app.get('/user', auth('user'), (req, res) => {
    res.sendFile(path.join(__dirname, '/views/user.html'));
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`✅ Secure app running at http://localhost:${PORT}`);
});
