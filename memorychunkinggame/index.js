class MemoryChunkingGame {
    constructor() {
        // Game parameters
        this.chunkSize = 3;
        this.numChunks = 1;
        this.totalDigits = 3;
        this.chunks = [];
        this.maxChunkSize = 4;
        this.level = 1;

        // Theme messages
        this.themes = {
            'mafia': {
                intro: "🎲 Welcome to Don Vito's Memory Test",
                correct: [
                    "💵 Correct! You might just earn yourself some respect.",
                    "🎰 Not bad, kid. The family's starting to notice you.",
                    "🎲 Hey, looks like you've got what it takes after all!",
                    "💼 The Don is pleased with your performance.",
                    "🎭 You're proving yourself worthy of the family business."
                ],
                incorrect: [
                    "💀 Wrong! The number was: {0}. Don't disappoint the family again.",
                    "🔫 That's not how we do business. It was {0}, capisce?",
                    "⚰️ You're testing the Don's patience. It was {0}.",
                    "🚬 You're slipping up. The number was {0}. Fix it.",
                    "🎭 The family expected better. It was {0}."
                ],
                progress: [
                    "👑 You're making some real progress, looking like a wise guy.",
                    "🎰 Keep this up, and you might make it to the inner circle.",
                    "💎 The Don's starting to remember your name, kid.",
                    "🎲 You're climbing the ranks, don't stop now.",
                    "🏆 The family's talking about you. In a good way."
                ]
            },
            'dark-humor': {
                intro: "🎲 Welcome to the Dark Humor Memory Challenge",
                correct: [
                    "💵 Wow, you actually got it right. Unbelievable.",
                    "🎭 Look who's not completely useless after all.",
                    "🃏 Congratulations, you've delayed the inevitable.",
                    "⚡ Well, well... someone's been paying attention.",
                    "🎪 Against all odds, you didn't mess up. Yet."
                ],
                incorrect: [
                    "💀 Wrong! You fail. The number was: {0}. Too bad!",
                    "🎭 Spectacular failure! It was {0}. Try harder... or don't.",
                    "⚰️ Oops! {0} was correct. But who's counting? Oh right, we are.",
                    "🃏 Wrong! {0} was right. Your memory is as good as your life choices.",
                    "🎪 Nice try! But {0} was correct. Keep lowering those expectations!"
                ],
                progress: [
                    "👑 Oh, you're getting better... Or maybe you're just lucky.",
                    "🎭 Well, look who decided to use their brain today!",
                    "🃏 Your improvement is almost as impressive as your dedication to failure.",
                    "⚡ Keep this up, and you might actually amount to something.",
                    "🎪 Your progress is surprisingly not terrible."
                ]
            },
            'olympic-god': {
                intro: "🏅 Welcome to the Olympian Memory Trials",
                correct: [
                    "🌟 Correct! You have earned the favor of the gods.",
                    "⚡ Zeus himself nods in approval!",
                    "🏺 The Oracle predicted your success, mortal.",
                    "🗡️ Athena smiles upon your wisdom.",
                    "🏛️ Your memory rivals that of the Muses!"
                ],
                incorrect: [
                    "⚡ Wrong! The number was: {0}. You have angered the gods.",
                    "🌋 Foolish mortal! {0} was the divine sequence!",
                    "⚔️ The Fates frown upon your error. It was {0}.",
                    "🏺 Your failure ({0}) echoes through Olympus.",
                    "🗡️ Hades awaits those who forget {0}."
                ],
                progress: [
                    "⚔️ Your strength increases, mere mortal.",
                    "🏺 The gods whisper of your potential.",
                    "⚡ Mount Olympus trembles at your progress.",
                    "🌟 Your legend grows with each success.",
                    "🏛️ The immortals watch your ascension with interest."
                ]
            },
            'space-odyssey': {
                intro: "🚀 Welcome to the Space Odyssey Memory Game",
                correct: [
                    "💫 Correct! You've just passed the space test.",
                    "🛸 Your neural pathways are evolving, astronaut!",
                    "🌠 The cosmos aligns with your consciousness.",
                    "👾 Your mind transcends earthly limitations.",
                    "🌌 The space-time continuum bends to your will!"
                ],
                incorrect: [
                    "💥 Wrong! The code was: {0}. You've been ejected into space.",
                    "🌌 Critical failure! {0} was the quantum sequence.",
                    "🛸 Error in the space-time matrix! {0} was correct.",
                    "👾 Your atoms scatter across dimensions. It was {0}.",
                    "🚀 Houston, we have a problem. The code was {0}."
                ],
                progress: [
                    "🌌 Your neural networks are growing, astronaut.",
                    "🛸 Your consciousness expands beyond the stars.",
                    "💫 The universe recognizes your potential.",
                    "🌠 Your mind traverses new dimensions.",
                    "👾 You're evolving beyond human limitations."
                ]
            },
            'pirate': {
                intro: "🏴‍☠️ Welcome to the Pirate Memory Test",
                correct: [
                    "💰 Correct! Yer startin' to earn some gold.",
                    "⚓ Shiver me timbers, ye got it right!",
                    "🗺️ Ye've found the treasure, ye scurvy dog!",
                    "🏴‍☠️ Aye! The crew be impressed with ye!",
                    "⚔️ Ye've got the memory of a seasoned buccaneer!"
                ],
                incorrect: [
                    "☠️ Wrong! The number was: {0}. Walk the plank!",
                    "🦜 Blimey! {0} was the treasure map code!",
                    "⚓ Ye landlubber! {0} was the right course!",
                    "🏴‍☠️ The Kraken takes ye! It was {0}.",
                    "💀 Davy Jones laughs at yer failure: {0}!"
                ],
                progress: [
                    "⚔️ Yer gettin' better, might become a captain one day.",
                    "🏴‍☠️ The crew's whisperin' about yer skills.",
                    "🗺️ Ye've got the makings of a true pirate!",
                    "⚓ The seas be favorable to ye today!",
                    "💰 Keep this up and ye'll be rich as a king!"
                ]
            }
        };

        // DOM elements
        this.chunksContainer = document.getElementById('chunks-container');
        this.userInput = document.getElementById('user-input');
        this.readyBtn = document.getElementById('ready-btn');
        this.submitBtn = document.getElementById('submit-btn');
        this.resultMessage = document.getElementById('result-message');
        this.levelDisplay = document.getElementById('level');
        this.chunkCountDisplay = document.getElementById('chunk-count');
        this.totalDigitsDisplay = document.getElementById('total-digits');
        this.themeSelect = document.getElementById('theme-select');

        // Event listeners
        this.readyBtn.addEventListener('click', () => this.readyToInput());
        this.submitBtn.addEventListener('click', () => this.checkUserInput());
        this.themeSelect.addEventListener('change', () => this.updateTheme());
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.userInput.disabled === false) {
                this.checkUserInput();
            }
        });

        // Initialize game
        this.currentTheme = 'mafia';
        this.updateTheme();
        this.nextChunk();
    }

    generateChunks() {
        this.chunks = [];
        let remainingDigits = this.totalDigits;
        
        while (remainingDigits > 0) {
            const chunkSize = Math.min(this.chunkSize, remainingDigits);
            const chunk = Array.from({length: chunkSize}, () => 
                Math.floor(Math.random() * 10)).join('');
            this.chunks.push(chunk);
            remainingDigits -= chunkSize;
        }

        // Update display
        this.chunksContainer.innerHTML = '';
        this.chunks.forEach((chunk, index) => {
            const chunkElement = document.createElement('div');
            chunkElement.className = 'chunk';
            chunkElement.textContent = `Chunk ${index + 1}: ${chunk.split('').join(' ')}`;
            this.chunksContainer.appendChild(chunkElement);
        });
    }

    readyToInput() {
        // Hide chunks
        const chunkElements = this.chunksContainer.querySelectorAll('.chunk');
        chunkElements.forEach(el => el.style.opacity = '0');

        // Enable input
        this.userInput.disabled = false;
        this.userInput.value = '';
        this.submitBtn.disabled = false;
        this.readyBtn.disabled = true;
        this.userInput.focus();
    }

    checkUserInput() {
        const userInput = this.userInput.value.replace(/\s+/g, '');
        const correctSequence = this.chunks.join('');

        if (userInput === correctSequence) {
            this.showResult(true);
            this.adjustDifficulty(true);
        } else {
            this.showResult(false, correctSequence);
            this.adjustDifficulty(false);
        }

        // Disable input
        this.userInput.disabled = true;
        this.submitBtn.disabled = true;

        // Schedule next chunk
        setTimeout(() => this.nextChunk(), 2000);
    }

    showResult(success, correctSequence = '') {
        const theme = this.themes[this.currentTheme];
        const messages = success ? theme.correct : theme.incorrect;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        this.resultMessage.textContent = success ? 
            randomMessage : 
            randomMessage.replace('{0}', correctSequence);
        
        this.resultMessage.className = `result-message ${success ? 'success' : 'error'}`;
        
        // Show random progress message occasionally (20% chance on success)
        if (success && Math.random() < 0.2) {
            const progressMessages = theme.progress;
            const progressMessage = progressMessages[Math.floor(Math.random() * progressMessages.length)];
            setTimeout(() => {
                this.resultMessage.textContent = progressMessage;
                this.resultMessage.className = 'result-message success';
            }, 1500);
        }
    }

    adjustDifficulty(success) {
        if (success) {
            this.level++;
            if (this.level % 3 === 0) {
                if (this.numChunks < 4) {
                    this.numChunks++;
                    this.totalDigits++;
                } else if (this.chunkSize < this.maxChunkSize) {
                    this.chunkSize++;
                    this.totalDigits++;
                }
            } else {
                this.totalDigits++;
            }
        } else {
            this.level = Math.max(1, this.level - 1);
            if (this.totalDigits > 3) {
                this.totalDigits--;
            }
            if (this.numChunks > 1 && this.level < 3) {
                this.numChunks--;
            }
        }

        // Update displays
        this.updateDisplays();
    }

    updateDisplays() {
        this.levelDisplay.textContent = this.level;
        this.chunkCountDisplay.textContent = this.numChunks;
        this.totalDigitsDisplay.textContent = this.totalDigits;
    }

    updateTheme() {
        this.currentTheme = this.themeSelect.value;
        document.body.className = `theme-${this.currentTheme}`;
    }

    nextChunk() {
        this.resultMessage.textContent = '';
        this.generateChunks();
        this.readyBtn.disabled = false;
        this.updateDisplays();
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new MemoryChunkingGame();
}); 