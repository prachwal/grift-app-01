# Container Component Documentation

## Overview
The Container component provides a responsive container that adapts to different screen sizes with consistent max-widths and centering behavior. It's designed to create consistent layouts across your application while maintaining proper content width on various devices.

## Features
- **Responsive Breakpoints** - Adapts to xs, sm, md, lg, xl screen sizes
- **Max-Width Control** - Prevents content from stretching too wide
- **Auto Centering** - Automatically centers content horizontally
- **Padding Variants** - Built-in spacing options
- **Fluid Option** - Full-width container when needed
- **Dark Mode** - Full dark mode compatibility
- **Nested Support** - Works well with nested containers

## Basic Usage

```tsx
import { Container } from '@/nebula/components/Container'

export function BasicContainerExample() {
  return (
    <Container>
      <h1>Welcome to our website</h1>
      <p>This content is automatically centered and has responsive max-widths.</p>
    </Container>
  )
}
```

## Size Variants

### Fixed Width (default)
The container has max-widths that respond to screen size:

```tsx
export function FixedWidthExample() {
  return (
    <Container>
      <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded">
        <h2>Fixed Width Container</h2>
        <p>
          This container has responsive max-widths:
          <br />• sm: 640px
          <br />• md: 768px  
          <br />• lg: 1024px
          <br />• xl: 1280px
          <br />• 2xl: 1536px
        </p>
      </div>
    </Container>
  )
}
```

### Fluid Width
For full-width containers:

```tsx
export function FluidWidthExample() {
  return (
    <Container fluid>
      <div className="bg-green-100 dark:bg-green-900 p-6 rounded">
        <h2>Fluid Width Container</h2>
        <p>This container takes the full width of its parent.</p>
      </div>
    </Container>
  )
}
```

### Custom Max Width
Override the max-width for specific breakpoints:

```tsx
export function CustomMaxWidthExample() {
  return (
    <div className="space-y-6">
      <Container maxWidth="sm">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded text-center">
          Small container (max-width: 640px)
        </div>
      </Container>
      
      <Container maxWidth="md">
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-center">
          Medium container (max-width: 768px)
        </div>
      </Container>
      
      <Container maxWidth="lg">
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
          Large container (max-width: 1024px)
        </div>
      </Container>
    </div>
  )
}
```

## Padding Variants

### No Padding
```tsx
export function NoPaddingExample() {
  return (
    <Container padding="none">
      <div className="bg-blue-500 text-white p-6">
        Container with no padding - content touches edges
      </div>
    </Container>
  )
}
```

### Compact Padding
```tsx
export function CompactPaddingExample() {
  return (
    <Container padding="compact">
      <div className="bg-green-500 text-white p-6 rounded">
        Container with compact padding (1rem on mobile, 1.5rem on desktop)
      </div>
    </Container>
  )
}
```

### Normal Padding (default)
```tsx
export function NormalPaddingExample() {
  return (
    <Container padding="normal">
      <div className="bg-purple-500 text-white p-6 rounded">
        Container with normal padding (1.5rem on mobile, 2rem on desktop)
      </div>
    </Container>
  )
}
```

### Relaxed Padding
```tsx
export function RelaxedPaddingExample() {
  return (
    <Container padding="relaxed">
      <div className="bg-red-500 text-white p-6 rounded">
        Container with relaxed padding (2rem on mobile, 3rem on desktop)
      </div>
    </Container>
  )
}
```

## Centering Options

### Auto Centering (default)
```tsx
export function AutoCenteringExample() {
  return (
    <Container>
      <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded text-center">
        This container is automatically centered
      </div>
    </Container>
  )
}
```

### Left Aligned
```tsx
export function LeftAlignedExample() {
  return (
    <Container align="left">
      <div className="bg-green-100 dark:bg-green-900 p-6 rounded">
        This container is left-aligned
      </div>
    </Container>
  )
}
```

### Right Aligned
```tsx
export function RightAlignedExample() {
  return (
    <Container align="right">
      <div className="bg-red-100 dark:bg-red-900 p-6 rounded">
        This container is right-aligned
      </div>
    </Container>
  )
}
```

## Layout Examples

### Page Layout
```tsx
export function PageLayoutExample() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <Container>
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold">My Website</h1>
            <nav className="space-x-4">
              <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Home</a>
              <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">About</a>
              <a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Contact</a>
            </nav>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Our Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Build amazing applications with our component library
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Feature 1</h3>
              <p className="text-gray-600 dark:text-gray-300">Description of feature 1</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Feature 2</h3>
              <p className="text-gray-600 dark:text-gray-300">Description of feature 2</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Feature 3</h3>
              <p className="text-gray-600 dark:text-gray-300">Description of feature 3</p>
            </div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white">
        <Container>
          <div className="py-8 text-center">
            <p>&copy; 2024 My Website. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
```

### Section Layout
```tsx
export function SectionLayoutExample() {
  return (
    <div>
      {/* Hero Section - Full width background, contained content */}
      <section className="bg-blue-600 text-white py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Hero Section</h1>
            <p className="text-xl mb-8">Content is contained but background is full width</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our Service</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Learn More
              </button>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Image Placeholder</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <Container maxWidth="md">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
```

### Nested Containers
```tsx
export function NestedContainersExample() {
  return (
    <Container maxWidth="xl" padding="relaxed">
      <h1 className="text-3xl font-bold mb-8 text-center">Outer Container</h1>
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <Container maxWidth="lg" padding="normal">
          <h2 className="text-2xl font-semibold mb-6 text-center">Inner Container</h2>
          
          <div className="bg-white dark:bg-gray-700 rounded p-6">
            <Container maxWidth="md" padding="compact">
              <h3 className="text-xl font-medium mb-4 text-center">Deeply Nested Container</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                This demonstrates how containers can be nested for complex layouts
                while maintaining consistent spacing and max-widths.
              </p>
            </Container>
          </div>
        </Container>
      </div>
    </Container>
  )
}
```

## Props API

| Prop        | Type                                                     | Default    | Description                               |
| ----------- | -------------------------------------------------------- | ---------- | ----------------------------------------- |
| `maxWidth`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| false` | `'xl'`     | Maximum width breakpoint                  |
| `fluid`     | `boolean`                                                | `false`    | Full width container (overrides maxWidth) |
| `padding`   | `'none' \| 'compact' \| 'normal' \| 'relaxed'`           | `'normal'` | Horizontal padding amount                 |
| `align`     | `'left' \| 'center' \| 'right'`                          | `'center'` | Container alignment                       |
| `className` | `string`                                                 | -          | Additional CSS classes                    |
| `children`  | `React.ReactNode`                                        | -          | Container content                         |

## Breakpoint Values

| Breakpoint | Max Width | Usage               |
| ---------- | --------- | ------------------- |
| `xs`       | 475px     | Extra small devices |
| `sm`       | 640px     | Small devices       |
| `md`       | 768px     | Medium devices      |
| `lg`       | 1024px    | Large devices       |
| `xl`       | 1280px    | Extra large devices |
| `2xl`      | 1536px    | 2X large devices    |

## Best Practices

1. **Consistent Usage** - Use Container consistently across your application for uniform layouts
2. **Appropriate Max-Width** - Choose max-widths based on content type (text content typically needs smaller max-widths)
3. **Responsive Design** - Consider how your content flows on different screen sizes
4. **Nesting Strategy** - Use nested containers sparingly and with purpose
5. **Performance** - Container is lightweight but avoid unnecessary nesting
6. **Content First** - Design your containers around your content, not the other way around
7. **Accessibility** - Ensure container layouts maintain logical reading order

## Common Patterns

### Page Wrapper
```tsx
function App() {
  return (
    <Container maxWidth="lg">
      {/* Your page content */}
    </Container>
  )
}
```

### Section with Background
```tsx
function HeroSection() {
  return (
    <div className="bg-blue-600 py-20">
      <Container>
        {/* Hero content */}
      </Container>
    </div>
  )
}
```

### Reading Content
```tsx
function BlogPost() {
  return (
    <Container maxWidth="md">
      {/* Blog post content - optimal for reading */}
    </Container>
  )
}
```

The Container component is essential for creating professional, responsive layouts that work beautifully across all device sizes while maintaining consistent spacing and alignment throughout your application.
