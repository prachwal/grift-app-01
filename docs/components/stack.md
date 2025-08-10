# Stack Component Documentation

## Overview
The Stack component provides a flexible layout primitive for arranging elements in horizontal or vertical stacks with consistent spacing. It simplifies creating aligned layouts without writing custom CSS flexbox rules.

## Features
- **Flexible Direction** - Horizontal or vertical stacking
- **Consistent Spacing** - Predefined spacing scales
- **Alignment Control** - Flexible alignment options
- **Wrap Support** - Elements can wrap to new lines
- **Responsive** - Different behaviors on different screen sizes
- **Dividers** - Optional dividers between items
- **Dark Mode** - Complete dark mode compatibility
- **Zero Margin Collapse** - Handles margin collapsing automatically

## Basic Usage

```tsx
import { Stack } from '@/nebula/components/Stack'

export function BasicStackExample() {
  return (
    <Stack spacing={4}>
      <div className="bg-blue-500 text-white p-4 rounded">Item 1</div>
      <div className="bg-green-500 text-white p-4 rounded">Item 2</div>
      <div className="bg-red-500 text-white p-4 rounded">Item 3</div>
    </Stack>
  )
}
```

## Direction

### Vertical Stack (default)
```tsx
export function VerticalStackExample() {
  return (
    <Stack direction="column" spacing={3}>
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
        <h3 className="font-semibold">First Item</h3>
        <p>This is the first item in a vertical stack</p>
      </div>
      <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
        <h3 className="font-semibold">Second Item</h3>
        <p>This is the second item in a vertical stack</p>
      </div>
      <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded">
        <h3 className="font-semibold">Third Item</h3>
        <p>This is the third item in a vertical stack</p>
      </div>
    </Stack>
  )
}
```

### Horizontal Stack
```tsx
export function HorizontalStackExample() {
  return (
    <Stack direction="row" spacing={4}>
      <div className="bg-purple-500 text-white p-6 rounded min-w-0 flex-1">
        <h4 className="font-semibold mb-2">Card 1</h4>
        <p>Horizontal stack item</p>
      </div>
      <div className="bg-pink-500 text-white p-6 rounded min-w-0 flex-1">
        <h4 className="font-semibold mb-2">Card 2</h4>
        <p>Horizontal stack item</p>
      </div>
      <div className="bg-indigo-500 text-white p-6 rounded min-w-0 flex-1">
        <h4 className="font-semibold mb-2">Card 3</h4>
        <p>Horizontal stack item</p>
      </div>
    </Stack>
  )
}
```

## Spacing Variants

```tsx
export function SpacingVariantsExample() {
  const items = [
    <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-center">A</div>,
    <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-center">B</div>,
    <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-center">C</div>
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">No Spacing (0)</h3>
        <Stack direction="row" spacing={0}>
          {items}
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Spacing (1)</h3>
        <Stack direction="row" spacing={1}>
          {items}
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Spacing (3)</h3>
        <Stack direction="row" spacing={3}>
          {items}
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Spacing (6)</h3>
        <Stack direction="row" spacing={6}>
          {items}
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Extra Large Spacing (10)</h3>
        <Stack direction="row" spacing={10}>
          {items}
        </Stack>
      </div>
    </div>
  )
}
```

## Alignment

### Horizontal Alignment
```tsx
export function HorizontalAlignmentExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Left Aligned (start)</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4">
          <Stack direction="row" spacing={2} justify="start">
            <div className="bg-blue-500 text-white px-4 py-2 rounded">Item 1</div>
            <div className="bg-green-500 text-white px-4 py-2 rounded">Item 2</div>
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Center Aligned</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4">
          <Stack direction="row" spacing={2} justify="center">
            <div className="bg-blue-500 text-white px-4 py-2 rounded">Item 1</div>
            <div className="bg-green-500 text-white px-4 py-2 rounded">Item 2</div>
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Right Aligned (end)</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4">
          <Stack direction="row" spacing={2} justify="end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded">Item 1</div>
            <div className="bg-green-500 text-white px-4 py-2 rounded">Item 2</div>
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Space Between</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4">
          <Stack direction="row" spacing={0} justify="space-between">
            <div className="bg-blue-500 text-white px-4 py-2 rounded">Item 1</div>
            <div className="bg-green-500 text-white px-4 py-2 rounded">Item 2</div>
            <div className="bg-red-500 text-white px-4 py-2 rounded">Item 3</div>
          </Stack>
        </div>
      </div>
    </div>
  )
}
```

### Vertical Alignment
```tsx
export function VerticalAlignmentExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Top Aligned (start)</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4 h-32">
          <Stack direction="row" spacing={4} align="start">
            <div className="bg-blue-500 text-white p-4 rounded">Short</div>
            <div className="bg-green-500 text-white p-4 rounded">
              Taller<br />Content
            </div>
            <div className="bg-red-500 text-white p-4 rounded">
              Even<br />Taller<br />Content
            </div>
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Center Aligned</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4 h-32">
          <Stack direction="row" spacing={4} align="center">
            <div className="bg-blue-500 text-white p-4 rounded">Short</div>
            <div className="bg-green-500 text-white p-4 rounded">
              Taller<br />Content
            </div>
            <div className="bg-red-500 text-white p-4 rounded">
              Even<br />Taller<br />Content
            </div>
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Bottom Aligned (end)</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4 h-32">
          <Stack direction="row" spacing={4} align="end">
            <div className="bg-blue-500 text-white p-4 rounded">Short</div>
            <div className="bg-green-500 text-white p-4 rounded">
              Taller<br />Content
            </div>
            <div className="bg-red-500 text-white p-4 rounded">
              Even<br />Taller<br />Content
            </div>
          </Stack>
        </div>
      </div>
    </div>
  )
}
```

## Wrapping

```tsx
export function WrappingExample() {
  const items = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="bg-indigo-500 text-white px-4 py-2 rounded whitespace-nowrap">
      Item {i + 1}
    </div>
  ))

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">No Wrap (default)</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4 w-96 overflow-hidden">
          <Stack direction="row" spacing={2} wrap={false}>
            {items}
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">With Wrapping</h3>
        <div className="border border-gray-300 dark:border-gray-600 p-4 w-96">
          <Stack direction="row" spacing={2} wrap={true}>
            {items}
          </Stack>
        </div>
      </div>
    </div>
  )
}
```

## Dividers

```tsx
export function DividersExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Stack with Dividers</h3>
        <Stack direction="column" spacing={0} divider={<div className="border-t border-gray-300 dark:border-gray-600" />}>
          <div className="p-4">
            <h4 className="font-medium">Section 1</h4>
            <p className="text-gray-600 dark:text-gray-300">First section content</p>
          </div>
          <div className="p-4">
            <h4 className="font-medium">Section 2</h4>
            <p className="text-gray-600 dark:text-gray-300">Second section content</p>
          </div>
          <div className="p-4">
            <h4 className="font-medium">Section 3</h4>
            <p className="text-gray-600 dark:text-gray-300">Third section content</p>
          </div>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Stack with Dividers</h3>
        <Stack 
          direction="row" 
          spacing={0} 
          divider={<div className="border-l border-gray-300 dark:border-gray-600 h-16" />}
          align="center"
        >
          <div className="px-6 py-4 text-center">
            <div className="text-2xl font-bold text-blue-600">42</div>
            <div className="text-sm text-gray-500">Projects</div>
          </div>
          <div className="px-6 py-4 text-center">
            <div className="text-2xl font-bold text-green-600">128</div>
            <div className="text-sm text-gray-500">Users</div>
          </div>
          <div className="px-6 py-4 text-center">
            <div className="text-2xl font-bold text-purple-600">1.2k</div>
            <div className="text-sm text-gray-500">Downloads</div>
          </div>
        </Stack>
      </div>
    </div>
  )
}
```

## Responsive Stack

```tsx
export function ResponsiveStackExample() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Responsive Stack</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Vertical on mobile, horizontal on desktop
      </p>
      
      <Stack 
        direction={{ base: 'column', md: 'row' }} 
        spacing={{ base: 4, md: 8 }}
        className="w-full"
      >
        <div className="bg-red-500 text-white p-6 rounded flex-1">
          <h4 className="font-semibold mb-2">Feature 1</h4>
          <p>This stack changes direction based on screen size</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded flex-1">
          <h4 className="font-semibold mb-2">Feature 2</h4>
          <p>Vertical on mobile, horizontal on tablet and up</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded flex-1">
          <h4 className="font-semibold mb-2">Feature 3</h4>
          <p>Responsive spacing also adapts to screen size</p>
        </div>
      </Stack>
    </div>
  )
}
```

## Practical Examples

### Button Group
```tsx
export function ButtonGroupExample() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Button Group</h3>
        <Stack direction="row" spacing={3}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Primary
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
            Secondary
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Button Group</h3>
        <Stack direction="column" spacing={2} className="w-48">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
            Save Document
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">
            Export PDF
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full">
            Share Link
          </button>
        </Stack>
      </div>
    </div>
  )
}
```

### Form Layout
```tsx
export function FormLayoutExample() {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-6">Contact Form</h3>
      
      <Stack direction="column" spacing={4}>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24" 
            placeholder="Your message..."
          />
        </div>
        
        <Stack direction="row" spacing={3} justify="end">
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Send Message
          </button>
        </Stack>
      </Stack>
    </div>
  )
}
```

### Card Layout
```tsx
export function CardLayoutExample() {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Our Team</h3>
      
      <Stack direction="column" spacing={6}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
            <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 mx-auto"></div>
            <h4 className="text-lg font-semibold text-center mb-2">John Doe</h4>
            <p className="text-gray-600 dark:text-gray-300 text-center">CEO & Founder</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
            <div className="w-16 h-16 bg-green-500 rounded-full mb-4 mx-auto"></div>
            <h4 className="text-lg font-semibold text-center mb-2">Jane Smith</h4>
            <p className="text-gray-600 dark:text-gray-300 text-center">CTO</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
            <div className="w-16 h-16 bg-purple-500 rounded-full mb-4 mx-auto"></div>
            <h4 className="text-lg font-semibold text-center mb-2">Bob Johnson</h4>
            <p className="text-gray-600 dark:text-gray-300 text-center">Designer</p>
          </div>
        </Stack>
        
        <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
            <div className="w-16 h-16 bg-red-500 rounded-full mb-4 mx-auto"></div>
            <h4 className="text-lg font-semibold text-center mb-2">Alice Brown</h4>
            <p className="text-gray-600 dark:text-gray-300 text-center">Developer</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
            <div className="w-16 h-16 bg-yellow-500 rounded-full mb-4 mx-auto"></div>
            <h4 className="text-lg font-semibold text-center mb-2">Charlie Wilson</h4>
            <p className="text-gray-600 dark:text-gray-300 text-center">Marketing</p>
          </div>
          
          <div className="flex-1"></div> {/* Spacer for alignment */}
        </Stack>
      </Stack>
    </div>
  )
}
```

## Props API

| Prop        | Type                                                                                  | Default     | Description                     |
| ----------- | ------------------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `direction` | `'row' \| 'column' \| ResponsiveValue`                                                | `'column'`  | Stack direction                 |
| `spacing`   | `number \| ResponsiveValue`                                                           | `0`         | Spacing between items           |
| `justify`   | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'`   | Main axis alignment             |
| `align`     | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`                             | `'stretch'` | Cross axis alignment            |
| `wrap`      | `boolean`                                                                             | `false`     | Allow items to wrap             |
| `divider`   | `React.ReactNode`                                                                     | -           | Element to render between items |
| `className` | `string`                                                                              | -           | Additional CSS classes          |
| `children`  | `React.ReactNode`                                                                     | -           | Stack items                     |

### ResponsiveValue Type

```typescript
type ResponsiveValue<T> = {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}
```

## Best Practices

1. **Consistent Spacing** - Use the spacing prop instead of margins on child elements
2. **Semantic HTML** - Stack doesn't add semantic meaning; wrap in appropriate elements when needed
3. **Responsive Design** - Use responsive values for different screen sizes
4. **Performance** - Stack is lightweight but avoid excessive nesting
5. **Accessibility** - Ensure proper reading order and focus flow
6. **Flexbox Knowledge** - Understanding CSS flexbox helps when using Stack
7. **Spacing Scale** - Use consistent spacing values throughout your application

## Common Patterns

### Navigation Bar
```tsx
function NavigationBar() {
  return (
    <Stack direction="row" spacing={4} justify="space-between" align="center">
      <div className="font-bold text-xl">Logo</div>
      <Stack direction="row" spacing={4}>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Stack>
    </Stack>
  )
}
```

### Form Actions
```tsx
function FormActions({ onCancel, onSave }) {
  return (
    <Stack direction="row" spacing={2} justify="end">
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave}>Save</button>
    </Stack>
  )
}
```

### Statistics Cards
```tsx
function StatsGrid() {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
      <StatCard title="Users" value="1,234" />
      <StatCard title="Revenue" value="$45,678" />
      <StatCard title="Growth" value="+12%" />
    </Stack>
  )
}
```

The Stack component is a fundamental layout primitive that simplifies creating consistent, well-aligned layouts throughout your application without the need for custom CSS flexbox implementations.
