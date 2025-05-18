document.addEventListener('DOMContentLoaded', function() {
    // Inject navbar and footer
    injectNavbar();
    injectFooter();
    
    // Randomize profile pictures
    randomizeProfilePictures();
    
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
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
    
    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.replace('bi-moon-stars', 'bi-sun');
        } else {
            icon.classList.replace('bi-sun', 'bi-moon-stars');
        }
    }
    
    // Function to randomize profile pictures across the site
    function randomizeProfilePictures() {
        // Array of profile picture paths
        const profilePictures = [
            "logo/profile1.jpg",
            "logo/profile2.jpg",
            "logo/profile3.jpg"
        ];
        
        // Helper function to get a random profile picture
        function getRandomProfilePic() {
            const randomIndex = Math.floor(Math.random() * profilePictures.length);
            return profilePictures[randomIndex];
        }
        
        // Get all profile image elements
        const profileImages = document.querySelectorAll('.profile-image');
        
        // For each profile image, set a random image from the array
        profileImages.forEach(img => {
            img.src = getRandomProfilePic();
            
            // Add click event to change the image when clicked
            img.style.cursor = 'pointer';
            
            // Add title attribute for better UX
            img.title = 'Click to change profile picture';
            
            // Add click event listener
            img.addEventListener('click', function() {
                // Add a small animation effect
                this.style.transition = 'transform 0.3s ease';
                this.style.transform = 'scale(0.8)';
                
                // Set new random image
                setTimeout(() => {
                    this.src = getRandomProfilePic();
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
    
    // Navbar scroll behavior
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Function to inject navbar
    function injectNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) return;
        
        // Get current page to highlight active nav link
        const currentPage = window.location.pathname.split('/').pop();
        
        // Navbar HTML
        const navbarHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <img src="logo/favicon-32x32.png" alt="Logo" width="32" height="32" class="d-inline-block align-text-top me-2">
                        Professional Portfolio
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'about.html' ? 'active' : ''}" href="about.html">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'javaplay.html' ? 'active' : ''}" href="javaplay.html">Projects</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'resume.html' ? 'active' : ''}" href="resume.html">Resume</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}" href="contact.html">Contact</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../index.html"><i class="bi bi-arrow-left"></i> Back to Main</a>
                            </li>
                            <li class="nav-item">
                                <button class="btn btn-sm btn-outline-light ms-2" id="darkModeToggle">
                                    <i class="bi bi-moon-stars"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        
        navbarContainer.innerHTML = navbarHTML;
    }
    
    // Function to inject footer
    function injectFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;
        
        // Footer HTML
        const footerHTML = `
            <footer class="footer py-4">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-4 text-center text-md-start">
                            <span class="copyright">© ${new Date().getFullYear()} Bjørn-Magne Kristensen</span>
                        </div>
                        <div class="col-md-4 text-center">
                            <ul class="social-buttons list-inline mb-0">
                                <li class="list-inline-item">
                                    <a href="https://github.com/EMPChief" class="btn btn-outline-light btn-social">
                                        <i class="bi bi-github"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="https://www.linkedin.com/in/bjørn-magne-kristensen-884b2a225/" class="btn btn-outline-light btn-social">
                                        <i class="bi bi-linkedin"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-4 text-center text-md-end">
                            <p>
                                <small>Industrial Professional & Developer</small>
                            </p>
                            <a href="../index.html" class="text-white text-decoration-none">
                                <small><i class="bi bi-arrow-left"></i> Return to Main Portfolio</small>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        footerContainer.innerHTML = footerHTML;
    }
});

// ======= UTILITY FUNCTIONS =======

/**
 * Validates if the input is a valid number
 * @param {string|number} value - The value to check
 * @returns {boolean} - True if valid number, false otherwise
 */
function validateNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
}

/**
 * Formats a number to a specified number of decimal places
 * @param {number} value - The number to format
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} - Formatted number as string
 */
function formatNumber(value, decimals = 2) {
    if (typeof value !== 'number') return value;
    return value.toFixed(decimals);
}

/**
 * Animates an element with a scale effect
 * @param {HTMLElement} element - The element to animate
 * @param {string} text - Text to set in the element
 * @param {string} [color='#0d6efd'] - Color during animation
 * @param {number} [duration=200] - Animation duration in ms
 */
function animateElement(element, text, color = '#0d6efd', duration = 200) {
    element.style.transform = 'scale(1.1)';
    element.style.color = color;
    element.textContent = text;
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, duration);
}

/**
 * Generates a random color in hexadecimal format
 * @returns {string} - Random color in hex format (#RRGGBB)
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Checks if the current color is light or dark
 * @param {string} color - Hex color code
 * @returns {boolean} - True if light, false if dark
 */
function isLightColor(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
}

/**
 * Creates an event listener for input filter
 * @param {string} inputId - ID of the input element
 * @param {string} targetId - ID of the element to filter
 * @param {Function} filterFn - Custom filter function
 */
function createFilterListener(inputId, targetId, filterFn) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) return;
    
    inputElement.addEventListener('input', function() {
        const value = this.value.trim().toLowerCase();
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        filterFn(targetElement, value);
    });
} 