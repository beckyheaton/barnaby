// Functions

// New Bounce image
function bounceImage(imageElement) {
    const speed = 0.1; // Adjust the speed as needed
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const imageWidth = containerWidth * 1.2; // 120% of viewport width
    const imageHeight = containerHeight * 1.2; // 120% of viewport height

    // Ensure the image starts off covering the whole screen
    let posX = -Math.random() * (imageWidth - containerWidth);
    let posY = -Math.random() * (imageHeight - containerHeight);
    let dirX = Math.random() > 0.5 ? 1 : -1;
    let dirY = Math.random() > 0.5 ? 1 : -1;

    function moveImage() {
        posX += speed * dirX;
        posY += speed * dirY;

        if (posX >= 0 || posX <= -(imageWidth - containerWidth)) {
            dirX *= -1;
        }

        if (posY >= 0 || posY <= -(imageHeight - containerHeight)) {
            dirY *= -1;
        }

        imageElement.style.left = `${posX}px`;
        imageElement.style.top = `${posY}px`;

        requestAnimationFrame(moveImage);
    }

    moveImage();
}

// Fading image
function fadeIn(imageElement) {
    let opacity = 0; // Initial opacity
    const maxOpacity = 1; // Maximum opacity level
    const fadeSpeed = 0.0001; // Speed of fading

    function fade() {
        opacity += fadeSpeed; // Increase opacity
        imageElement.style.opacity = opacity; // Apply opacity to the image

        // Continue fading until maximum opacity is reached
        if (opacity < maxOpacity) {
            requestAnimationFrame(fade);
        }
    }

    // Delay the start of the fading animation by 60 seconds (60000 milliseconds)
    setTimeout(() => {
        fade();
    }, 10000);
}


// Hover sound
function setupHoverSound(imageElement, soundElement) {
    imageElement.addEventListener('mouseover', () => {
        if (parseFloat(getComputedStyle(imageElement).opacity) === 1) {
            soundElement.currentTime = 0; // Reset the audio to the beginning
            soundElement.play();
        }
    });

    imageElement.addEventListener('mouseout', () => {
        if (parseFloat(getComputedStyle(imageElement).opacity) === 1) {
            soundElement.pause(); // Pause the audio when the mouse leaves the image
            soundElement.currentTime = 0; // Reset the audio to the beginning
        }
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
        // bounceImage(image); // Call the bounceImage function for each image
        fadeIn(image); // Call the fadeInOut function for each image
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
    changeTime.setHours(24, 20, 0, 0); // Set change time to 8 PM tonight

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
