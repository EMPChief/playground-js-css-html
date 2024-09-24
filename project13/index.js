const inputElement = document.getElementById("search-input");
const resultContainer = document.getElementById("result-container");
const wordDisplay = document.getElementById("word-display");
const wordTitle = document.getElementById("word-title");
const meaningDisplay = document.getElementById("meaning-display");
const instructionText = document.getElementById("instruction-text");
const pronunciationAudio = document.getElementById("pronunciation-audio");

async function fetchAPI(word) {
  try {
    // Hide the result container initially and show a loading message
    resultContainer.style.display = "none";
    instructionText.style.display = "block";
    instructionText.innerHTML = `Searching for the meaning of "${word}"...`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);

    // Check if the API returned a valid result
    if (!response.ok) {
      throw new Error("No results found");
    }

    const result = await response.json();

    // Update the UI with the fetched results
    instructionText.style.display = "none";
    resultContainer.style.display = "block";

    // Populate the word and its meaning
    wordTitle.textContent = result[0].word;
    meaningDisplay.textContent =
      result[0].meanings[0].definitions[0].definition;

    // Check if the audio pronunciation exists
    const phonetics = result[0].phonetics.find((p) => p.audio);

    // Update the UI with the audio pronunciation
    if (phonetics && phonetics.audio) {
      // If the audio pronunciation exists, show the audio element
      pronunciationAudio.src = phonetics.audio;
      pronunciationAudio.style.display = "block";
      pronunciationAudio.load();
    } else {
      // If the audio pronunciation does not exist, hide the audio element
      pronunciationAudio.style.display = "none";
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch
    instructionText.style.display = "block";
    instructionText.innerHTML = `No results found for "${word}". Please try again.`;
    resultContainer.style.display = "none";
  }
}

// Add event listener for keyup event
inputElement.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && inputElement.value.trim() !== "") {
    fetchAPI(inputElement.value.trim());
  }
});
