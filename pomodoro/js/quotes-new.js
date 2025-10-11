/**
 * Motivational quotes system
 * Refactored with ES6 modules and better error handling
 */

import { QUOTES_DB_PATH, QUOTE_ROTATION } from './config.js';

let quotes = [];
let currentQuoteIndex = 0;
let rotationTimer = null;

/**
 * Initializes the quotes system
 * @returns {Promise<void>}
 */
export async function initQuotes() {
  try {
    const response = await fetch(QUOTES_DB_PATH);
    const data = await response.json();
    quotes = data.quotes;

    if (quotes.length > 0) {
      displayRandomQuote();
      scheduleNextQuote();
    }
  } catch (error) {
    console.error('Failed to load quotes:', error);
    displayFallbackQuote();
  }
}

/**
 * Displays a random quote
 */
export function displayRandomQuote() {
  if (quotes.length === 0) {
    displayFallbackQuote();
    return;
  }

  currentQuoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[currentQuoteIndex];

  updateQuoteDisplay(quote);
}

/**
 * Displays the next quote in sequence
 */
export function displayNextQuote() {
  if (quotes.length === 0) {
    displayFallbackQuote();
    return;
  }

  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  const quote = quotes[currentQuoteIndex];

  updateQuoteDisplay(quote);
}

/**
 * Updates the quote display in the DOM
 * @param {Object} quote - Quote object
 */
function updateQuoteDisplay(quote) {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (quoteText && quoteAuthor) {
    const yearText = quote.year ? ` (${quote.year})` : '';
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}${yearText}`;
  }
}

/**
 * Displays fallback quote when loading fails
 */
function displayFallbackQuote() {
  const fallbackQuote = {
    text: 'Focus is the gateway to thinking clearly, feeling deeply, and living fully.',
    author: 'Cal Newport',
    year: 2016,
  };

  updateQuoteDisplay(fallbackQuote);
}

/**
 * Schedules the next quote rotation
 */
function scheduleNextQuote() {
  if (rotationTimer) {
    clearTimeout(rotationTimer);
  }

  const randomMinutes = Math.floor(
    Math.random() * (QUOTE_ROTATION.MAX_MINUTES - QUOTE_ROTATION.MIN_MINUTES + 1)
  ) + QUOTE_ROTATION.MIN_MINUTES;

  const milliseconds = randomMinutes * 60 * 1000;

  rotationTimer = setTimeout(() => {
    displayRandomQuote();
    scheduleNextQuote();
  }, milliseconds);
}

/**
 * Stops quote rotation
 */
export function stopQuoteRotation() {
  if (rotationTimer) {
    clearTimeout(rotationTimer);
    rotationTimer = null;
  }
}

/**
 * Starts quote rotation
 */
export function startQuoteRotation() {
  scheduleNextQuote();
}

/**
 * Gets all loaded quotes
 * @returns {Array} - Array of quote objects
 */
export function getAllQuotes() {
  return [...quotes];
}
