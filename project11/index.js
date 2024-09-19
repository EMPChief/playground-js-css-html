// Initialize variables
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answerbutton");
const nextButton = document.getElementById("nextbutton");
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Function to fetch questions from the JSON file
async function loadQuestions() {
  const response = await fetch("questions.json");
  questions = await response.json();
  startQuiz();
}

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  displayQuestion();
}

// Function to display the questions and answers
function displayQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("buttonforquiz");
    button.addEventListener("click", () => selectAnswer(answer, button));
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
  });
}

// Reset the state of the quiz for the next question
function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Function to handle answer selection
function selectAnswer(answer, selectedButton) {
  const correct = selectedButton.dataset.correct;
  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  // Show the correct answers
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

// Function to show the final score
function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}`;
  nextButton.innerText = "Play Again"; // Change text to Play Again
  nextButton.style.display = "block"; // Show next button
}

// Go to the next question when the "Next" button is clicked
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      showScore();
    }
  } else {
    startQuiz();
  }
});

// Load questions when the page loads
window.onload = loadQuestions;
