// State management
const state = {
    currentNumber: '',
    currentLevel: 1,
    score: 0,
    difficulty: 3,
    gameStarted: false,
    timer: null,
    displayTime: 0
};

// DOM Elements
const elements = {
    gameConfig: document.getElementById('gameConfig'),
    gameContainer: document.getElementById('gameContainer'),
    resultsContainer: document.getElementById('resultsContainer'),
    numberDisplay: document.getElementById('numberDisplay'),
    inputSection: document.getElementById('inputSection'),
    numberInput: document.getElementById('numberInput'),
    submitNumber: document.getElementById('submitNumber'),
    timerDisplay: document.getElementById('timerDisplay'),
    currentLevel: document.getElementById('currentLevel'),
    currentScore: document.getElementById('currentScore'),
    finalScore: document.getElementById('finalScore'),
    finalLevel: document.getElementById('finalLevel'),
    resultMessage: document.getElementById('resultMessage'),
    difficulty: document.getElementById('difficulty'),
    startGame: document.getElementById('startGame'),
    retryGame: document.getElementById('retryGame')
};

// Event Listeners
elements.startGame.addEventListener('click', startGame);
elements.submitNumber.addEventListener('click', checkAnswer);
elements.retryGame.addEventListener('click', resetGame);
elements.numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Start the game
function startGame() {
    state.difficulty = parseInt(elements.difficulty.value);
    state.gameStarted = true;
    
    // Update UI
    elements.gameConfig.classList.add('hidden');
    elements.gameContainer.classList.remove('hidden');
    
    // Start first level
    generateNumber();
}

// Generate a random number based on difficulty
function generateNumber() {
    const digits = state.difficulty + Math.floor((state.currentLevel - 1) / 2);
    let number = '';
    
    for (let i = 0; i < digits; i++) {
        number += Math.floor(Math.random() * 10);
    }
    
    state.currentNumber = number;
    state.displayTime = Math.max(2, digits * 0.5); // 0.5 seconds per digit, minimum 2 seconds
    
    // Display number
    elements.numberDisplay.textContent = number;
    elements.numberDisplay.classList.add('number-flash');
    
    // Start timer
    startTimer();
}

// Start the display timer
function startTimer() {
    let timeLeft = state.displayTime;
    elements.timerDisplay.textContent = `Time to remember: ${timeLeft.toFixed(1)}s`;
    
    state.timer = setInterval(() => {
        timeLeft -= 0.1;
        elements.timerDisplay.textContent = `Time to remember: ${timeLeft.toFixed(1)}s`;
        
        if (timeLeft <= 0) {
            clearInterval(state.timer);
            showInputSection();
        }
    }, 100);
}

// Show input section after number disappears
function showInputSection() {
    elements.numberDisplay.textContent = '';
    elements.numberDisplay.classList.remove('number-flash');
    elements.inputSection.classList.remove('hidden');
    elements.numberInput.focus();
}

// Check the answer
function checkAnswer() {
    const userAnswer = elements.numberInput.value;
    
    if (userAnswer === state.currentNumber) {
        // Correct answer
        state.score += state.currentLevel;
        state.currentLevel++;
        
        // Update UI
        elements.currentScore.textContent = state.score;
        elements.currentLevel.textContent = state.currentLevel;
        
        // Clear input and hide input section
        elements.numberInput.value = '';
        elements.inputSection.classList.add('hidden');
        
        // Generate next number
        generateNumber();
    } else {
        // Wrong answer - game over
        endGame();
    }
}

// End the game
function endGame() {
    clearInterval(state.timer);
    state.gameStarted = false;
    
    // Update results
    elements.finalScore.textContent = state.score;
    elements.finalLevel.textContent = state.currentLevel;
    
    // Set result message
    let message = '';
    if (state.currentLevel <= 3) {
        message = 'Keep practicing! You\'ll get better! 💪';
    } else if (state.currentLevel <= 5) {
        message = 'Good job! You\'re getting better! 🌟';
    } else if (state.currentLevel <= 7) {
        message = 'Excellent memory skills! 🎯';
    } else {
        message = 'Incredible! You\'re a memory master! 🏆';
    }
    elements.resultMessage.textContent = message;
    
    // Show results
    elements.gameContainer.classList.add('hidden');
    elements.resultsContainer.classList.remove('hidden');
}

// Reset the game
function resetGame() {
    state.currentLevel = 1;
    state.score = 0;
    state.gameStarted = false;
    
    // Reset UI
    elements.currentScore.textContent = '0';
    elements.currentLevel.textContent = '1';
    elements.numberInput.value = '';
    elements.inputSection.classList.add('hidden');
    elements.resultsContainer.classList.add('hidden');
    elements.gameConfig.classList.remove('hidden');
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    resetGame();
}); 