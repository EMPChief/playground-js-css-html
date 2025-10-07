# Pomodoro Timer

A beautiful, functional Pomodoro timer web application with task management and motivational quotes.

## Features

- **Timer Functionality**
  - 25-minute work sessions
  - 5-minute short breaks
  - 15-minute long breaks (every 4th pomodoro)
  - Start/Pause and Reset controls
  - Visual phase indicators
  - Auto-start next phase when timer completes

- **Task Management**
  - Add tasks with custom pomodoro counts (supports decimals: 0.1, 0.5, 1.5, etc.)
  - Fractional pomodoro tracking (0.1 pomodoro = 2.5 minutes)
  - Automatic decrement every 2.5 minutes during work sessions
  - Delete tasks manually with trash icon
  - Persistent storage across sessions
  - XSS protection with input sanitization

- **Sound Notifications**
  - Random alarm sounds when phases switch
  - Mute/unmute toggle button
  - Sound preference saved to localStorage
  - 8 different alarm sounds to choose from

- **Motivational Quotes**
  - Random motivational quotes
  - Auto-rotation every 1-5 minutes
  - Curated collection of productivity quotes

- **Data Persistence**
  - Timer state saved to localStorage
  - Tasks saved automatically
  - Sound preferences saved
  - Resume where you left off
  - Graceful fallback when localStorage is disabled

## Technologies Used

- HTML5
- CSS3 (with glassmorphism effects)
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts (Poppins)

## File Structure

```
pomodoro/
├── index.html          # Main HTML structure
├── quotes.json         # Motivational quotes database
├── serve.py           # Simple Python HTTP server
├── assets/
│   └── sound/         # Alarm sound files (WAV format)
├── css/
│   ├── base.css       # Base styles and layout
│   ├── timer.css      # Timer-specific styles
│   ├── buttons.css    # Button styles
│   ├── tasks.css      # Task list styles
│   ├── quote.css      # Quote display styles
│   └── responsive.css # Responsive design
└── js/
    ├── sounds.js      # Sound notification system
    ├── storage.js     # localStorage persistence
    ├── timer.js       # Timer logic
    ├── tasks.js       # Task management
    └── quotes.js      # Quote loading and rotation
```

## Usage

1. **Start the Server**
   ```bash
   python serve.py
   ```
   Or simply open `index.html` in a web browser.

2. **Using the Timer**
   - Click "Start" to begin a 25-minute work session
   - Click "Pause" to pause the timer
   - Click "Reset" to restart from the beginning
   - Click the speaker icon to mute/unmute alarm sounds

3. **Managing Tasks**
   - Enter a task name and number of pomodoros needed (decimals supported)
   - Click "Add Task" to add it to your list
   - Tasks automatically decrement by 0.1 every 2.5 minutes during work
   - Click the trash icon to delete a task
   - Tasks are removed automatically when count reaches 0

## How It Works

### Pomodoro Technique
1. Work for 25 minutes (1 pomodoro)
2. Take a 5-minute break
3. After 4 pomodoros, take a 15-minute long break
4. Repeat

### Task Integration
- Tasks support fractional pomodoros (0.1 increments)
- 0.1 pomodoro = 2.5 minutes of work time
- The first task decrements by 0.1 every 2.5 minutes during work sessions
- Tasks are removed when their pomodoro count reaches zero
- Plan your work by assigning the appropriate number of pomodoros to each task
- Example: 0.5 pomodoro = 12.5 minutes, 1 pomodoro = 25 minutes

## Customization

### Modify Timer Durations
Edit `js/timer.js`:
```javascript
let timeLeft = 25 * 60;  // Work session (in seconds)
timeLeft = 5 * 60;       // Short break
timeLeft = 15 * 60;      // Long break
```

### Add Custom Quotes
Edit `quotes.json`:
```json
{
  "quotes": [
    {
      "text": "Your quote here",
      "author": "Author Name",
      "year": 2024
    }
  ]
}
```

### Add Custom Alarm Sounds
Add WAV files to `assets/sound/` directory and update `js/sounds.js`:
```javascript
let soundarray = [
  `${soundPath}your-custom-sound.wav`,
  // ... more sounds
];
```

### Style Customization
- Colors and gradients: `css/base.css`
- Glassmorphism effects: `css/tasks.css` and `css/timer.css`
- Button styles: `css/buttons.css`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

### Requirements
- localStorage support for data persistence (optional - graceful fallback)
- HTML5 Audio support for sound notifications
- Modern browser with ES6 support

## License

Free to use and modify for personal and educational purposes.
