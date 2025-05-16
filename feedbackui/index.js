const ratingItems = document.querySelectorAll(".rating-item");
const submitReviewButton = document.getElementById("submit-review");
const feedbackContainer = document.getElementById("feedback-container");
const ratingMessage = document.getElementById("rating-message");
let selectedFeedback = "";

// Rating-specific messages
const ratingMessages = {
  unhappy: "We're sorry to hear that. What went wrong?",
  neutral: "Thanks for your feedback. How can we improve?",
  satisfied: "We're glad you're happy! What did you like most?"
};

// Thank you messages for each rating
const thankYouMessages = {
  unhappy: "We appreciate your honesty. We'll work hard to improve.",
  neutral: "Thank you for your balanced feedback. We'll keep working to get better.",
  satisfied: "Thanks for your positive feedback! We'll keep up the good work!"
};

// Add click event to each rating
ratingItems.forEach((ratingItem) => {
  ratingItem.addEventListener("click", () => {
    // Remove active class from all ratings
    removeActiveClasses();

    // Get the rating type from data attribute
    const ratingType = ratingItem.dataset.rating;
    
    // Add active class to clicked rating
    ratingItem.classList.add("active");
    
    // Enable submit button
    submitReviewButton.disabled = false;
    
    // Store selected feedback
    selectedFeedback = ratingType;
    
    // Show rating-specific message
    showRatingMessage(ratingType);
  });
});

// Add click event for submitting review
submitReviewButton.addEventListener("click", () => {
  if (selectedFeedback !== "") {
    const ratingType = selectedFeedback;
    feedbackContainer.innerHTML = `
      <div class="rating-message ${ratingType}">
        <h2>Thank You!</h2>
        <p>${thankYouMessages[ratingType]}</p>
        <button class="submit-review" onclick="location.reload()">Give New Feedback</button>
      </div>
    `;
  }
});

// Function to remove active classes
function removeActiveClasses() {
  ratingItems.forEach((ratingItem) => {
    ratingItem.classList.remove("active");
  });
  ratingMessage.textContent = "";
  submitReviewButton.disabled = true;
}

// Function to show rating-specific message
function showRatingMessage(ratingType) {
  ratingMessage.textContent = ratingMessages[ratingType];
  ratingMessage.className = "rating-message " + ratingType;
}
