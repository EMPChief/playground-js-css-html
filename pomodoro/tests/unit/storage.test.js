import { describe, it, expect, beforeEach } from 'vitest';
import { saveTimerState, loadTimerState, saveTasks, loadTasks } from '../../js/storage-new.js';
import { PHASE_TYPES } from '../../js/config.js';

describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Timer State', () => {
    it('should save and load timer state', () => {
      const state = {
        timeLeft: 1200,
        isRunning: false,
        currentPhase: PHASE_TYPES.WORK,
        pomodoroCount: 2,
        workSecondsElapsed: 0,
        autoStartEnabled: true,
      };

      saveTimerState(state);
      const loaded = loadTimerState();

      expect(loaded.timeLeft).toBe(1200);
      expect(loaded.currentPhase).toBe(PHASE_TYPES.WORK);
      expect(loaded.pomodoroCount).toBe(2);
    });

    it('should return default state when no saved state', () => {
      const loaded = loadTimerState();

      expect(loaded.timeLeft).toBeDefined();
      expect(loaded.currentPhase).toBe(PHASE_TYPES.WORK);
      expect(loaded.pomodoroCount).toBe(0);
    });
  });

  describe('Tasks', () => {
    it('should save and load tasks', () => {
      const tasks = [
        { id: '1', text: 'Test task', count: 2.5, category: 'WORK', notes: '' },
        { id: '2', text: 'Another task', count: 1.0, category: 'PERSONAL', notes: 'Test note' },
      ];

      saveTasks(tasks);
      const loaded = loadTasks();

      expect(loaded).toHaveLength(2);
      expect(loaded[0].text).toBe('Test task');
      expect(loaded[0].count).toBe(2.5);
      expect(loaded[1].notes).toBe('Test note');
    });

    it('should return empty array when no tasks', () => {
      const loaded = loadTasks();
      expect(loaded).toEqual([]);
    });
  });
});
