/**
 * Utility Functions Module
 * Contains reusable utility functions
 */

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
