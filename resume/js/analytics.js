/**
 * Analytics Module
 * Tracks user interactions with the JavaPlay tools
 */

const Analytics = {
    // Storage key for analytics data
    STORAGE_KEY: 'javaplay_analytics',
    
    // Initialize analytics
    init: function() {
        // Load existing analytics data or initialize with defaults
        this.data = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {
            toolUsage: {},
            totalInteractions: 0,
            sessionStart: new Date().toISOString(),
            lastInteraction: new Date().toISOString(),
            sessions: []
        };
        
        // Start session tracking
        this.startSession();
        
        // Set up event listeners for all tools
        this.setupEventListeners();
        
        // Auto-save analytics data every 30 seconds
        setInterval(() => this.saveData(), 30000);
    },
    
    // Start a new session
    startSession: function() {
        // Check if we need a new session (last interaction > 30 minutes ago)
        const lastInteraction = new Date(this.data.lastInteraction);
        const now = new Date();
        const timeDiff = now - lastInteraction;
        
        // If more than 30 minutes, start a new session
        if (timeDiff > 30 * 60 * 1000 || this.data.sessions.length === 0) {
            this.data.sessions.push({
                startTime: now.toISOString(),
                interactions: 0,
                tools: {}
            });
        }
        
        // Update session start time
        this.data.sessionStart = now.toISOString();
    },
    
    // Track a tool interaction
    trackInteraction: function(toolId, action) {
        // Update last interaction time
        this.data.lastInteraction = new Date().toISOString();
        
        // Increment total interactions
        this.data.totalInteractions++;
        
        // Initialize tool usage if not exists
        if (!this.data.toolUsage[toolId]) {
            this.data.toolUsage[toolId] = {
                count: 0,
                actions: {}
            };
        }
        
        // Increment tool usage count
        this.data.toolUsage[toolId].count++;
        
        // Track specific action
        if (action) {
            if (!this.data.toolUsage[toolId].actions[action]) {
                this.data.toolUsage[toolId].actions[action] = 0;
            }
            this.data.toolUsage[toolId].actions[action]++;
        }
        
        // Track in current session
        const currentSession = this.data.sessions[this.data.sessions.length - 1];
        currentSession.interactions++;
        
        if (!currentSession.tools[toolId]) {
            currentSession.tools[toolId] = 0;
        }
        currentSession.tools[toolId]++;
        
        // Save data after each interaction
        this.saveData();
    },
    
    // Save analytics data to localStorage
    saveData: function() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    },
    
    // Set up event listeners for all tools
    setupEventListeners: function() {
        // Calculator
        document.querySelectorAll('#add, #subtract, #multiply, #divide').forEach(btn => {
            btn?.addEventListener('click', () => {
                this.trackInteraction('calculator', btn.id);
            });
        });
        
        // Counter
        document.querySelectorAll('#increment, #decrement').forEach(btn => {
            btn?.addEventListener('click', () => {
                this.trackInteraction('counter', btn.id);
            });
        });
        
        // Temperature Converter
        document.getElementById('convertTemp')?.addEventListener('click', () => {
            this.trackInteraction('temperatureConverter', 'convert');
        });
        
        // Random Color Generator
        document.getElementById('generateColor')?.addEventListener('click', () => {
            this.trackInteraction('colorGenerator', 'generate');
        });
        
        // Tip Calculator
        document.getElementById('calculateTip')?.addEventListener('click', () => {
            this.trackInteraction('tipCalculator', 'calculate');
        });
        
        // Word Counter
        document.getElementById('wordCountText')?.addEventListener('input', () => {
            this.trackInteraction('wordCounter', 'input');
        });
        
        // Password Checker
        document.getElementById('passwordInput')?.addEventListener('input', () => {
            this.trackInteraction('passwordChecker', 'check');
        });
        
        // BMI Calculator
        document.getElementById('calculateBMI')?.addEventListener('click', () => {
            this.trackInteraction('bmiCalculator', 'calculate');
        });
    },
    
    // Get usage statistics
    getStats: function() {
        const sortedTools = Object.entries(this.data.toolUsage)
            .sort((a, b) => b[1].count - a[1].count);
        
        return {
            totalInteractions: this.data.totalInteractions,
            mostUsedTool: sortedTools.length > 0 ? sortedTools[0][0] : 'none',
            mostUsedToolCount: sortedTools.length > 0 ? sortedTools[0][1].count : 0,
            sessionCount: this.data.sessions.length,
            averageInteractionsPerSession: this.data.sessions.length > 0 
                ? Math.round(this.data.totalInteractions / this.data.sessions.length) 
                : 0
        };
    },
    
    // Clear all analytics data
    clearData: function() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.data = {
            toolUsage: {},
            totalInteractions: 0,
            sessionStart: new Date().toISOString(),
            lastInteraction: new Date().toISOString(),
            sessions: []
        };
        this.startSession();
    }
};

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    Analytics.init();
}); 