# Pomodoro Timer

A beautiful, functional Pomodoro timer web application with task management and motivational quotes.

## Features

- **Timer Functionality**
  - 25-minute work sessions
  - 5-minute short breaks
  - 15-minute long breaks (every 4th pomodoro)
  - Start/Pause and Reset controls
  - Visual phase indicators

- **Task Management**
  - Add tasks with custom pomodoro counts
  - Automatic pomodoro decrement on completion
  - Delete tasks manually
  - Persistent storage across sessions

- **Motivational Quotes**
  - Random motivational quotes
  - Auto-rotation every 1-5 minutes
  - Curated collection of productivity quotes

- **Data Persistence**
  - Timer state saved to localStorage
  - Tasks saved automatically
  - Resume where you left off

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
├── css/
│   ├── base.css       # Base styles and layout
│   ├── timer.css      # Timer-specific styles
│   ├── buttons.css    # Button styles
│   ├── tasks.css      # Task list styles
│   ├── quote.css      # Quote display styles
│   └── responsive.css # Responsive design
└── js/
    ├── timer.js       # Timer logic
    ├── tasks.js       # Task management
    ├── quotes.js      # Quote loading and rotation
    └── storage.js     # localStorage persistence
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

3. **Managing Tasks**
   - Enter a task name and number of pomodoros needed
   - Click "Add Task" to add it to your list
   - Tasks automatically decrement when a work session completes
   - Click the trash icon to delete a task

## How It Works

### Pomodoro Technique
1. Work for 25 minutes (1 pomodoro)
2. Take a 5-minute break
3. After 4 pomodoros, take a 15-minute long break
4. Repeat

### Task Integration
- When you complete a work session, the first task in your list automatically loses one pomodoro
- Tasks are removed when their pomodoro count reaches zero
- Plan your work by assigning the appropriate number of pomodoros to each task

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

### Style Customization
- Colors and gradients: `css/base.css`
- Glassmorphism effects: `css/tasks.css` and `css/timer.css`
- Button styles: `css/buttons.css`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires localStorage support for data persistence.

## License

Free to use and modify for personal and educational purposes.
