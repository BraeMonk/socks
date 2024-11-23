const request = indexedDB.open('Socks', 1);

let db;

// Event handler for successful database opening
request.onsuccess = function(event) {
    db = event.target.result;
    console.log('Database opened successfully');
};

// Event handler for database errors
request.onerror = function(event) {
    console.error('Error opening IndexedDB:', event.target.error);
};

// Event handler for database version upgrades (creates object store on first run)
request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Create an object store for storing user data (e.g., current page)
    if (!db.objectStoreNames.contains('users')) {
        const store = db.createObjectStore('users', { keyPath: 'id' });
        store.createIndex('username', 'username', { unique: true });
        console.log('Object store "users" created');
    }
};

// Function to check user credentials
function authenticateUser(username, password) {
    return usersDB.find(user => user.username === username && user.password === password);
}

// Function to save the player's current page in IndexedDB
function savePlayerPage(userId, currentPage) {
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');
    const request = store.put({ id: userId, username: usersDB[userId - 1].username, currentPage });

    request.onsuccess = function() {
        console.log(`User's current page saved: ${currentPage}`);
    };

    request.onerror = function(event) {
        console.error('Error saving user data:', event.target.error);
    };
}

// Function to retrieve a user's saved page from IndexedDB
function getPlayerPage(userId, callback) {
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const request = store.get(userId);

    request.onsuccess = function() {
        const user = request.result;
        if (user) {
            console.log(`Retrieved saved page for user: ${user.username}, Page: ${user.currentPage}`);
            callback(user.currentPage);
        } else {
            console.log('./home.html');
        }
    };

    request.onerror = function(event) {
        console.error('Error retrieving user data:', event.target.error);
    };
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; // Don't store plaintext passwords in real apps

    // Open the IndexedDB database or create it
    const request = indexedDB.open('myAppDB', 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        store.createIndex('username', 'username', { unique: true });
        store.createIndex('email', 'email', { unique: true });
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction('users', 'readwrite');
        const store = transaction.objectStore('users');

        // Save the user data in IndexedDB
        store.put({ username: username, email: email, password: password });

        alert('User signed up successfully!');
    };

    request.onerror = function(event) {
        console.error('Error signing up:', event.target.error);
    };
});
