document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Smaya & Nihanth's Colorful World!");

    // Example of a simple interaction: Alert when the "Explore" button is clicked
    const exploreButton = document.querySelector('.explore-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            alert('Yay! Get ready for fun and learning!');
            // You could scroll to a specific section or load content here
        });
    }

    // You can add more interactive elements here later, like:
    // - Image carousels
    // - Simple games
    // - Animations on scroll
});