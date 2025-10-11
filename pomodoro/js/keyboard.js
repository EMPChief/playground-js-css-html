/**
 * Keyboard shortcuts handler
 * Provides keyboard accessibility for timer controls
 */

import { KEYBOARD_SHORTCUTS } from './config.js';

const shortcuts = new Map();
let enabled = true;

/**
 * Registers a keyboard shortcut
 * @param {string} key - Key to listen for
 * @param {Function} callback - Function to call when key is pressed
 * @param {string} description - Description of the shortcut
 */
export function registerShortcut(key, callback, description = '') {
  shortcuts.set(key.toLowerCase(), { callback, description });
}

/**
 * Unregisters a keyboard shortcut
 * @param {string} key - Key to remove
 */
export function unregisterShortcut(key) {
  shortcuts.delete(key.toLowerCase());
}

/**
 * Enables keyboard shortcuts
 */
export function enableShortcuts() {
  enabled = true;
}

/**
 * Disables keyboard shortcuts
 */
export function disableShortcuts() {
  enabled = false;
}

/**
 * Gets all registered shortcuts
 * @returns {Array} - Array of shortcut objects
 */
export function getShortcuts() {
  return Array.from(shortcuts.entries()).map(([key, data]) => ({
    key,
    ...data,
  }));
}

/**
 * Handles keyboard events
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyPress(event) {
  if (!enabled) return;

  // Don't trigger shortcuts when typing in input fields
  const tagName = event.target.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea') {
    return;
  }

  const key = event.key.toLowerCase();
  const shortcut = shortcuts.get(key);

  if (shortcut) {
    event.preventDefault();
    shortcut.callback(event);
  }
}

/**
 * Initializes keyboard shortcuts system
 */
export function initKeyboardShortcuts() {
  document.addEventListener('keydown', handleKeyPress);
}

/**
 * Shows keyboard shortcuts help modal
 */
export function showShortcutsHelp() {
  const existing = document.getElementById('shortcuts-help-modal');
  if (existing) {
    existing.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'shortcuts-help-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content shortcuts-modal">
      <div class="modal-header">
        <h2>Keyboard Shortcuts</h2>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        <table class="shortcuts-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${getShortcuts()
              .map(
                (shortcut) => `
              <tr>
                <td><kbd>${formatKey(shortcut.key)}</kbd></td>
                <td>${shortcut.description}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close on click outside or close button
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
      modal.remove();
    }
  });

  // Close on Escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
}

/**
 * Formats key name for display
 * @param {string} key - Key name
 * @returns {string} - Formatted key name
 */
function formatKey(key) {
  const keyMap = {
    ' ': 'Space',
    'delete': 'Delete',
    'enter': 'Enter',
    'escape': 'Esc',
    'arrowup': '↑',
    'arrowdown': '↓',
    'arrowleft': '←',
    'arrowright': '→',
  };

  return keyMap[key] || key.toUpperCase();
}
