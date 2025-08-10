# Modal Component Documentation

## Overview
The Modal component creates overlay dialogs for displaying content above the main page. It provides flexible content presentation with backdrop handling, size variations, positioning options, and accessibility features for user interactions that require focus and attention.

## Features
- **Size Variants**: Small (sm), Medium (md), Large (lg), Extra Large (xl), and Full Screen
- **Position Control**: Centered, top, bottom, left, and right positioning
- **Backdrop Behavior**: Configurable backdrop clicks and escape key handling
- **Scrollable Content**: Support for large content with internal scrolling
- **Animation**: Smooth open/close animations with customizable transitions  
- **Accessibility**: Full ARIA compliance with focus management and keyboard navigation
- **Portal Rendering**: Renders outside normal DOM hierarchy to avoid z-index issues
- **Dark Mode**: Complete dark theme support

## Basic Usage

### Simple Modal
```typescript
import { Modal, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function SimpleModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Simple Modal"
      >
        <p>This is a basic modal with some content.</p>
      </Modal>
    </>
  )
}
```

### Modal with Header and Footer
```typescript
import { Modal, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function CompleteModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Complete Modal
      </Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Complete Modal"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        }
      >
        <p>This modal includes a header with title and a custom footer with actions.</p>
      </Modal>
    </>
  )
}
```

## Size Variants
Choose from five different sizes:

```typescript
// Small modal (400px max-width)
<Modal size="sm" isOpen={isOpen} onClose={onClose}>
  Small modal content
</Modal>

// Medium modal (600px max-width) - Default
<Modal size="md" isOpen={isOpen} onClose={onClose}>
  Medium modal content
</Modal>

// Large modal (800px max-width)
<Modal size="lg" isOpen={isOpen} onClose={onClose}>
  Large modal content
</Modal>

// Extra large modal (1200px max-width)
<Modal size="xl" isOpen={isOpen} onClose={onClose}>
  Extra large modal content
</Modal>

// Full screen modal
<Modal size="fullscreen" isOpen={isOpen} onClose={onClose}>
  Full screen modal content
</Modal>
```

## Position Variants
Control where the modal appears:

```typescript
// Centered (default)
<Modal position="center" isOpen={isOpen} onClose={onClose}>
  Centered modal
</Modal>

// Top positioned
<Modal position="top" isOpen={isOpen} onClose={onClose}>
  Top positioned modal
</Modal>

// Bottom positioned (like bottom sheet)
<Modal position="bottom" isOpen={isOpen} onClose={onClose}>
  Bottom positioned modal
</Modal>

// Left side panel
<Modal position="left" isOpen={isOpen} onClose={onClose}>
  Left side panel
</Modal>

// Right side panel
<Modal position="right" isOpen={isOpen} onClose={onClose}>
  Right side panel
</Modal>
```

## Backdrop Behavior
Configure how the modal responds to backdrop interaction:

```typescript
// Closable by backdrop click (default)
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  closeOnBackdropClick={true}
  closeOnEscape={true}
>
  Modal content
</Modal>

// Prevent closing by backdrop click
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  This modal can only be closed by explicit action
</Modal>

// Custom backdrop color/opacity
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  backdropClassName="bg-red-900/50"
>
  Modal with custom backdrop
</Modal>
```

## Scrollable Content
Handle large content with scrolling:

```typescript
import { Modal, Button } from '@nebula/components'

function ScrollableModal() {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      scrollable={true}
      size="lg"
      title="Scrollable Content"
    >
      <div className="space-y-4">
        {/* Large amount of content */}
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>
            This is paragraph {i + 1} of scrollable content in the modal.
          </p>
        ))}
      </div>
    </Modal>
  )
}
```

## Form Modal
Common pattern for forms in modals:

```typescript
import { Modal, Input, Button, Label } from '@nebula/components'
import { useState } from 'preact/hooks'

function FormModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form data:', formData)
    setIsOpen(false)
  }
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Add User
      </Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Add New User"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onInput={(e) => setFormData({
                ...formData,
                name: (e.target as HTMLInputElement).value
              })}
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onInput={(e) => setFormData({
                ...formData,
                email: (e.target as HTMLInputElement).value
              })}
              placeholder="user@example.com"
            />
          </div>
          
          <div className="flex gap-2 justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add User
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
```

## Confirmation Modal
Pattern for confirmation dialogs:

```typescript
import { Modal, Button } from '@nebula/components'
import { AlertTriangle } from 'lucide-preact'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning'
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle 
            className={`w-6 h-6 ${
              variant === 'danger' ? 'text-red-500' : 
              variant === 'warning' ? 'text-yellow-500' : 
              'text-blue-500'
            }`} 
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 justify-end mt-6">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button 
          variant={variant === 'danger' ? 'danger' : 'primary'} 
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  )
}

// Usage
function DeleteExample() {
  const [showConfirm, setShowConfirm] = useState(false)
  
  const handleDelete = () => {
    // Delete logic here
    console.log('Item deleted')
  }
  
  return (
    <>
      <Button variant="danger" onClick={() => setShowConfirm(true)}>
        Delete Item
      </Button>
      
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  )
}
```

## Props Reference

| Prop                   | Type                                                 | Default    | Description                            |
| ---------------------- | ---------------------------------------------------- | ---------- | -------------------------------------- |
| `isOpen`               | `boolean`                                            | `false`    | Whether the modal is open              |
| `onClose`              | `() => void`                                         | -          | Callback when modal should close       |
| `title`                | `string`                                             | -          | Modal title in header                  |
| `children`             | `ComponentChild`                                     | -          | Modal body content                     |
| `footer`               | `ComponentChild`                                     | -          | Custom footer content                  |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'fullscreen'`       | `'md'`     | Modal size variant                     |
| `position`             | `'center' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'center'` | Modal position                         |
| `closeOnBackdropClick` | `boolean`                                            | `true`     | Whether clicking backdrop closes modal |
| `closeOnEscape`        | `boolean`                                            | `true`     | Whether ESC key closes modal           |
| `scrollable`           | `boolean`                                            | `false`    | Whether content area is scrollable     |
| `showCloseButton`      | `boolean`                                            | `true`     | Whether to show close X button         |
| `backdrop`             | `boolean \| 'static'`                                | `true`     | Backdrop behavior                      |
| `backdropClassName`    | `string`                                             | -          | Custom backdrop CSS classes            |
| `className`            | `string`                                             | -          | Additional modal CSS classes           |
| `contentClassName`     | `string`                                             | -          | Additional content area CSS classes    |
| `headerClassName`      | `string`                                             | -          | Additional header CSS classes          |
| `footerClassName`      | `string`                                             | -          | Additional footer CSS classes          |
| `animation`            | `boolean`                                            | `true`     | Whether to animate open/close          |
| `animationDuration`    | `number`                                             | `200`      | Animation duration in ms               |
| `zIndex`               | `number`                                             | `1000`     | Z-index for modal                      |
| `role`                 | `string`                                             | `'dialog'` | ARIA role                              |
| `ariaLabel`            | `string`                                             | -          | ARIA label                             |
| `ariaDescribedBy`      | `string`                                             | -          | ARIA described by                      |

## Accessibility
The Modal component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `dialog` role with `aria-modal="true"`
- **Focus Management**: Traps focus within modal and restores focus on close
- **Keyboard Navigation**: ESC key closes modal, Tab cycles through focusable elements
- **Screen Readers**: Proper announcement of modal content and state changes
- **Focus Indicators**: Visible focus indicators for all interactive elements
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## Examples

### Image Gallery Modal
```typescript
import { Modal, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const images = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3'
  ]
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Gallery image ${index + 1}`}
          className="cursor-pointer rounded-lg hover:opacity-80"
          onClick={() => setSelectedImage(src)}
        />
      ))}
      
      <Modal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)}
        size="lg"
        backdrop="static"
      >
        {selectedImage && (
          <img 
            src={selectedImage} 
            alt="Gallery modal view"
            className="w-full h-auto rounded-lg"
          />
        )}
      </Modal>
    </div>
  )
}
```
