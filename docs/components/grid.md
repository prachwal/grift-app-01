# Grid Component Documentation

## Overview
The Grid component provides a flexible 12-column layout system based on CSS Grid with responsive breakpoints. It offers intuitive API for creating responsive layouts with consistent spacing and alignment.

## Features
- **12-Column System** - Standard 12-column grid layout
- **Responsive Breakpoints** - xs, sm, md, lg, xl breakpoints
- **Flexible Spans** - Columns can span multiple grid units
- **Gap Control** - Customizable spacing between grid items
- **Alignment Options** - Horizontal and vertical alignment control
- **Auto-sizing** - Automatic column sizing based on content
- **Nested Grids** - Support for nested grid layouts
- **Dark Mode** - Full dark mode compatibility

## Basic Usage

```tsx
import { Grid } from '@/nebula/components/Grid'

export function BasicGridExample() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <div className="p-4 bg-blue-100 dark:bg-blue-900">
          Item 1 - Full width on mobile, half width on desktop
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="p-4 bg-green-100 dark:bg-green-900">
          Item 2 - Full width on mobile, half width on desktop
        </div>
      </Grid>
    </Grid>
  )
}
```

## Responsive Breakpoints

The Grid system uses five responsive breakpoints:

| Breakpoint | Screen Width | Usage                                |
| ---------- | ------------ | ------------------------------------ |
| `xs`       | ≥ 0px        | Extra small devices (phones)         |
| `sm`       | ≥ 640px      | Small devices (large phones)         |
| `md`       | ≥ 768px      | Medium devices (tablets)             |
| `lg`       | ≥ 1024px     | Large devices (desktops)             |
| `xl`       | ≥ 1280px     | Extra large devices (large desktops) |

## Grid Container

The container establishes a grid context and controls spacing:

```tsx
export function GridContainerExample() {
  return (
    <Grid container spacing={3} className="p-4">
      <Grid item xs={4}>
        <div className="p-4 bg-gray-100 dark:bg-gray-800">1/3 width</div>
      </Grid>
      <Grid item xs={4}>
        <div className="p-4 bg-gray-100 dark:bg-gray-800">1/3 width</div>
      </Grid>
      <Grid item xs={4}>
        <div className="p-4 bg-gray-100 dark:bg-gray-800">1/3 width</div>
      </Grid>
    </Grid>
  )
}
```

## Grid Item

Grid items define how many columns to occupy:

```tsx
export function GridItemExample() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className="p-4 bg-blue-100">Full width</div>
      </Grid>
      <Grid item xs={6}>
        <div className="p-4 bg-green-100">Half width</div>
      </Grid>
      <Grid item xs={6}>
        <div className="p-4 bg-yellow-100">Half width</div>
      </Grid>
      <Grid item xs={4}>
        <div className="p-4 bg-red-100">1/3 width</div>
      </Grid>
      <Grid item xs={8}>
        <div className="p-4 bg-purple-100">2/3 width</div>
      </Grid>
    </Grid>
  )
}
```

## Responsive Layout

Create different layouts for different screen sizes:

```tsx
export function ResponsiveLayoutExample() {
  return (
    <Grid container spacing={4}>
      {/* Sidebar */}
      <Grid item xs={12} md={3}>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 h-64">
          Sidebar
          <br />
          Full width on mobile
          <br />
          1/4 width on tablet+
        </div>
      </Grid>
      
      {/* Main Content */}
      <Grid item xs={12} md={9}>
        <div className="p-4 bg-blue-100 dark:bg-blue-900 h-64">
          Main Content
          <br />
          Full width on mobile
          <br />
          3/4 width on tablet+
        </div>
      </Grid>
      
      {/* Cards */}
      <Grid item xs={12} sm={6} lg={4}>
        <div className="p-4 bg-green-100 dark:bg-green-900">
          Card 1
          <br />
          Full width on mobile
          <br />
          Half width on small
          <br />
          1/3 width on large
        </div>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900">Card 2</div>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <div className="p-4 bg-red-100 dark:bg-red-900">Card 3</div>
      </Grid>
    </Grid>
  )
}
```

## Alignment Options

### Horizontal Alignment
```tsx
export function HorizontalAlignmentExample() {
  return (
    <div className="space-y-4">
      {/* Left aligned (default) */}
      <Grid container spacing={2} justifyContent="start">
        <Grid item xs={4}>
          <div className="p-4 bg-blue-100">Start</div>
        </Grid>
      </Grid>
      
      {/* Center aligned */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <div className="p-4 bg-green-100">Center</div>
        </Grid>
      </Grid>
      
      {/* Right aligned */}
      <Grid container spacing={2} justifyContent="end">
        <Grid item xs={4}>
          <div className="p-4 bg-red-100">End</div>
        </Grid>
      </Grid>
      
      {/* Space between */}
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={3}>
          <div className="p-4 bg-yellow-100">Item 1</div>
        </Grid>
        <Grid item xs={3}>
          <div className="p-4 bg-purple-100">Item 2</div>
        </Grid>
      </Grid>
    </div>
  )
}
```

### Vertical Alignment
```tsx
export function VerticalAlignmentExample() {
  return (
    <Grid container spacing={2} alignItems="center" className="h-64">
      <Grid item xs={4}>
        <div className="p-4 bg-blue-100">
          Vertically centered content
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="p-4 bg-green-100 h-20">
          Taller content
        </div>
      </Grid>
    </Grid>
  )
}
```

## Spacing Control

Control spacing between grid items:

```tsx
export function SpacingExample() {
  return (
    <div className="space-y-8">
      {/* No spacing */}
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="p-4 bg-blue-100">No spacing</div>
        </Grid>
        <Grid item xs={6}>
          <div className="p-4 bg-green-100">No spacing</div>
        </Grid>
      </Grid>
      
      {/* Small spacing */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="p-4 bg-blue-100">Small spacing</div>
        </Grid>
        <Grid item xs={6}>
          <div className="p-4 bg-green-100">Small spacing</div>
        </Grid>
      </Grid>
      
      {/* Large spacing */}
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <div className="p-4 bg-blue-100">Large spacing</div>
        </Grid>
        <Grid item xs={6}>
          <div className="p-4 bg-green-100">Large spacing</div>
        </Grid>
      </Grid>
    </div>
  )
}
```

## Nested Grids

Create complex layouts with nested grids:

```tsx
export function NestedGridExample() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <div className="p-4 bg-gray-100 dark:bg-gray-800">
          <h3 className="mb-4 font-semibold">Main Content Area</h3>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="p-4 bg-blue-100 dark:bg-blue-900">
                Nested Item 1
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="p-4 bg-green-100 dark:bg-green-900">
                Nested Item 2
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900">
                Full width nested item
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <div className="p-4 bg-red-100 dark:bg-red-900">
          Sidebar
        </div>
      </Grid>
    </Grid>
  )
}
```

## Props API

### Grid Container Props

| Prop             | Type                                                                                  | Default     | Description                      |
| ---------------- | ------------------------------------------------------------------------------------- | ----------- | -------------------------------- |
| `container`      | `boolean`                                                                             | `false`     | Defines this as a grid container |
| `spacing`        | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10`                                          | `0`         | Spacing between grid items       |
| `justifyContent` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'`   | Horizontal alignment             |
| `alignItems`     | `'start' \| 'center' \| 'end' \| 'stretch'`                                           | `'stretch'` | Vertical alignment               |
| `direction`      | `'row' \| 'column'`                                                                   | `'row'`     | Grid flow direction              |
| `wrap`           | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                | `'wrap'`    | How items wrap                   |

### Grid Item Props

| Prop   | Type                     | Default | Description                         |
| ------ | ------------------------ | ------- | ----------------------------------- |
| `item` | `boolean`                | `false` | Defines this as a grid item         |
| `xs`   | `1-12 \| 'auto' \| true` | -       | Column span for extra small screens |
| `sm`   | `1-12 \| 'auto' \| true` | -       | Column span for small screens       |
| `md`   | `1-12 \| 'auto' \| true` | -       | Column span for medium screens      |
| `lg`   | `1-12 \| 'auto' \| true` | -       | Column span for large screens       |
| `xl`   | `1-12 \| 'auto' \| true` | -       | Column span for extra large screens |

### Common Props

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Child elements         |

## Advanced Examples

### Dashboard Layout
```tsx
export function DashboardLayoutExample() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className="h-16 bg-white dark:bg-gray-800 shadow-sm border-b">
            <div className="px-6 h-full flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </div>
        </Grid>
      </Grid>
      
      <div className="p-6">
        {/* Stats Cards */}
        <Grid container spacing={4} className="mb-6">
          <Grid item xs={12} sm={6} lg={3}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">12,345</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">$45,678</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Orders</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,234</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">3.4%</p>
            </div>
          </Grid>
        </Grid>
        
        {/* Main Content */}
        <Grid container spacing={6}>
          <Grid item xs={12} lg={8}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Chart Area</h2>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                Chart Component
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">New user registered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Order completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Payment pending</span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
```

## Best Practices

1. **Mobile First** - Always define `xs` breakpoint first, then larger screens
2. **Consistent Spacing** - Use consistent spacing values throughout your application  
3. **Semantic HTML** - Grid components maintain proper HTML semantics
4. **Performance** - Grid uses CSS Grid for optimal performance
5. **Accessibility** - Maintain logical reading order and focus flow
6. **Responsive Design** - Test layouts on all screen sizes
7. **Content-First** - Design grids around your content, not the other way around

## Browser Support

The Grid component uses modern CSS Grid which is supported in:
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+

For older browsers, the component gracefully degrades to a flexbox-based layout.

The Grid component provides a powerful and flexible layout system that makes creating responsive designs intuitive and maintainable.
