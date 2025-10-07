/**
 * Task management for Pomodoro timer
 */

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const pomodoroCountInput = document.getElementById("pomodoro-count");
const taskContainer = document.querySelector(".task-container > ul");

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - Escaped text safe for HTML insertion
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Handles task form submission
 * Creates a new task with specified pomodoro count and adds it to the task list
 */
if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    try {
      const taskText = taskInput.value.trim();
      const pomodoroCountRaw = pomodoroCountInput.value.trim();
      const pomodoroCount = parseFloat(pomodoroCountRaw);
      
      if (!taskText) {
        alert("Please enter a task name.");
        return;
      }
      
      if (isNaN(pomodoroCount) || pomodoroCount < 0.1) {
        alert("Please enter a valid number of pomodoros (minimum 0.1).");
        return;
      }
      
      if (Math.round(pomodoroCount * 10) / 10 !== pomodoroCount) {
        alert("Pomodoros must be in increments of 0.1 (e.g., 0.1, 0.5, 1, 1.5).");
        return;
      }
      
      const li = document.createElement("li");
      li.className = "tasks";
      li.setAttribute("data-pomodoros", pomodoroCount);
      li.innerHTML = `<span class="task-info"><span class="task-text">${escapeHtml(taskText)}</span> | <span class="task-count">${pomodoroCount}</span> pomodoro${pomodoroCount > 1 ? "s" : ""}</span><i class="fas fa-trash delete-icon"></i>`;
      
      if (taskContainer) {
        taskContainer.appendChild(li);
      }
      
      taskInput.value = "";
      pomodoroCountInput.value = "";
      
      saveTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  });
}

/**
 * Decrements the pomodoro count of the first task in the list
 * Removes the task if count reaches zero
 * Called when a work pomodoro completes
 */
function decrementFirstTask() {
  try {
    if (!taskContainer) return;
    
    const firstTask = taskContainer.querySelector(".tasks");
    if (!firstTask) return;
    
    let count = parseFloat(firstTask.getAttribute("data-pomodoros"));
    if (isNaN(count)) return;
    
    count -= 0.1;
    count = Math.round(count * 10) / 10;
    
    if (count <= 0) {
      firstTask.remove();
    } else {
      firstTask.setAttribute("data-pomodoros", count);
      const countSpan = firstTask.querySelector(".task-count");
      if (countSpan) {
        countSpan.textContent = count;
        const textAfterCount = count !== 1 ? " pomodoros" : " pomodoro";
        countSpan.nextSibling.textContent = textAfterCount;
      }
    }
    
    saveTasks();
  } catch (error) {
    console.error("Failed to decrement task:", error);
  }
}

/**
 * Handles task deletion via delete icon click
 * Removes the task from the list and updates localStorage
 */
if (taskContainer) {
  taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
      try {
        e.target.parentElement.remove();
        saveTasks();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  });
}
