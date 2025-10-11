/**
 * Sound notification system for Pomodoro timer
 * Refactored with ES6 modules and sound preview feature
 */

import { SOUND_PATH, SOUND_DB_PATH, STORAGE_KEYS } from './config.js';
import { getFromStorage, setInStorage, showNotification } from './utils.js';

const audioElement = new Audio();
let soundArray = [];
let isSoundEnabled = true;
let isLoaded = false;

/**
 * Initializes the sound system
 * @returns {Promise<void>}
 */
export async function initSounds() {
  // Load sound preference from storage
  isSoundEnabled = getFromStorage(STORAGE_KEYS.SOUND_ENABLED, true);

  // Load available sounds
  try {
    const response = await fetch(SOUND_DB_PATH);
    const data = await response.json();
    soundArray = data.sounds.map(file => `${SOUND_PATH}${file}`);
    isLoaded = true;
  } catch (error) {
    console.error('Failed to load sounds:', error);
    soundArray = [`${SOUND_PATH}mixkit-alert-alarm-1005.wav`];
    showNotification('Failed to load alarm sounds', 'warning');
  }
}

/**
 * Plays a random alarm sound
 * @returns {Promise<void>}
 */
export async function playRandomSound() {
  if (!isSoundEnabled || soundArray.length === 0) return;

  const randomIndex = Math.floor(Math.random() * soundArray.length);
  const selectedSound = soundArray[randomIndex];

  audioElement.src = selectedSound;

  try {
    await audioElement.play();
  } catch (error) {
    console.warn('Audio playback failed:', error);
    if (error.name === 'NotAllowedError') {
      showNotification('Please interact with the page to enable sounds', 'info');
    }
  }
}

/**
 * Plays a specific sound by index
 * @param {number} index - Sound index
 * @returns {Promise<void>}
 */
export async function playSound(index) {
  if (index < 0 || index >= soundArray.length) return;

  audioElement.src = soundArray[index];

  try {
    await audioElement.play();
  } catch (error) {
    console.warn('Audio playback failed:', error);
  }
}

/**
 * Stops current audio playback
 */
export function stopSound() {
  audioElement.pause();
  audioElement.currentTime = 0;
}

/**
 * Enables sound
 */
export function enableSound() {
  isSoundEnabled = true;
  setInStorage(STORAGE_KEYS.SOUND_ENABLED, true);
}

/**
 * Disables sound
 */
export function disableSound() {
  isSoundEnabled = false;
  setInStorage(STORAGE_KEYS.SOUND_ENABLED, false);
}

/**
 * Toggles sound on/off
 * @returns {boolean} - New sound state
 */
export function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  setInStorage(STORAGE_KEYS.SOUND_ENABLED, isSoundEnabled);
  return isSoundEnabled;
}

/**
 * Checks if sound is enabled
 * @returns {boolean}
 */
export function isSoundOn() {
  return isSoundEnabled;
}

/**
 * Gets all available sounds
 * @returns {Array<string>} - Array of sound file paths
 */
export function getAllSounds() {
  return [...soundArray];
}

/**
 * Gets sound file name from path
 * @param {string} path - Sound file path
 * @returns {string} - Sound file name
 */
export function getSoundName(path) {
  return path.split('/').pop().replace(/\.[^/.]+$/, '').replace(/-/g, ' ');
}
