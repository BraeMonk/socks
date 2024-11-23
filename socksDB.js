const express = require('express');
const session = require('express-session');

// Initialize the Express app
const app = express();

// Middleware to parse incoming request bodies (for POST requests)
app.use(express.urlencoded({ extended: true }));

// Middleware to handle sessions
app.use(session({
    secret: 'drowssaP',  // Use a strong secret in production
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the 'public' directory
app.use(express.static('/'));

// Hardcoded password
const correctPassword = 'drowssaP';

// Serve the password entry form (if not authenticated)
app.get('/password-page', (req, res) => {
    if (req.session.authenticated) {
        // If the user is authenticated, show the protected page
        return res.send('<h1>Welcome to the Protected Page!</h1><p>You are logged in.</p>');
    }

    // If not authenticated, show the password input form
    res.send('./signin.html);
});

// Handle the password submission (POST request)
app.post('/password-page', (req, res) => {
    const { password } = req.body;

    // Check if the entered password matches the hardcoded password
    if (password === correctPassword) {
        // If correct, authenticate the user by setting session
        req.session.authenticated = true;
        return res.redirect('/home.html');  // Redirect to home.html (static file)
    } else {
        // If incorrect, display an error message
        return res.send('<p>Incorrect password. Please try again.</p><a href="/signin.html">Go Back</a>');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
