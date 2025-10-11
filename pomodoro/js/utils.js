/**
 * Shared utility functions for Pomodoro Timer
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - Escaped text safe for HTML insertion
 */
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Formats seconds into MM:SS display format
 * @param {number} seconds - Total seconds to format
 * @returns {string} - Formatted time string (e.g., "25:00")
 */
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Shows a user-friendly notification message
 * @param {string} message - Message to display
 * @param {string} type - Notification type ('success', 'error', 'info', 'warning')
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export function showNotification(message, type = 'info', duration = 3000) {
  // Remove existing notification if any
  const existing = document.querySelector('.custom-notification');
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement('div');
  notification.className = `custom-notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${getNotificationColor(type)};
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    max-width: 300px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * Gets notification background color based on type
 * @param {string} type - Notification type
 * @returns {string} - CSS background gradient
 */
function getNotificationColor(type) {
  const colors = {
    success: 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)',
    error: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    warning: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  };
  return colors[type] || colors.info;
}

/**
 * Safely gets item from localStorage with error handling
 * @param {string} key - localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist or error occurs
 * @returns {*} - Parsed value or default
 */
export function getFromStorage(key, defaultValue = null) {
  try {
    if (typeof localStorage === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to get ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely sets item in localStorage with error handling
 * @param {string} key - localStorage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} - Success status
 */
export function setInStorage(key, value) {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      showNotification('Storage quota exceeded. Please clear some data.', 'error');
    } else {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
    return false;
  }
}

/**
 * Requests browser notification permission
 * @returns {Promise<boolean>} - Whether permission was granted
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('Browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Shows a browser notification
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {string} icon - Icon URL
 */
export function showBrowserNotification(title, body, icon) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification(title, {
    body,
    icon,
    badge: icon,
    silent: false,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

/**
 * Generates a unique ID
 * @returns {string} - Unique identifier
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Downloads data as a JSON file
 * @param {*} data - Data to export
 * @param {string} filename - Name of the file
 */
export function downloadJSON(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Reads and parses JSON file from file input
 * @param {File} file - File object to read
 * @returns {Promise<*>} - Parsed JSON data
 */
export function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Checks if the device is in dark mode
 * @returns {boolean} - True if dark mode is preferred
 */
export function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Checks if the device prefers reduced motion
 * @returns {boolean} - True if reduced motion is preferred
 */
export function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Adds CSS animations if user doesn't prefer reduced motion
 */
export function addAnimationStyles() {
  if (document.querySelector('#animation-styles')) return;

  const style = document.createElement('style');
  style.id = 'animation-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    @keyframes celebrate {
      0%, 100% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.2) rotate(5deg); }
      75% { transform: scale(1.2) rotate(-5deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
}

// Initialize animations
if (!prefersReducedMotion()) {
  addAnimationStyles();
}
