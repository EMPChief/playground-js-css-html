/**
 * DOM Element References
 */
const startElement = document.getElementById("start-button");
const resetElement = document.getElementById("reset-button");
const timerElement = document.getElementById("timer");
const phaseElement = document.getElementById("phase-indicator");

/**
 * Timer State Variables
 */
let interval;
let timeLeft = 25 * 60;
let isRunning = false;
let currentPhase = "Work";
let pomodoroCount = 0;

/**
 * Event Listeners
 */
startElement.addEventListener("click", toggleTimer);
resetElement.addEventListener("click", resetTimer);

/**
 * Toggles between starting and pausing the timer
 */
function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

/**
 * Starts the pomodoro timer and updates button to pause state
 */
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startElement.innerHTML = '<i class="fas fa-pause"></i> Pause';
  startElement.classList.remove("pomodoro-btn-start");
  startElement.classList.add("pomodoro-btn-pause");

  interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
      saveTimerState();
    } else {
      switchPhase();
    }
  }, 1000);
}

/**
 * Pauses the timer and updates button to start state
 */
function pauseTimer() {
  isRunning = false;
  clearInterval(interval);
  startElement.innerHTML = '<i class="fas fa-play"></i> Start';
  startElement.classList.remove("pomodoro-btn-pause");
  startElement.classList.add("pomodoro-btn-start");
}

/**
 * Resets timer to initial work phase (25 minutes) and clears pomodoro count
 */
function resetTimer() {
  pauseTimer();
  currentPhase = "Work";
  timeLeft = 25 * 60;
  pomodoroCount = 0;
  phaseElement.textContent = "Working";
  phaseElement.className = "pomodoro-phase-badge phase-work";
  updateTimerDisplay();
  saveTimerState();
}

/**
 * Updates the timer display with current minutes and seconds
 */
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Switches between work, break, and long break phases
 * After 4 completed pomodoros, triggers a long break (15 min)
 * Otherwise alternates between work (25 min) and short break (5 min)
 */
function switchPhase() {
  clearInterval(interval);

  if (currentPhase === "Work") {
    pomodoroCount++;

    if (pomodoroCount % 4 === 0) {
      currentPhase = "LongBreak";
      timeLeft = 15 * 60;
      phaseElement.textContent = "Long Break";
      phaseElement.className = "pomodoro-phase-badge phase-longbreak";
    } else {
      currentPhase = "Break";
      timeLeft = 5 * 60;
      phaseElement.textContent = "Break";
      phaseElement.className = "pomodoro-phase-badge phase-break";
    }
  } else {
    currentPhase = "Work";
    timeLeft = 25 * 60;
    phaseElement.textContent = "Working";
    phaseElement.className = "pomodoro-phase-badge phase-work";
  }

  updateTimerDisplay();
  startTimer();
  saveTimerState();
}

/**
 * Loads a random motivational quote from quotes.json and displays it
 */
function loadRandomQuote() {
  fetch("quotes.json")
    .then((response) => response.json())
    .then((data) => {
      const quote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
      const yearText = quote.year ? ` (${quote.year})` : "";
      document.getElementById("quote-text").textContent = `"${quote.text}"`;
      document.getElementById("quote-author").textContent =
        `— ${quote.author}${yearText}`;
    });
}

loadRandomQuote();

/**
 * Schedules the next quote change at a random interval between 1-5 minutes
 * Recursively calls itself to continuously update quotes
 */
function scheduleNextQuote() {
  const randomMinutes = Math.floor(Math.random() * 5) + 1;
  const milliseconds = randomMinutes * 60 * 1000;

  setTimeout(() => {
    loadRandomQuote();
    scheduleNextQuote();
  }, milliseconds);
}

// Save timer state
function saveTimerState() {
  const state = {
    timeLeft: timeLeft,
    isRunning: isRunning,
    currentPhase: currentPhase,
    pomodoroCount: pomodoroCount,
  };
  localStorage.setItem("pomodoroState", JSON.stringify(state));
}

// Load timer state on page load
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

// Save tasks
function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".tasks")).map((task) => {
    return task.textContent.trim();
  });
  localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
}

// Load tasks on page load
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
scheduleNextQuote();
