# Drawer Component Documentation

## Overview
The Drawer component creates sliding panel overlays that emerge from screen edges to display additional content or navigation. It provides flexible positioning, size options, gesture support, and comprehensive accessibility features for versatile content presentation.

## Features
- **Multi-Position**: Slide from left, right, top, or bottom edges
- **Size Variants**: Small (sm), Medium (md), Large (lg), Extra Large (xl), Full screen
- **Backdrop Control**: Configurable backdrop clicks and escape key handling  
- **Gesture Support**: Touch and swipe gestures for mobile interaction
- **Animation**: Smooth slide transitions with customizable timing
- **Accessibility**: Full ARIA compliance with focus management and keyboard navigation
- **Portal Rendering**: Renders outside normal DOM hierarchy for proper layering
- **Body Scroll Lock**: Prevents background scrolling when drawer is open
- **Dark Mode**: Complete dark theme support

## Basic Usage
Simple drawer with default configuration:

```typescript
import { Drawer, Button } from '@nebula/components'

function BasicDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Drawer Content</h2>
          <p className="text-gray-600">
            This is the drawer content. It can contain any React components,
            forms, navigation, or other interactive elements.
          </p>
          <Button 
            className="mt-4" 
            onClick={() => setIsOpen(false)}
          >
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </>
  )
}
```

## Position Variants
Drawer can slide from any screen edge:

```typescript
import { Drawer, Button } from '@nebula/components'

function PositionDrawers() {
  const [activeDrawer, setActiveDrawer] = useState(null)

  const openDrawer = (position) => setActiveDrawer(position)
  const closeDrawer = () => setActiveDrawer(null)

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button onClick={() => openDrawer('left')}>
        Left Drawer
      </Button>
      
      <Button onClick={() => openDrawer('right')}>
        Right Drawer
      </Button>
      
      <Button onClick={() => openDrawer('top')}>
        Top Drawer
      </Button>
      
      <Button onClick={() => openDrawer('bottom')}>
        Bottom Drawer
      </Button>

      {/* Left Drawer */}
      <Drawer
        isOpen={activeDrawer === 'left'}
        onClose={closeDrawer}
        position="left"
        size="md"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Left Navigation</h3>
          <nav className="space-y-2">
            <a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">Home</a>
            <a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">Products</a>
            <a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">About</a>
            <a href="#" className="block py-2 px-3 hover:bg-gray-100 rounded">Contact</a>
          </nav>
        </div>
      </Drawer>

      {/* Right Drawer */}
      <Drawer
        isOpen={activeDrawer === 'right'}
        onClose={closeDrawer}
        position="right"
        size="lg"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Product 1</span>
              <span>$29.99</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Product 2</span>
              <span>$19.99</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$49.98</span>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Top Drawer */}
      <Drawer
        isOpen={activeDrawer === 'top'}
        onClose={closeDrawer}
        position="top"
        size="sm"
      >
        <div className="p-4 bg-blue-50">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              System Notification
            </h3>
            <p className="text-blue-700">
              Your changes have been saved successfully.
            </p>
          </div>
        </div>
      </Drawer>

      {/* Bottom Drawer */}
      <Drawer
        isOpen={activeDrawer === 'bottom'}
        onClose={closeDrawer}
        position="bottom"
        size="auto"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" size="sm">Share</Button>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="outline" size="sm">Print</Button>
            <Button variant="outline" size="sm">Save</Button>
            <Button variant="outline" size="sm">Delete</Button>
            <Button variant="outline" size="sm">Archive</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
```

## Size Variants
Different drawer sizes for various content needs:

```typescript
import { Drawer, Button } from '@nebula/components'

function SizedDrawers() {
  const [activeSize, setActiveSize] = useState(null)

  const openDrawer = (size) => setActiveSize(size)
  const closeDrawer = () => setActiveSize(null)

  return (
    <div className="space-x-4">
      <Button onClick={() => openDrawer('sm')}>Small</Button>
      <Button onClick={() => openDrawer('md')}>Medium</Button>
      <Button onClick={() => openDrawer('lg')}>Large</Button>
      <Button onClick={() => openDrawer('xl')}>Extra Large</Button>
      <Button onClick={() => openDrawer('full')}>Full Screen</Button>

      {/* Small Drawer */}
      <Drawer isOpen={activeSize === 'sm'} onClose={closeDrawer} size="sm">
        <div className="p-4">
          <h3 className="font-semibold mb-2">Small Drawer</h3>
          <p className="text-sm text-gray-600">
            Compact content area for minimal information or quick actions.
          </p>
        </div>
      </Drawer>

      {/* Medium Drawer */}
      <Drawer isOpen={activeSize === 'md'} onClose={closeDrawer} size="md">
        <div className="p-6">
          <h3 className="font-semibold mb-4">Medium Drawer</h3>
          <p className="text-gray-600 mb-4">
            Standard size suitable for forms, detailed content, and most use cases.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Add your comments"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
        </div>
      </Drawer>

      {/* Large Drawer */}
      <Drawer isOpen={activeSize === 'lg'} onClose={closeDrawer} size="lg">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">Large Drawer</h3>
          <p className="text-gray-600 mb-6">
            Spacious layout for complex forms, data tables, or rich content presentations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Section 1</h4>
              <div className="space-y-3">
                <input type="text" placeholder="Field 1" className="w-full px-3 py-2 border rounded-md" />
                <input type="email" placeholder="Field 2" className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Section 2</h4>
              <div className="space-y-3">
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <textarea className="w-full px-3 py-2 border rounded-md" rows={3} />
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Extra Large Drawer */}
      <Drawer isOpen={activeSize === 'xl'} onClose={closeDrawer} size="xl">
        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-8">Extra Large Drawer</h3>
          <p className="text-gray-600 mb-8">
            Maximum drawer size for comprehensive interfaces, dashboards, or extensive content.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold">Column 1</h4>
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="p-3 bg-gray-50 rounded">Item {i}</div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Column 2</h4>
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="p-3 bg-blue-50 rounded">Item {i}</div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Column 3</h4>
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="p-3 bg-green-50 rounded">Item {i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Full Screen Drawer */}
      <Drawer isOpen={activeSize === 'full'} onClose={closeDrawer} size="full">
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-semibold">Full Screen Drawer</h3>
            <Button onClick={closeDrawer}>Close</Button>
          </div>
          <div className="flex-1">
            <p className="text-gray-600 mb-8">
              Full viewport coverage for maximum immersion and content display.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-6 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold mb-2">Card {i + 1}</h4>
                  <p className="text-sm text-gray-600">
                    This is example content for the full screen drawer layout.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
```

## Backdrop Behavior
Configure backdrop interactions and behavior:

```typescript
import { Drawer, Button } from '@nebula/components'

function BackdropDrawers() {
  const [activeDrawer, setActiveDrawer] = useState(null)

  return (
    <div className="space-x-4">
      <Button onClick={() => setActiveDrawer('clickable')}>
        Clickable Backdrop
      </Button>
      
      <Button onClick={() => setActiveDrawer('static')}>
        Static Backdrop
      </Button>
      
      <Button onClick={() => setActiveDrawer('no-backdrop')}>
        No Backdrop
      </Button>

      {/* Clickable Backdrop (Default) */}
      <Drawer
        isOpen={activeDrawer === 'clickable'}
        onClose={() => setActiveDrawer(null)}
        backdrop="clickable"
      >
        <div className="p-6">
          <h3 className="font-semibold mb-2">Clickable Backdrop</h3>
          <p className="text-gray-600 mb-4">
            Click the backdrop (dark area) to close this drawer.
            You can also press the Escape key.
          </p>
          <Button onClick={() => setActiveDrawer(null)}>
            Close
          </Button>
        </div>
      </Drawer>

      {/* Static Backdrop */}
      <Drawer
        isOpen={activeDrawer === 'static'}
        onClose={() => setActiveDrawer(null)}
        backdrop="static"
      >
        <div className="p-6">
          <h3 className="font-semibold mb-2">Static Backdrop</h3>
          <p className="text-gray-600 mb-4">
            This drawer cannot be closed by clicking the backdrop.
            Use the close button or press Escape.
          </p>
          <Button onClick={() => setActiveDrawer(null)}>
            Close
          </Button>
        </div>
      </Drawer>

      {/* No Backdrop */}
      <Drawer
        isOpen={activeDrawer === 'no-backdrop'}
        onClose={() => setActiveDrawer(null)}
        backdrop={false}
      >
        <div className="p-6 border-l-4 border-blue-500">
          <h3 className="font-semibold mb-2">No Backdrop</h3>
          <p className="text-gray-600 mb-4">
            This drawer has no backdrop overlay.
            The background remains interactive.
          </p>
          <Button onClick={() => setActiveDrawer(null)}>
            Close
          </Button>
        </div>
      </Drawer>
    </div>
  )
}
```

## Navigation Drawer
Complete navigation interface with menu structure:

```typescript
import { Drawer, Button } from '@nebula/components'
import { Menu, Home, Settings, User, Bell, Search } from 'lucide-react'

function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, count: null },
    { id: 'profile', label: 'Profile', icon: <User size={20} />, count: null },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, count: 5 },
    { id: 'search', label: 'Search', icon: <Search size={20} />, count: null },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, count: null },
  ]

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2"
      >
        <Menu size={20} />
        <span>Open Menu</span>
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        size="md"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Navigation</h2>
            <p className="text-sm text-gray-600">Choose a section to navigate to</p>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">John Doe</div>
                <div className="text-sm text-gray-600">john@example.com</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Close Menu
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}
```

## Form Drawer
Complete form interface with validation:

```typescript
import { Drawer, Button, Input, Textarea, Select, FieldError } from '@nebula/components'

function FormDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    priority: 'medium',
    description: ''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit form
    console.log('Submitting:', formData)
    setIsOpen(false)
    setFormData({
      name: '',
      email: '',
      category: '',
      priority: 'medium',
      description: ''
    })
    setErrors({})
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Create New Ticket
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        size="lg"
        backdrop="static"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Create Support Ticket
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Please fill out all required fields to submit your request.
            </p>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                error={!!errors.name}
                placeholder="Enter your full name"
              />
              {errors.name && <FieldError message={errors.name} />}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={!!errors.email}
                placeholder="Enter your email address"
              />
              {errors.email && <FieldError message={errors.email} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <Select
                  value={formData.category}
                  onChange={(value) => updateField('category', value)}
                  error={!!errors.category}
                  placeholder="Select a category"
                  options={[
                    { value: 'technical', label: 'Technical Support' },
                    { value: 'billing', label: 'Billing Question' },
                    { value: 'feature', label: 'Feature Request' },
                    { value: 'other', label: 'Other' }
                  ]}
                />
                {errors.category && <FieldError message={errors.category} />}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <Select
                  value={formData.priority}
                  onChange={(value) => updateField('priority', value)}
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                    { value: 'urgent', label: 'Urgent' }
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                error={!!errors.description}
                placeholder="Please describe your issue or request in detail..."
                rows={6}
              />
              {errors.description && <FieldError message={errors.description} />}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <div className="flex space-x-3">
              <Button type="button" variant="outline">
                Save Draft
              </Button>
              <Button type="submit">
                Submit Ticket
              </Button>
            </div>
          </div>
        </form>
      </Drawer>
    </>
  )
}
```

## Mobile Sheet
Mobile-optimized bottom sheet interface:

```typescript
import { Drawer, Button } from '@nebula/components'
import { Share, Download, Edit, Trash2, Star } from 'lucide-react'

function MobileSheet() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { id: 'edit', label: 'Edit', icon: <Edit size={20} /> },
    { id: 'favorite', label: 'Add to Favorites', icon: <Star size={20} /> },
    { id: 'share', label: 'Share', icon: <Share size={20} /> },
    { id: 'download', label: 'Download', icon: <Download size={20} /> },
    { id: 'delete', label: 'Delete', icon: <Trash2 size={20} />, danger: true },
  ]

  const handleAction = (actionId) => {
    console.log('Action:', actionId)
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Show Actions
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom"
        size="auto"
        className="sm:hidden" // Only show on mobile
      >
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          <h3 className="text-lg font-semibold text-center mb-6">
            Choose an action
          </h3>

          <div className="space-y-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`w-full flex items-center space-x-4 px-4 py-4 rounded-lg transition-colors ${
                  action.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {action.icon}
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="w-full mt-6"
          >
            Cancel
          </Button>
        </div>
      </Drawer>
    </>
  )
}
```

## Props Reference

### Drawer Props

| Prop                | Type                                               | Default       | Description                         |
| ------------------- | -------------------------------------------------- | ------------- | ----------------------------------- |
| `isOpen`            | `boolean`                                          | `false`       | Whether drawer is open              |
| `onClose`           | `() => void`                                       | -             | Called when drawer should close     |
| `position`          | `'left' \| 'right' \| 'top' \| 'bottom'`           | `'right'`     | Which edge to slide from            |
| `size`              | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'auto'` | `'md'`        | Drawer size                         |
| `backdrop`          | `boolean \| 'static' \| 'clickable'`               | `'clickable'` | Backdrop behavior                   |
| `closeOnEscape`     | `boolean`                                          | `true`        | Whether ESC key closes drawer       |
| `swipeToClose`      | `boolean`                                          | `true`        | Whether swipe gestures close drawer |
| `autoFocus`         | `boolean`                                          | `true`        | Whether to auto-focus first element |
| `restoreFocus`      | `boolean`                                          | `true`        | Whether to restore focus on close   |
| `lockBodyScroll`    | `boolean`                                          | `true`        | Whether to prevent body scrolling   |
| `animation`         | `boolean`                                          | `true`        | Whether to animate open/close       |
| `animationDuration` | `number`                                           | `300`         | Animation duration in ms            |
| `zIndex`            | `number`                                           | `1000`        | Z-index for drawer                  |
| `className`         | `string`                                           | -             | Additional CSS classes              |
| `overlayClassName`  | `string`                                           | -             | Backdrop CSS classes                |
| `contentClassName`  | `string`                                           | -             | Drawer content CSS classes          |
| `style`             | `CSSProperties`                                    | -             | Inline styles                       |
| `children`          | `ReactNode`                                        | -             | Drawer content                      |

### Size Specifications

| Size   | Left/Right Width | Top/Bottom Height |
| ------ | ---------------- | ----------------- |
| `sm`   | 320px            | 200px             |
| `md`   | 480px            | 300px             |
| `lg`   | 640px            | 400px             |
| `xl`   | 800px            | 500px             |
| `full` | 100vw            | 100vh             |
| `auto` | Content-based    | Content-based     |

### Drawer Events

| Event             | Parameters | Description                     |
| ----------------- | ---------- | ------------------------------- |
| `onOpen`          | `()`       | Called when drawer opens        |
| `onClose`         | `()`       | Called when drawer closes       |
| `onAnimationEnd`  | `()`       | Called when animation completes |
| `onEscape`        | `()`       | Called when ESC key pressed     |
| `onBackdropClick` | `()`       | Called when backdrop clicked    |

## Accessibility

The Drawer component provides comprehensive accessibility support:

- **ARIA Roles**: Uses proper `dialog` role with `aria-modal="true"`
- **Focus Management**: Traps focus within drawer and restores on close
- **Keyboard Navigation**: ESC key closes drawer, Tab cycles through elements
- **Screen Reader Support**: Announces drawer open/close state changes
- **Focus Indicators**: Visible focus indicators for all interactive elements
- **Labels**: Supports `aria-label`, `aria-labelledby`, and `aria-describedby`
- **High Contrast**: Ensures visibility in high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### Keyboard Shortcuts

| Key           | Action                             |
| ------------- | ---------------------------------- |
| `Escape`      | Close drawer                       |
| `Tab`         | Move to next focusable element     |
| `Shift + Tab` | Move to previous focusable element |
| `Arrow Keys`  | Navigate within drawer content     |

## Best Practices

### User Experience
- Use appropriate positions based on content type and screen size
- Choose sizes that don't overwhelm the main content
- Provide clear close options (backdrop, ESC, close button)
- Consider mobile experience with bottom sheets

### Performance
- Use portal rendering to avoid z-index issues
- Implement proper cleanup for event listeners
- Consider lazy loading for drawer content
- Test animation performance on lower-end devices

### Accessibility
- Always provide meaningful labels
- Ensure keyboard navigation works properly
- Test with screen readers
- Maintain focus management

### Content Organization
- Use headers and sections to organize drawer content
- Provide clear navigation within complex drawers
- Consider scrolling behavior for lengthy content
- Use consistent spacing and typography

## Examples

The Drawer component enables versatile content presentation from screen edges, supporting navigation, forms, actions, and detailed content display with comprehensive customization and accessibility features.
