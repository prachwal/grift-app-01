# Theme System Documentation

## Overview

The theme system provides a complete theming solution with support for light, dark, and system themes. It's built with Preact and Tailwind CSS, offering smooth transitions and persistent theme preferences.

## Architecture

### ThemeProvider

The `ThemeProvider` component manages global theme state and applies the appropriate CSS classes to the document element.

**Features:**
- Persistent theme storage in localStorage
- System theme detection and automatic updates
- CSS class management for Tailwind CSS dark mode
- React hooks for theme access

**Usage:**
```tsx
import { ThemeProvider } from './theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### useTheme Hook

Access and control theme state from any component within the ThemeProvider.

```tsx
import { useTheme } from './theme/ThemeProvider';

function MyComponent() {
  const { mode, setMode, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Current mode: {mode}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
    </div>
  );
}
```

**Return Values:**
- `mode`: Current theme mode ('light' | 'dark' | 'system')
- `setMode`: Function to change theme mode
- `resolvedTheme`: Actual theme being used ('light' | 'dark')

### ThemeSwitcher Component

A dropdown component for switching between themes with full accessibility support.

**Features:**
- Visual emoji icons for each theme
- Keyboard navigation (Escape to close)
- Click outside to close
- Mobile-friendly backdrop overlay
- Smooth animations and transitions
- Accessibility attributes (ARIA)

**Usage:**
```tsx
import { ThemeSwitcher } from './components/ThemeSwitcher';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeSwitcher />
    </header>
  );
}
```

## Tailwind Configuration

Ensure your `tailwind.config.js` has dark mode enabled:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## CSS Classes

The theme system applies the following classes to `document.documentElement`:
- `.light` - Light theme
- `.dark` - Dark theme

Use Tailwind's dark mode utilities:
```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Content that adapts to theme
</div>
```

## Theme Options

### Light Theme (☀️)
- Explicit light theme selection
- Uses standard light color palette
- Applied via `.light` CSS class

### Dark Theme (🌙)
- Explicit dark theme selection
- Uses dark color palette optimized for low light
- Applied via `.dark` CSS class

### System Theme (💻)
- Automatically follows system preference
- Detects changes in system theme
- Falls back to light theme if detection fails

## Best Practices

### Component Styling
Always include dark mode variants for better user experience:

```tsx
// Good
<button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">

// Better - with hover states
<button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">

// Best - with transitions
<button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
```

### Color Palette

Recommended color classes for consistent theming:

**Backgrounds:**
- Primary: `bg-white dark:bg-gray-900`
- Secondary: `bg-gray-50 dark:bg-gray-800`
- Elevated: `bg-white dark:bg-gray-800`
- Interactive: `bg-gray-100 dark:bg-gray-700`

**Text Colors:**
- Primary: `text-gray-900 dark:text-gray-100`
- Secondary: `text-gray-600 dark:text-gray-300`
- Muted: `text-gray-500 dark:text-gray-400`

**Borders:**
- Default: `border-gray-200 dark:border-gray-700`
- Interactive: `border-gray-300 dark:border-gray-600`

### Performance Considerations

- Theme changes apply CSS classes immediately
- Transitions are GPU-accelerated using `transition-colors`
- LocalStorage operations are debounced
- System theme listener is only active when needed

## Testing

The theme system includes comprehensive tests:

```bash
# Run theme tests
npm test src/theme/ThemeProvider.test.tsx
npm test src/components/__tests__/ThemeSwitcher.test.tsx

# Run all tests
npm test
```

## Storybook Integration

Theme components are documented in Storybook with interactive examples:

```bash
# Start Storybook
npm run storybook
```

Visit the "Design System/ThemeSwitcher" section to see the component in action.

## Migration Notes

### From HeadlessUI to Custom Implementation

The ThemeSwitcher was migrated from HeadlessUI to a custom implementation for better Preact compatibility:

- **Before:** Used HeadlessUI Menu and Transition components
- **After:** Custom dropdown with native Preact hooks
- **Benefits:** Better performance, smaller bundle, full Preact compatibility

### Tailwind CSS v3 Compatibility

Updated configuration for Tailwind CSS v3:
- Added `darkMode: 'class'` to enable class-based dark mode
- Removed deprecated configuration options
- Updated class names for better consistency

## Troubleshooting

### Theme Not Persisting
- Ensure localStorage is available in the browser
- Check for JavaScript errors in console
- Verify ThemeProvider wraps your app

### Dark Mode Not Working
- Confirm `darkMode: 'class'` in tailwind.config.js
- Check that CSS classes are applied to document.documentElement
- Verify Tailwind CSS is processing dark: variants

### System Theme Not Detected
- Modern browsers required for `matchMedia` support
- Falls back to light theme gracefully
- System preference changes are detected automatically
