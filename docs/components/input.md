# Input Component Documentation

## Overview
The Input component is a fundamental form control that provides text input functionality with comprehensive styling, validation, and accessibility features. It supports multiple input types, sizes, variants, and states to accommodate various use cases.

## Features
- **Multiple Types**: Support for text, email, password, number, url, tel, and search inputs
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Visual Variants**: Default, filled, bordered, and borderless styles  
- **Icon Integration**: Left and right icon placement with proper spacing
- **State Management**: Normal, disabled, error, success, and loading states
- **Accessibility**: Full ARIA compliance with proper labeling and keyboard navigation
- **Dark Mode**: Complete dark theme support
- **TypeScript**: Fully typed with comprehensive interface definitions

## Basic Usage

### Simple Input
```typescript
import { Input } from '@nebula/components'

function MyForm() {
  return <Input placeholder="Enter your name..." />
}
```

### Controlled Input
```typescript
import { Input } from '@nebula/components'
import { useState } from 'preact/hooks'

function ControlledInput() {
  const [value, setValue] = useState('')
  
  return (
    <Input 
      value={value}
      onInput={(e) => setValue((e.target as HTMLInputElement).value)}
      placeholder="Controlled input"
    />
  )
}
```

### With Label
```typescript
import { Input, Label } from '@nebula/components'

function LabeledInput() {
  return (
    <div>
      <Label htmlFor="email">Email Address</Label>
      <Input 
        id="email"
        type="email" 
        placeholder="user@example.com" 
      />
    </div>
  )
}
```

## Sizes
The Input component supports three sizes:

```typescript
<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />  
<Input size="lg" placeholder="Large input" />
```

## Variants
Different visual styles for various design needs:

```typescript
<Input variant="default" placeholder="Default style" />
<Input variant="filled" placeholder="Filled background" />
<Input variant="bordered" placeholder="Prominent border" />
<Input variant="borderless" placeholder="No border" />
```

## Input Types
Support for all standard HTML input types:

```typescript
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="url" placeholder="URL input" />
<Input type="tel" placeholder="Phone input" />
<Input type="search" placeholder="Search input" />
```

## With Icons
Enhance inputs with left or right icons:

```typescript
import { Input } from '@nebula/components'
import { Search, User } from 'lucide-preact'

function IconInputs() {
  return (
    <>
      <Input 
        leftIcon={<Search size={18} />}
        placeholder="Search..." 
      />
      <Input 
        rightIcon={<User size={18} />}
        placeholder="Username" 
      />
    </>
  )
}
```

## States
Different states for user feedback:

```typescript
<Input placeholder="Normal state" />
<Input disabled placeholder="Disabled state" />
<Input error placeholder="Error state" />
<Input success placeholder="Success state" />
<Input loading placeholder="Loading state" />
```

## Validation
Built-in validation support:

```typescript
import { Input } from '@nebula/components'
import { useState } from 'preact/hooks'

function ValidatedInput() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  
  const validateEmail = (value: string) => {
    if (!value.includes('@')) {
      setError('Please enter a valid email')
    } else {
      setError('')
    }
  }
  
  return (
    <Input
      type="email"
      value={email}
      error={!!error}
      onInput={(e) => {
        const value = (e.target as HTMLInputElement).value
        setEmail(value)
        validateEmail(value)
      }}
      placeholder="Enter email"
    />
  )
}
```

## Props Reference

| Prop           | Type                                                  | Default     | Description                          |
| -------------- | ----------------------------------------------------- | ----------- | ------------------------------------ |
| `size`         | `'sm' \| 'md' \| 'lg'`                                | `'md'`      | Size variant of the input            |
| `variant`      | `'default' \| 'filled' \| 'bordered' \| 'borderless'` | `'default'` | Visual style variant                 |
| `type`         | `InputHTMLAttributes['type']`                         | `'text'`    | HTML input type                      |
| `disabled`     | `boolean`                                             | `false`     | Whether the input is disabled        |
| `error`        | `boolean`                                             | `false`     | Whether to show error state          |
| `success`      | `boolean`                                             | `false`     | Whether to show success state        |
| `loading`      | `boolean`                                             | `false`     | Whether to show loading state        |
| `leftIcon`     | `ComponentChild`                                      | -           | Icon to display on the left side     |
| `rightIcon`    | `ComponentChild`                                      | -           | Icon to display on the right side    |
| `placeholder`  | `string`                                              | -           | Placeholder text                     |
| `value`        | `string`                                              | -           | Controlled value                     |
| `defaultValue` | `string`                                              | -           | Default value for uncontrolled usage |
| `onInput`      | `(e: Event) => void`                                  | -           | Input event handler                  |
| `onChange`     | `(e: Event) => void`                                  | -           | Change event handler                 |
| `onFocus`      | `(e: FocusEvent) => void`                             | -           | Focus event handler                  |
| `onBlur`       | `(e: FocusEvent) => void`                             | -           | Blur event handler                   |
| `className`    | `string`                                              | -           | Additional CSS classes               |
| `id`           | `string`                                              | -           | HTML id attribute                    |
| `name`         | `string`                                              | -           | HTML name attribute                  |
| `required`     | `boolean`                                             | `false`     | Whether the input is required        |
| `readonly`     | `boolean`                                             | `false`     | Whether the input is readonly        |
| `autoFocus`    | `boolean`                                             | `false`     | Whether to auto-focus on mount       |
| `autoComplete` | `string`                                              | -           | HTML autocomplete attribute          |

## Accessibility
The Input component provides comprehensive accessibility support:

- **ARIA Labels**: Proper `aria-label` and `aria-describedby` attributes
- **Error States**: `aria-invalid` when in error state
- **Required Fields**: `aria-required` for required inputs
- **Keyboard Navigation**: Full keyboard support with Tab and Enter keys
- **Screen Readers**: Compatible with all major screen readers
- **Focus Management**: Visible focus indicators and proper focus order
- **High Contrast**: Support for high contrast mode

## Examples

### Form with Validation
```typescript
import { Input, Label, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  
  return (
    <form className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          error={errors.name}
          onInput={(e) => setFormData({
            ...formData, 
            name: (e.target as HTMLInputElement).value
          })}
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          error={errors.email}
          onInput={(e) => setFormData({
            ...formData, 
            email: (e.target as HTMLInputElement).value
          })}
          placeholder="user@example.com"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onInput={(e) => setFormData({
            ...formData, 
            phone: (e.target as HTMLInputElement).value
          })}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <Button type="submit" size="lg" className="w-full">
        Submit
      </Button>
    </form>
  )
}
```

### Search Input with Icon
```typescript
import { Input } from '@nebula/components'
import { Search } from 'lucide-preact'
import { useState } from 'preact/hooks'

function SearchBox() {
  const [query, setQuery] = useState('')
  
  return (
    <Input
      leftIcon={<Search size={18} />}
      value={query}
      onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      placeholder="Search products..."
      size="lg"
      className="max-w-md"
    />
  )
}
```
