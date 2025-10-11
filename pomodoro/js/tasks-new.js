/**
 * Enhanced Task Management System
 * ES6 module with categories, notes, drag-and-drop, undo, and more
 */

import { TIMER_CONFIG, TASK_CATEGORIES } from './config.js';
import { escapeHtml, generateId, debounce, showNotification } from './utils.js';
import { saveTasks, loadTasks } from './storage-new.js';
import { recordTaskCompletion } from './statistics.js';
import { celebrate, showUndoNotification, showModal } from './ui.js';

// DOM Elements
let taskForm, taskInput, pomodoroCountInput, taskList, categorySelector, notesInput;

// Task state
let tasks = [];
let deletedTasks = [];
let draggedTask = null;
let taskModal = null;

/**
 * Initializes the task management system
 */
export function initTasks() {
  // Cache DOM elements
  taskForm = document.getElementById('task-form');
  taskInput = document.getElementById('task-input');
  pomodoroCountInput = document.getElementById('pomodoro-count');
  taskList = document.getElementById('task-list');
  categorySelector = document.getElementById('task-category');
  notesInput = document.getElementById('task-notes');

  // Load saved tasks
  tasks = loadTasks();

  // Render tasks
  renderTasks();

  // Attach event listeners
  if (taskForm) {
    taskForm.addEventListener('submit', handleTaskSubmit);
  }

  if (taskList) {
    taskList.addEventListener('click', handleTaskClick);
    taskList.addEventListener('dragstart', handleDragStart);
    taskList.addEventListener('dragover', handleDragOver);
    taskList.addEventListener('drop', handleDrop);
    taskList.addEventListener('dragend', handleDragEnd);
  }

  // Add task button handler
  const addTaskBtn = document.getElementById('add-task-btn');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', showAddTaskModal);
  }

  // Add bulk action buttons
  addBulkActionButtons();
}

/**
 * Shows the Add Task modal
 */
function showAddTaskModal() {
  const content = `
    <form id="modal-task-form">
      <div class="task-form-inputs">
        <input
          type="text"
          id="modal-task-input"
          placeholder="Enter your task"
          required
          aria-label="Task name"
          style="flex: 2; min-width: 200px;"
        />
        <input
          type="number"
          id="modal-pomodoro-count"
          placeholder="Pomodoros"
          min="0.1"
          step="0.1"
          required
          aria-label="Number of pomodoros"
          style="flex: 1; min-width: 120px;"
        />
      </div>

      <select id="modal-task-category" aria-label="Task category">
        <option value="WORK">💼 Work</option>
        <option value="PERSONAL">👤 Personal</option>
        <option value="LEARNING">📚 Learning</option>
        <option value="EXERCISE">🏋️ Exercise</option>
        <option value="OTHER" selected>⭐ Other</option>
      </select>

      <textarea
        id="modal-task-notes"
        placeholder="Add notes (optional)"
        rows="3"
        aria-label="Task notes"
      ></textarea>

      <div class="modal-footer">
        <button type="button" class="btn-secondary modal-cancel-btn">Cancel</button>
        <button type="submit" class="pomodoro-btn pomodoro-btn-start">
          <i class="fas fa-plus"></i> Add Task
        </button>
      </div>
    </form>
  `;

  taskModal = showModal('Add New Task', content);

  // Get form elements from modal
  const modalForm = document.getElementById('modal-task-form');
  const modalTaskInput = document.getElementById('modal-task-input');
  const modalPomodoroCount = document.getElementById('modal-pomodoro-count');
  const modalCategory = document.getElementById('modal-task-category');
  const modalNotes = document.getElementById('modal-task-notes');
  const cancelBtn = taskModal.querySelector('.modal-cancel-btn');

  // Focus first input
  setTimeout(() => modalTaskInput.focus(), 100);

  // Cancel button
  cancelBtn.addEventListener('click', () => taskModal.remove());

  // Form submit
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = modalTaskInput.value.trim();
    const pomodoroCountRaw = modalPomodoroCount.value.trim();
    const pomodoroCount = parseFloat(pomodoroCountRaw);
    const category = modalCategory.value;
    const notes = modalNotes.value.trim();

    // Validation
    if (!taskText) {
      showNotification('Please enter a task name', 'error');
      return;
    }

    if (isNaN(pomodoroCount) || pomodoroCount < TIMER_CONFIG.MIN_TASK_POMODOROS) {
      showNotification(`Minimum ${TIMER_CONFIG.MIN_TASK_POMODOROS} pomodoros required`, 'error');
      return;
    }

    if (Math.round(pomodoroCount * 10) / 10 !== pomodoroCount) {
      showNotification('Use 0.1 increments (e.g., 0.5, 1.0, 1.5)', 'error');
      return;
    }

    // Create task
    const task = {
      id: generateId(),
      text: taskText,
      count: pomodoroCount,
      category: category,
      notes: notes,
      createdAt: Date.now(),
    };

    tasks.push(task);
    saveTasks(tasks);
    renderTasks();

    showNotification('Task added successfully!', 'success');
    taskModal.remove();
  });
}

/**
 * Handles task form submission
 * @param {Event} e - Submit event
 */
function handleTaskSubmit(e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const pomodoroCountRaw = pomodoroCountInput.value.trim();
  const pomodoroCount = parseFloat(pomodoroCountRaw);
  const category = categorySelector ? categorySelector.value : 'OTHER';
  const notes = notesInput ? notesInput.value.trim() : '';

  // Validation
  if (!taskText) {
    showNotification('Please enter a task name', 'error');
    return;
  }

  if (isNaN(pomodoroCount) || pomodoroCount < TIMER_CONFIG.MIN_TASK_POMODOROS) {
    showNotification(`Minimum ${TIMER_CONFIG.MIN_TASK_POMODOROS} pomodoros required`, 'error');
    return;
  }

  if (Math.round(pomodoroCount * 10) / 10 !== pomodoroCount) {
    showNotification('Use 0.1 increments (e.g., 0.5, 1.0, 1.5)', 'error');
    return;
  }

  // Create task
  const task = {
    id: generateId(),
    text: taskText,
    count: pomodoroCount,
    category: category,
    notes: notes,
    createdAt: Date.now(),
  };

  tasks.push(task);
  saveTasks(tasks);
  renderTasks();

  // Clear form
  taskInput.value = '';
  pomodoroCountInput.value = '';
  if (notesInput) notesInput.value = '';

  showNotification('Task added successfully!', 'success');
}

/**
 * Renders all tasks to the DOM
 */
function renderTasks() {
  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="no-tasks">No tasks yet. Add one above!</li>';
    return;
  }

  taskList.innerHTML = tasks.map(task => createTaskHTML(task)).join('');
}

/**
 * Creates HTML for a single task
 * @param {Object} task - Task object
 * @returns {string} - HTML string
 */
function createTaskHTML(task) {
  const categoryInfo = TASK_CATEGORIES[task.category] || TASK_CATEGORIES.OTHER;
  const categoryColor = categoryInfo.color;
  const categoryIcon = categoryInfo.icon;

  return `
    <li class="tasks" data-task-id="${task.id}" draggable="true">
      <div class="task-main">
        <span class="task-info">
          <span class="category-badge" style="background: ${categoryColor};">
            <i class="fas fa-${categoryIcon}"></i>
          </span>
          <span class="task-text">${escapeHtml(task.text)}</span>
          <span class="task-count-badge">${task.count} 🍅</span>
        </span>
        <div class="task-actions">
          <button class="task-action-btn edit-btn" data-task-id="${task.id}" title="Edit task">
            <i class="fas fa-edit"></i>
          </button>
          <button class="task-action-btn delete-btn" data-task-id="${task.id}" title="Delete task">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      ${task.notes ? `
        <div class="task-notes visible">
          <i class="fas fa-sticky-note"></i> ${escapeHtml(task.notes)}
        </div>
      ` : ''}
    </li>
  `;
}

/**
 * Handles clicks on task list
 * @param {Event} e - Click event
 */
function handleTaskClick(e) {
  const deleteBtn = e.target.closest('.delete-btn');
  const editBtn = e.target.closest('.edit-btn');

  if (deleteBtn) {
    const taskId = deleteBtn.dataset.taskId;
    deleteTask(taskId);
  } else if (editBtn) {
    const taskId = editBtn.dataset.taskId;
    editTask(taskId);
  }
}

/**
 * Deletes a task with undo option
 * @param {string} taskId - Task ID
 */
function deleteTask(taskId) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  deletedTasks.push({ task: deletedTask, index: taskIndex });

  saveTasks(tasks);
  renderTasks();

  showUndoNotification('Task deleted', () => {
    const lastDeleted = deletedTasks.pop();
    if (lastDeleted) {
      tasks.splice(lastDeleted.index, 0, lastDeleted.task);
      saveTasks(tasks);
      renderTasks();
      showNotification('Task restored', 'success');
    }
  });
}

/**
 * Edits a task
 * @param {string} taskId - Task ID
 */
function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  // Pre-fill form
  taskInput.value = task.text;
  pomodoroCountInput.value = task.count;
  if (categorySelector) categorySelector.value = task.category;
  if (notesInput) notesInput.value = task.notes || '';

  // Delete the old task
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  tasks.splice(taskIndex, 1);

  saveTasks(tasks);
  renderTasks();

  taskInput.focus();
  showNotification('Task loaded for editing', 'info');
}

/**
 * Decrements the first task's pomodoro count
 * Called by timer every 2.5 minutes during work sessions
 */
export function decrementFirstTask() {
  if (tasks.length === 0) return;

  const firstTask = tasks[0];
  firstTask.count -= TIMER_CONFIG.TASK_DECREMENT_AMOUNT;
  firstTask.count = Math.round(firstTask.count * 10) / 10;

  if (firstTask.count <= 0) {
    // Task completed!
    tasks.shift();
    recordTaskCompletion();
    celebrate();
    showNotification(`Task "${firstTask.text}" completed! 🎉`, 'success');
  }

  saveTasks(tasks);
  renderTasks();
}

/**
 * Drag and drop handlers
 */
function handleDragStart(e) {
  const taskElement = e.target.closest('.tasks');
  if (!taskElement) return;

  draggedTask = taskElement;
  taskElement.classList.add('task-dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  const taskElement = e.target.closest('.tasks');
  if (!taskElement || taskElement === draggedTask) return;

  taskElement.classList.add('task-dragover');
}

function handleDrop(e) {
  e.preventDefault();

  const dropTarget = e.target.closest('.tasks');
  if (!dropTarget || dropTarget === draggedTask) return;

  const draggedId = draggedTask.dataset.taskId;
  const targetId = dropTarget.dataset.taskId;

  const draggedIndex = tasks.findIndex(t => t.id === draggedId);
  const targetIndex = tasks.findIndex(t => t.id === targetId);

  if (draggedIndex !== -1 && targetIndex !== -1) {
    const [removed] = tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, removed);

    saveTasks(tasks);
    renderTasks();
    showNotification('Task reordered', 'success');
  }

  dropTarget.classList.remove('task-dragover');
}

function handleDragEnd(e) {
  const taskElement = e.target.closest('.tasks');
  if (taskElement) {
    taskElement.classList.remove('task-dragging');
  }

  // Remove all dragover classes
  document.querySelectorAll('.task-dragover').forEach(el => {
    el.classList.remove('task-dragover');
  });

  draggedTask = null;
}

/**
 * Adds bulk action buttons
 */
function addBulkActionButtons() {
  const container = document.querySelector('.task-container');
  if (!container || document.getElementById('bulk-actions')) return;

  const bulkActionsHTML = `
    <div id="bulk-actions" class="export-import-buttons" style="margin-top: 15px;">
      <button class="btn-secondary" id="clear-completed-btn">
        <i class="fas fa-check-double"></i> Clear Completed
      </button>
      <button class="btn-secondary" id="clear-all-tasks-btn">
        <i class="fas fa-trash-alt"></i> Clear All
      </button>
    </div>
  `;

  const bulkDiv = document.createElement('div');
  bulkDiv.innerHTML = bulkActionsHTML;
  container.appendChild(bulkDiv);

  // Attach handlers
  document.getElementById('clear-completed-btn')?.addEventListener('click', () => {
    const initialCount = tasks.length;
    tasks = tasks.filter(t => t.count > 0);

    if (initialCount === tasks.length) {
      showNotification('No completed tasks to clear', 'info');
    } else {
      saveTasks(tasks);
      renderTasks();
      showNotification(`Cleared ${initialCount - tasks.length} completed tasks`, 'success');
    }
  });

  document.getElementById('clear-all-tasks-btn')?.addEventListener('click', () => {
    if (tasks.length === 0) {
      showNotification('No tasks to clear', 'info');
      return;
    }

    if (confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
      tasks = [];
      saveTasks(tasks);
      renderTasks();
      showNotification('All tasks cleared', 'success');
    }
  });
}

/**
 * Gets all tasks
 * @returns {Array} - Tasks array
 */
export function getAllTasks() {
  return [...tasks];
}

/**
 * Gets task count
 * @returns {number} - Number of tasks
 */
export function getTaskCount() {
  return tasks.length;
}

/**
 * Export showAddTaskModal for external use (keyboard shortcut)
 */
export { showAddTaskModal };
