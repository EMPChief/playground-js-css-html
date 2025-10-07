/**
 * Sound notification system for Pomodoro timer
 * Plays random alarm sounds when phases switch
 */

const audioElement = document.createElement("audio");
const soundToggleBtn = document.getElementById("sound-toggle");

const soundPath = "assets/sound/";
let soundarray = [];

fetch("db/sounds.json")
  .then(response => response.json())
  .then(data => {
    soundarray = data.sounds.map(file => `${soundPath}${file}`);
  })
  .catch(error => {
    console.error("Failed to load sounds.json:", error);
  });

let isSoundEnabled = true;

try {
  if (typeof localStorage !== "undefined") {
    isSoundEnabled = localStorage.getItem("pomodoroSoundEnabled") !== "false";
  }
} catch (error) {
  console.warn("LocalStorage not available for sound settings:", error);
}

/**
 * Updates the sound toggle button icon
 */
function updateSoundIcon() {
  if (soundToggleBtn) {
    const icon = soundToggleBtn.querySelector("i");
    if (icon) {
      icon.className = isSoundEnabled ? "fas fa-volume-up" : "fas fa-volume-mute";
    }
  }
}

/**
 * Toggles sound on/off and saves preference
 */
function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("pomodoroSoundEnabled", isSoundEnabled);
    }
  } catch (error) {
    console.warn("LocalStorage not available, sound preference not saved:", error);
  }
  updateSoundIcon();
}

if (soundToggleBtn) {
  soundToggleBtn.addEventListener("click", toggleSound);
  updateSoundIcon();
}

/**
 * Plays a random alarm sound from the sound array
 * Called when switching between work and break phases
 */
function playRandomAudio() {
  if (!isSoundEnabled) return;
  
  const randomIndex = Math.floor(Math.random() * soundarray.length);
  const selectedSound = soundarray[randomIndex];

  audioElement.src = selectedSound;
  audioElement.play().catch((error) => {
    console.warn("Audio playback failed:", error);
  });
}
