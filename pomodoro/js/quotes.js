function loadRandomQuote() {
  fetch("quotes.json")
    .then((response) => response.json())
    .then((data) => {
      const quote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
      const yearText = quote.year ? ` (${quote.year})` : "";
      document.getElementById("quote-text").textContent = `"${quote.text}"`;
      document.getElementById("quote-author").textContent =
        `— ${quote.author}${yearText}`;
    });
}

function scheduleNextQuote() {
  const randomMinutes = Math.floor(Math.random() * 5) + 1;
  const milliseconds = randomMinutes * 60 * 1000;

  setTimeout(() => {
    loadRandomQuote();
    scheduleNextQuote();
  }, milliseconds);
}

loadRandomQuote();
scheduleNextQuote();
