# Pomodoro Timer

A professional, feature-rich Pomodoro timer web application with advanced task management, statistics tracking, keyboard shortcuts, and PWA support. Built with modern vanilla JavaScript using ES6 modules.

## Features

### Timer Functionality
- **Flexible Duration Support**: 25-minute work sessions, 5-minute short breaks, 15-minute long breaks (every 4th pomodoro)
- **Custom Timer Durations**: Modify work/break durations via settings panel
- **Circular Progress Visualization**: Beautiful SVG-based circular progress indicator
- **Auto/Manual Modes**: Choose automatic progression or manual control between phases
- **Tab Title Updates**: See remaining time in browser tab title
- **Phase Indicators**: Clear visual indication of current phase (Work/Break)

### Advanced Task Management
- **Modal-Based Task Addition**: Clean, focused modal interface for adding tasks
- **Task Categories**: Organize tasks by Work, Personal, Study, Health, Creative, or Other
- **Task Notes**: Add detailed notes to any task
- **Fractional Pomodoros**: Support for decimal pomodoro counts (0.1 = 2.5 minutes)
- **Drag & Drop Reordering**: Easily reorder tasks by dragging
- **Task Editing**: Edit task details anytime
- **Undo Delete**: 5-second window to undo accidental task deletions
- **Bulk Actions**: Clear all completed tasks or clear all tasks at once
- **Auto-Decrement**: First task automatically decrements by 0.1 every 2.5 minutes during work sessions
- **Celebration Animations**: Confetti animation when completing tasks
- **XSS Protection**: Input sanitization for security

### Statistics & Analytics
- **Comprehensive Tracking**: Track completed pomodoros, total work time, and completed tasks
- **Time Periods**: View daily, weekly, and all-time statistics
- **Interactive Dashboard**: Beautiful modal-based statistics display
- **Export/Import**: Export all data (tasks, stats, settings) as JSON and import later
- **Persistent Storage**: All data saved to localStorage

### Keyboard Shortcuts
- **Full Keyboard Navigation**: Control everything without touching the mouse
- **Shortcuts Help**: Press `?` to view all available shortcuts
- **Global Shortcuts**:
  - `Space` - Start/Pause timer
  - `r` - Reset timer
  - `a` - Toggle auto/manual mode
  - `m` - Toggle sound mute
  - `n` - Add new task
  - `s` - View statistics
  - `k` or `?` - Show keyboard shortcuts
  - `Escape` - Close modal

### UI/UX Enhancements
- **Glassmorphism Design**: Modern, elegant glass-effect styling
- **Modal System**: Clean modal dialogs for all interactions
- **Toolbar Interface**: Quick access to statistics, settings, sounds, and shortcuts
- **Break Suggestions**: Helpful activity suggestions during breaks
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Sound Preview**: Preview alarm sounds before selecting
- **Undo Notifications**: Toast notifications for undo actions

### Accessibility
- **ARIA Labels**: Full ARIA label support for screen readers
- **Keyboard Navigation**: Complete keyboard accessibility
- **Focus Management**: Proper focus handling in modals
- **Semantic HTML**: Proper semantic structure throughout

### PWA Support
- **Offline Functionality**: Service worker for offline access
- **Installable**: Install as standalone app on desktop and mobile
- **App Manifest**: Proper PWA manifest configuration
- **Caching Strategy**: Smart caching of all resources

### Notifications
- **Browser Notifications**: Get notified when work/break sessions complete
- **Permission Handling**: Graceful permission request flow
- **Fallback Support**: Works with or without notification permissions

### Audio System
- **8 Random Alarm Sounds**: Variety keeps you alert
- **Sound Preview**: Test sounds before using them
- **Mute Toggle**: Easy mute/unmute control
- **Preference Persistence**: Sound settings saved automatically

### Motivational Features
- **Rotating Quotes**: Productivity quotes that rotate every 1-5 minutes
- **Curated Collection**: Carefully selected motivational quotes
- **Smart Timing**: Quotes change at natural intervals

### Security
- **XSS Protection**: All user inputs sanitized
- **Safe HTML Rendering**: Prevents code injection attacks
- **Input Validation**: Proper validation throughout

## Getting Started

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd pomodoro
   ```

2. **Install dependencies (for testing)**
   ```bash
   npm install
   ```

3. **Start the application**

   Option A - Using Python:
   ```bash
   python serve.py
   ```

   Option B - Using Node.js:
   ```bash
   npm start
   ```

   Option C - Open directly:
   ```bash
   # Simply open index.html in your browser
   ```

4. **Access the application**
   - Open your browser to `http://localhost:8000` (or the port shown)
   - Allow notifications for the best experience

## Project Structure

```
pomodoro/
├── index.html              # Main application entry point
├── info.html              # Information page about Pomodoro technique
├── quotes.json            # Motivational quotes database
├── serve.py               # Python HTTP server
├── package.json           # Node dependencies and scripts
├── vitest.config.js       # Vitest unit test configuration
├── playwright.config.js   # Playwright E2E test configuration
├── assets/
│   ├── logo/             # App icons and manifest
│   └── sound/            # Alarm sound files (WAV format)
├── css/
│   ├── base.css          # Base styles and layout
│   ├── timer.css         # Timer-specific styles
│   ├── buttons.css       # Button styles
│   ├── tasks.css         # Task list styles
│   ├── quote.css         # Quote display styles
│   ├── features.css      # NEW: Modal, stats, settings styles
│   ├── info.css          # Info page styles
│   └── responsive.css    # Responsive design
├── js/
│   ├── app.js            # Main application entry point & initialization
│   ├── config.js         # Configuration constants
│   ├── utils.js          # Shared utility functions
│   ├── timer-new.js      # Enhanced timer logic with circular progress
│   ├── tasks-new.js      # Advanced task management with modals
│   ├── storage-new.js    # localStorage persistence layer
│   ├── sounds-new.js     # Sound notification system
│   ├── quotes-new.js     # Quote loading and rotation
│   ├── statistics.js     # Statistics tracking and export/import
│   ├── notifications.js  # Browser notification handling
│   ├── keyboard.js       # Keyboard shortcut system
│   └── ui.js            # Modal system and UI components
├── sw.js                 # Service Worker for PWA
└── tests/
    ├── setup.js          # Test environment setup
    ├── unit/
    │   ├── utils.test.js      # Utility function tests
    │   └── storage.test.js    # Storage tests
    └── e2e/
        ├── timer.spec.js      # Timer E2E tests
        ├── tasks.spec.js      # Task management E2E tests
        └── ui.spec.js         # UI interaction E2E tests
```

## Development

### Architecture

The application uses modern ES6 modules for clean separation of concerns:

- **app.js**: Main entry point that orchestrates all modules
- **config.js**: Centralized configuration to eliminate magic numbers
- **utils.js**: Shared utilities (XSS protection, time formatting, etc.)
- **Modular Design**: Each feature in its own module for maintainability
- **Event-Driven**: Uses events for communication between modules

### Key Technologies

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with glassmorphism, flexbox, and grid
- **Vanilla JavaScript**: No frameworks - pure ES6+ JavaScript
- **ES6 Modules**: Import/export for clean code organization
- **LocalStorage API**: Client-side data persistence
- **Service Workers**: Offline functionality
- **Browser Notifications API**: Native notifications
- **Drag and Drop API**: Task reordering
- **SVG**: Circular progress visualization
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins font family

### Code Quality

- **No Global Variables**: All modules use proper encapsulation
- **Input Sanitization**: XSS protection on all user inputs
- **Error Handling**: Graceful fallbacks throughout
- **Debouncing**: Optimized event handlers
- **Accessibility**: ARIA labels and keyboard navigation
- **Semantic HTML**: Proper HTML5 semantic structure

## Testing

### Unit Tests (Vitest)

Run unit tests for utility functions and storage:

```bash
npm test
```

Test files:
- `tests/unit/utils.test.js` - Tests for escapeHtml, formatTime, generateId
- `tests/unit/storage.test.js` - Tests for save/load functions

### E2E Tests (Playwright)

Run end-to-end browser tests:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug
```

Test files:
- `tests/e2e/timer.spec.js` - Timer functionality tests
- `tests/e2e/tasks.spec.js` - Task management tests
- `tests/e2e/ui.spec.js` - UI interaction tests

Tests run on Chrome, Firefox, and Safari (WebKit) automatically.

### Test Coverage

The test suite covers:
- Timer start/pause/reset functionality
- Task addition, editing, deletion
- Modal interactions
- Keyboard shortcuts
- Statistics tracking
- Data persistence
- Responsive design
- Browser compatibility

## Usage Guide

### Basic Timer Usage

1. **Start Working**: Click "Start" or press `Space` to begin a 25-minute work session
2. **Pause**: Click "Pause" or press `Space` again to pause
3. **Reset**: Click "Reset" or press `r` to restart the timer
4. **Auto Mode**: Click "Auto" to enable automatic progression to next phase

### Task Management

1. **Add Task**: Click "+ Add Task" button or press `n`
2. **Fill Details**: Enter task name, pomodoro count (supports decimals like 0.5), category, and optional notes
3. **Submit**: Click "Add Task" to save
4. **Edit Task**: Click edit icon on any task
5. **Delete Task**: Click trash icon (you'll have 5 seconds to undo)
6. **Reorder**: Drag tasks to reorder them
7. **Bulk Actions**: Use "Clear Completed" or "Clear All" buttons

### Viewing Statistics

1. Click the chart icon in toolbar or press `s`
2. View your daily, weekly, and all-time stats
3. Export your data using "Export Data" button
4. Import previously exported data with "Import Data"

### Customization

1. Click the gear icon to open settings
2. Modify work duration, short break, or long break duration
3. Changes apply immediately

### Keyboard Shortcuts

Press `?` or `k` to view all available shortcuts. Key shortcuts:
- `Space` - Start/Pause timer
- `r` - Reset timer
- `a` - Toggle auto/manual mode
- `m` - Toggle sound mute
- `n` - Add new task
- `s` - View statistics
- `Escape` - Close modal

### Sounds

1. Click the speaker icon in toolbar to preview sounds
2. Test each sound using preview buttons
3. Sound preference is saved automatically
4. Use speaker button in timer to mute/unmute

## Browser Support

### Recommended
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Requirements
- ES6 Module support
- LocalStorage API
- HTML5 Audio
- Service Worker (optional, for PWA)
- Notification API (optional, for notifications)
- Drag and Drop API (optional, for reordering)

### Graceful Degradation
The app works even if:
- LocalStorage is disabled (data won't persist)
- Notifications are blocked (no browser notifications)
- Service Worker isn't supported (no offline mode)
- Drag and Drop isn't supported (reordering disabled)

## Pomodoro Technique

### The Classic Method

1. **Choose a task** you want to work on
2. **Set timer to 25 minutes** (1 pomodoro)
3. **Work** on the task with full focus until timer rings
4. **Take a 5-minute break** to rest and recharge
5. **After 4 pomodoros**, take a longer 15-minute break
6. **Repeat** the process

### Benefits

- Improves focus and concentration
- Reduces mental fatigue
- Enhances productivity
- Helps manage distractions
- Increases motivation
- Better work-life balance
- Prevents burnout

### Tips for Success

- **Eliminate distractions** before starting
- **Use task notes** to capture thoughts during work sessions
- **Take breaks seriously** - rest is crucial for productivity
- **Track your stats** to identify patterns
- **Adjust durations** to match your concentration span
- **Use categories** to balance different types of work
- **Plan your pomodoros** - estimate how many each task needs

## Customization

### Modifying Timer Durations

Edit `js/config.js`:
```javascript
export const TIMER_CONFIG = {
  WORK_DURATION: 25 * 60,        // 25 minutes
  BREAK_DURATION: 5 * 60,        // 5 minutes
  LONG_BREAK_DURATION: 15 * 60,  // 15 minutes
  TASK_DECREMENT_INTERVAL: 150,  // 2.5 minutes
};
```

Or use the Settings panel in the UI for temporary changes.

### Adding Custom Quotes

Edit `quotes.json`:
```json
{
  "quotes": [
    {
      "text": "Your custom quote here",
      "author": "Author Name",
      "year": 2024
    }
  ]
}
```

### Adding Custom Alarm Sounds

1. Add WAV files to `assets/sound/` directory
2. Update `js/sounds-new.js`:
```javascript
let soundarray = [
  `${soundPath}your-custom-sound.wav`,
  // ... existing sounds
];
```

### Modifying Task Categories

Edit `js/config.js`:
```javascript
export const TASK_CATEGORIES = {
  CUSTOM: {
    name: 'Custom Category',
    color: '#FF5733',
    icon: 'star'
  },
  // ... existing categories
};
```

### Style Customization

- **Colors & Gradients**: `css/base.css`
- **Glassmorphism Effects**: `css/tasks.css`, `css/timer.css`
- **Button Styles**: `css/buttons.css`
- **Modal Styling**: `css/features.css`
- **Responsive Breakpoints**: `css/responsive.css`

## Troubleshooting

### Timer not starting
- Check browser console for errors
- Ensure JavaScript is enabled
- Try hard refresh (Ctrl+Shift+R)

### Tasks not saving
- Check if localStorage is enabled
- Check browser privacy settings
- Try a different browser

### Sounds not playing
- Check if sound is muted in timer
- Check browser audio permissions
- Ensure volume is up
- Try different alarm sounds

### Notifications not showing
- Click "Allow" when prompted for notification permission
- Check browser notification settings
- Check OS notification settings

### PWA not installing
- Ensure you're using HTTPS or localhost
- Check if browser supports PWA
- Try a different browser

## Performance

- **Lightweight**: No frameworks, minimal dependencies
- **Fast Load**: Optimized assets and caching
- **Smooth Animations**: Hardware-accelerated CSS
- **Efficient Storage**: Debounced saves to localStorage
- **Smart Caching**: Service worker caches only necessary resources

## Security

- **XSS Protection**: All user inputs are sanitized
- **No External Data**: All data stored locally
- **No Tracking**: No analytics or tracking code
- **Content Security**: Proper CSP headers recommended

## Future Enhancements

Potential features for future versions:
- Cloud sync across devices
- Team/shared timers
- Pomodoro history calendar view
- Advanced statistics (charts, trends)
- Custom themes
- Sound customization in UI
- Integration with task management tools
- Mobile apps (iOS/Android)
- Desktop apps (Electron)

## Contributing

Feel free to submit issues and pull requests for:
- Bug fixes
- New features
- Documentation improvements
- Test coverage
- Performance optimizations

## License

Free to use and modify for personal and educational purposes.

## Credits

- **Pomodoro Technique** by Francesco Cirillo
- **Icons** by Font Awesome
- **Fonts** by Google Fonts
- **Sound Effects** from various open sources

---

Built with focus and productivity in mind. Happy Pomodoro-ing! 🍅
