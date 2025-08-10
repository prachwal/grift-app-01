# Tooltip Component Documentation

## Overview
The Tooltip component provides contextual information when users hover over or focus on elements. It delivers helpful hints, descriptions, or additional details without cluttering the interface, featuring flexible positioning, customizable content, and comprehensive accessibility support.

## Features
- **Multiple Triggers**: Hover, focus, click, and manual trigger modes
- **Smart Positioning**: Auto-positioning with 12 placement options
- **Content Types**: Plain text, rich HTML, and custom React components
- **Interactive Content**: Support for clickable content within tooltips
- **Delay Controls**: Configurable show/hide delays for better UX
- **Accessibility**: Full ARIA compliance with proper roles and keyboard navigation
- **Portal Rendering**: Renders outside component tree to avoid z-index conflicts
- **Dark Mode**: Complete dark theme support with multiple color schemes

## Basic Usage

### Simple Text Tooltip
```typescript
import { Tooltip, Button } from '@nebula/components'

function SimpleTooltip() {
  return (
    <Tooltip content="This is a helpful tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  )
}
```

### Rich Content Tooltip
```typescript
import { Tooltip, Button } from '@nebula/components'

function RichTooltip() {
  return (
    <Tooltip 
      content={
        <div>
          <strong>Rich Tooltip</strong>
          <p className="text-sm mt-1">
            This tooltip contains <em>formatted</em> content.
          </p>
        </div>
      }
    >
      <Button>Rich content</Button>
    </Tooltip>
  )
}
```

### Component as Tooltip Content
```typescript
import { Tooltip, Button, Avatar } from '@nebula/components'

function ComponentTooltip() {
  const ProfileCard = () => (
    <div className="flex items-center gap-3 p-2">
      <Avatar src="https://picsum.photos/40/40" size="sm" />
      <div>
        <div className="font-medium">John Doe</div>
        <div className="text-xs text-gray-500">Software Engineer</div>
      </div>
    </div>
  )
  
  return (
    <Tooltip content={<ProfileCard />} trigger="click">
      <Button>User Profile</Button>
    </Tooltip>
  )
}
```

## Positioning
The Tooltip supports 12 different placement positions:

```typescript
// Top positions
<Tooltip placement="top" content="Top center">
  <Button>Top</Button>
</Tooltip>

<Tooltip placement="top-start" content="Top left">
  <Button>Top Start</Button>
</Tooltip>

<Tooltip placement="top-end" content="Top right">
  <Button>Top End</Button>
</Tooltip>

// Right positions
<Tooltip placement="right" content="Right center">
  <Button>Right</Button>
</Tooltip>

<Tooltip placement="right-start" content="Right top">
  <Button>Right Start</Button>
</Tooltip>

<Tooltip placement="right-end" content="Right bottom">
  <Button>Right End</Button>
</Tooltip>

// Bottom positions (similar pattern)
<Tooltip placement="bottom" content="Bottom center">
  <Button>Bottom</Button>
</Tooltip>

// Left positions (similar pattern)
<Tooltip placement="left" content="Left center">
  <Button>Left</Button>
</Tooltip>
```

## Trigger Modes
Control when the tooltip appears:

```typescript
// Hover trigger (default)
<Tooltip trigger="hover" content="Appears on hover">
  <Button>Hover</Button>
</Tooltip>

// Focus trigger
<Tooltip trigger="focus" content="Appears on focus">
  <Input placeholder="Focus me" />
</Tooltip>

// Click trigger
<Tooltip trigger="click" content="Appears on click">
  <Button>Click me</Button>
</Tooltip>

// Manual control
function ManualTooltip() {
  const [visible, setVisible] = useState(false)
  
  return (
    <>
      <Tooltip 
        trigger="manual" 
        visible={visible}
        content="Manually controlled tooltip"
      >
        <Button>Manual</Button>
      </Tooltip>
      
      <Button onClick={() => setVisible(!visible)}>
        Toggle Tooltip
      </Button>
    </>
  )
}

// Multiple triggers
<Tooltip trigger={['hover', 'focus']} content="Hover or focus">
  <Input placeholder="Hover or focus me" />
</Tooltip>
```

## Delay and Timing
Configure appearance and disappearance timing:

```typescript
// Custom delays
<Tooltip 
  content="Custom timing" 
  showDelay={500}      // Wait 500ms before showing
  hideDelay={200}      // Wait 200ms before hiding
>
  <Button>Custom Timing</Button>
</Tooltip>

// No delay
<Tooltip 
  content="Instant tooltip" 
  showDelay={0}
  hideDelay={0}
>
  <Button>Instant</Button>
</Tooltip>

// Long delay for careful interactions
<Tooltip 
  content="Slow tooltip" 
  showDelay={1000}
  hideDelay={500}
>
  <Button>Slow</Button>
</Tooltip>
```

## Interactive Tooltips
Enable clickable content within tooltips:

```typescript
import { Tooltip, Button } from '@nebula/components'

function InteractiveTooltip() {
  return (
    <Tooltip 
      interactive
      trigger="click"
      content={
        <div className="p-2">
          <h4 className="font-medium mb-2">Actions</h4>
          <div className="space-y-2">
            <Button size="sm" className="w-full">Edit</Button>
            <Button size="sm" variant="danger" className="w-full">
              Delete
            </Button>
          </div>
        </div>
      }
    >
      <Button>Actions Menu</Button>
    </Tooltip>
  )
}
```

## Color Variants
Different color schemes for various contexts:

```typescript
// Default theme
<Tooltip content="Default tooltip">
  <Button>Default</Button>
</Tooltip>

// Dark theme
<Tooltip theme="dark" content="Dark tooltip">
  <Button>Dark</Button>
</Tooltip>

// Light theme
<Tooltip theme="light" content="Light tooltip">
  <Button>Light</Button>
</Tooltip>

// Colored themes
<Tooltip theme="primary" content="Primary tooltip">
  <Button>Primary</Button>
</Tooltip>

<Tooltip theme="success" content="Success tooltip">
  <Button>Success</Button>
</Tooltip>

<Tooltip theme="warning" content="Warning tooltip">
  <Button>Warning</Button>
</Tooltip>

<Tooltip theme="error" content="Error tooltip">
  <Button>Error</Button>
</Tooltip>
```

## Form Field Tooltips
Common pattern for form help text:

```typescript
import { Tooltip, Input, Label } from '@nebula/components'
import { HelpCircle } from 'lucide-preact'

function FormFieldTooltip() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="password">Password</Label>
        <Tooltip 
          content={
            <div>
              <strong>Password Requirements:</strong>
              <ul className="text-sm mt-1 space-y-1">
                <li>• At least 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One number</li>
                <li>• One special character</li>
              </ul>
            </div>
          }
          placement="right"
        >
          <HelpCircle size={16} className="text-gray-400 cursor-help" />
        </Tooltip>
      </div>
      <Input 
        id="password"
        type="password" 
        placeholder="Enter secure password" 
      />
    </div>
  )
}
```

## Disabled Elements
Handle tooltips on disabled elements:

```typescript
import { Tooltip, Button } from '@nebula/components'

function DisabledTooltip() {
  return (
    <Tooltip content="This button is currently disabled">
      {/* Wrap disabled elements in a span */}
      <span className="inline-block">
        <Button disabled style={{ pointerEvents: 'none' }}>
          Disabled Button
        </Button>
      </span>
    </Tooltip>
  )
}
```

## Custom Styling
Customize tooltip appearance:

```typescript
<Tooltip 
  content="Custom styled tooltip"
  className="custom-tooltip"
  arrowClassName="custom-arrow"
  contentClassName="custom-content"
>
  <Button>Custom Style</Button>
</Tooltip>

// CSS
/*
.custom-tooltip {
  --tooltip-bg: #1f2937;
  --tooltip-color: #f9fafb;
  --tooltip-border-radius: 8px;
}

.custom-content {
  padding: 12px 16px;
  font-size: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.custom-arrow {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
*/
```

## Props Reference

| Prop               | Type                                                                               | Default     | Description                            |
| ------------------ | ---------------------------------------------------------------------------------- | ----------- | -------------------------------------- |
| `children`         | `ComponentChild`                                                                   | -           | Element that triggers the tooltip      |
| `content`          | `ComponentChild \| string`                                                         | -           | Tooltip content                        |
| `placement`        | `TooltipPlacement`                                                                 | `'top'`     | Tooltip position                       |
| `trigger`          | `TooltipTrigger \| TooltipTrigger[]`                                               | `'hover'`   | How tooltip is triggered               |
| `visible`          | `boolean`                                                                          | -           | Manual visibility control              |
| `defaultVisible`   | `boolean`                                                                          | `false`     | Default visibility state               |
| `onVisibleChange`  | `(visible: boolean) => void`                                                       | -           | Visibility change callback             |
| `showDelay`        | `number`                                                                           | `100`       | Delay before showing (ms)              |
| `hideDelay`        | `number`                                                                           | `100`       | Delay before hiding (ms)               |
| `interactive`      | `boolean`                                                                          | `false`     | Whether tooltip content is interactive |
| `theme`            | `'default' \| 'dark' \| 'light' \| 'primary' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color theme                            |
| `disabled`         | `boolean`                                                                          | `false`     | Whether tooltip is disabled            |
| `arrow`            | `boolean`                                                                          | `true`      | Whether to show arrow                  |
| `offset`           | `[number, number]`                                                                 | `[0, 8]`    | Offset from trigger element            |
| `className`        | `string`                                                                           | -           | Additional CSS classes                 |
| `contentClassName` | `string`                                                                           | -           | Content area CSS classes               |
| `arrowClassName`   | `string`                                                                           | -           | Arrow CSS classes                      |
| `maxWidth`         | `number`                                                                           | `350`       | Maximum tooltip width                  |
| `zIndex`           | `number`                                                                           | `1000`      | Z-index value                          |

### Tooltip Placement Options
```typescript
type TooltipPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end' 
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
```

### Tooltip Trigger Options
```typescript
type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual'
```

## Accessibility
The Tooltip component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses `aria-describedby` to associate tooltip with trigger
- **Keyboard Navigation**: Supports focus-based triggers with proper keyboard handling
- **Screen Readers**: Tooltip content is announced when triggered
- **Focus Management**: Proper focus handling for interactive tooltips
- **ESC Key**: Closes tooltip when ESC is pressed (for click/manual triggers)
- **High Contrast**: Proper contrast ratios for all themes
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## Examples

### Status Indicators with Tooltips
```typescript
import { Tooltip, Badge } from '@nebula/components'
import { CheckCircle, XCircle, Clock } from 'lucide-preact'

function StatusIndicators() {
  const statuses = [
    { 
      icon: CheckCircle, 
      color: 'green', 
      tooltip: 'All systems operational' 
    },
    { 
      icon: Clock, 
      color: 'yellow', 
      tooltip: 'Maintenance in progress' 
    },
    { 
      icon: XCircle, 
      color: 'red', 
      tooltip: 'Service unavailable' 
    }
  ]
  
  return (
    <div className="flex gap-2">
      {statuses.map((status, index) => (
        <Tooltip key={index} content={status.tooltip}>
          <Badge variant={status.color}>
            <status.icon size={16} />
          </Badge>
        </Tooltip>
      ))}
    </div>
  )
}
```

### Truncated Text with Tooltip
```typescript
import { Tooltip } from '@nebula/components'

function TruncatedText({ text, maxLength = 50 }) {
  const shouldTruncate = text.length > maxLength
  const displayText = shouldTruncate 
    ? `${text.substring(0, maxLength)}...` 
    : text
  
  if (shouldTruncate) {
    return (
      <Tooltip content={text}>
        <span className="cursor-help">{displayText}</span>
      </Tooltip>
    )
  }
  
  return <span>{displayText}</span>
}

// Usage
function Example() {
  return (
    <TruncatedText 
      text="This is a very long text that will be truncated and show the full content in a tooltip when hovered"
      maxLength={30}
    />
  )
}
```
