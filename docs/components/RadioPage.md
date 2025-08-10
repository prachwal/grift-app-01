# Radio Documentation

The Radio component provides single-selection radio buttons with proper accessibility and form integration.

## Features

- **Single Selection**: Only one option can be selected at a time
- **Accessibility**: Full screen reader and keyboard support
- **Form Integration**: Works with form libraries and validation
- **Customizable**: Multiple sizes and styling options
- **Group Management**: Automatic grouping and state management

## Basic Usage

```tsx
import { Radio, RadioGroup } from '@nebula-ui/components'

function BasicRadio() {
  const [value, setValue] = useState('option1')

  return (
    <RadioGroup value={value} onChange={setValue}>
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3">Option 3</Radio>
    </RadioGroup>
  )
}
```

## Size Variants

```tsx
import { Radio, RadioGroup } from '@nebula-ui/components'

function RadioSizes() {
  return (
    <div className="space-y-4">
      <RadioGroup size="sm">
        <Radio value="small1">Small Radio 1</Radio>
        <Radio value="small2">Small Radio 2</Radio>
      </RadioGroup>
      
      <RadioGroup size="md">
        <Radio value="medium1">Medium Radio 1</Radio>
        <Radio value="medium2">Medium Radio 2</Radio>
      </RadioGroup>
      
      <RadioGroup size="lg">
        <Radio value="large1">Large Radio 1</Radio>
        <Radio value="large2">Large Radio 2</Radio>
      </RadioGroup>
    </div>
  )
}
```

## Disabled State

```tsx
import { Radio, RadioGroup } from '@nebula-ui/components'

function DisabledRadio() {
  return (
    <RadioGroup>
      <Radio value="enabled">Enabled Option</Radio>
      <Radio value="disabled" disabled>Disabled Option</Radio>
      <Radio value="enabled2">Another Enabled Option</Radio>
    </RadioGroup>
  )
}
```

## With Labels and Descriptions

```tsx
import { Radio, RadioGroup, Label } from '@nebula-ui/components'

function RadioWithLabels() {
  return (
    <fieldset>
      <legend>
        <Label>Choose your plan</Label>
      </legend>
      <RadioGroup>
        <div>
          <Radio value="basic" id="plan-basic" />
          <label htmlFor="plan-basic">
            <strong>Basic Plan</strong>
            <p>$9/month - Essential features</p>
          </label>
        </div>
        
        <div>
          <Radio value="pro" id="plan-pro" />
          <label htmlFor="plan-pro">
            <strong>Pro Plan</strong>
            <p>$19/month - Advanced features</p>
          </label>
        </div>
        
        <div>
          <Radio value="enterprise" id="plan-enterprise" />
          <label htmlFor="plan-enterprise">
            <strong>Enterprise Plan</strong>
            <p>$49/month - All features</p>
          </label>
        </div>
      </RadioGroup>
    </fieldset>
  )
}
```

## Form Integration

```tsx
import { Radio, RadioGroup, Button, FieldError } from '@nebula-ui/components'
import { useState } from 'react'

function RadioForm() {
  const [selectedValue, setSelectedValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedValue) {
      setError('Please select an option')
      return
    }
    setError('')
    console.log('Selected:', selectedValue)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Select your preference *</legend>
        <RadioGroup
          value={selectedValue}
          onChange={setSelectedValue}
          aria-invalid={!!error}
          aria-describedby={error ? 'radio-error' : undefined}
        >
          <Radio value="option1">Email notifications</Radio>
          <Radio value="option2">SMS notifications</Radio>
          <Radio value="option3">No notifications</Radio>
        </RadioGroup>
        <FieldError id="radio-error">
          {error}
        </FieldError>
      </fieldset>
      <Button type="submit">Save Preferences</Button>
    </form>
  )
}
```

## Props

### Radio Props

| Prop        | Type                         | Default | Description                     |
| ----------- | ---------------------------- | ------- | ------------------------------- |
| `value`     | `string`                     | -       | The value of this radio option  |
| `checked`   | `boolean`                    | -       | Whether the radio is checked    |
| `disabled`  | `boolean`                    | `false` | Whether the radio is disabled   |
| `size`      | `'sm' \| 'md' \| 'lg'`       | `'md'`  | Size of the radio button        |
| `onChange`  | `(checked: boolean) => void` | -       | Called when radio state changes |
| `children`  | `ReactNode`                  | -       | Label content                   |
| `className` | `string`                     | -       | Additional CSS classes          |

### RadioGroup Props

| Prop        | Type                      | Default | Description                        |
| ----------- | ------------------------- | ------- | ---------------------------------- |
| `value`     | `string`                  | -       | Currently selected value           |
| `onChange`  | `(value: string) => void` | -       | Called when selection changes      |
| `name`      | `string`                  | -       | Name attribute for form submission |
| `disabled`  | `boolean`                 | `false` | Disable all radio options          |
| `size`      | `'sm' \| 'md' \| 'lg'`    | `'md'`  | Size for all radio buttons         |
| `children`  | `ReactNode`               | -       | Radio components                   |
| `className` | `string`                  | -       | Additional CSS classes             |

## Accessibility

- Uses native HTML radio inputs for full accessibility
- Supports keyboard navigation (arrow keys within group)
- Screen reader compatible with proper labeling
- Follows ARIA guidelines for radio groups
- Supports focus management and indicators

## Best Practices

- Always use RadioGroup to manage related radio buttons
- Provide clear, descriptive labels
- Use fieldset and legend for grouped radios
- Include validation feedback for required selections
- Consider using Radio.Button for button-style radio groups
- Test keyboard navigation and screen reader compatibility
