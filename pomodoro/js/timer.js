/**
 * Pomodoro timer implementation
 * Manages work sessions (25 min), breaks (5 min), and long breaks (15 min)
 */

const startElement = document.getElementById("start-button");
const resetElement = document.getElementById("reset-button");
const timerElement = document.getElementById("timer");
const phaseElement = document.getElementById("phase-indicator");
const autoStartToggle = document.getElementById("auto-start-toggle");

let interval;
let timeLeft = 25 * 60;
let isRunning = false;
let currentPhase = "Work";
let pomodoroCount = 0;
let workSecondsElapsed = 0;
let autoStartEnabled = true;

if (typeof loadTimerState === "function") {
  loadTimerState();
}

if (startElement) {
  startElement.addEventListener("click", toggleTimer);
}
if (resetElement) {
  resetElement.addEventListener("click", resetTimer);
}
if (autoStartToggle) {
  autoStartToggle.addEventListener("click", toggleAutoStart);
}

/**
 * Toggles timer between running and paused states
 */
function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

/**
 * Starts the timer countdown
 * Updates display every second and saves state to localStorage
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
      
      if (currentPhase === "Work") {
        workSecondsElapsed++;
        
        if (workSecondsElapsed >= 150) {
          if (typeof decrementFirstTask === "function") {
            decrementFirstTask();
          }
          workSecondsElapsed = 0;
        }
      }
      
      updateTimerDisplay();
      saveTimerState();
    } else {
      switchPhase();
    }
  }, 1000);
}

/**
 * Pauses the timer and updates button state
 */
function pauseTimer() {
  isRunning = false;
  clearInterval(interval);
  startElement.innerHTML = '<i class="fas fa-play"></i> Start';
  startElement.classList.remove("pomodoro-btn-pause");
  startElement.classList.add("pomodoro-btn-start");
}

/**
 * Resets timer to initial work phase state
 * Clears pomodoro count and updates display
 */
function resetTimer() {
  pauseTimer();
  currentPhase = "Work";
  timeLeft = 25 * 60;
  pomodoroCount = 0;
  workSecondsElapsed = 0;
  phaseElement.textContent = "Working";
  phaseElement.className = "pomodoro-phase-badge phase-work";
  updateTimerDisplay();
  saveTimerState();
}

/**
 * Updates the timer display with current time
 * Formats time as MM:SS
 */
function updateTimerDisplay() {
  try {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (timerElement) {
      timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  } catch (error) {
    console.error("Failed to update timer display:", error);
  }
}

/**
 * Switches between work, break, and long break phases
 * After work: decrements first task pomodoro count
 * Every 4th pomodoro: triggers long break (15 min)
 * Otherwise: triggers short break (5 min)
 */
function switchPhase() {
  clearInterval(interval);
  isRunning = false;

  if (typeof playRandomAudio === "function") {
    playRandomAudio();
  }

  if (currentPhase === "Work") {
    pomodoroCount++;
    workSecondsElapsed = 0;

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
  
  if (autoStartEnabled) {
    startTimer();
  } else {
    startElement.innerHTML = '<i class="fas fa-play"></i> Start';
    startElement.classList.remove("pomodoro-btn-pause");
    startElement.classList.add("pomodoro-btn-start");
  }
  
  saveTimerState();
}

function toggleAutoStart() {
  autoStartEnabled = !autoStartEnabled;
  
  if (autoStartEnabled) {
    autoStartToggle.classList.remove("pomodoro-btn-auto-off");
    autoStartToggle.classList.add("pomodoro-btn-auto");
    autoStartToggle.innerHTML = '<i class="fas fa-forward"></i> Auto';
  } else {
    autoStartToggle.classList.remove("pomodoro-btn-auto");
    autoStartToggle.classList.add("pomodoro-btn-auto-off");
    autoStartToggle.innerHTML = '<i class="fas fa-forward"></i> Manual';
  }
  
  saveTimerState();
}
