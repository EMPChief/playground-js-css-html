const buttonElement = document.getElementById("buttonforjoke"); // Velger knappen
const jokeElement = document.getElementById("joke"); // Velger elementet som inneholder vitsen

const apiKey = "hM7vYY441/U20WRWu6nFNQ==qOHOgvet998EDI7q"; // API-nøkkel
const url = "https://api.api-ninjas.com/v1/dadjokes"; // API-URL
const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey, // API-nøkkel i headeren
  },
};

// Asynkron funksjon for å hente en vits fra API-et
async function getJoke() {
  try {
    // Viser en oppdateringstekst og deaktiverer knappen midlertidig
    jokeElement.innerText = "Updating...";
    buttonElement.disabled = true;
    buttonElement.innerText = "Loading...";

    // Venter på respons fra API
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Henter vitsen fra responsen
    const data = await response.json();

    // Aktiverer knappen igjen og oppdaterer teksten med den nye vitsen
    buttonElement.disabled = false;
    buttonElement.innerText = "Tell Me A Joke";
    jokeElement.innerText = data[0].joke;
  } catch (error) {
    // Hvis en feil oppstår, vis en feilmelding og aktiver knappen igjen
    jokeElement.innerText = "An error happened, try again later";
    buttonElement.disabled = false;
    buttonElement.innerText = "Tell Me A Joke";
  }
}

// Legger til en event listener for å kjøre getJoke-funksjonen når knappen klikkes
buttonElement.addEventListener("click", getJoke);
