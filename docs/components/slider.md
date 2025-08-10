# Slider Component Documentation

## Overview
The Slider component provides an interactive range selector for numeric input with visual feedback. It supports single and dual handle configurations, custom marks, vertical/horizontal orientations, and comprehensive accessibility features for precise value selection.

## Features
- **Single & Dual Handles**: Single value selection or range selection
- **Orientation**: Horizontal and vertical layout options
- **Custom Marks**: Step indicators with labels and tooltips
- **Size Variants**: Small (sm), Medium (md), Large (lg), Extra Large (xl)
- **Value Display**: Show current values with custom formatting
- **Stepped Input**: Define custom step increments and constraints
- **Accessibility**: Full keyboard navigation and screen reader support
- **Animation**: Smooth handle transitions and hover effects
- **Validation**: Form integration with error states

## Basic Usage
Simple slider with single handle:

```typescript
import { Slider } from '@nebula/components'

function BasicSlider() {
  const [value, setValue] = useState(50)

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Volume: {value}%</label>
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}
```

## Range Selection
Dual handle slider for selecting ranges:

```typescript
import { Slider } from '@nebula/components'

function RangeSlider() {
  const [range, setRange] = useState([25, 75])

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Price Range: ${range[0]} - ${range[1]}
      </label>
      <Slider
        value={range}
        onChange={setRange}
        min={0}
        max={1000}
        step={25}
        range
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>${0}</span>
        <span>${1000}</span>
      </div>
    </div>
  )
}
```

## Size Variants
Slider supports multiple size variants:

```typescript
import { Slider } from '@nebula/components'

function SizedSliders() {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <Slider size="sm" value={30} min={0} max={100} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Medium (Default)</label>
        <Slider size="md" value={50} min={0} max={100} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <Slider size="lg" value={70} min={0} max={100} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Extra Large</label>
        <Slider size="xl" value={90} min={0} max={100} />
      </div>
    </div>
  )
}
```

## Step Marks
Add visual indicators and labels at specific points:

```typescript
import { Slider } from '@nebula/components'

function MarkedSlider() {
  const [value, setValue] = useState(50)

  const marks = {
    0: '0°C',
    20: '20°C',
    40: '40°C',
    60: '60°C',
    80: '80°C',
    100: '100°C'
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Temperature: {value}°C
      </label>
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={10}
        marks={marks}
        included={false}
      />
    </div>
  )
}
```

## Vertical Orientation
Create vertical sliders for space-constrained layouts:

```typescript
import { Slider } from '@nebula/components'

function VerticalSliders() {
  const [bass, setBass] = useState(50)
  const [mid, setMid] = useState(60)
  const [treble, setTreble] = useState(40)

  return (
    <div className="flex space-x-8 h-64">
      <div className="flex flex-col items-center space-y-2">
        <label className="text-sm font-medium">Bass</label>
        <Slider
          value={bass}
          onChange={setBass}
          min={0}
          max={100}
          vertical
          className="h-48"
        />
        <span className="text-xs text-gray-600">{bass}%</span>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <label className="text-sm font-medium">Mid</label>
        <Slider
          value={mid}
          onChange={setMid}
          min={0}
          max={100}
          vertical
          className="h-48"
        />
        <span className="text-xs text-gray-600">{mid}%</span>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <label className="text-sm font-medium">Treble</label>
        <Slider
          value={treble}
          onChange={setTreble}
          min={0}
          max={100}
          vertical
          className="h-48"
        />
        <span className="text-xs text-gray-600">{treble}%</span>
      </div>
    </div>
  )
}
```

## Custom Formatting
Display values with custom formatting and tooltips:

```typescript
import { Slider } from '@nebula/components'

function FormattedSlider() {
  const [value, setValue] = useState(1024)

  const formatValue = (val) => {
    if (val >= 1024 * 1024) {
      return `${(val / (1024 * 1024)).toFixed(1)}GB`
    } else if (val >= 1024) {
      return `${(val / 1024).toFixed(1)}MB`
    }
    return `${val}KB`
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        File Size Limit: {formatValue(value)}
      </label>
      <Slider
        value={value}
        onChange={setValue}
        min={512}
        max={1024 * 1024 * 2}
        step={512}
        tooltip={{
          formatter: formatValue,
          placement: 'top'
        }}
      />
    </div>
  )
}
```

## Disabled States
Show disabled slider variations:

```typescript
import { Slider } from '@nebula/components'

function DisabledSliders() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Single Value (Disabled)
        </label>
        <Slider value={30} disabled />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Range (Disabled)
        </label>
        <Slider value={[20, 80]} range disabled />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          With Marks (Disabled)
        </label>
        <Slider 
          value={50}
          disabled
          marks={{ 0: '0', 50: '50', 100: '100' }}
        />
      </div>
    </div>
  )
}
```

## Form Integration
Integrate slider with form validation:

```typescript
import { Slider, FieldError } from '@nebula/components'

function SliderForm() {
  const [formData, setFormData] = useState({
    budget: [1000, 5000],
    experience: 0
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!formData.experience) {
      newErrors.experience = 'Please indicate your experience level'
    }
    
    if (formData.budget[1] - formData.budget[0] < 500) {
      newErrors.budget = 'Budget range must be at least $500'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    console.log('Submitting:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Budget Range: ${formData.budget[0]} - ${formData.budget[1]}
        </label>
        <Slider
          value={formData.budget}
          onChange={(value) => setFormData({ ...formData, budget: value })}
          min={500}
          max={10000}
          step={100}
          range
          error={!!errors.budget}
        />
        {errors.budget && <FieldError message={errors.budget} />}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Experience Level: {formData.experience || 'Not selected'}
        </label>
        <Slider
          value={formData.experience}
          onChange={(value) => setFormData({ ...formData, experience: value })}
          min={0}
          max={10}
          marks={{
            0: 'Beginner',
            3: 'Intermediate', 
            6: 'Advanced',
            10: 'Expert'
          }}
          error={!!errors.experience}
        />
        {errors.experience && <FieldError message={errors.experience} />}
      </div>
      
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Submit Preferences
      </button>
    </form>
  )
}
```

## Color Customization
Apply different color schemes:

```typescript
import { Slider } from '@nebula/components'

function ColoredSliders() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Default (Blue)</label>
        <Slider value={40} color="blue" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Success (Green)</label>
        <Slider value={60} color="green" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Warning (Yellow)</label>
        <Slider value={80} color="yellow" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Danger (Red)</label>
        <Slider value={90} color="red" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Purple</label>
        <Slider value={50} color="purple" />
      </div>
    </div>
  )
}
```

## Audio Equalizer
Complete audio control interface:

```typescript
import { Slider } from '@nebula/components'

function AudioEqualizer() {
  const [settings, setSettings] = useState({
    volume: 75,
    bass: 50,
    mid: 45,
    treble: 60,
    balance: 0
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md">
      <h3 className="text-lg font-semibold mb-6">Audio Settings</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Volume: {settings.volume}%
          </label>
          <Slider
            value={settings.volume}
            onChange={(value) => updateSetting('volume', value)}
            min={0}
            max={100}
            color="blue"
            className="slider-dark"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium">Bass</label>
            <Slider
              value={settings.bass}
              onChange={(value) => updateSetting('bass', value)}
              min={0}
              max={100}
              vertical
              color="green"
              className="h-32"
            />
            <span className="text-xs">{settings.bass}%</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium">Mid</label>
            <Slider
              value={settings.mid}
              onChange={(value) => updateSetting('mid', value)}
              min={0}
              max={100}
              vertical
              color="yellow"
              className="h-32"
            />
            <span className="text-xs">{settings.mid}%</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium">Treble</label>
            <Slider
              value={settings.treble}
              onChange={(value) => updateSetting('treble', value)}
              min={0}
              max={100}
              vertical
              color="red"
              className="h-32"
            />
            <span className="text-xs">{settings.treble}%</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Balance: {settings.balance > 0 ? `R${settings.balance}` : 
                      settings.balance < 0 ? `L${Math.abs(settings.balance)}` : 'Center'}
          </label>
          <Slider
            value={settings.balance}
            onChange={(value) => updateSetting('balance', value)}
            min={-100}
            max={100}
            step={5}
            marks={{ '-100': 'L', '0': 'C', '100': 'R' }}
            color="purple"
          />
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
          Apply Settings
        </button>
      </div>
    </div>
  )
}
```

## Performance Monitoring
Real-time performance dashboard:

```typescript
import { Slider } from '@nebula/components'

function PerformanceDashboard() {
  const [thresholds, setThresholds] = useState({
    cpu: [20, 80],
    memory: [30, 85],
    disk: [40, 90],
    network: [50, 95]
  })

  const updateThreshold = (metric, value) => {
    setThresholds(prev => ({ ...prev, [metric]: value }))
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold">Performance Thresholds</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              CPU Usage Alert: {thresholds.cpu[0]}% - {thresholds.cpu[1]}%
            </label>
            <Slider
              value={thresholds.cpu}
              onChange={(value) => updateThreshold('cpu', value)}
              min={0}
              max={100}
              range
              color="blue"
              marks={{ 0: '0%', 50: '50%', 100: '100%' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Memory Usage Alert: {thresholds.memory[0]}% - {thresholds.memory[1]}%
            </label>
            <Slider
              value={thresholds.memory}
              onChange={(value) => updateThreshold('memory', value)}
              min={0}
              max={100}
              range
              color="green"
              marks={{ 0: '0%', 50: '50%', 100: '100%' }}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Disk Usage Alert: {thresholds.disk[0]}% - {thresholds.disk[1]}%
            </label>
            <Slider
              value={thresholds.disk}
              onChange={(value) => updateThreshold('disk', value)}
              min={0}
              max={100}
              range
              color="yellow"
              marks={{ 0: '0%', 50: '50%', 100: '100%' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Network Usage Alert: {thresholds.network[0]}% - {thresholds.network[1]}%
            </label>
            <Slider
              value={thresholds.network}
              onChange={(value) => updateThreshold('network', value)}
              min={0}
              max={100}
              range
              color="red"
              marks={{ 0: '0%', 50: '50%', 100: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Props Reference

### Slider Props

| Prop               | Type                                                 | Default  | Description                              |
| ------------------ | ---------------------------------------------------- | -------- | ---------------------------------------- |
| `value`            | `number \| number[]`                                 | `0`      | Current slider value(s)                  |
| `defaultValue`     | `number \| number[]`                                 | `0`      | Default value (uncontrolled)             |
| `onChange`         | `(value: number \| number[]) => void`                | -        | Called when value changes                |
| `onChangeComplete` | `(value: number \| number[]) => void`                | -        | Called when change is complete           |
| `min`              | `number`                                             | `0`      | Minimum value                            |
| `max`              | `number`                                             | `100`    | Maximum value                            |
| `step`             | `number`                                             | `1`      | Step increment                           |
| `range`            | `boolean`                                            | `false`  | Whether to use dual handles              |
| `vertical`         | `boolean`                                            | `false`  | Vertical orientation                     |
| `size`             | `'sm' \| 'md' \| 'lg' \| 'xl'`                       | `'md'`   | Size variant                             |
| `disabled`         | `boolean`                                            | `false`  | Whether slider is disabled               |
| `readOnly`         | `boolean`                                            | `false`  | Whether slider is read-only              |
| `error`            | `boolean`                                            | `false`  | Whether to show error state              |
| `color`            | `'blue' \| 'green' \| 'yellow' \| 'red' \| 'purple'` | `'blue'` | Color theme                              |
| `marks`            | `Record<number, ReactNode>`                          | -        | Step marks with labels                   |
| `included`         | `boolean`                                            | `true`   | Whether to include range between handles |
| `tooltip`          | `TooltipConfig`                                      | -        | Tooltip configuration                    |
| `trackStyle`       | `CSSProperties`                                      | -        | Track styling                            |
| `railStyle`        | `CSSProperties`                                      | -        | Rail styling                             |
| `handleStyle`      | `CSSProperties`                                      | -        | Handle styling                           |
| `activeDotStyle`   | `CSSProperties`                                      | -        | Active dot styling                       |
| `dotStyle`         | `CSSProperties`                                      | -        | Dot styling                              |
| `className`        | `string`                                             | -        | Additional CSS classes                   |
| `style`            | `CSSProperties`                                      | -        | Inline styles                            |

### Tooltip Configuration

| Prop        | Type                           | Default | Description                       |
| ----------- | ------------------------------ | ------- | --------------------------------- |
| `open`      | `boolean`                      | -       | Whether tooltip is always visible |
| `placement` | `'top' \| 'bottom'`            | `'top'` | Tooltip placement                 |
| `formatter` | `(value: number) => ReactNode` | -       | Value formatting function         |
| `prefixCls` | `string`                       | -       | CSS prefix for tooltip            |

### Slider Events

| Event              | Parameters                    | Description               |
| ------------------ | ----------------------------- | ------------------------- |
| `onChange`         | `(value: number \| number[])` | Value changed during drag |
| `onChangeComplete` | `(value: number \| number[])` | Value change completed    |
| `onFocus`          | `(event: FocusEvent)`         | Slider handle focused     |
| `onBlur`           | `(event: FocusEvent)`         | Slider handle blurred     |

## Accessibility

The Slider component provides comprehensive accessibility support:

- **ARIA Roles**: Uses `slider` role with proper orientation
- **Keyboard Navigation**: Arrow keys, Page Up/Down, Home/End support
- **Screen Reader Support**: Announces current values and ranges
- **Focus Management**: Visible focus indicators for all handles
- **Labels**: Supports `aria-label`, `aria-labelledby`, and `aria-describedby`
- **Value Ranges**: Properly announces min, max, and current values
- **Step Announcements**: Announces step increments and marks
- **High Contrast**: Ensures visibility in high contrast mode

### Keyboard Shortcuts

| Key               | Action                                  |
| ----------------- | --------------------------------------- |
| `Arrow Right/Up`  | Increase value by step                  |
| `Arrow Left/Down` | Decrease value by step                  |
| `Page Up`         | Increase value by large step (10x step) |
| `Page Down`       | Decrease value by large step (10x step) |
| `Home`            | Set to minimum value                    |
| `End`             | Set to maximum value                    |
| `Tab`             | Move to next handle (in range mode)     |
| `Shift + Tab`     | Move to previous handle (in range mode) |

## Best Practices

### Value Selection
- Use appropriate min/max ranges for your use case
- Choose step sizes that make sense for the data type
- Provide clear labels and value displays
- Consider using marks for important reference points

### User Experience
- Show current values and their meanings
- Use tooltips for immediate feedback during interaction
- Apply consistent color schemes across your application
- Consider vertical orientation for space-constrained layouts

### Performance
- Avoid too many marks or complex custom formatting
- Use `onChangeComplete` for expensive operations
- Consider debouncing for real-time API calls
- Test with various step sizes and ranges

### Accessibility
- Always provide meaningful labels
- Test with keyboard navigation
- Ensure sufficient color contrast for all states
- Use appropriate ARIA attributes for complex sliders

## Examples

The Slider component enables precise numeric input across various contexts, from simple value selection to complex multi-parameter configuration interfaces, with full accessibility and customization support.
