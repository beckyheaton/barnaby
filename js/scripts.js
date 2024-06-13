// Functions

// Bouncing image
function bounceImage(imageElement) {
    const speed = 0.1; // Adjust the speed as needed
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const imageWidth = imageElement.width;
    const imageHeight = imageElement.height;

    let posX = Math.random() * (containerWidth - imageWidth);
    let posY = Math.random() * (containerHeight - imageHeight);
    let dirX = Math.random() > 0.5 ? 1 : -1;
    let dirY = Math.random() > 0.5 ? 1 : -1;

    function moveImage() {
        posX += speed * dirX;
        posY += speed * dirY;

        if (posX <= 0 || posX >= containerWidth - imageWidth) {
            dirX *= -1;
        }

        if (posY <= 0 || posY >= containerHeight - imageHeight) {
            dirY *= -1;
        }

        imageElement.style.left = `${posX}px`;
        imageElement.style.top = `${posY}px`;

        requestAnimationFrame(moveImage);
    }

    moveImage();
}

// Fading image
function fadeInOut(imageElement) {
    let opacity = 0;
    let direction = 0.002; // Initial direction of opacity change

    function fade() {
        opacity += direction; // Update opacity
        imageElement.style.opacity = opacity; // Apply opacity to the image

        // Change direction when reaching opacity limits
        if (opacity <= 0 || opacity >= 1) {
            direction *= -1;
        }

        // Repeat the fading animation
        requestAnimationFrame(fade);
    }

    // Start the fading animation
    fade();
}

// Hover sound
function setupHoverSound(imageElement, soundElement) {
    imageElement.addEventListener('mouseover', () => {
        soundElement.currentTime = 0; // Reset the audio to the beginning
        soundElement.play();
    });

    imageElement.addEventListener('mouseout', () => {
        soundElement.pause(); // Pause the audio when the mouse leaves the image
        soundElement.currentTime = 0; // Reset the audio to the beginning
    });
}

// Audio Toggle
function setupAudioToggle(player, toggleButton) {
    toggleButton.addEventListener('click', function() {
        if (player.paused) {
            player.play();
            toggleButton.classList.add('playing');
            toggleButton.classList.remove('paused');
        } else {
            player.pause();
            toggleButton.classList.add('paused');
            toggleButton.classList.remove('playing');
        }
    });
}

// Change at midnight
function applyChanges() {
    document.body.style.backgroundColor = 'rgb(60, 60, 60)';
    document.getElementById('title').innerText = 'Special Content for Today';
    const content = document.getElementById('content');
    if (content) {
        content.innerText = 'This is a special message that will be displayed for 24 hours.';
    }
}

function revertChanges(originalTitle, originalContent) {
    document.body.style.backgroundColor = 'rgb(24, 24, 24)';
    document.getElementById('title').innerHTML = originalTitle;
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = originalContent;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img'); // Select all images

    // Fade and Bounce Image
    images.forEach(image => {
        bounceImage(image); // Call the bounceImage function for each image
        fadeInOut(image); // Call the fadeInOut function for each image
    });

    // Audio Toggle
    const audioPlayer = document.getElementById('audioPlayer');
    const audioToggle = document.getElementById('audioToggle');
    setupAudioToggle(audioPlayer, audioToggle);

    // Hover sound for the image
    const image = document.getElementById('dreams');
    const hoverSound = document.getElementById('hoverSound');
    setupHoverSound(image, hoverSound);

    // Store original content
    const originalTitle = document.getElementById('title').innerHTML;
    const originalContent = document.getElementById('content').innerHTML;

    // Time-based change
    const changeTime = new Date();
    changeTime.setHours(23, 45, 0, 0); // Set change time to 8 PM tonight

    const revertTime = new Date(changeTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

    const now = new Date();

    if (now >= changeTime && now < revertTime) {
        applyChanges();
    } else {
        revertChanges(originalTitle, originalContent);
    }

    // Check every minute
    setInterval(function() {
        const currentTime = new Date();
        if (currentTime >= changeTime && currentTime < revertTime) {
            applyChanges();
        } else {
            revertChanges(originalTitle, originalContent);
        }
    }, 60 * 1000);

});
