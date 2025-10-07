const startElement = document.getElementById("start-button");
const resetElement = document.getElementById("reset-button");
const timerElement = document.getElementById("timer");
const phaseElement = document.getElementById("phase-indicator");

let interval;
let timeLeft = 25 * 60;
let isRunning = false;
let currentPhase = "Work";
let pomodoroCount = 0;

startElement.addEventListener("click", toggleTimer);
resetElement.addEventListener("click", resetTimer);

function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

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

function pauseTimer() {
  isRunning = false;
  clearInterval(interval);
  startElement.innerHTML = '<i class="fas fa-play"></i> Start';
  startElement.classList.remove("pomodoro-btn-pause");
  startElement.classList.add("pomodoro-btn-start");
}

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

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

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
