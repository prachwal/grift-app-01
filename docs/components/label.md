# Label Documentation

The Label component provides accessible form labeling with proper semantic HTML and styling consistency.

## Features

- **Semantic HTML**: Uses proper `<label>` elements
- **Accessibility**: Full screen reader support
- **Required Indicator**: Optional asterisk for required fields
- **Flexible Sizing**: Multiple size variants
- **Theme Support**: Automatic dark mode adaptation

## Basic Usage

```tsx
import { Label, Input } from '@nebula-ui/components'

function FormField() {
  return (
    <div>
      <Label htmlFor="username" required>
        Username
      </Label>
      <Input id="username" type="text" />
    </div>
  )
}
```

## Size Variants

```tsx
import { Label } from '@nebula-ui/components'

function LabelSizes() {
  return (
    <div className="space-y-4">
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label (default)</Label>
      <Label size="lg">Large Label</Label>
    </div>
  )
}
```

## Required Fields

```tsx
import { Label, Input, FieldError } from '@nebula-ui/components'

function RequiredField({ error }) {
  return (
    <div>
      <Label htmlFor="email" required>
        Email Address
      </Label>
      <Input 
        id="email" 
        type="email"
        error={!!error}
        aria-describedby={error ? 'email-error' : undefined}
        aria-required="true"
      />
      <FieldError id="email-error">
        {error}
      </FieldError>
    </div>
  )
}
```

## Disabled State

```tsx
import { Label, Input } from '@nebula-ui/components'

function DisabledField() {
  return (
    <div>
      <Label htmlFor="readonly" disabled>
        Read-only Field
      </Label>
      <Input id="readonly" disabled value="Cannot edit" />
    </div>
  )
}
```

## Props

| Prop        | Type                   | Default | Description                   |
| ----------- | ---------------------- | ------- | ----------------------------- |
| `htmlFor`   | `string`               | -       | ID of associated form control |
| `required`  | `boolean`              | `false` | Shows required asterisk       |
| `disabled`  | `boolean`              | `false` | Disabled styling              |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`  | Label size                    |
| `children`  | `ReactNode`            | -       | Label content                 |
| `className` | `string`               | -       | Additional CSS classes        |

## Best Practices

- Always use `htmlFor` to associate with form controls
- Use `required` prop for required fields instead of manual asterisks
- Match label size with associated input size
- Provide clear, concise label text
- Use proper semantic structure for form accessibility
