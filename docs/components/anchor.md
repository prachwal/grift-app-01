# Anchor Component Documentation

## Overview
The Anchor component provides smooth scrolling navigation for single-page applications with automatic highlighting of active sections. Perfect for documentation pages, landing pages, and any content with multiple sections.

## Features
- **Smooth Scrolling** - Animated scrolling to target sections
- **Active Highlighting** - Automatically highlights current section
- **Customizable Targets** - Flexible target element selection
- **Offset Support** - Account for fixed headers or navigation
- **Click Handling** - Custom click behavior and callbacks
- **Responsive Design** - Adapts to different screen sizes
- **Accessibility** - Full keyboard and screen reader support
- **Dark Mode** - Complete dark mode compatibility

## Basic Usage

```tsx
import { Anchor } from '@/nebula/components/Anchor'

export function BasicAnchorExample() {
  const { Link } = Anchor

  return (
    <div className="flex">
      {/* Navigation */}
      <div className="w-64 fixed left-0 top-20 h-full overflow-y-auto">
        <Anchor offsetTop={80}>
          <Link href="#introduction" title="Introduction" />
          <Link href="#getting-started" title="Getting Started" />
          <Link href="#components" title="Components" />
          <Link href="#examples" title="Examples" />
          <Link href="#api" title="API Reference" />
        </Anchor>
      </div>

      {/* Content */}
      <div className="ml-64 p-8 space-y-16">
        <section id="introduction" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">Introduction</h2>
          <p>This is the introduction section content...</p>
        </section>
        
        <section id="getting-started" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
          <p>This is the getting started section content...</p>
        </section>
        
        <section id="components" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">Components</h2>
          <p>This is the components section content...</p>
        </section>
        
        <section id="examples" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">Examples</h2>
          <p>This is the examples section content...</p>
        </section>
        
        <section id="api" className="min-h-screen">
          <h2 className="text-3xl font-bold mb-4">API Reference</h2>
          <p>This is the API reference section content...</p>
        </section>
      </div>
    </div>
  )
}
```

## Size Variants

### Small Size
```tsx
export function SmallAnchorExample() {
  const { Link } = Anchor
  
  return (
    <Anchor size="small" offsetTop={60}>
      <Link href="#section1" title="Section 1" />
      <Link href="#section2" title="Section 2" />
      <Link href="#section3" title="Section 3" />
    </Anchor>
  )
}
```

### Medium Size (Default)
```tsx
export function MediumAnchorExample() {
  const { Link } = Anchor
  
  return (
    <Anchor size="medium" offsetTop={60}>
      <Link href="#section1" title="Section 1" />
      <Link href="#section2" title="Section 2" />
      <Link href="#section3" title="Section 3" />
    </Anchor>
  )
}
```

### Large Size
```tsx
export function LargeAnchorExample() {
  const { Link } = Anchor
  
  return (
    <Anchor size="large" offsetTop={60}>
      <Link href="#section1" title="Section 1" />
      <Link href="#section2" title="Section 2" />
      <Link href="#section3" title="Section 3" />
    </Anchor>
  )
}
```

## Positioning Options

### Sticky Positioning
```tsx
export function StickyAnchorExample() {
  const { Link } = Anchor
  
  return (
    <div className="relative">
      <div className="sticky top-20 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
        <h3 className="font-semibold mb-4">Table of Contents</h3>
        <Anchor offsetTop={80}>
          <Link href="#intro" title="Introduction" />
          <Link href="#features" title="Key Features" />
          <Link href="#installation" title="Installation" />
          <Link href="#usage" title="Usage Guide" />
          <Link href="#advanced" title="Advanced Topics" />
        </Anchor>
      </div>
    </div>
  )
}
```

### Fixed Positioning
```tsx
export function FixedAnchorExample() {
  const { Link } = Anchor
  
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 border">
      <h4 className="font-semibold mb-3 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        On This Page
      </h4>
      <Anchor offsetTop={100} bounds={100}>
        <Link href="#overview" title="Overview" />
        <Link href="#features" title="Features" />
        <Link href="#examples" title="Examples" />
        <Link href="#props" title="Props API" />
        <Link href="#accessibility" title="Accessibility" />
      </Anchor>
    </div>
  )
}
```

## Nested Links

```tsx
export function NestedLinksExample() {
  const { Link } = Anchor
  
  return (
    <Anchor offsetTop={60}>
      <Link href="#documentation" title="Documentation">
        <Link href="#getting-started" title="Getting Started" />
        <Link href="#installation" title="Installation" />
      </Link>
      
      <Link href="#components" title="Components">
        <Link href="#basic-components" title="Basic Components" />
        <Link href="#advanced-components" title="Advanced Components" />
        <Link href="#layout-components" title="Layout Components" />
      </Link>
      
      <Link href="#examples" title="Examples">
        <Link href="#simple-examples" title="Simple Examples" />
        <Link href="#complex-examples" title="Complex Examples" />
      </Link>
    </Anchor>
  )
}
```

## Custom Target Container

Specify a custom scrolling container:

```tsx
export function CustomTargetExample() {
  const { Link } = Anchor
  
  return (
    <div className="flex h-96">
      <div className="w-48 bg-gray-50 dark:bg-gray-800 p-4">
        <Anchor 
          offsetTop={20}
          targetOffset={20}
          getContainer={() => document.getElementById('scroll-container')}
        >
          <Link href="#section-a" title="Section A" />
          <Link href="#section-b" title="Section B" />
          <Link href="#section-c" title="Section C" />
          <Link href="#section-d" title="Section D" />
        </Anchor>
      </div>
      
      <div id="scroll-container" className="flex-1 overflow-y-auto p-6 space-y-8">
        <div id="section-a" className="min-h-[300px] bg-blue-100 dark:bg-blue-900 p-6 rounded">
          <h3 className="text-xl font-bold mb-4">Section A</h3>
          <p>Content for section A...</p>
        </div>
        
        <div id="section-b" className="min-h-[300px] bg-green-100 dark:bg-green-900 p-6 rounded">
          <h3 className="text-xl font-bold mb-4">Section B</h3>
          <p>Content for section B...</p>
        </div>
        
        <div id="section-c" className="min-h-[300px] bg-yellow-100 dark:bg-yellow-900 p-6 rounded">
          <h3 className="text-xl font-bold mb-4">Section C</h3>
          <p>Content for section C...</p>
        </div>
        
        <div id="section-d" className="min-h-[300px] bg-red-100 dark:bg-red-900 p-6 rounded">
          <h3 className="text-xl font-bold mb-4">Section D</h3>
          <p>Content for section D...</p>
        </div>
      </div>
    </div>
  )
}
```

## Documentation Page Example

```tsx
export function DocumentationPageExample() {
  const { Link } = Anchor
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                Table of Contents
              </h3>
              <Anchor 
                offsetTop={100}
                bounds={50}
                onClick={(e, link) => {
                  console.log('Navigating to:', link.href)
                }}
              >
                <Link href="#overview" title="Overview" />
                <Link href="#installation" title="Installation" />
                <Link href="#quick-start" title="Quick Start" />
                <Link href="#components" title="Components">
                  <Link href="#buttons" title="Buttons" />
                  <Link href="#forms" title="Forms" />
                  <Link href="#navigation" title="Navigation" />
                </Link>
                <Link href="#theming" title="Theming" />
                <Link href="#customization" title="Customization" />
                <Link href="#api-reference" title="API Reference" />
                <Link href="#contributing" title="Contributing" />
              </Anchor>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 max-w-3xl">
          <article className="prose dark:prose-invert max-w-none">
            <section id="overview" className="mb-16">
              <h1 className="text-4xl font-bold mb-6">Component Library Documentation</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                A comprehensive guide to using our component library in your projects.
              </p>
              <p>
                This documentation covers everything you need to know about implementing 
                and customizing components in your applications.
              </p>
            </section>
            
            <section id="installation" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Installation</h2>
              <p className="mb-4">
                Get started by installing the component library via npm:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <code>npm install @company/component-library</code>
              </pre>
            </section>
            
            <section id="quick-start" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
              <p>
                Import and use components in your application:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <code>{`import { Button, Input } from '@company/component-library'

function App() {
  return (
    <div>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </div>
  )
}`}</code>
              </pre>
            </section>
            
            <section id="components" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Components</h2>
              
              <div id="buttons" className="mb-12">
                <h3 className="text-2xl font-semibold mb-4">Buttons</h3>
                <p>
                  Button components provide various styles and interactions for user actions.
                </p>
              </div>
              
              <div id="forms" className="mb-12">
                <h3 className="text-2xl font-semibold mb-4">Forms</h3>
                <p>
                  Form components help you create accessible and validated forms.
                </p>
              </div>
              
              <div id="navigation" className="mb-12">
                <h3 className="text-2xl font-semibold mb-4">Navigation</h3>
                <p>
                  Navigation components help users move through your application.
                </p>
              </div>
            </section>
            
            <section id="theming" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Theming</h2>
              <p>
                Customize the appearance of components to match your brand.
              </p>
            </section>
            
            <section id="customization" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Customization</h2>
              <p>
                Learn how to extend and modify components for your specific needs.
              </p>
            </section>
            
            <section id="api-reference" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">API Reference</h2>
              <p>
                Detailed API documentation for all components and their props.
              </p>
            </section>
            
            <section id="contributing" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Contributing</h2>
              <p>
                Guidelines for contributing to the component library.
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}
```

## Props API

### Anchor Props

| Prop               | Type                                                        | Default        | Description                              |
| ------------------ | ----------------------------------------------------------- | -------------- | ---------------------------------------- |
| `offsetTop`        | `number`                                                    | `0`            | Pixels to offset from top when scrolling |
| `bounds`           | `number`                                                    | `5`            | Boundary for active link highlighting    |
| `targetOffset`     | `number`                                                    | -              | Offset for target elements               |
| `getContainer`     | `() => HTMLElement`                                         | `() => window` | Get the scrolling container              |
| `getCurrentAnchor` | `() => string`                                              | -              | Get the current active anchor            |
| `onClick`          | `(e: Event, link: { title: string, href: string }) => void` | -              | Click event handler                      |
| `size`             | `'small' \| 'medium' \| 'large'`                            | `'medium'`     | Size variant                             |
| `className`        | `string`                                                    | -              | Additional CSS classes                   |

### Link Props

| Prop        | Type              | Default | Description                    |
| ----------- | ----------------- | ------- | ------------------------------ |
| `href`      | `string`          | -       | Target element selector or URL |
| `title`     | `React.ReactNode` | -       | Link display text              |
| `target`    | `string`          | -       | Link target attribute          |
| `className` | `string`          | -       | Additional CSS classes         |
| `children`  | `React.ReactNode` | -       | Nested Link components         |

## Accessibility

The Anchor component includes comprehensive accessibility features:

- **ARIA Navigation** - Uses `role="navigation"` and proper ARIA labels
- **Keyboard Support** - Full keyboard navigation with Tab and arrow keys
- **Focus Management** - Visible focus indicators and proper focus order
- **Screen Reader Support** - Descriptive link text and current page indicators
- **Semantic HTML** - Uses proper `nav` and `a` elements

### Keyboard Shortcuts
- `Tab` / `Shift + Tab` - Navigate between links
- `Enter` / `Space` - Activate link
- `Arrow Up/Down` - Navigate between nested links

## Best Practices

1. **Meaningful Titles** - Use descriptive link titles that clearly indicate the target content
2. **Logical Structure** - Organize links in a logical hierarchy that matches your content
3. **Appropriate Nesting** - Don't nest links too deeply (2-3 levels maximum)
4. **Consistent Offset** - Use consistent `offsetTop` values throughout your application
5. **Performance** - Be mindful of scroll event listeners in components with many sections
6. **Mobile Optimization** - Consider collapsible navigation on mobile devices
7. **Visual Indicators** - Ensure active links are clearly distinguishable

## Common Patterns

### Documentation Navigation
```tsx
function DocumentationNav({ sections }) {
  const { Link } = Anchor
  
  return (
    <Anchor offsetTop={80}>
      {sections.map(section => (
        <Link key={section.id} href={`#${section.id}`} title={section.title}>
          {section.subsections?.map(subsection => (
            <Link 
              key={subsection.id} 
              href={`#${subsection.id}`} 
              title={subsection.title} 
            />
          ))}
        </Link>
      ))}
    </Anchor>
  )
}
```

### Landing Page Navigation
```tsx
function LandingPageNav() {
  const { Link } = Anchor
  
  return (
    <Anchor offsetTop={60} bounds={100}>
      <Link href="#hero" title="Home" />
      <Link href="#features" title="Features" />
      <Link href="#pricing" title="Pricing" />
      <Link href="#testimonials" title="Testimonials" />
      <Link href="#contact" title="Contact" />
    </Anchor>
  )
}
```

The Anchor component is perfect for creating smooth, accessible navigation within single-page applications, documentation sites, and long-form content that benefits from quick section jumping.
