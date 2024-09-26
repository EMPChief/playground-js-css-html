// Selecting the button, container, image, and artist name elements
const generateAnimeButton = document.getElementById("generate-anime-btn");
const animeDisplayContainer = document.querySelector(
  ".anime-display-container"
);
const animeImageElement = document.querySelector(".anime-display-image");
const animeArtistNameElement = document.querySelector(".anime-artist-name");

// Event listener for the "Get Anime" button
generateAnimeButton.addEventListener("click", async function () {
  try {
    // Disable button during loading and set loading indicators
    generateAnimeButton.disabled = true;
    generateAnimeButton.innerText = "Loading...";
    animeArtistNameElement.innerText = "Fetching anime...";
    animeImageElement.src = "spinner.svg"; // Placeholder image for loading

    // Fetch anime image data from the API
    const response = await fetch("https://api.catboys.com/img");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Update UI with the fetched data
    generateAnimeButton.disabled = false;
    generateAnimeButton.innerText = "Get Another Anime";
    animeDisplayContainer.style.display = "block";
    animeImageElement.src = data.url; // Set anime image
    animeArtistNameElement.innerText = `Artist: ${data.artist}`; // Set artist name
  } catch (error) {
    // Handle any errors that occur during fetch
    console.error("Error fetching anime:", error);
    generateAnimeButton.disabled = false;
    generateAnimeButton.innerText = "Try Again";
    animeArtistNameElement.innerText = "An error occurred, please try again";
  }
});
