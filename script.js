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

    // Add a simple hover class for fun - pure CSS is better for most hover effects,
    // but this demonstrates JS interaction for more complex needs later.
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'var(--primary-button-hover)'; // Direct style for demo
        });
        button.addEventListener('mouseout', () => {
            // Reset to original color (or what CSS defines)
            button.style.backgroundColor = ''; // Remove inline style to let CSS take over
        });
    });

    // Optional: A subtle fade-in for sections as they come into view (more advanced)
    // This requires Intersection Observer API, but for now, just an idea.
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