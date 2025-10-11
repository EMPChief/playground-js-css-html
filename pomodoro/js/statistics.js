/**
 * Statistics tracking for Pomodoro Timer
 * Tracks completed pomodoros, time spent, and task completion
 */

import { STORAGE_KEYS } from './config.js';
import { getFromStorage, setInStorage } from './utils.js';

/**
 * Gets today's date as YYYY-MM-DD string
 * @returns {string} - Today's date
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Gets current statistics from storage
 * @returns {Object} - Statistics object
 */
export function getStatistics() {
  const defaultStats = {
    totalPomodoros: 0,
    totalWorkTime: 0, // in seconds
    totalBreakTime: 0,
    tasksCompleted: 0,
    dailyStats: {},
    sessionHistory: [],
  };

  return getFromStorage(STORAGE_KEYS.STATISTICS, defaultStats);
}

/**
 * Records a completed pomodoro session
 * @param {string} type - Session type ('work', 'break', 'longbreak')
 * @param {number} duration - Duration in seconds
 */
export function recordSession(type, duration) {
  const stats = getStatistics();
  const today = getTodayDate();

  // Initialize today's stats if not exists
  if (!stats.dailyStats[today]) {
    stats.dailyStats[today] = {
      pomodoros: 0,
      workTime: 0,
      breakTime: 0,
      tasksCompleted: 0,
    };
  }

  // Update totals
  if (type === 'work') {
    stats.totalPomodoros++;
    stats.totalWorkTime += duration;
    stats.dailyStats[today].pomodoros++;
    stats.dailyStats[today].workTime += duration;
  } else {
    stats.totalBreakTime += duration;
    stats.dailyStats[today].breakTime += duration;
  }

  // Add to session history
  stats.sessionHistory.push({
    type,
    duration,
    timestamp: Date.now(),
    date: today,
  });

  // Keep only last 100 sessions in history
  if (stats.sessionHistory.length > 100) {
    stats.sessionHistory = stats.sessionHistory.slice(-100);
  }

  setInStorage(STORAGE_KEYS.STATISTICS, stats);
}

/**
 * Records a completed task
 */
export function recordTaskCompletion() {
  const stats = getStatistics();
  const today = getTodayDate();

  stats.tasksCompleted++;

  if (!stats.dailyStats[today]) {
    stats.dailyStats[today] = {
      pomodoros: 0,
      workTime: 0,
      breakTime: 0,
      tasksCompleted: 0,
    };
  }

  stats.dailyStats[today].tasksCompleted++;

  setInStorage(STORAGE_KEYS.STATISTICS, stats);
}

/**
 * Gets statistics for today
 * @returns {Object} - Today's statistics
 */
export function getTodayStats() {
  const stats = getStatistics();
  const today = getTodayDate();

  return stats.dailyStats[today] || {
    pomodoros: 0,
    workTime: 0,
    breakTime: 0,
    tasksCompleted: 0,
  };
}

/**
 * Gets statistics for the current week
 * @returns {Object} - Week's statistics
 */
export function getWeekStats() {
  const stats = getStatistics();
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  let pomodoros = 0;
  let workTime = 0;
  let breakTime = 0;
  let tasksCompleted = 0;

  Object.entries(stats.dailyStats).forEach(([date, data]) => {
    const statDate = new Date(date);
    if (statDate >= weekAgo && statDate <= today) {
      pomodoros += data.pomodoros || 0;
      workTime += data.workTime || 0;
      breakTime += data.breakTime || 0;
      tasksCompleted += data.tasksCompleted || 0;
    }
  });

  return { pomodoros, workTime, breakTime, tasksCompleted };
}

/**
 * Formats seconds into human-readable time
 * @param {number} seconds - Seconds to format
 * @returns {string} - Formatted time (e.g., "2h 30m")
 */
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Clears all statistics (with confirmation)
 * @returns {boolean} - Whether stats were cleared
 */
export function clearStatistics() {
  const defaultStats = {
    totalPomodoros: 0,
    totalWorkTime: 0,
    totalBreakTime: 0,
    tasksCompleted: 0,
    dailyStats: {},
    sessionHistory: [],
  };

  return setInStorage(STORAGE_KEYS.STATISTICS, defaultStats);
}

/**
 * Exports statistics as JSON
 * @returns {Object} - Statistics data
 */
export function exportStatistics() {
  return getStatistics();
}

/**
 * Imports statistics from JSON
 * @param {Object} data - Statistics data to import
 * @returns {boolean} - Success status
 */
export function importStatistics(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return setInStorage(STORAGE_KEYS.STATISTICS, data);
}
