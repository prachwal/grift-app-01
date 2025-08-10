# Switch Documentation

The Switch component provides an elegant toggle control for binary states, commonly used for settings and preferences.

## Features

- **Binary Toggle**: On/off states with smooth animations
- **Accessibility**: Full keyboard and screen reader support
- **Customizable**: Multiple sizes and styling options
- **Loading State**: Built-in loading indicator
- **Form Integration**: Works seamlessly with form libraries

## Basic Usage

```tsx
import { Switch } from '@nebula-ui/components'
import { useState } from 'react'

function BasicSwitch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex items-center space-x-3">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        id="notifications"
      />
      <label htmlFor="notifications">
        Enable notifications
      </label>
    </div>
  )
}
```

## Size Variants

```tsx
import { Switch } from '@nebula-ui/components'

function SwitchSizes() {
  const [states, setStates] = useState({
    small: false,
    medium: true,
    large: false
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Switch
          size="sm"
          checked={states.small}
          onChange={(checked) => setStates({...states, small: checked})}
          id="small-switch"
        />
        <label htmlFor="small-switch">Small Switch</label>
      </div>
      
      <div className="flex items-center space-x-3">
        <Switch
          size="md"
          checked={states.medium}
          onChange={(checked) => setStates({...states, medium: checked})}
          id="medium-switch"
        />
        <label htmlFor="medium-switch">Medium Switch (default)</label>
      </div>
      
      <div className="flex items-center space-x-3">
        <Switch
          size="lg"
          checked={states.large}
          onChange={(checked) => setStates({...states, large: checked})}
          id="large-switch"
        />
        <label htmlFor="large-switch">Large Switch</label>
      </div>
    </div>
  )
}
```

## Disabled and Loading States

```tsx
import { Switch } from '@nebula-ui/components'
import { useState } from 'react'

function SwitchStates() {
  const [loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const handleAsyncToggle = async (checked) => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEnabled(checked)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      {/* Disabled switch */}
      <div className="flex items-center space-x-3">
        <Switch disabled checked={false} id="disabled-off" />
        <label htmlFor="disabled-off">Disabled (off)</label>
      </div>

      <div className="flex items-center space-x-3">
        <Switch disabled checked={true} id="disabled-on" />
        <label htmlFor="disabled-on">Disabled (on)</label>
      </div>

      {/* Loading switch */}
      <div className="flex items-center space-x-3">
        <Switch
          checked={enabled}
          onChange={handleAsyncToggle}
          loading={loading}
          id="loading-switch"
        />
        <label htmlFor="loading-switch">
          {loading ? 'Saving...' : 'Auto-save'}
        </label>
      </div>
    </div>
  )
}
```

## With Labels and Descriptions

```tsx
import { Switch, Label } from '@nebula-ui/components'

function SwitchWithLabels() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="notifications-switch" className="font-medium">
              Push Notifications
            </Label>
            <p className="text-sm text-gray-600">
              Receive notifications about important updates
            </p>
          </div>
          <Switch
            id="notifications-switch"
            checked={settings.notifications}
            onChange={(checked) => updateSetting('notifications', checked)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode-switch" className="font-medium">
              Dark Mode
            </Label>
            <p className="text-sm text-gray-600">
              Use dark theme for better nighttime viewing
            </p>
          </div>
          <Switch
            id="dark-mode-switch"
            checked={settings.darkMode}
            onChange={(checked) => updateSetting('darkMode', checked)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-save-switch" className="font-medium">
              Auto Save
            </Label>
            <p className="text-sm text-gray-600">
              Automatically save changes as you type
            </p>
          </div>
          <Switch
            id="auto-save-switch"
            checked={settings.autoSave}
            onChange={(checked) => updateSetting('autoSave', checked)}
          />
        </div>
      </div>
    </div>
  )
}
```

## Form Integration

```tsx
import { Switch, Button, Card } from '@nebula-ui/components'
import { useState } from 'react'

function SettingsForm() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSaving(false)
    console.log('Settings saved:', settings)
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <Card>
      <form onSubmit={handleSave}>
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor="email-notifications">Email Notifications</label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="sms-notifications">SMS Notifications</label>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onChange={(checked) => updateSetting('smsNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="marketing-emails">Marketing Emails</label>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onChange={(checked) => updateSetting('marketingEmails', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="security-alerts">Security Alerts</label>
            <Switch
              id="security-alerts"
              checked={settings.securityAlerts}
              onChange={(checked) => updateSetting('securityAlerts', checked)}
            />
          </div>
        </div>

        <Button type="submit" loading={saving} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </Card>
  )
}
```

## Props

| Prop          | Type                         | Default | Description                    |
| ------------- | ---------------------------- | ------- | ------------------------------ |
| `checked`     | `boolean`                    | `false` | Whether the switch is on       |
| `onChange`    | `(checked: boolean) => void` | -       | Called when switch toggles     |
| `disabled`    | `boolean`                    | `false` | Whether the switch is disabled |
| `loading`     | `boolean`                    | `false` | Show loading state             |
| `size`        | `'sm' \| 'md' \| 'lg'`       | `'md'`  | Size of the switch             |
| `id`          | `string`                     | -       | HTML id attribute              |
| `name`        | `string`                     | -       | HTML name attribute            |
| `className`   | `string`                     | -       | Additional CSS classes         |
| `data-testid` | `string`                     | -       | Test identifier                |

## Accessibility

- Uses native HTML input with `role="switch"`
- Full keyboard support (Space/Enter to toggle)
- Screen reader compatible with proper labeling
- Focus indicators and ARIA states
- Supports `aria-labelledby` and `aria-describedby`

## Best Practices

- Always provide a clear label describing what the switch controls
- Use Switch for binary on/off states, not for multiple options
- Consider using loading state for async operations
- Group related switches logically
- Provide immediate feedback for state changes
- Test with keyboard navigation and screen readers
- Use consistent switch sizes within the same interface
