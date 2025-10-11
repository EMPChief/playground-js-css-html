// Test setup for Vitest
import { beforeEach, vi } from 'vitest';

// Mock localStorage
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

// Reset localStorage before each test
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// Mock Notification API
global.Notification = class Notification {
  constructor(title, options) {
    this.title = title;
    this.options = options;
  }
  static permission = 'granted';
  static requestPermission = vi.fn(() => Promise.resolve('granted'));
  close = vi.fn();
  onclick = null;
};

// Mock Audio
global.Audio = class Audio {
  constructor(src) {
    this.src = src;
  }
  play = vi.fn(() => Promise.resolve());
  pause = vi.fn();
  load = vi.fn();
};
