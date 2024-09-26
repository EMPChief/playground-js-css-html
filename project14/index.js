// Selecting the elements with the correct IDs
const quoteContent = document.querySelector("#quote-content");
const authorName = document.querySelector("#author-name");
const quoteBtn = document.querySelector("#new-quote-btn");
const apiURL = "https://api.quotable.io/quotes/random";
let fallbackQuotes = [];

// Load fallback quotes from the JSON file
async function loadFallbackQuotes() {
  try {
    const response = await fetch('fallbackQuotes.json');
    fallbackQuotes = await response.json();
  } catch (error) {
    console.error("Error loading fallback quotes:", error);
  }
}

// Function to fetch a new quote from the API
async function getQuote() {
  let timeoutId; // Declare timeoutId in the outer scope
  try {
    // Disable the button to prevent multiple requests during loading
    quoteBtn.innerText = "Loading...";
    quoteBtn.disabled = true;

    // Set a timeout to prevent hanging
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    // Fetch the quote data
    const response = await fetch(apiURL, { signal: controller.signal });

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.status}`);
    }

    const data = await response.json();
    const quote = data.content;
    const author = data.author;

    // Update the content with the new quote
    quoteContent.innerText = quote;
    authorName.innerText = `~ ${author}`;

  } catch (error) {
    // Handle errors gracefully, including network or fetch issues

    // Choose a random fallback quote from the array
    if (fallbackQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      const fallbackQuote = fallbackQuotes[randomIndex];

      // Update the content with a fallback quote
      quoteContent.innerText = fallbackQuote.quote;
      authorName.innerText = `~ ${fallbackQuote.author}`;
    } else {
      quoteContent.innerText = "An error occurred. Please try again later.";
      authorName.innerText = "~ Unknown";
    }
  } finally {
    // Restore the button state after completion
    quoteBtn.innerText = "New Quote";
    quoteBtn.disabled = false;
    clearTimeout(timeoutId); // Clear the timeout if it didn’t trigger
  }
}

// Add an event listener to the button to fetch a new quote on click
quoteBtn.addEventListener("click", getQuote);

// Load fallback quotes and fetch an initial quote on page load
window.onload = async () => {
  await loadFallbackQuotes();
  getQuote();
};
