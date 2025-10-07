# File Structure Documentation

## Overview
The project has been reorganized with CSS and JavaScript files separated into modular components for easier maintenance.

## CSS Structure (`css/`)

### Main Files
- **styles.css** - Main stylesheet that imports all other CSS modules

### Module Files
1. **variables.css** - CSS custom properties and theme variables
2. **base.css** - Base styles and utility classes
3. **navigation.css** - Navbar and navigation styles
4. **hero.css** - Hero section styles
5. **animations.css** - All animation keyframes and classes
6. **cards.css** - Card component styles (project cards, profile cards, timeline cards, etc.)
7. **buttons.css** - Button styles and animations
8. **forms.css** - Form controls and validation styles
9. **tools.css** - Interactive tool-specific styles (calculator, counter, etc.)
10. **components.css** - Miscellaneous component styles (skills, footer, badges, etc.)
11. **responsive.css** - Media queries and responsive design

## JavaScript Structure (`js/`)

### Core Modules
1. **common.js** - Main entry point that initializes all modules
2. **utils.js** - Reusable utility functions
3. **navbar.js** - Navbar injection and scroll behavior
4. **footer.js** - Footer injection
5. **profile.js** - Profile picture randomization
6. **darkmode.js** - Dark mode toggle functionality

### Page-Specific Modules
7. **tools.js** - Interactive tools (calculator, counter, temperature converter, etc.)
8. **javaplay.js** - JavaPlay page initialization
9. **analytics.js** - Analytics tracking for tool usage
10. **projects.js** - Projects page functionality

## HTML Files

All HTML files have been updated to:
- Use `css/styles.css` for styling
- Load JavaScript modules in the correct order:
  1. Bootstrap
  2. utils.js (utilities needed by other modules)
  3. navbar.js
  4. footer.js
  5. profile.js
  6. darkmode.js
  7. common.js (initializes everything)
  8. Page-specific scripts (tools.js, analytics.js, projects.js, etc.)

## Benefits of This Structure

1. **Maintainability** - Each file has a single, clear purpose
2. **Debugging** - Easier to locate and fix issues
3. **Reusability** - Modules can be reused across pages
4. **Performance** - Only load what you need
5. **Collaboration** - Multiple developers can work on different modules
6. **Scalability** - Easy to add new features without cluttering existing files

## Import Order

CSS is imported via @import in styles.css in this order:
1. variables.css (must be first for CSS custom properties)
2. base.css
3. navigation.css
4. hero.css
5. animations.css
6. cards.css
7. buttons.css
8. forms.css
9. tools.css
10. components.css
11. responsive.css (should be last)

JavaScript modules must be loaded in this order:
1. utils.js (contains functions used by other modules)
2. navbar.js, footer.js, profile.js, darkmode.js (can be in any order)
3. common.js (initializes everything)
4. Page-specific scripts
