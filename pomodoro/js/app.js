/**
 * Main Application Entry Point
 * Initializes all modules and sets up the Pomodoro Timer app
 */

import { initTimer, updateDurations } from './timer-new.js';
import { initTasks, decrementFirstTask, showAddTaskModal } from './tasks-new.js';
import { initSounds, toggleSound, isSoundOn } from './sounds-new.js';
import { initQuotes } from './quotes-new.js';
import { initNotifications } from './notifications.js';
import { initKeyboardShortcuts, registerShortcut, showShortcutsHelp } from './keyboard.js';
import { showStatsDashboard, showSettings, showSoundPreview } from './ui.js';
import { KEYBOARD_SHORTCUTS } from './config.js';
import { showNotification } from './utils.js';

/**
 * Initializes the entire application
 */
async function initApp() {
  console.log('🍅 Initializing Pomodoro Timer...');

  try {
    // Initialize sounds system
    await initSounds();
    console.log('✓ Sounds loaded');

    // Initialize quotes system
    await initQuotes();
    console.log('✓ Quotes loaded');

    // Initialize browser notifications
    await initNotifications();
    console.log('✓ Notifications initialized');

    // Initialize tasks system
    initTasks();
    console.log('✓ Tasks initialized');

    // Initialize timer (pass decrementFirstTask callback)
    initTimer(decrementFirstTask);
    console.log('✓ Timer initialized');

    // Initialize keyboard shortcuts
    setupKeyboardShortcuts();
    console.log('✓ Keyboard shortcuts ready');

    // Setup toolbar buttons
    setupToolbar();
    console.log('✓ Toolbar setup complete');

    // Setup sound toggle button
    setupSoundToggle();
    console.log('✓ Sound toggle ready');

    // Register service worker for PWA
    registerServiceWorker();

    console.log('✅ Pomodoro Timer ready!');
    showWelcomeMessage();
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showNotification('Failed to initialize some features', 'error');
  }
}

/**
 * Sets up keyboard shortcuts
 */
function setupKeyboardShortcuts() {
  initKeyboardShortcuts();

  // Register shortcuts
  registerShortcut(
    KEYBOARD_SHORTCUTS.START_PAUSE,
    () => {
      document.getElementById('start-button')?.click();
    },
    'Start/Pause timer'
  );

  registerShortcut(
    KEYBOARD_SHORTCUTS.RESET,
    () => {
      document.getElementById('reset-button')?.click();
    },
    'Reset timer'
  );

  registerShortcut(
    KEYBOARD_SHORTCUTS.TOGGLE_SOUND,
    () => {
      toggleSound();
      updateSoundIcon();
      showNotification(
        isSoundOn() ? 'Sound enabled' : 'Sound muted',
        'info'
      );
    },
    'Toggle sound'
  );

  registerShortcut(
    KEYBOARD_SHORTCUTS.TOGGLE_AUTO,
    () => {
      document.getElementById('auto-start-toggle')?.click();
    },
    'Toggle auto-start'
  );

  registerShortcut(
    KEYBOARD_SHORTCUTS.NEW_TASK,
    () => {
      showAddTaskModal();
    },
    'Open new task modal'
  );

  registerShortcut(
    '?',
    () => {
      showShortcutsHelp();
    },
    'Show keyboard shortcuts'
  );
}

/**
 * Sets up toolbar buttons
 */
function setupToolbar() {
  const toolbar = document.createElement('div');
  toolbar.className = 'pomodoro-toolbar';
  toolbar.innerHTML = `
    <button class="toolbar-btn" id="stats-btn" title="Statistics" aria-label="View statistics">
      <i class="fas fa-chart-bar"></i>
    </button>
    <button class="toolbar-btn" id="settings-btn" title="Settings" aria-label="Settings">
      <i class="fas fa-cog"></i>
    </button>
    <button class="toolbar-btn" id="sounds-btn" title="Sound Preview" aria-label="Preview sounds">
      <i class="fas fa-music"></i>
    </button>
    <button class="toolbar-btn" id="shortcuts-btn" title="Keyboard Shortcuts" aria-label="Show keyboard shortcuts">
      <i class="fas fa-keyboard"></i>
    </button>
  `;

  document.body.appendChild(toolbar);

  // Attach event listeners
  document.getElementById('stats-btn')?.addEventListener('click', showStatsDashboard);

  document.getElementById('settings-btn')?.addEventListener('click', () => {
    showSettings(null, (newDurations) => {
      updateDurations(newDurations);
    });
  });

  document.getElementById('sounds-btn')?.addEventListener('click', showSoundPreview);

  document.getElementById('shortcuts-btn')?.addEventListener('click', showShortcutsHelp);
}

/**
 * Sets up sound toggle button handler
 */
function setupSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    toggleSound();
    updateSoundIcon();
  });

  updateSoundIcon();
}

/**
 * Updates sound button icon
 */
function updateSoundIcon() {
  const soundBtn = document.getElementById('sound-toggle');
  if (!soundBtn) return;

  const icon = soundBtn.querySelector('i');
  if (icon) {
    icon.className = isSoundOn() ? 'fas fa-volume-up' : 'fas fa-volume-mute';
  }
}

/**
 * Shows welcome message
 */
function showWelcomeMessage() {
  const hasSeenWelcome = localStorage.getItem('pomodoroWelcomeSeen');
  if (hasSeenWelcome) return;

  setTimeout(() => {
    showNotification('Press ? for keyboard shortcuts', 'info', 5000);
    localStorage.setItem('pomodoroWelcomeSeen', 'true');
  }, 1000);
}

/**
 * Registers service worker for PWA functionality
 */
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');
      console.log('✓ Service Worker registered:', registration.scope);
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }
}

/**
 * Adds install prompt for PWA
 */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Show custom install button
  const installBtn = document.createElement('button');
  installBtn.className = 'toolbar-btn';
  installBtn.innerHTML = '<i class="fas fa-download"></i>';
  installBtn.title = 'Install App';
  installBtn.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      deferredPrompt = null;
      installBtn.remove();
    }
  };

  const toolbar = document.querySelector('.pomodoro-toolbar');
  if (toolbar) {
    toolbar.insertBefore(installBtn, toolbar.firstChild);
  }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Export for debugging
window.PomodoroApp = {
  initApp,
  showStatsDashboard,
  showSettings,
  showSoundPreview,
  showShortcutsHelp,
};
