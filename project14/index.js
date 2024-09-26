// Selecting the elements with the correct IDs
const quoteContent = document.querySelector("#quote-content");
const authorName = document.querySelector("#author-name");
const quoteBtn = document.querySelector("#new-quote-btn");
const apiURL = "https://api.quotable.io/quotes/random";

// Fallback quotes array with 10 different quotes
const fallbackQuotes = [
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    quote: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
];

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
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    const fallbackQuote = fallbackQuotes[randomIndex];

    // Update the content with a fallback quote
    quoteContent.innerText = fallbackQuote.quote;
    authorName.innerText = `~ ${fallbackQuote.author}`;
  } finally {
    // Restore the button state after completion
    quoteBtn.innerText = "New Quote";
    quoteBtn.disabled = false;
    clearTimeout(timeoutId); // Clear the timeout if it didn’t trigger
  }
}

// Add an event listener to the button to fetch a new quote on click
quoteBtn.addEventListener("click", getQuote);

// Fetch an initial quote on page load
window.onload = getQuote;
