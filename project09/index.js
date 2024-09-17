const weatherApiKey = "e1b50afd778abe6b730f15cf4d30ae03"; // API-nøkkel for OpenWeatherMap
const weatherApiUrlBase = "https://api.openweathermap.org/data/2.5/weather"; // Grunnleggende URL for å hente værdata
let currentWeatherApiUrl; // Fullstendig URL for værforespørsler
const weatherCacheExpirationTime = 2 * 60 * 1000; // Utløpstid for cache, satt til 2 minutter
const citySearchInput = document.querySelector(".city-search-input"); // Inputfelt for bysøk
const searchWeatherButton = document.querySelector(".search-weather-button"); // Knapp for å utføre søket
const weatherConditionIcon = document.querySelector(".weather-condition-icon"); // Ikon som representerer værforhold

// Asynkron funksjon for å sjekke værdata for en spesifisert by
async function fetchWeatherDataForCity(cityName) {
  currentWeatherApiUrl = `${weatherApiUrlBase}?q=${cityName}&appid=${weatherApiKey}&units=metric`; // Setter opp API-URL med valgt by

  // Henter cachede data fra localStorage
  const cachedWeatherData = JSON.parse(
    localStorage.getItem("cachedWeatherData")
  );
  const cachedCity = localStorage.getItem("cachedWeatherCity");
  const cachedDataTime = localStorage.getItem("cachedWeatherDataTime");

  // Sjekker om det finnes cachede data som fortsatt er gyldige
  if (
    cachedWeatherData &&
    cachedCity === cityName &&
    cachedDataTime &&
    Date.now() - cachedDataTime < weatherCacheExpirationTime
  ) {
    displayWeatherData(cachedWeatherData); // Viser de cachede dataene
  } else {
    console.log("Fetching new weather data from API");

    try {
      const response = await fetch(currentWeatherApiUrl); // Henter nye data fra API
      if (!response.ok) {
        // Hvis byen ikke finnes eller annen feil oppstår
        throw new Error("City not found");
      }

      const weatherData = await response.json(); // Konverterer dataene til JSON
      localStorage.setItem("cachedWeatherData", JSON.stringify(weatherData)); // Lagrer data i cache
      localStorage.setItem("cachedWeatherDataTime", Date.now()); // Lagrer tidspunktet for cachen
      localStorage.setItem("cachedWeatherCity", cityName); // Lagrer navnet på byen i cache

      displayWeatherData(weatherData); // Viser de hentede dataene
      document.querySelector(".error-message").style.display = "none"; // Skjuler eventuell tidligere feilmelding
    } catch (error) {
      console.error(error);
      document.querySelector(".error-message").style.display = "block"; // Viser feilmelding hvis byen ikke finnes
      document.querySelector(".weather-display-section").style.display = "none"; // Skjuler værseksjonen ved feil
    }
  }
}

// Funksjon for å vise værdataene på siden
function displayWeatherData(weatherData) {
  document.querySelector(
    ".city-name"
  ).innerHTML = `${weatherData.name}, ${weatherData.sys.country}`; // Viser bynavn og land
  document.querySelector(".current-temperature").innerHTML = `${Math.round(
    weatherData.main.temp
  )}°C`; // Viser temperatur
  document.querySelector(
    ".current-humidity"
  ).innerHTML = `${weatherData.main.humidity}%`; // Viser fuktighet
  document.querySelector(
    ".current-wind-speed"
  ).innerHTML = `${weatherData.wind.speed} km/h`; // Viser vindhastighet

  // Oppdaterer værikonet basert på værforhold
  if (weatherData.weather[0].main === "Clouds") {
    weatherConditionIcon.src = "assets/clouds.png";
  } else if (weatherData.weather[0].main === "Clear") {
    weatherConditionIcon.src = "assets/clear.png";
  } else if (weatherData.weather[0].main === "Rain") {
    weatherConditionIcon.src = "assets/rain.png";
  } else if (weatherData.weather[0].main === "Snow") {
    weatherConditionIcon.src = "assets/snow.png";
  } else if (weatherData.weather[0].main === "Drizzle") {
    weatherConditionIcon.src = "assets/drizzle.png";
  } else if (weatherData.weather[0].main === "Mist") {
    weatherConditionIcon.src = "assets/mist.png";
  } else if (weatherData.weather[0].main === "Haze") {
    weatherConditionIcon.src = "assets/mist.png";
  } else if (weatherData.weather[0].main === "Thunderstorm") {
    weatherConditionIcon.src = "assets/clouds.png";
  } else {
    weatherConditionIcon.src = "assets/sun.png";
  }

  // Viser værseksjonen når data er tilgjengelige
  document.querySelector(".weather-display-section").style.display = "block";
}

// Event-lytter for søkeknappen
searchWeatherButton.addEventListener("click", () => {
  const cityName = citySearchInput.value; // Henter innholdet fra input-feltet
  fetchWeatherDataForCity(cityName); // Utfører værforespørsel for byen
});

// Event-lytter for Enter-tasten i søkefeltet
citySearchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const cityName = citySearchInput.value; // Henter innholdet fra input-feltet
    fetchWeatherDataForCity(cityName); // Utfører værforespørsel for byen
  }
});

// Utfører værforespørsel for Oslo som standard når siden lastes
fetchWeatherDataForCity("Oslo");
