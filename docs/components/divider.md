# Divider Component Documentation

## Overview
The Divider component provides visual separation between content sections with support for horizontal and vertical orientations, text labels, and various styling options. Perfect for organizing layouts and improving visual hierarchy.

## Features
- **Horizontal & Vertical** - Support for both orientations
- **Text Labels** - Optional text content within dividers
- **Multiple Styles** - Solid, dashed, and dotted line styles
- **Color Variants** - Different colors for different contexts
- **Spacing Control** - Customizable margins and padding
- **Dark Mode** - Full dark mode compatibility
- **Responsive** - Adapts to container width
- **Accessibility** - Proper ARIA roles for screen readers

## Basic Usage

```tsx
import { Divider } from '@/nebula/components/Divider'

export function BasicDividerExample() {
  return (
    <div className="space-y-4">
      <div>Content above divider</div>
      <Divider />
      <div>Content below divider</div>
    </div>
  )
}
```

## Horizontal Dividers

### Simple Horizontal Divider
```tsx
export function HorizontalDividerExample() {
  return (
    <div>
      <p>First section of content</p>
      <Divider />
      <p>Second section of content</p>
      <Divider />
      <p>Third section of content</p>
    </div>
  )
}
```

### With Text Content
```tsx
export function TextDividerExample() {
  return (
    <div className="space-y-6">
      <div>
        <h2>User Information</h2>
        <p>Personal details and settings</p>
      </div>
      
      <Divider>OR</Divider>
      
      <div>
        <h2>Account Settings</h2>
        <p>Security and preferences</p>
      </div>
      
      <Divider textAlign="left">Additional Options</Divider>
      
      <div>
        <h2>Advanced Settings</h2>
        <p>Developer options and integrations</p>
      </div>
    </div>
  )
}
```

## Vertical Dividers

```tsx
export function VerticalDividerExample() {
  return (
    <div className="flex items-center space-x-4 py-4">
      <span>Item 1</span>
      <Divider orientation="vertical" />
      <span>Item 2</span>
      <Divider orientation="vertical" />
      <span>Item 3</span>
      <Divider orientation="vertical" />
      <span>Item 4</span>
    </div>
  )
}
```

## Style Variants

```tsx
export function StyleVariantsExample() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2">Solid (default)</h3>
        <Divider variant="solid" />
      </div>
      
      <div>
        <h3 className="mb-2">Dashed</h3>
        <Divider variant="dashed" />
      </div>
      
      <div>
        <h3 className="mb-2">Dotted</h3>
        <Divider variant="dotted" />
      </div>
      
      <div>
        <h3 className="mb-2">Double</h3>
        <Divider variant="double" />
      </div>
    </div>
  )
}
```

## Color Variants

```tsx
export function ColorVariantsExample() {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2">Default gray</p>
        <Divider />
      </div>
      
      <div>
        <p className="mb-2">Primary color</p>
        <Divider color="primary" />
      </div>
      
      <div>
        <p className="mb-2">Success color</p>
        <Divider color="success" />
      </div>
      
      <div>
        <p className="mb-2">Warning color</p>
        <Divider color="warning" />
      </div>
      
      <div>
        <p className="mb-2">Error color</p>
        <Divider color="error" />
      </div>
    </div>
  )
}
```

## Text Alignment

```tsx
export function TextAlignmentExample() {
  return (
    <div className="space-y-6">
      <div>
        <p>Content section 1</p>
        <Divider textAlign="left">Left Aligned</Divider>
        <p>Content section 2</p>
      </div>
      
      <div>
        <p>Content section 2</p>
        <Divider textAlign="center">Center Aligned</Divider>
        <p>Content section 3</p>
      </div>
      
      <div>
        <p>Content section 3</p>
        <Divider textAlign="right">Right Aligned</Divider>
        <p>Content section 4</p>
      </div>
    </div>
  )
}
```

## Spacing Control

```tsx
export function SpacingExample() {
  return (
    <div>
      <p>Content with compact spacing</p>
      <Divider spacing="compact" />
      <p>Content with normal spacing</p>
      <Divider spacing="normal" />
      <p>Content with relaxed spacing</p>
      <Divider spacing="relaxed" />
      <p>Final content</p>
    </div>
  )
}
```

## Practical Examples

### Form Sections
```tsx
export function FormSectionsExample() {
  return (
    <form className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="First Name"
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            placeholder="Last Name"
            className="w-full p-2 border rounded"
          />
          <input 
            type="email" 
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <Divider>Account Details</Divider>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input 
          type="password" 
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
      </div>
      
      <Divider />
      
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Account
      </button>
    </form>
  )
}
```

### Navigation Menu
```tsx
export function NavigationMenuExample() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <Divider orientation="vertical" />
        <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</a>
        <Divider orientation="vertical" />
        <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">About</a>
        <Divider orientation="vertical" />
        <a href="/services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Services</a>
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Login</a>
        <Divider orientation="vertical" />
        <a href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</a>
      </div>
    </nav>
  )
}
```

### Content Cards
```tsx
export function ContentCardsExample() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">Article Title</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is the article content preview that gives readers an idea of what to expect.
          </p>
        </div>
        
        <Divider />
        
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/avatar.jpg" 
                alt="Author" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">Published on Jan 15, 2024</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-blue-600">
                <span>Like</span>
              </button>
              <Divider orientation="vertical" />
              <button className="text-gray-500 hover:text-blue-600">
                <span>Share</span>
              </button>
              <Divider orientation="vertical" />
              <button className="text-gray-500 hover:text-blue-600">
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Props API

| Prop          | Type                                                          | Default        | Description                      |
| ------------- | ------------------------------------------------------------- | -------------- | -------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`                                  | `'horizontal'` | Divider orientation              |
| `variant`     | `'solid' \| 'dashed' \| 'dotted' \| 'double'`                 | `'solid'`      | Line style variant               |
| `color`       | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'default'`    | Divider color                    |
| `textAlign`   | `'left' \| 'center' \| 'right'`                               | `'center'`     | Text alignment (horizontal only) |
| `spacing`     | `'compact' \| 'normal' \| 'relaxed'`                          | `'normal'`     | Spacing around divider           |
| `thickness`   | `'thin' \| 'medium' \| 'thick'`                               | `'thin'`       | Line thickness                   |
| `className`   | `string`                                                      | -              | Additional CSS classes           |
| `children`    | `React.ReactNode`                                             | -              | Text content for divider         |

## Accessibility

The Divider component includes accessibility features:

- **ARIA Role** - Uses `separator` role for screen readers
- **Semantic HTML** - Uses appropriate HTML elements
- **Color Contrast** - Meets WCAG guidelines for color contrast
- **Focus Management** - Does not interfere with keyboard navigation

## Styling

The Divider component uses Tailwind CSS classes:

```css
.nebula-divider {
  @apply border-gray-200 dark:border-gray-700;
}

.nebula-divider-horizontal {
  @apply w-full border-t;
}

.nebula-divider-vertical {
  @apply h-full border-l;
}

.nebula-divider-text {
  @apply px-4 text-sm text-gray-500 dark:text-gray-400;
}
```

## Best Practices

1. **Use Sparingly** - Don't overuse dividers; white space can be just as effective
2. **Consistent Styling** - Use consistent divider styles throughout your application
3. **Semantic Meaning** - Use dividers to separate logically different content sections
4. **Responsive Design** - Consider how dividers behave on different screen sizes
5. **Color Accessibility** - Ensure dividers have sufficient contrast in both light and dark modes
6. **Text Content** - Keep divider text short and descriptive
7. **Vertical Spacing** - Be mindful of spacing around horizontal dividers

The Divider component is a simple yet effective tool for creating visual hierarchy and improving the organization of your content layouts.
