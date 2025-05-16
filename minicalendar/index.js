// Henter HTML-elementer ved hjelp av deres ID-er
const monthNameElement = document.getElementById("month-name");
const dayNameElement = document.getElementById("day-name");
const dayNumberElement = document.getElementById("day-number");
const yearElement = document.getElementById("year");

// Oppretter et Date-objekt for dagens dato
const currentDate = new Date();

// Får måneden fra dagens dato (0-basert)
const currentMonth = currentDate.getMonth();

// Setter månedens navn i monthNameElement
monthNameElement.innerText = currentDate.toLocaleString("default", {
  month: "long",
});

// Setter ukedagens navn i dayNameElement
dayNameElement.innerText = currentDate.toLocaleString("default", {
  weekday: "long",
});

// Setter dagens nummer i dayNumberElement
dayNumberElement.innerText = currentDate.getDate();

// Setter året i yearElement
yearElement.innerText = currentDate.getFullYear();
