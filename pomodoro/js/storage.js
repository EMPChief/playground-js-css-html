/**
 * LocalStorage persistence for timer state and tasks
 * Saves and loads data across browser sessions
 */

/**
 * Saves current timer state to localStorage
 * Includes time remaining, phase, running status, and pomodoro count
 */
function saveTimerState() {
  try {
    if (typeof localStorage === "undefined") return;
    const state = {
      timeLeft: timeLeft,
      isRunning: isRunning,
      currentPhase: currentPhase,
      pomodoroCount: pomodoroCount,
    };
    localStorage.setItem("pomodoroState", JSON.stringify(state));
  } catch (error) {
    console.warn("LocalStorage not available, state will not be saved:", error);
  }
}

/**
 * Loads saved timer state from localStorage
 * Restores phase indicator and timer display to saved state
 */
function loadTimerState() {
  try {
    if (typeof localStorage === "undefined") return;
    const saved = localStorage.getItem("pomodoroState");
    if (saved) {
      const state = JSON.parse(saved);
      timeLeft = state.timeLeft;
      currentPhase = state.currentPhase;
      pomodoroCount = state.pomodoroCount;
      updateTimerDisplay();

      if (currentPhase === "Work") {
        phaseElement.textContent = "Working";
        phaseElement.className = "pomodoro-phase-badge phase-work";
      } else if (currentPhase === "Break") {
        phaseElement.textContent = "Break";
        phaseElement.className = "pomodoro-phase-badge phase-break";
      } else if (currentPhase === "LongBreak") {
        phaseElement.textContent = "Long Break";
        phaseElement.className = "pomodoro-phase-badge phase-longbreak";
      }
    }
  } catch (error) {
    console.warn("LocalStorage not available, using default state:", error);
  }
}

/**
 * Saves all tasks to localStorage
 * Stores task text and remaining pomodoro count
 */
function saveTasks() {
  try {
    if (typeof localStorage === "undefined") return;
    const tasks = Array.from(document.querySelectorAll(".tasks")).map((task) => {
      const taskText = task.querySelector(".task-text");
      const pomodoroCount = task.getAttribute("data-pomodoros");
      return {
        text: taskText ? taskText.textContent.trim() : "",
        count: pomodoroCount || "1"
      };
    });
    localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
  } catch (error) {
    console.warn("LocalStorage not available, tasks will not be saved:", error);
  }
}

/**
 * Loads saved tasks from localStorage
 * Recreates task list with saved text and pomodoro counts
 */
function loadTasks() {
  try {
    if (typeof localStorage === "undefined") return;
    const saved = localStorage.getItem("pomodoroTasks");
    if (saved) {
      const tasks = JSON.parse(saved);
      const taskContainer = document.querySelector(".task-container > ul");
      if (taskContainer) {
        taskContainer.innerHTML = "";
        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.className = "tasks";
          const taskText = task.text || task;
          const taskCount = task.count || "1";
          li.setAttribute("data-pomodoros", taskCount);
          li.innerHTML = `<span class="task-info"><span class="task-text">${taskText}</span> | <span class="task-count">${taskCount}</span> pomodoro${taskCount > 1 ? "s" : ""}</span><i class="fas fa-trash delete-icon"></i>`;
          taskContainer.appendChild(li);
        });
      }
    }
  } catch (error) {
    console.warn("LocalStorage not available, no saved tasks loaded:", error);
  }
}

loadTimerState();
loadTasks();
