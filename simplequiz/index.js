// State management
const state = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedQuestionCount: 10,
    quizStarted: false,
    userAnswers: [] // Track user answers
};

// DOM Elements
const elements = {
    quizConfig: document.getElementById('quizConfig'),
    quizContainer: document.getElementById('quizContainer'),
    resultsContainer: document.getElementById('resultsContainer'),
    questionText: document.getElementById('questionText'),
    answerButtons: document.getElementById('answerButtons'),
    nextButton: document.getElementById('nextButton'),
    currentQuestion: document.getElementById('currentQuestion'),
    questionProgress: document.getElementById('questionProgress'),
    currentScore: document.getElementById('currentScore'),
    finalScore: document.getElementById('finalScore'),
    totalQuestions: document.getElementById('totalQuestions'),
    scorePercentage: document.getElementById('scorePercentage'),
    resultMessage: document.getElementById('resultMessage'),
    questionCount: document.getElementById('questionCount'),
    startQuiz: document.getElementById('startQuiz'),
    retryQuiz: document.getElementById('retryQuiz'),
    viewAnswers: document.getElementById('viewAnswers')
};

// Event Listeners
elements.startQuiz.addEventListener('click', initializeQuiz);
elements.nextButton.addEventListener('click', handleNextQuestion);
elements.retryQuiz.addEventListener('click', resetQuiz);
elements.viewAnswers.addEventListener('click', showAnswers);

// Initialize quiz with selected number of questions
async function initializeQuiz() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        
        // Get selected question count
        state.selectedQuestionCount = parseInt(elements.questionCount.value);
        
        // Randomly select questions
        state.questions = shuffleArray(data.questions)
            .slice(0, state.selectedQuestionCount);
        
        // Update UI
        elements.quizConfig.classList.add('hidden');
        elements.quizContainer.classList.remove('hidden');
        elements.questionProgress.textContent = `of ${state.selectedQuestionCount}`;
        elements.totalQuestions.textContent = state.selectedQuestionCount;
        
        // Start quiz
        state.quizStarted = true;
        showQuestion();
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Error loading questions. Please try again.');
    }
}

// Display current question
function showQuestion() {
    resetState();
    const currentQuestion = state.questions[state.currentQuestionIndex];
    
    // Update progress
    elements.currentQuestion.textContent = `Question ${state.currentQuestionIndex + 1}`;
    elements.currentScore.textContent = state.score;
    
    // Display question
    elements.questionText.textContent = currentQuestion.question;
    
    // Create answer buttons
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-button');
        button.dataset.index = index;
        
        if (answer.correct) {
            button.dataset.correct = true;
        }
        
        button.addEventListener('click', selectAnswer);
        elements.answerButtons.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    
    // Track user answer
    state.userAnswers.push({
        question: state.questions[state.currentQuestionIndex].question,
        userAnswer: selectedButton.textContent,
        correctAnswer: Array.from(elements.answerButtons.children)
            .find(button => button.dataset.correct === 'true').textContent,
        isCorrect: isCorrect
    });
    
    // Update score and styling
    if (isCorrect) {
        state.score++;
        elements.currentScore.textContent = state.score;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        // Show correct answer
        const correctButton = Array.from(elements.answerButtons.children)
            .find(button => button.dataset.correct === 'true');
        correctButton.classList.add('correct');
    }
    
    // Disable all buttons and enable next
    Array.from(elements.answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    elements.nextButton.disabled = false;
}

// Handle next question
function handleNextQuestion() {
    state.currentQuestionIndex++;
    
    if (state.currentQuestionIndex < state.selectedQuestionCount) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    elements.quizContainer.classList.add('hidden');
    elements.resultsContainer.classList.remove('hidden');
    
    const percentage = (state.score / state.selectedQuestionCount) * 100;
    elements.finalScore.textContent = state.score;
    elements.scorePercentage.textContent = Math.round(percentage);
    
    // Set result message based on score
    let message = '';
    if (percentage === 100) {
        message = 'Perfect! You\'re a genius! 🎉';
    } else if (percentage >= 80) {
        message = 'Excellent work! Keep it up! 🌟';
    } else if (percentage >= 60) {
        message = 'Good job! Room for improvement! 👍';
    } else if (percentage >= 40) {
        message = 'Not bad, but you can do better! 💪';
    } else {
        message = 'Keep studying and try again! 📚';
    }
    elements.resultMessage.textContent = message;
}

// Show answers implementation
function showAnswers() {
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review-container');
    
    // Create header
    const header = document.createElement('div');
    header.classList.add('review-header');
    header.innerHTML = `
        <h2>Answer Review</h2>
        <button id="closeReview" class="close-button">
            <i class="fas fa-times"></i>
        </button>
    `;
    reviewContainer.appendChild(header);
    
    // Create answers list
    const answersList = document.createElement('div');
    answersList.classList.add('answers-list');
    
    state.userAnswers.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answer-review-item');
        answerItem.classList.add(answer.isCorrect ? 'correct' : 'incorrect');
        
        answerItem.innerHTML = `
            <div class="question-number">Question ${index + 1}</div>
            <div class="question-text">${answer.question}</div>
            <div class="answer-details">
                <div class="user-answer">
                    <strong>Your Answer:</strong> ${answer.userAnswer}
                    <i class="fas ${answer.isCorrect ? 'fa-check' : 'fa-times'}"></i>
                </div>
                ${!answer.isCorrect ? `
                    <div class="correct-answer">
                        <strong>Correct Answer:</strong> ${answer.correctAnswer}
                    </div>
                ` : ''}
            </div>
        `;
        
        answersList.appendChild(answerItem);
    });
    
    reviewContainer.appendChild(answersList);
    document.body.appendChild(reviewContainer);
    
    // Add close functionality
    document.getElementById('closeReview').addEventListener('click', () => {
        document.body.removeChild(reviewContainer);
    });
}

// Reset quiz state
function resetQuiz() {
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.quizStarted = false;
    state.userAnswers = []; // Reset user answers
    
    elements.resultsContainer.classList.add('hidden');
    elements.quizConfig.classList.remove('hidden');
    elements.currentScore.textContent = '0';
}

// Helper function to reset question state
function resetState() {
    elements.nextButton.disabled = true;
    elements.answerButtons.innerHTML = '';
}

// Helper function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    resetQuiz();
});
