document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img'); // Select all images

    images.forEach(image => {
        moveImage(image); // Call the moveImage function for each image
    });
});

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

    const moveImage = () => {
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
    };

    moveImage();
}

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