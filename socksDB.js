

// Hardcoded password
const correctPassword = 'drowssaP';

// Serve the password entry form
app.get('/signin.html', (req, res) => {
    // If the user is already authenticated, show the protected content
    if (req.session.authenticated) {
        return res.send('./home.html');
    }

    // If not authenticated, show the password entry form
    res.send(`
        <h2>Enter Password Backwards</h2>
        <form action="./signin.html" method="POST">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Handle form submission (password verification)
app.post('/password-page', (req, res) => {
    const { password } = req.body;

    // Check if the entered password matches the hardcoded password
    if (password === correctPassword) {
        // If password is correct, authenticate the user (store in session)
        req.session.authenticated = true;
        return res.redirect('./home.html');
    } else {
        // If password is incorrect, show an error message
        return res.send('<p>Incorrect password. Please try again.</p><a href="/password-page">Go Back</a>');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
