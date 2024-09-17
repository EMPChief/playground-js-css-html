// Velger elementet med klassen "container"
const containerElement = document.querySelector(".container");

// Liste med ord som vil vises dynamisk
const awesomeWords = [
  "Best",
  "Beast",
  "King",
  "Troll",
  "Legend",
  "Champion",
  "Warrior",
];
let currentWordIndex = 0; // Sporer hvilket ord i listen som skal vises
let currentCharacterIndex = 0; // Sporer hvor mange bokstaver som skal vises

// Funksjon som endrer ordet dynamisk
function changeAwesome() {
  currentCharacterIndex++; // Øker antall bokstaver som skal vises
  containerElement.innerHTML = `
  <h1>I'm the fking ${awesomeWords[currentWordIndex].slice(
    0,
    currentCharacterIndex
  )}</h1>
  `;

  // Når hele ordet er skrevet ut
  if (currentCharacterIndex == awesomeWords[currentWordIndex].length) {
    currentCharacterIndex = 0; // Tilbakestiller bokstavindeksen
    currentWordIndex++; // Går til neste ord

    // Hvis vi har nådd slutten av listen, starter vi på nytt
    if (currentWordIndex == awesomeWords.length) currentWordIndex = 0;
  }

  // Kaller funksjonen på nytt etter 800 millisekunder
  setTimeout(changeAwesome, 800);
}

// Starter den dynamiske endringen
changeAwesome();
