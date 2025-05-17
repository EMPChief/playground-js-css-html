// Get DOM elements
const generateButton = document.getElementById("generate-button");
const paletteContainer = document.getElementById("paletteContainer");

// Generate initial palette on page load
document.addEventListener("DOMContentLoaded", () => {
  generatePalette();
});

// Generate new palette when button is clicked
generateButton.addEventListener("click", () => {
  generatePalette();
});

// Handle copying colors
paletteContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-copy")) {
    const color = event.target.parentElement.querySelector(".hex").textContent;
    navigator.clipboard.writeText(color).then(() => {
      event.target.classList.remove("fa-copy");
      event.target.classList.add("fa-check");
      setTimeout(() => {
        event.target.classList.remove("fa-check");
        event.target.classList.add("fa-copy");
      }, 1000);
    });
  }
});

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }
  updatePaletteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  for (let i = 0; i < colors.length; i++) {
    const colorBox = document.getElementById(`colorBox${i + 1}`);
    const color = colors[i];

    if (colorBox) {
      const colorDiv = colorBox.querySelector(".color");
      const hexSpan = colorBox.querySelector(".hex");

      colorDiv.style.backgroundColor = color;
      hexSpan.textContent = color;
    }
  }
}
