const ratingItems = document.querySelectorAll(".rating-item");
const submitReviewButton = document.getElementById("submit-review");
const feedbackContainer = document.getElementById("feedback-container");
let selectedFeedback = "";

// Legg til klikkhendelse på hver vurdering
ratingItems.forEach((ratingItem) => {
  ratingItem.addEventListener("click", () => {
    // Fjern aktiv klasse fra alle vurderinger
    removeActiveClasses();

    // Hent vurderingsteksten
    const feedbackText = ratingItem.querySelector("small").innerText;

    // Legg til aktiv klasse på den klikkede vurderingen
    ratingItem.classList.add("active");

    // Sett valgt vurdering
    selectedFeedback = feedbackText;
  });
});

// Legg til klikkhendelse for å sende vurdering
submitReviewButton.addEventListener("click", () => {
  if (selectedFeedback !== "") {
    feedbackContainer.innerHTML = `
      <strong>Thank you!</strong>
      <br><br>
      <strong>Feedback: ${selectedFeedback}</strong>
      <p>We'll use your feedback to improve our customer support.</p>
    `;
  }
});

// Funksjon for å fjerne aktive klasser
function removeActiveClasses() {
  ratingItems.forEach((ratingItem) => {
    ratingItem.classList.remove("active");
  });
}
