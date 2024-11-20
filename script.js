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

