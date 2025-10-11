/**
 * UI Components for Pomodoro Timer
 * Handles all modal dialogs, dashboards, and UI interactions
 */

import { BREAK_SUGGESTIONS, TASK_CATEGORIES } from './config.js';
import {
  getStatistics,
  getTodayStats,
  getWeekStats,
  formatDuration,
  clearStatistics,
} from './statistics.js';
import { downloadJSON, readJSONFile, showNotification, escapeHtml } from './utils.js';
import { exportAllData, importAllData, loadTimerDurations, saveTimerDurations } from './storage-new.js';
import { getAllSounds, getSoundName, playSound } from './sounds-new.js';
import { getShortcuts } from './keyboard.js';

/**
 * Shows a modal dialog
 * @param {string} title - Modal title
 * @param {string} content - Modal HTML content
 * @param {Function} onClose - Optional close callback
 * @returns {HTMLElement} - Modal element
 */
export function showModal(title, content, onClose = null) {
  // Remove existing modal if any
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${escapeHtml(title)}</h2>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  const closeModal = () => {
    modal.remove();
    if (onClose) onClose();
  };

  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  return modal;
}

/**
 * Shows statistics dashboard
 */
export function showStatsDashboard() {
  const stats = getStatistics();
  const today = getTodayStats();
  const week = getWeekStats();

  const content = `
    <div class="stats-dashboard">
      <h3><i class="fas fa-calendar-day"></i> Today</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <i class="fas fa-clock"></i>
          <div class="stat-value">${today.pomodoros}</div>
          <div class="stat-label">Pomodoros</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-hourglass-half"></i>
          <div class="stat-value">${formatDuration(today.workTime)}</div>
          <div class="stat-label">Work Time</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-coffee"></i>
          <div class="stat-value">${formatDuration(today.breakTime)}</div>
          <div class="stat-label">Break Time</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-check-circle"></i>
          <div class="stat-value">${today.tasksCompleted}</div>
          <div class="stat-label">Tasks Done</div>
        </div>
      </div>

      <h3><i class="fas fa-calendar-week"></i> This Week</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <i class="fas fa-clock"></i>
          <div class="stat-value">${week.pomodoros}</div>
          <div class="stat-label">Pomodoros</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-hourglass-half"></i>
          <div class="stat-value">${formatDuration(week.workTime)}</div>
          <div class="stat-label">Work Time</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-check-circle"></i>
          <div class="stat-value">${week.tasksCompleted}</div>
          <div class="stat-label">Tasks Done</div>
        </div>
      </div>

      <h3><i class="fas fa-chart-line"></i> All Time</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <i class="fas fa-clock"></i>
          <div class="stat-value">${stats.totalPomodoros}</div>
          <div class="stat-label">Total Pomodoros</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-hourglass-half"></i>
          <div class="stat-value">${formatDuration(stats.totalWorkTime)}</div>
          <div class="stat-label">Total Work Time</div>
        </div>
        <div class="stat-card">
          <i class="fas fa-check-circle"></i>
          <div class="stat-value">${stats.tasksCompleted}</div>
          <div class="stat-label">Tasks Completed</div>
        </div>
      </div>

      <div class="export-import-buttons">
        <button class="btn-secondary" id="export-stats-btn">
          <i class="fas fa-download"></i> Export Data
        </button>
        <button class="btn-secondary" id="import-stats-btn">
          <i class="fas fa-upload"></i> Import Data
        </button>
        <button class="btn-secondary" id="clear-stats-btn">
          <i class="fas fa-trash"></i> Clear Statistics
        </button>
      </div>
      <input type="file" id="import-file-input" accept=".json" style="display:none">
    </div>
  `;

  const modal = showModal('Statistics', content);

  // Export handler
  modal.querySelector('#export-stats-btn').addEventListener('click', () => {
    const data = exportAllData();
    const filename = `pomodoro-backup-${new Date().toISOString().split('T')[0]}.json`;
    downloadJSON(data, filename);
    showNotification('Data exported successfully!', 'success');
  });

  // Import handler
  const fileInput = modal.querySelector('#import-file-input');
  modal.querySelector('#import-stats-btn').addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await readJSONFile(file);
      if (importAllData(data)) {
        showNotification('Data imported successfully! Please refresh the page.', 'success');
        setTimeout(() => location.reload(), 2000);
      } else {
        showNotification('Invalid data format', 'error');
      }
    } catch (error) {
      showNotification('Failed to import data', 'error');
    }
  });

  // Clear stats handler
  modal.querySelector('#clear-stats-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all statistics? This cannot be undone.')) {
      clearStatistics();
      showNotification('Statistics cleared', 'success');
      modal.remove();
      showStatsDashboard();
    }
  });
}

/**
 * Shows settings panel
 * @param {Object} currentDurations - Current timer durations
 * @param {Function} onSave - Save callback
 */
export function showSettings(currentDurations, onSave) {
  const durations = currentDurations || loadTimerDurations();

  const content = `
    <div class="settings-panel">
      <div class="settings-section">
        <h3><i class="fas fa-clock"></i> Timer Durations</h3>

        <div class="setting-item">
          <div class="setting-label">Work Session (minutes)</div>
          <input type="number" class="setting-input" id="work-duration"
                 value="${Math.floor(durations.work / 60)}" min="1" max="60">
        </div>

        <div class="setting-item">
          <div class="setting-label">Short Break (minutes)</div>
          <input type="number" class="setting-input" id="break-duration"
                 value="${Math.floor(durations.break / 60)}" min="1" max="30">
        </div>

        <div class="setting-item">
          <div class="setting-label">Long Break (minutes)</div>
          <input type="number" class="setting-input" id="longbreak-duration"
                 value="${Math.floor(durations.longBreak / 60)}" min="1" max="60">
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" id="reset-durations-btn">
          <i class="fas fa-undo"></i> Reset to Default
        </button>
        <button class="pomodoro-btn pomodoro-btn-start" id="save-settings-btn">
          <i class="fas fa-save"></i> Save Settings
        </button>
      </div>
    </div>
  `;

  const modal = showModal('Settings', content);

  // Save handler
  modal.querySelector('#save-settings-btn').addEventListener('click', () => {
    const newDurations = {
      work: parseInt(modal.querySelector('#work-duration').value) * 60,
      break: parseInt(modal.querySelector('#break-duration').value) * 60,
      longBreak: parseInt(modal.querySelector('#longbreak-duration').value) * 60,
    };

    saveTimerDurations(newDurations);
    showNotification('Settings saved!', 'success');
    modal.remove();

    if (onSave) onSave(newDurations);
  });

  // Reset handler
  modal.querySelector('#reset-durations-btn').addEventListener('click', () => {
    modal.querySelector('#work-duration').value = 25;
    modal.querySelector('#break-duration').value = 5;
    modal.querySelector('#longbreak-duration').value = 15;
  });
}

/**
 * Shows sound preview panel
 */
export function showSoundPreview() {
  const sounds = getAllSounds();

  const soundsHTML = sounds.map((sound, index) => `
    <div class="setting-item" style="cursor: pointer;" data-sound-index="${index}">
      <div class="setting-label">
        <i class="fas fa-music"></i> ${escapeHtml(getSoundName(sound))}
      </div>
      <button class="btn-secondary preview-sound-btn" data-index="${index}">
        <i class="fas fa-play"></i> Preview
      </button>
    </div>
  `).join('');

  const content = `
    <div class="sound-preview-panel">
      <p style="margin-bottom: 20px; color: rgba(255,255,255,0.9);">
        Click any sound to preview it. The alarm will play a random sound each time.
      </p>
      ${soundsHTML}
    </div>
  `;

  const modal = showModal('Alarm Sounds', content);

  // Add click handlers
  modal.querySelectorAll('.preview-sound-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      playSound(index);
    });
  });
}

/**
 * Shows a random break suggestion
 * @returns {string} - Suggestion text
 */
export function showBreakSuggestion() {
  const suggestion = BREAK_SUGGESTIONS[Math.floor(Math.random() * BREAK_SUGGESTIONS.length)];
  const element = document.getElementById('break-suggestion');

  if (element) {
    element.innerHTML = `
      <div class="break-suggestion">
        <div class="break-suggestion-icon">${suggestion.icon}</div>
        <div class="break-suggestion-text">${suggestion.text}</div>
      </div>
    `;
  }

  return suggestion.text;
}

/**
 * Clears break suggestion
 */
export function clearBreakSuggestion() {
  const element = document.getElementById('break-suggestion');
  if (element) {
    element.innerHTML = '';
  }
}

/**
 * Shows celebration animation
 */
export function celebrate() {
  const colors = ['#38ef7d', '#667eea', '#f093fb', '#4facfe', '#00f2fe'];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.3 + 's';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}

/**
 * Updates document title with timer
 * @param {string} time - Time string (MM:SS)
 * @param {string} phase - Current phase
 */
export function updatePageTitle(time, phase) {
  document.title = `${time} - ${phase} | Pomodoro Timer`;
}

/**
 * Resets document title
 */
export function resetPageTitle() {
  document.title = 'Pomodoro Timer';
}

/**
 * Creates and shows undo notification
 * @param {string} message - Message text
 * @param {Function} onUndo - Undo callback
 */
export function showUndoNotification(message, onUndo) {
  const existing = document.querySelector('.custom-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'custom-notification notification-info';
  notification.innerHTML = `
    <div class="undo-notification">
      <span>${escapeHtml(message)}</span>
      <button class="undo-btn">Undo</button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    max-width: 350px;
  `;

  document.body.appendChild(notification);

  notification.querySelector('.undo-btn').addEventListener('click', () => {
    onUndo();
    notification.remove();
  });

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}
