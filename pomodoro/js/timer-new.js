/**
 * Enhanced Pomodoro Timer with all new features
 * ES6 module with notifications, statistics, pause breaks, and more
 */

import { TIMER_CONFIG, PHASE_TYPES, PHASE_LABELS, PHASE_CLASSES } from './config.js';
import { formatTime, showNotification } from './utils.js';
import { saveTimerState, loadTimerState, loadTimerDurations } from './storage-new.js';
import { playRandomSound } from './sounds-new.js';
import { recordSession } from './statistics.js';
import { notifyWorkComplete, notifyBreakComplete } from './notifications.js';
import { updatePageTitle, resetPageTitle, showBreakSuggestion, clearBreakSuggestion } from './ui.js';

// DOM Elements (will be cached)
let startElement, resetElement, timerElement, phaseElement, autoStartToggle, progressCircle;

// Timer state
let interval = null;
let timeLeft = TIMER_CONFIG.WORK_DURATION;
let sessionDuration = TIMER_CONFIG.WORK_DURATION;
let isRunning = false;
let currentPhase = PHASE_TYPES.WORK;
let pomodoroCount = 0;
let workSecondsElapsed = 0;
let autoStartEnabled = true;
let customDurations = null;

// Task decrement callback
let decrementTaskCallback = null;

/**
 * Initializes the timer system
 * @param {Function} taskDecrementFn - Callback to decrement first task
 */
export function initTimer(taskDecrementFn = null) {
  // Cache DOM elements
  startElement = document.getElementById('start-button');
  resetElement = document.getElementById('reset-button');
  timerElement = document.getElementById('timer');
  phaseElement = document.getElementById('phase-indicator');
  autoStartToggle = document.getElementById('auto-start-toggle');
  progressCircle = document.getElementById('progress-circle-fill');

  decrementTaskCallback = taskDecrementFn;

  // Load custom durations
  customDurations = loadTimerDurations();

  // Attach event listeners
  if (startElement) {
    startElement.addEventListener('click', toggleTimer);
  }

  if (resetElement) {
    resetElement.addEventListener('click', resetTimer);
  }

  if (autoStartToggle) {
    autoStartToggle.addEventListener('click', toggleAutoStart);
    updateAutoStartButton();
  }

  // Load saved state
  const savedState = loadTimerState();
  if (savedState) {
    timeLeft = savedState.timeLeft;
    currentPhase = savedState.currentPhase;
    pomodoroCount = savedState.pomodoroCount;
    workSecondsElapsed = savedState.workSecondsElapsed || 0;
    autoStartEnabled = savedState.autoStartEnabled !== undefined ? savedState.autoStartEnabled : true;
    sessionDuration = getDurationForPhase(currentPhase);

    updatePhaseDisplay();
    updateTimerDisplay();
    updateAutoStartButton();
  }

  updateProgressCircle();
}

/**
 * Gets duration for a specific phase
 * @param {string} phase - Phase type
 * @returns {number} - Duration in seconds
 */
function getDurationForPhase(phase) {
  if (!customDurations) {
    customDurations = loadTimerDurations();
  }

  switch (phase) {
    case PHASE_TYPES.WORK:
      return customDurations.work || TIMER_CONFIG.WORK_DURATION;
    case PHASE_TYPES.BREAK:
      return customDurations.break || TIMER_CONFIG.BREAK_DURATION;
    case PHASE_TYPES.LONG_BREAK:
      return customDurations.longBreak || TIMER_CONFIG.LONG_BREAK_DURATION;
    default:
      return TIMER_CONFIG.WORK_DURATION;
  }
}

/**
 * Toggles timer between running and paused
 */
export function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

/**
 * Starts the timer countdown
 */
export function startTimer() {
  if (isRunning) return;

  isRunning = true;

  if (startElement) {
    startElement.innerHTML = '<i class="fas fa-pause"></i> Pause';
    startElement.classList.remove('pomodoro-btn-start');
    startElement.classList.add('pomodoro-btn-pause');
  }

  interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;

      // Track work seconds for task decrement
      if (currentPhase === PHASE_TYPES.WORK) {
        workSecondsElapsed++;

        // Decrement task every 2.5 minutes
        if (workSecondsElapsed >= TIMER_CONFIG.TASK_DECREMENT_INTERVAL) {
          if (decrementTaskCallback) {
            decrementTaskCallback();
          }
          workSecondsElapsed = 0;
        }
      }

      updateTimerDisplay();
      updateProgressCircle();
      updatePageTitle(formatTime(timeLeft), PHASE_LABELS[currentPhase]);
      saveState();
    } else {
      completeSession();
    }
  }, 1000);
}

/**
 * Pauses the timer
 */
export function pauseTimer() {
  isRunning = false;
  clearInterval(interval);

  if (startElement) {
    startElement.innerHTML = '<i class="fas fa-play"></i> Start';
    startElement.classList.remove('pomodoro-btn-pause');
    startElement.classList.add('pomodoro-btn-start');
  }

  saveState();
}

/**
 * Resets timer to initial work phase
 */
export function resetTimer() {
  pauseTimer();
  currentPhase = PHASE_TYPES.WORK;
  sessionDuration = getDurationForPhase(currentPhase);
  timeLeft = sessionDuration;
  pomodoroCount = 0;
  workSecondsElapsed = 0;

  updatePhaseDisplay();
  updateTimerDisplay();
  updateProgressCircle();
  resetPageTitle();
  clearBreakSuggestion();

  saveState();
}

/**
 * Updates the timer display
 */
function updateTimerDisplay() {
  if (timerElement) {
    timerElement.textContent = formatTime(timeLeft);
  }
}

/**
 * Updates the phase indicator display
 */
function updatePhaseDisplay() {
  if (phaseElement) {
    phaseElement.textContent = PHASE_LABELS[currentPhase];
    phaseElement.className = `pomodoro-phase-badge ${PHASE_CLASSES[currentPhase]}`;
  }
}

/**
 * Updates circular progress indicator
 */
function updateProgressCircle() {
  if (!progressCircle) return;

  const circumference = 2 * Math.PI * 130; // radius = 130
  const progress = timeLeft / sessionDuration;
  const offset = circumference * (1 - progress);

  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = offset;
}

/**
 * Completes current session and switches phase
 */
function completeSession() {
  clearInterval(interval);
  isRunning = false;

  // Record session in statistics
  const phaseType = currentPhase === PHASE_TYPES.WORK ? 'work' :
                    currentPhase === PHASE_TYPES.BREAK ? 'break' : 'longbreak';
  recordSession(phaseType, sessionDuration);

  // Play sound
  playRandomSound();

  // Send notification
  if (currentPhase === PHASE_TYPES.WORK) {
    notifyWorkComplete();
  } else {
    notifyBreakComplete();
  }

  // Switch to next phase
  switchPhase();
}

/**
 * Switches to the next phase
 */
function switchPhase() {
  if (currentPhase === PHASE_TYPES.WORK) {
    pomodoroCount++;
    workSecondsElapsed = 0;

    // Determine break type
    if (pomodoroCount % TIMER_CONFIG.POMODOROS_UNTIL_LONG_BREAK === 0) {
      currentPhase = PHASE_TYPES.LONG_BREAK;
    } else {
      currentPhase = PHASE_TYPES.BREAK;
    }

    // Show break suggestion
    if (currentPhase === PHASE_TYPES.BREAK || currentPhase === PHASE_TYPES.LONG_BREAK) {
      showBreakSuggestion();
    }
  } else {
    currentPhase = PHASE_TYPES.WORK;
    clearBreakSuggestion();
  }

  sessionDuration = getDurationForPhase(currentPhase);
  timeLeft = sessionDuration;

  updatePhaseDisplay();
  updateTimerDisplay();
  updateProgressCircle();

  // Auto-start next phase if enabled
  if (autoStartEnabled) {
    startTimer();
  } else {
    if (startElement) {
      startElement.innerHTML = '<i class="fas fa-play"></i> Start';
      startElement.classList.remove('pomodoro-btn-pause');
      startElement.classList.add('pomodoro-btn-start');
    }

    updatePageTitle(formatTime(timeLeft), PHASE_LABELS[currentPhase]);
    showNotification(`${PHASE_LABELS[currentPhase]} ready to start!`, 'info');
  }

  saveState();
}

/**
 * Toggles auto-start mode
 */
function toggleAutoStart() {
  autoStartEnabled = !autoStartEnabled;
  updateAutoStartButton();
  saveState();
}

/**
 * Updates auto-start button appearance
 */
function updateAutoStartButton() {
  if (!autoStartToggle) return;

  if (autoStartEnabled) {
    autoStartToggle.classList.remove('pomodoro-btn-auto-off');
    autoStartToggle.classList.add('pomodoro-btn-auto');
    autoStartToggle.innerHTML = '<i class="fas fa-forward"></i> Auto';
  } else {
    autoStartToggle.classList.remove('pomodoro-btn-auto');
    autoStartToggle.classList.add('pomodoro-btn-auto-off');
    autoStartToggle.innerHTML = '<i class="fas fa-forward"></i> Manual';
  }
}

/**
 * Saves current timer state
 */
function saveState() {
  saveTimerState({
    timeLeft,
    isRunning,
    currentPhase,
    pomodoroCount,
    workSecondsElapsed,
    autoStartEnabled,
  });
}

/**
 * Updates custom durations and resets timer if needed
 * @param {Object} newDurations - New custom durations
 */
export function updateDurations(newDurations) {
  customDurations = newDurations;

  // If timer is not running and we're at the start of a phase, update duration
  if (!isRunning && timeLeft === sessionDuration) {
    sessionDuration = getDurationForPhase(currentPhase);
    timeLeft = sessionDuration;
    updateTimerDisplay();
    updateProgressCircle();
    saveState();
  }

  showNotification('Timer durations updated!', 'success');
}

/**
 * Gets current timer state (for external access)
 * @returns {Object} - Current state
 */
export function getTimerState() {
  return {
    timeLeft,
    isRunning,
    currentPhase,
    pomodoroCount,
    workSecondsElapsed,
    autoStartEnabled,
    sessionDuration,
  };
}

/**
 * Gets current pomodoro count
 * @returns {number} - Pomodoro count
 */
export function getPomodoroCount() {
  return pomodoroCount;
}

/**
 * Checks if timer is currently running
 * @returns {boolean} - Running status
 */
export function isTimerRunning() {
  return isRunning;
}
