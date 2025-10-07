/**
 * Dark Mode Module
 * Handles dark mode toggle functionality
 */

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (!darkModeToggle) return;
    
    // Check if dark mode was previously enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    darkModeToggle.addEventListener('click', () => {
        // Toggle dark mode
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update icon
        updateDarkModeIcon(isDarkMode);
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });
}

function updateDarkModeIcon(isDarkMode) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const icon = darkModeToggle.querySelector('i');
    if (isDarkMode) {
        icon.classList.replace('bi-moon-stars', 'bi-sun');
    } else {
        icon.classList.replace('bi-sun', 'bi-moon-stars');
    }
}
