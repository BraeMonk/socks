const express = require('express');

// Initialize the Express app
const app = express();

// Serve static files (like home.html and signin.html)
app.use(express.static('/'));

// Hardcoded password
const correctPassword = 'drowssaP';

// Handle the password submission
app.post('/password-page', (req, res) => {
    const { password } = req.body;

    // Check if the entered password matches the hardcoded password
    if (password === correctPassword) {
        // If correct, authenticate the user by setting session
        req.session.authenticated = true;
        return res.redirect('/home.html');  // Redirect to show protected page
    } else {
        // If incorrect, display an error message
        return res.send('<a href="/signin.html">Incorrect password. Please try again.</a>');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
