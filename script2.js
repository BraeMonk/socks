// script.js
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playBtn');
    const video = document.getElementById('video');

    playButton.addEventListener('click', function() {
        video.play();
    });
});