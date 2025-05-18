document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tools
    initializeCalculator();
    initializeCounter();
    initializeTemperatureConverter();
    initializeColorGenerator();
    initializeTipCalculator();
    initializeWordCounter();
    initializeDigitalClock();
    initializePasswordChecker();
    initializeBMICalculator();
    
    // Initialize Analytics Dashboard
    initializeAnalyticsDashboard();
});

/**
 * Initialize the analytics dashboard functionality
 */
function initializeAnalyticsDashboard() {
    // Get DOM elements
    const refreshBtn = document.getElementById('refreshAnalytics');
    const clearBtn = document.getElementById('clearAnalytics');
    
    // Update analytics display
    updateAnalyticsDisplay();
    
    // Add event listener for refresh button
    refreshBtn?.addEventListener('click', function() {
        updateAnalyticsDisplay();
        // Add a small animation to indicate refresh
        this.classList.add('rotate-animation');
        setTimeout(() => {
            this.classList.remove('rotate-animation');
        }, 500);
    });
    
    // Add event listener for clear button
    clearBtn?.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
            Analytics.clearData();
            updateAnalyticsDisplay();
            
            // Show feedback message
            const feedbackDiv = document.createElement('div');
            feedbackDiv.classList.add('alert', 'alert-success', 'mt-3', 'text-center');
            feedbackDiv.textContent = 'Analytics data has been cleared successfully.';
            
            const analyticsCard = document.querySelector('.card-body');
            analyticsCard.appendChild(feedbackDiv);
            
            // Remove the feedback message after 3 seconds
            setTimeout(() => {
                feedbackDiv.remove();
            }, 3000);
        }
    });
}

/**
 * Update the analytics dashboard with current data
 */
function updateAnalyticsDisplay() {
    // Get analytics stats
    const stats = Analytics.getStats();
    
    // Update DOM elements with stats
    document.getElementById('totalInteractions').textContent = stats.totalInteractions;
    document.getElementById('mostUsedTool').textContent = formatToolName(stats.mostUsedTool);
    document.getElementById('mostUsedToolCount').textContent = `${stats.mostUsedToolCount} uses`;
    document.getElementById('sessionCount').textContent = `${stats.sessionCount} session${stats.sessionCount !== 1 ? 's' : ''}`;
    document.getElementById('avgInteractions').textContent = `${stats.averageInteractionsPerSession} interactions/session`;
}

/**
 * Format tool ID into a readable name
 * @param {string} toolId - The tool ID to format
 * @returns {string} - Formatted tool name
 */
function formatToolName(toolId) {
    if (toolId === 'none') return 'None';
    
    // Map of tool IDs to readable names
    const toolNames = {
        'calculator': 'Calculator',
        'counter': 'Counter',
        'temperatureConverter': 'Temperature Converter',
        'colorGenerator': 'Color Generator',
        'tipCalculator': 'Tip Calculator',
        'wordCounter': 'Word Counter',
        'passwordChecker': 'Password Checker',
        'bmiCalculator': 'BMI Calculator'
    };
    
    return toolNames[toolId] || toolId;
}
