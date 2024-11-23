
// global.js
let globalData = {};

fetch('/manifest.json')
  .then(response => response.json())
  .then(data => {
    globalData = data;
    console.log('JSON data loaded:', globalData);
    // Optional: Fire an event to notify other scripts that the data is loaded
    document.dispatchEvent(new Event('jsonDataLoaded'));
  })
  .catch(error => console.error('Error loading JSON data:', error));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(error) {
    console.log('ServiceWorker registration failed: ', error);
  });
}

// app.js

// Open the IndexedDB database (creating it if it doesn't exist)
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

// Handle sign-in form submission
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = authenticateUser(username, password);
    if (user) {
        console.log('User authenticated:', user.username);

        // Optionally, retrieve the user's saved page when they sign 
            // Redirect to the saved page or default page if none is saved
            window.location.href = savedPage || './home.html';
        });
    } else {
        console.error('Invalid username or password');
        alert('Invalid credentials');
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

// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  const openPageBtn = document.getElementById('openBtn');
  const slidingPage = document.getElementById('slidingPage');
  const closePageBtn = document.getElementById('closeWindowBtn');

  // Show the page when the button is clicked
  openPageBtn.addEventListener('click', function() {
    slidingPage.classList.add('show');
  });

  // Hide the page when the close button is clicked
  closePageBtn.addEventListener('click', function() {
    slidingPage.classList.remove('show');
  });

  // Optional: Close the page if the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (!event.target.closest('.sliding-page') && !event.target.closest('#openBtn')) {
      slidingPage.classList.remove('show');
    }
  });
});

document.addEventListener('DOMContentLoaded', function(){
const playButton = document.getElementById('playBtn');
const audio = document.getElementById('pageAudio');

function playMedia(){
	audio.currentTime = 0;
	
	audio.play();
	
}

playButton.addEventListener('click', playMedia);
});

// Your existing JavaScript code
console.log("JavaScript file is loaded and running.");

// Function to scroll to the footer
function scrollToFooter() {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
}

const CACHE_NAME = 'socks-cache-v1';
const urlsToCache = [
  '/index.html',
  '/index2.html',
  '/index3.html',
  '/bananacat.html',
  '/findout.html',
  '/friend.html',
  '/hell.html',
  '/khajiitonly.html',
  '/muchlove.html',
  '/nonothing.html',
  '/NOPE.html',
  '/page1.html',
  '/products.html',
  '/thefaceofgod.html',
  '/welcome.html',
  '/youdied.html',
  '/script.js',
  '/script2.js',
  '/styles.css',
  '/styles2.css',
  '/styles3.css',
  '/enter.css',
  'appstore.png',
  'warmer.html',
  'khajiit2.html', 'khajiit1.html', 'khajiit.css', 'IMG_0809.jpeg', 'IMG_0810.jpeg',
  'home.html', 'IMG_O803.png', 'IMG_0804.jpeg', 'mug.html', 'IMG_0799.gif', 'underconstruction.html', 'IMG_0797.gif',
  '/033C1A18-0CA3-4692-82A4-3D30236D7924.gif',
  '/20C5D30F-8593-45FC-981F-957BA8977EB4.jpeg',
  '/24E04E1C-1A19-4665-B29A-12E44CCF9B33.jpeg',
  '/27E6DF11-2745-4D40-AF93-7D3797D24640.gif',
  '/31B3D079-007B-4942-A4F2-47F2A1A8284F.jpeg',
  '/34D08A7A-CA13-42C9-AC0E-2AC45476853C.jpeg',
  '/49A2E1FD-38EC-4414-B63C-74214F1ED0FB.png',
  '/4EB7D54F-AD67-4A84-BE2D-E534EF2A8DDD.gif',
  '/512C259B-8A6D-48E1-A203-C4F4FAF89B15.webp',
  '/5B2C9A72-6089-40C0-B303-03EC4D252C8D.gif',
  '/66D1641F-BD34-42B5-B76B-314145521B4E.png',
  '/687A2F0F-39F1-4974-B7B9-D5855CC008C6.webp',
  '/69983E32-DC94-4113-A4EA-7D63211E78E7.jpeg',
  '/6A28E3B1-D7D7-4E37-ABD4-B5DAEF05951F.png',
  '/895CAEE7-4A9E-448A-B1FB-4A2194038C84.gif',
  '/95E734E4-10C4-4AF3-BD96-E810C6F08792.png',
  '/E2B16528-D1A2-4A13-BACF-D2618052FF42.gif',
  '/EBADBB2E-50B0-4FDC-9AB9-8561D8AB3D4A.jpeg',
  '/FB0DA456-23ED-49EF-8363-204A9013D991.jpeg',
  '/FFE9A47F-C02C-4257-A103-565D15F12E3B.gif',
  '/Hey you, youre finally awake.mp3',
  '/IMG_0714.GIF',
  '/IMG_0745.GIF',
  '/IMG_0749.GIF',
  '/IMG_0758.GIF',
  '/OIP (1).jpg',
  '/OIP.jpg',
  '/Png.png',
  '/e02ce86bcfd6d1d6c2f775a-b3ec8c01_w200.gif',
  '/copy_CC503455-85B5-4062-9BE7-63934BA0A505.gif',
  '/giphy.gif'
];

// Install service worker and cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached resource if found
        if (response) {
          return response;
        }
        // Fetch resource from the network if not cached
        return fetch(event.request);
      })
  );
});

// Update service worker and manage old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
