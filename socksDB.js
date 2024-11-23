const express = require('express');
const session = require('express-session');

// Initialize the Express app
const app = express();

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Session configuration for storing authentication state
app.use(session({
    secret: 'theMonk',  // Use a strong secret in production
    resave: false,
    saveUninitialized: true
}));

// Hardcoded password
const correctPassword = 'drowssaP';

// Serve the password entry form (if not authenticated)
app.get('/password-page', (req, res) => {
    if (req.session.authenticated) {
        // If the user is authenticated, show the protected page
        return res.send('<h1>Welcome to the Protected Page!</h1><p>You are logged in.</p>');
    }

    // If not authenticated, show the password input form
    res.send(`
        <h2>Enter Password Backwards</h2>
        <form action="/password-page" method="POST">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Handle the password submission
app.post('/password-page', (req, res) => {
    const { password } = req.body;

    // Check if the entered password matches the hardcoded password
    if (password === correctPassword) {
        // If correct, authenticate the user by setting session
        req.session.authenticated = true;
        return res.redirect('./home.html');  // Redirect to show protected page
    } else {
        // If incorrect, display an error message
        return res.send('<a href="./signin.html">Incorrect password. Please try again.</a>');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
