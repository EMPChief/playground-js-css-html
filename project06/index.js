// Velger checkbox-elementet fra HTML-dokumentet
const inputElement = document.querySelector(".toggle-checkbox");

// Velger body-elementet for å endre bakgrunnsfarge
const bodyElement = document.querySelector("body");

// Setter checkbox til å være sjekket basert på lagret verdi i localStorage, eller false som standard
inputElement.checked = JSON.parse(localStorage.getItem("darkMode")) || false;
updateBody();

// Lytter etter endringer på checkboxen og oppdaterer body-stylingen og localStorage deretter
inputElement.addEventListener("change", () => {
    updateBody();
    updateLocalStorage();
});

// Funksjon som oppdaterer bakgrunnsfargen basert på om dark mode er aktivert eller ikke
function updateBody() {
  if (inputElement.checked) {
    bodyElement.classList.add("dark-mode"); // Bruker CSS-klassen for dark mode
  } else {
    bodyElement.classList.remove("dark-mode"); // Fjerner dark mode når den ikke er sjekket
  }
}

// Funksjon som oppdaterer localStorage basert på om dark mode er aktivert eller ikke
function updateLocalStorage() {
    localStorage.setItem("darkMode", JSON.stringify(inputElement.checked)); // Lagrer tilstanden til dark mode i localStorage
}
