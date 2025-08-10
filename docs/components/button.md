# Button Component Documentation

## Overview

The Button component is a versatile and accessible interactive element that supports multiple variants, sizes, and states. It's built with TypeScript and follows modern design principles.

## Features

- **Multiple Variants**: Primary, Secondary, Outline, Ghost, Destructive
- **Size Options**: Small, Medium, Large, Extra Large
- **Interactive States**: Normal, Disabled, Loading, Focus
- **Icon Support**: Leading and trailing icons
- **Full Width Option**: Expandable to container width
- **Accessibility**: ARIA compliant with keyboard navigation
- **TypeScript**: Full type safety and IntelliSense support

## Basic Usage

```typescript
import { Button } from '@nebula/components'

function MyComponent() {
  return (
    <Button variant="primary" size="md" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  )
}
```

## Variants

### Primary Button
```typescript
<Button variant="primary">Primary Action</Button>
```
The primary button is used for main actions and call-to-action elements.

### Secondary Button
```typescript
<Button variant="secondary">Secondary Action</Button>
```
Secondary buttons are used for less important actions.

### Outline Button
```typescript
<Button variant="outline">Outline Button</Button>
```
Outline buttons provide a subtle alternative to filled buttons.

### Ghost Button
```typescript
<Button variant="ghost">Ghost Button</Button>
```
Ghost buttons have minimal visual weight and are great for less prominent actions.

### Destructive Button
```typescript
<Button variant="destructive">Delete Item</Button>
```
Destructive buttons are used for actions that can't be undone, like deletions.

## Sizes

The Button component supports four sizes:

```typescript
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

## States

### Loading State
```typescript
<Button loading>Processing...</Button>
```

### Disabled State
```typescript
<Button disabled>Cannot Click</Button>
```

### Full Width
```typescript
<Button fullWidth>Full Width Button</Button>
```

## Icons

### Leading Icon
```typescript
<Button leadingIcon={<PlusIcon />}>
  Add Item
</Button>
```

### Trailing Icon
```typescript
<Button trailingIcon={<ArrowRightIcon />}>
  Next Step
</Button>
```

## Props Reference

| Prop           | Type                                                                | Default     | Description                     |
| -------------- | ------------------------------------------------------------------- | ----------- | ------------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Visual style variant            |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'xl'`                                      | `'md'`      | Button size                     |
| `disabled`     | `boolean`                                                           | `false`     | Whether the button is disabled  |
| `loading`      | `boolean`                                                           | `false`     | Whether to show loading state   |
| `fullWidth`    | `boolean`                                                           | `false`     | Whether to expand to full width |
| `leadingIcon`  | `ReactNode`                                                         | `undefined` | Icon before text                |
| `trailingIcon` | `ReactNode`                                                         | `undefined` | Icon after text                 |
| `onClick`      | `(event: MouseEvent) => void`                                       | `undefined` | Click handler                   |
| `type`         | `'button' \| 'submit' \| 'reset'`                                   | `'button'`  | HTML button type                |
| `className`    | `string`                                                            | `undefined` | Additional CSS classes          |

## Best Practices

1. **Use Primary Sparingly**: Only use primary buttons for the main action on a page
2. **Consistent Sizing**: Use the same size for buttons in the same context
3. **Loading States**: Always show loading state for async operations
4. **Accessible Labels**: Ensure button text clearly describes the action
5. **Icon Consistency**: Use icons consistently across your application

## Accessibility

The Button component includes:
- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader compatible states
- Semantic HTML structure

## Browser Support

The Button component is compatible with all modern browsers including:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- **IconButton**: For icon-only actions
- **ButtonGroup**: For grouping related buttons
- **Link**: For navigation actions
