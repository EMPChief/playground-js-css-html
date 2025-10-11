/**
 * LocalStorage persistence for timer state and tasks
 * Refactored with ES6 modules and better error handling
 */

import { STORAGE_KEYS, TIMER_CONFIG, PHASE_TYPES } from './config.js';
import { getFromStorage, setInStorage, escapeHtml } from './utils.js';

/**
 * Saves current timer state to localStorage
 * @param {Object} state - Timer state object
 * @returns {boolean} - Success status
 */
export function saveTimerState(state) {
  return setInStorage(STORAGE_KEYS.TIMER_STATE, {
    timeLeft: state.timeLeft,
    isRunning: state.isRunning,
    currentPhase: state.currentPhase,
    pomodoroCount: state.pomodoroCount,
    workSecondsElapsed: state.workSecondsElapsed || 0,
    autoStartEnabled: state.autoStartEnabled !== undefined ? state.autoStartEnabled : true,
  });
}

/**
 * Loads saved timer state from localStorage
 * @returns {Object|null} - Saved state or null
 */
export function loadTimerState() {
  const defaultState = {
    timeLeft: TIMER_CONFIG.WORK_DURATION,
    isRunning: false,
    currentPhase: PHASE_TYPES.WORK,
    pomodoroCount: 0,
    workSecondsElapsed: 0,
    autoStartEnabled: true,
  };

  return getFromStorage(STORAGE_KEYS.TIMER_STATE, defaultState);
}

/**
 * Saves all tasks to localStorage
 * @param {Array} tasks - Array of task objects
 * @returns {boolean} - Success status
 */
export function saveTasks(tasks) {
  const taskData = tasks.map(task => ({
    id: task.id,
    text: task.text,
    count: task.count,
    category: task.category || 'OTHER',
    notes: task.notes || '',
    createdAt: task.createdAt || Date.now(),
  }));

  return setInStorage(STORAGE_KEYS.TASKS, taskData);
}

/**
 * Loads saved tasks from localStorage
 * @returns {Array} - Array of task objects
 */
export function loadTasks() {
  return getFromStorage(STORAGE_KEYS.TASKS, []);
}

/**
 * Saves custom timer durations
 * @param {Object} durations - Custom durations object
 * @returns {boolean} - Success status
 */
export function saveTimerDurations(durations) {
  return setInStorage(STORAGE_KEYS.TIMER_DURATIONS, durations);
}

/**
 * Loads custom timer durations
 * @returns {Object} - Custom durations or defaults
 */
export function loadTimerDurations() {
  return getFromStorage(STORAGE_KEYS.TIMER_DURATIONS, {
    work: TIMER_CONFIG.WORK_DURATION,
    break: TIMER_CONFIG.BREAK_DURATION,
    longBreak: TIMER_CONFIG.LONG_BREAK_DURATION,
  });
}

/**
 * Saves application settings
 * @param {Object} settings - Settings object
 * @returns {boolean} - Success status
 */
export function saveSettings(settings) {
  return setInStorage(STORAGE_KEYS.SETTINGS, settings);
}

/**
 * Loads application settings
 * @returns {Object} - Settings object
 */
export function loadSettings() {
  return getFromStorage(STORAGE_KEYS.SETTINGS, {
    soundEnabled: true,
    notificationsEnabled: true,
    autoStartEnabled: true,
    theme: 'auto',
  });
}

/**
 * Exports all data for backup
 * @returns {Object} - All application data
 */
export function exportAllData() {
  return {
    version: '2.0',
    exportDate: new Date().toISOString(),
    timerState: loadTimerState(),
    tasks: loadTasks(),
    durations: loadTimerDurations(),
    settings: loadSettings(),
    statistics: getFromStorage(STORAGE_KEYS.STATISTICS, {}),
  };
}

/**
 * Imports data from backup
 * @param {Object} data - Data to import
 * @returns {boolean} - Success status
 */
export function importAllData(data) {
  if (!data || !data.version) {
    return false;
  }

  try {
    if (data.timerState) saveTimerState(data.timerState);
    if (data.tasks) saveTasks(data.tasks);
    if (data.durations) saveTimerDurations(data.durations);
    if (data.settings) saveSettings(data.settings);
    if (data.statistics) {
      setInStorage(STORAGE_KEYS.STATISTICS, data.statistics);
    }
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
}

/**
 * Clears all application data
 * @returns {boolean} - Success status
 */
export function clearAllData() {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Failed to clear data:', error);
    return false;
  }
}
