/**
 * Configuration constants for Pomodoro Timer
 * All time values are in seconds unless otherwise specified
 */

export const TIMER_CONFIG = {
  WORK_DURATION: 25 * 60,
  BREAK_DURATION: 5 * 60,
  LONG_BREAK_DURATION: 15 * 60,
  POMODOROS_UNTIL_LONG_BREAK: 4,
  TASK_DECREMENT_INTERVAL: 150, // 2.5 minutes in seconds
  TASK_DECREMENT_AMOUNT: 0.1,
  MIN_TASK_POMODOROS: 0.1,
  POMODORO_INCREMENT: 0.1,
};

export const PHASE_TYPES = {
  WORK: 'Work',
  BREAK: 'Break',
  LONG_BREAK: 'LongBreak',
};

export const PHASE_LABELS = {
  [PHASE_TYPES.WORK]: 'Working',
  [PHASE_TYPES.BREAK]: 'Break',
  [PHASE_TYPES.LONG_BREAK]: 'Long Break',
};

export const PHASE_CLASSES = {
  [PHASE_TYPES.WORK]: 'phase-work',
  [PHASE_TYPES.BREAK]: 'phase-break',
  [PHASE_TYPES.LONG_BREAK]: 'phase-longbreak',
};

export const STORAGE_KEYS = {
  TIMER_STATE: 'pomodoroState',
  TASKS: 'pomodoroTasks',
  SOUND_ENABLED: 'pomodoroSoundEnabled',
  TIMER_DURATIONS: 'pomodoroTimerDurations',
  STATISTICS: 'pomodoroStatistics',
  THEME: 'pomodoroTheme',
  SESSION_HISTORY: 'pomodoroSessionHistory',
  SETTINGS: 'pomodoroSettings',
};

export const QUOTE_ROTATION = {
  MIN_MINUTES: 1,
  MAX_MINUTES: 5,
};

export const SOUND_PATH = 'assets/sound/';
export const SOUND_DB_PATH = 'db/sounds.json';
export const QUOTES_DB_PATH = 'db/quotes.json';

export const KEYBOARD_SHORTCUTS = {
  START_PAUSE: ' ',
  RESET: 'r',
  TOGGLE_SOUND: 's',
  TOGGLE_AUTO: 'a',
  NEW_TASK: 'n',
  DELETE_TASK: 'Delete',
};

export const TASK_CATEGORIES = {
  WORK: { name: 'Work', color: '#667eea', icon: 'briefcase' },
  PERSONAL: { name: 'Personal', color: '#38ef7d', icon: 'user' },
  LEARNING: { name: 'Learning', color: '#f093fb', icon: 'book' },
  EXERCISE: { name: 'Exercise', color: '#4facfe', icon: 'dumbbell' },
  OTHER: { name: 'Other', color: '#764ba2', icon: 'star' },
};

export const BREAK_SUGGESTIONS = [
  { icon: '💧', text: 'Drink water' },
  { icon: '🧘', text: 'Stretch your body' },
  { icon: '👀', text: 'Rest your eyes' },
  { icon: '🚶', text: 'Take a short walk' },
  { icon: '🌬️', text: 'Take deep breaths' },
  { icon: '🪟', text: 'Look outside' },
  { icon: '🎵', text: 'Listen to music' },
  { icon: '☕', text: 'Make a drink' },
];

export const NOTIFICATION_CONFIG = {
  ENABLED: true,
  ICON: './assets/logo/favicon-32x32.png',
  WORK_COMPLETE_TITLE: 'Work Session Complete!',
  WORK_COMPLETE_BODY: 'Great job! Time for a break.',
  BREAK_COMPLETE_TITLE: 'Break Complete!',
  BREAK_COMPLETE_BODY: 'Ready to focus again?',
};
