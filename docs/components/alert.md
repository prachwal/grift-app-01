# Alert Component Documentation

## Overview
The Alert component displays important messages and notifications to users with contextual styling and optional interactive elements. It provides feedback for various user actions and system states with customizable variants, sizes, and actions.

## Features
- **Variant Types**: Info, success, warning, error, and neutral variants
- **Size Options**: Small (sm), Medium (md), and Large (lg) sizes  
- **Interactive Elements**: Dismissible alerts with close buttons
- **Custom Actions**: Support for custom action buttons
- **Icon Integration**: Built-in icons for different alert types
- **Accessibility**: Full ARIA compliance with proper roles and labels
- **Dark Mode**: Complete dark theme support
- **Animation**: Smooth enter/exit animations

## Basic Usage

### Simple Alert
```typescript
import { Alert } from '@nebula/components'

function MyComponent() {
  return (
    <Alert variant="info">
      This is an informational message.
    </Alert>
  )
}
```

### Alert with Title
```typescript
import { Alert } from '@nebula/components'

function AlertWithTitle() {
  return (
    <Alert variant="success" title="Success!">
      Your changes have been saved successfully.
    </Alert>
  )
}
```

### Dismissible Alert
```typescript
import { Alert } from '@nebula/components'
import { useState } from 'preact/hooks'

function DismissibleAlert() {
  const [visible, setVisible] = useState(true)
  
  if (!visible) return null
  
  return (
    <Alert 
      variant="warning"
      dismissible
      onDismiss={() => setVisible(false)}
    >
      This alert can be dismissed by clicking the X button.
    </Alert>
  )
}
```

## Variants
The Alert component supports five semantic variants:

```typescript
<Alert variant="info">Information message</Alert>
<Alert variant="success">Success message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="error">Error message</Alert>
<Alert variant="neutral">Neutral message</Alert>
```

## Sizes
Three size variants are available:

```typescript
<Alert size="sm" variant="info">Small alert</Alert>
<Alert size="md" variant="info">Medium alert</Alert>
<Alert size="lg" variant="info">Large alert</Alert>
```

## With Custom Icons
Override default icons with custom ones:

```typescript
import { Alert } from '@nebula/components'
import { Rocket } from 'lucide-preact'

function CustomIconAlert() {
  return (
    <Alert 
      variant="info"
      icon={<Rocket size={20} />}
    >
      Launch sequence initiated!
    </Alert>
  )
}
```

## Interactive Alerts
Add custom actions to alerts:

```typescript
import { Alert, Button } from '@nebula/components'

function InteractiveAlert() {
  return (
    <Alert 
      variant="warning"
      title="Update Available"
      actions={[
        <Button size="sm" variant="outline">
          Remind Later
        </Button>,
        <Button size="sm" variant="primary">
          Update Now
        </Button>
      ]}
    >
      A new version of the application is available.
    </Alert>
  )
}
```

## Alert States
Different states for various use cases:

```typescript
// Loading state
<Alert variant="info" loading>
  Processing your request...
</Alert>

// With progress
<Alert variant="info" progress={75}>
  Upload in progress: 75% complete
</Alert>

// Persistent alert
<Alert variant="error" persistent>
  This alert cannot be dismissed
</Alert>
```

## Form Validation
Use alerts for form validation feedback:

```typescript
import { Alert, Input, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function FormWithValidation() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const handleSubmit = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      setSuccess('')
    } else {
      setSuccess('Email validated successfully!')
      setError('')
    }
  }
  
  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="error" dismissible onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" dismissible onDismiss={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      
      <Input
        type="email"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        placeholder="Enter email"
      />
      
      <Button onClick={handleSubmit}>Validate</Button>
    </div>
  )
}
```

## Props Reference

| Prop          | Type                                                       | Default   | Description                                |
| ------------- | ---------------------------------------------------------- | --------- | ------------------------------------------ |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'info'`  | Visual style variant                       |
| `size`        | `'sm' \| 'md' \| 'lg'`                                     | `'md'`    | Size of the alert                          |
| `title`       | `string`                                                   | -         | Optional title text                        |
| `children`    | `ComponentChild`                                           | -         | Alert message content                      |
| `icon`        | `ComponentChild`                                           | -         | Custom icon (overrides default)            |
| `dismissible` | `boolean`                                                  | `false`   | Whether the alert can be dismissed         |
| `onDismiss`   | `() => void`                                               | -         | Callback when alert is dismissed           |
| `actions`     | `ComponentChild[]`                                         | -         | Array of action buttons                    |
| `loading`     | `boolean`                                                  | `false`   | Whether to show loading state              |
| `progress`    | `number`                                                   | -         | Progress percentage (0-100)                |
| `persistent`  | `boolean`                                                  | `false`   | Whether alert persists across page reloads |
| `className`   | `string`                                                   | -         | Additional CSS classes                     |
| `role`        | `string`                                                   | `'alert'` | ARIA role                                  |
| `ariaLabel`   | `string`                                                   | -         | ARIA label for accessibility               |

## Accessibility
The Alert component provides comprehensive accessibility support:

- **ARIA Roles**: Uses appropriate `alert`, `alertdialog`, or `status` roles
- **ARIA Labels**: Proper `aria-label` and `aria-describedby` attributes  
- **Live Regions**: Automatic screen reader announcements for dynamic alerts
- **Keyboard Navigation**: Focus management for interactive elements
- **Color Contrast**: High contrast ratios for all variants
- **Focus Management**: Proper focus trapping in modal-style alerts
- **Screen Readers**: Compatible with JAWS, NVDA, and VoiceOver

## Examples

### Multi-step Process
```typescript
import { Alert, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function MultiStepProcess() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33)
  
  return (
    <div className="space-y-4">
      <Alert 
        variant="info" 
        progress={progress}
        title={`Step ${step} of 3`}
      >
        {step === 1 && "Enter your personal information"}
        {step === 2 && "Review your details"}
        {step === 3 && "Confirm and submit"}
      </Alert>
      
      <div className="flex gap-2">
        <Button 
          onClick={() => {
            setStep(step + 1)
            setProgress(step * 33.33)
          }}
          disabled={step === 3}
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}
```

### Error Boundary
```typescript
import { Alert, Button } from '@nebula/components'
import { Component } from 'preact'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <Alert 
          variant="error"
          title="Something went wrong"
          actions={[
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          ]}
        >
          An unexpected error occurred. Please try refreshing the page.
        </Alert>
      )
    }
    
    return this.props.children
  }
}
```

### Notification System
```typescript
import { Alert } from '@nebula/components'
import { useState, useEffect } from 'preact/hooks'

interface Notification {
  id: string
  variant: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message: string
  duration?: number
}

function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { ...notification, id }])
    
    // Auto-dismiss after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }
  
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 max-w-md">
      {notifications.map(notification => (
        <Alert
          key={notification.id}
          variant={notification.variant}
          title={notification.title}
          dismissible
          onDismiss={() => removeNotification(notification.id)}
        >
          {notification.message}
        </Alert>
      ))}
    </div>
  )
}
```
