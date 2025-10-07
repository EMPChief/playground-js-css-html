/**
 * Main Common Module
 * Initializes all components and modules
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inject navbar and footer
    injectNavbar();
    injectFooter();
    
    // Initialize navbar scroll behavior
    initializeNavbarScroll();
    
    // Randomize profile pictures
    randomizeProfilePictures();
    
    // Initialize dark mode
    initializeDarkMode();
});
