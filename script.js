document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Smaya & Nihanth's Colorful World! Page Loaded.");

    // Simple alert for the main 'Start Our Grand Adventure!' button
    const mainExploreButton = document.querySelector('.hero-section .explore-button');
    if (mainExploreButton) {
        mainExploreButton.addEventListener('click', () => {
            alert('Get ready for an awesome journey!');
            // In a real site, you might smoothly scroll to the first content section
            // For example: document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Alphabet Explorer Functionality
    const alphabetGrid = document.getElementById('alphabet-explorer-grid');
    const alphabetMessage = document.querySelector('.alphabet-message');

    if (alphabetGrid) {
        alphabetGrid.addEventListener('click', (event) => {
            const letterCard = event.target.closest('.letter-card');
            if (letterCard) {
                const letter = letterCard.dataset.letter; // Get the letter from data-letter attribute
                const word = letterCard.dataset.word;     // Get the word from data-word attribute

                // Play the letter sound
                // Ensure you have audio files like images/audio/a.mp3, images/audio/b.mp3 etc.
                const audio = new Audio(`images/audio/${letter}.mp3`);
                audio.play().catch(e => console.error("Error playing audio:", e));

                // Update the message
                if (alphabetMessage) {
                    alphabetMessage.textContent = `${letter.toUpperCase()} is for ${word}!`;
                }
            }
        });
    }

    // Generic Play Button Click Listener (for placeholder buttons)
    // You'll replace these alerts with actual game/activity logic later
    document.querySelectorAll('.play-game-button, .play-audio-button, .explore-art-button, .view-collection-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent;
            alert(`You clicked: "${buttonText}"! This feature is coming soon!`);
            // Here's where you'd link to specific functions for each game/activity
            // e.g., if (buttonText === 'Play Dress-Up!') { startDressUpGame(); }
        });
    });

    // Handle "Read More" links
    document.querySelectorAll('.read-more-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the link from trying to navigate
            alert('Story/Fact detail coming soon! For now, enjoy the summary.');
            // In the future, this could open a modal with the full story or navigate to a story page.
        });
    });


    // Optional: A subtle fade-in for sections as they come into view
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of section visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0; // Start invisible
        section.style.transform = 'translateY(20px)'; // Start slightly below
        sectionObserver.observe(section);
    });
});