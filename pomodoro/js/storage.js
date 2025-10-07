function saveTimerState() {
  const state = {
    timeLeft: timeLeft,
    isRunning: isRunning,
    currentPhase: currentPhase,
    pomodoroCount: pomodoroCount,
  };
  localStorage.setItem("pomodoroState", JSON.stringify(state));
}

function loadTimerState() {
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
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".tasks")).map((task) => {
    return task.textContent.trim();
  });
  localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("pomodoroTasks");
  if (saved) {
    const tasks = JSON.parse(saved);
    const taskContainer = document.querySelector('.task-container > ul');
    if (taskContainer) {
      taskContainer.innerHTML = '';
      tasks.forEach((taskText) => {
        const li = document.createElement('li');
        li.className = 'tasks';
        li.innerHTML = `${taskText}<i class="fas fa-trash delete-icon"></i>`;
        taskContainer.appendChild(li);
      });
    }
  }
}

loadTimerState();
loadTasks();
