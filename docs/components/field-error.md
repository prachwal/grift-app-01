# FieldError Documentation

The FieldError component displays validation error messages in forms with proper accessibility support and styling.

## Features

- **Automatic Display**: Only shows when error exists
- **Accessibility**: Includes ARIA attributes for screen readers
- **Consistent Styling**: Matches form design system
- **TypeScript Support**: Full type safety

## Basic Usage

```tsx
import { FieldError, Input } from '@nebula-ui/components'

function FormField({ error }) {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <Input 
        id="email" 
        type="email"
        error={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      <FieldError id="email-error">
        {error}
      </FieldError>
    </div>
  )
}
```

## With Form Validation

```tsx
import { FieldError, Input, Button } from '@nebula-ui/components'
import { useState } from 'react'

function ContactForm() {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({ email: '' })

  const validate = () => {
    const newErrors = {}
    if (!values.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <form>
      <div>
        <label htmlFor="email">Email *</label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues({...values, email: e.target.value})}
          error={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        <FieldError id="email-error">
          {errors.email}
        </FieldError>
      </div>
      <Button onClick={validate}>Submit</Button>
    </form>
  )
}
```

## Props

| Prop          | Type        | Default | Description                |
| ------------- | ----------- | ------- | -------------------------- |
| `id`          | `string`    | -       | Unique identifier for ARIA |
| `children`    | `ReactNode` | -       | Error message content      |
| `className`   | `string`    | -       | Additional CSS classes     |
| `data-testid` | `string`    | -       | Test identifier            |

## Accessibility

- Uses `role="alert"` for screen reader announcements
- Should be linked to form fields via `aria-describedby`
- Only renders when error message exists
- Supports keyboard navigation patterns
