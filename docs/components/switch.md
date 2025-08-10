# Switch Component Documentation

## Overview
The Switch component provides an accessible toggle control for binary states. It features smooth animations, customizable styling, and comprehensive keyboard navigation. Perfect for settings panels, preferences, and any interface requiring on/off states.

## Features
- **Binary Toggle**: Clean on/off state management
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Visual Variants**: Default, filled, and bordered styles with color options
- **Loading States**: Built-in loading indicators for async operations
- **Custom Labels**: Support for on/off labels and descriptions
- **Validation States**: Error, success, and warning states with visual feedback
- **Accessibility**: Full ARIA compliance with proper keyboard navigation and screen reader support
- **Dark Mode**: Complete dark theme compatibility
- **Controlled/Uncontrolled**: Support for both usage patterns
- **Smooth Animations**: CSS transitions for state changes

## Basic Usage

### Simple Switch
```typescript
import { Switch } from '@nebula/components'

function SimpleSwitch() {
  return (
    <Switch 
      label="Enable notifications" 
      defaultChecked={true}
    />
  )
}
```

### Controlled Switch
```typescript
import { Switch } from '@nebula/components'
import { useState } from 'preact/hooks'

function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false)
  
  return (
    <Switch
      checked={enabled}
      onChange={(checked) => setEnabled(checked)}
      label="Dark mode"
    />
  )
}
```

### Uncontrolled Switch
```typescript
import { Switch } from '@nebula/components'

function UncontrolledSwitch() {
  return (
    <Switch
      defaultChecked={false}
      label="Auto-save"
      onChange={(checked) => console.log('Auto-save:', checked)}
    />
  )
}
```

## Sizes
The Switch component supports three sizes:

```typescript
<Switch size="sm" label="Small switch" />
<Switch size="md" label="Medium switch" />
<Switch size="lg" label="Large switch" />
```

## States and Variants

### Basic States
```typescript
<Switch label="Normal switch" />
<Switch checked label="Checked switch" />
<Switch disabled label="Disabled switch" />
<Switch disabled checked label="Disabled checked" />
<Switch loading label="Loading switch" />
```

### Validation States
```typescript
<Switch error label="Error state switch" />
<Switch success label="Success state switch" />
<Switch warning label="Warning state switch" />
```

### Visual Variants
```typescript
<Switch variant="default" label="Default style" />
<Switch variant="filled" label="Filled style" />
<Switch variant="bordered" label="Bordered style" />
```

### Color Options
```typescript
<Switch color="primary" label="Primary color" />
<Switch color="success" label="Success color" />
<Switch color="warning" label="Warning color" />
<Switch color="danger" label="Danger color" />
```

## Custom Labels

### On/Off Labels
```typescript
import { Switch } from '@nebula/components'

function LabeledSwitch() {
  return (
    <Switch
      label="Wi-Fi"
      onLabel="On"
      offLabel="Off"
      showLabels
      defaultChecked={true}
    />
  )
}
```

### Rich Labels with Descriptions
```typescript
import { Switch } from '@nebula/components'

function RichLabelSwitch() {
  return (
    <div className="space-y-4">
      <Switch
        label="Push Notifications"
        description="Receive notifications about important updates"
        defaultChecked={true}
      />
      <Switch
        label="Email Marketing"
        description="Get promotional emails and newsletters"
        defaultChecked={false}
      />
      <Switch
        label="Data Collection"
        description="Allow anonymous usage data collection for improvements"
        defaultChecked={false}
      />
    </div>
  )
}
```

### Custom Label Components
```typescript
import { Switch } from '@nebula/components'
import { Bell, Mail, Shield } from 'lucide-preact'

function CustomLabelSwitch() {
  return (
    <div className="space-y-4">
      <Switch
        label={
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Push Notifications</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              New
            </span>
          </div>
        }
        defaultChecked={true}
      />
      <Switch
        label={
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Email Alerts</span>
          </div>
        }
        defaultChecked={false}
      />
      <Switch
        label={
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Security Mode</span>
            <span className="text-orange-600 text-xs">Recommended</span>
          </div>
        }
        defaultChecked={true}
      />
    </div>
  )
}
```

## Settings Panel Examples

### User Preferences
```typescript
import { Switch, Card, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

interface UserPreferences {
  darkMode: boolean
  notifications: boolean
  autoSave: boolean
  analytics: boolean
  marketing: boolean
}

function UserPreferencesPanel() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    darkMode: false,
    notifications: true,
    autoSave: true,
    analytics: false,
    marketing: false
  })
  
  const updatePreference = (key: keyof UserPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }
  
  const handleSave = () => {
    console.log('Saving preferences:', preferences)
  }
  
  return (
    <Card className="max-w-2xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-6">User Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Appearance</h4>
            <Switch
              checked={preferences.darkMode}
              onChange={(checked) => updatePreference('darkMode', checked)}
              label="Dark mode"
              description="Use dark theme across the application"
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Notifications</h4>
            <Switch
              checked={preferences.notifications}
              onChange={(checked) => updatePreference('notifications', checked)}
              label="Push notifications"
              description="Receive real-time notifications"
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Functionality</h4>
            <Switch
              checked={preferences.autoSave}
              onChange={(checked) => updatePreference('autoSave', checked)}
              label="Auto-save"
              description="Automatically save changes as you work"
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Privacy</h4>
            <div className="space-y-3">
              <Switch
                checked={preferences.analytics}
                onChange={(checked) => updatePreference('analytics', checked)}
                label="Analytics"
                description="Help improve the product by sharing anonymous usage data"
              />
              <Switch
                checked={preferences.marketing}
                onChange={(checked) => updatePreference('marketing', checked)}
                label="Marketing communications"
                description="Receive emails about new features and updates"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleSave} className="w-full">
            Save Preferences
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

### Feature Toggles
```typescript
import { Switch, Card, Badge } from '@nebula/components'
import { useState } from 'preact/hooks'

interface FeatureFlags {
  betaFeatures: boolean
  advancedMode: boolean
  debugMode: boolean
  experimentalUI: boolean
}

function FeatureToggles() {
  const [features, setFeatures] = useState<FeatureFlags>({
    betaFeatures: false,
    advancedMode: false,
    debugMode: false,
    experimentalUI: false
  })
  
  const toggleFeature = (key: keyof FeatureFlags) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  return (
    <Card className="max-w-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Feature Toggles</h3>
          <Badge variant="secondary">Developer Mode</Badge>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950">
            <Switch
              checked={features.betaFeatures}
              onChange={() => toggleFeature('betaFeatures')}
              label={
                <div className="flex items-center gap-2">
                  <span>Beta Features</span>
                  <Badge variant="primary" size="sm">Beta</Badge>
                </div>
              }
              description="Enable experimental features that are still in development"
            />
          </div>
          
          <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-950">
            <Switch
              checked={features.advancedMode}
              onChange={() => toggleFeature('advancedMode')}
              label={
                <div className="flex items-center gap-2">
                  <span>Advanced Mode</span>
                  <Badge variant="warning" size="sm">Pro</Badge>
                </div>
              }
              description="Show advanced configuration options and settings"
            />
          </div>
          
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
            <Switch
              checked={features.debugMode}
              onChange={() => toggleFeature('debugMode')}
              label={
                <div className="flex items-center gap-2">
                  <span>Debug Mode</span>
                  <Badge variant="danger" size="sm">Debug</Badge>
                </div>
              }
              description="Enable detailed logging and debugging information"
            />
          </div>
          
          <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-950">
            <Switch
              checked={features.experimentalUI}
              onChange={() => toggleFeature('experimentalUI')}
              label={
                <div className="flex items-center gap-2">
                  <span>Experimental UI</span>
                  <Badge variant="secondary" size="sm">Experimental</Badge>
                </div>
              }
              description="Try the new interface design (may be unstable)"
            />
          </div>
        </div>
        
        {Object.values(features).some(Boolean) && (
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Some features may affect application stability. 
              Reload the page if you experience any issues.
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
```

## Loading and Async States

### Async Toggle
```typescript
import { Switch } from '@nebula/components'
import { useState } from 'preact/hooks'

function AsyncSwitch() {
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const handleToggle = async (checked: boolean) => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setEnabled(checked)
    } catch (error) {
      console.error('Failed to toggle setting:', error)
      // Reset to previous state on error
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Switch
      checked={enabled}
      loading={loading}
      onChange={handleToggle}
      label="Sync to cloud"
      description="Synchronize your data with cloud storage"
    />
  )
}
```

### Batch Operations
```typescript
import { Switch, Button, Card } from '@nebula/components'
import { useState } from 'preact/hooks'

interface Permission {
  id: string
  name: string
  description: string
  enabled: boolean
  loading: boolean
}

function PermissionsPanel() {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'camera',
      name: 'Camera Access',
      description: 'Allow access to camera for photos and video calls',
      enabled: false,
      loading: false
    },
    {
      id: 'microphone',
      name: 'Microphone Access',
      description: 'Allow access to microphone for voice recording',
      enabled: true,
      loading: false
    },
    {
      id: 'location',
      name: 'Location Services',
      description: 'Allow access to your location for location-based features',
      enabled: false,
      loading: false
    },
    {
      id: 'notifications',
      name: 'Push Notifications',
      description: 'Send notifications about important updates',
      enabled: true,
      loading: false
    }
  ])
  
  const togglePermission = async (id: string, enabled: boolean) => {
    setPermissions(prev =>
      prev.map(p =>
        p.id === id ? { ...p, loading: true } : p
      )
    )
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPermissions(prev =>
        prev.map(p =>
          p.id === id ? { ...p, enabled, loading: false } : p
        )
      )
    } catch (error) {
      setPermissions(prev =>
        prev.map(p =>
          p.id === id ? { ...p, loading: false } : p
        )
      )
    }
  }
  
  const enableAll = async () => {
    const updates = permissions.map(async (permission) => {
      if (!permission.enabled) {
        await togglePermission(permission.id, true)
      }
    })
    
    await Promise.all(updates)
  }
  
  const disableAll = async () => {
    const updates = permissions.map(async (permission) => {
      if (permission.enabled) {
        await togglePermission(permission.id, false)
      }
    })
    
    await Promise.all(updates)
  }
  
  const hasAnyLoading = permissions.some(p => p.loading)
  const allEnabled = permissions.every(p => p.enabled)
  const allDisabled = permissions.every(p => !p.enabled)
  
  return (
    <Card className="max-w-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">App Permissions</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={enableAll}
              disabled={hasAnyLoading || allEnabled}
            >
              Enable All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={disableAll}
              disabled={hasAnyLoading || allDisabled}
            >
              Disable All
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {permissions.map(permission => (
            <div
              key={permission.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <Switch
                checked={permission.enabled}
                loading={permission.loading}
                onChange={(checked) => togglePermission(permission.id, checked)}
                label={permission.name}
                description={permission.description}
                disabled={permission.loading}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
```

## Integration Examples

### Form Integration
```typescript
import { Switch, Button, Card, Alert } from '@nebula/components'
import { useState } from 'preact/hooks'

interface FormData {
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  newsletter: boolean
  dataProcessing: boolean
  termsAccepted: boolean
}

function NotificationSettingsForm() {
  const [formData, setFormData] = useState<FormData>({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    newsletter: false,
    dataProcessing: false,
    termsAccepted: false
  })
  
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const updateField = (field: keyof FormData, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user makes changes
    if (errors.length > 0) {
      setErrors([])
    }
  }
  
  const validateForm = (): string[] => {
    const newErrors: string[] = []
    
    if (!formData.termsAccepted) {
      newErrors.push('You must accept the terms and conditions')
    }
    
    if (!formData.emailNotifications && !formData.smsNotifications) {
      newErrors.push('At least one notification method must be enabled')
    }
    
    if (formData.marketingEmails && !formData.dataProcessing) {
      newErrors.push('Data processing consent is required for marketing emails')
    }
    
    return newErrors
  }
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Form submitted:', formData)
      
      // Show success message
      setErrors([])
    } catch (error) {
      setErrors(['Failed to save settings. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Card className="max-w-2xl">
      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="text-lg font-semibold mb-6">Notification Settings</h3>
        
        {errors.length > 0 && (
          <Alert variant="error" className="mb-6">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Communication Preferences</h4>
            <div className="space-y-3">
              <Switch
                checked={formData.emailNotifications}
                onChange={(checked) => updateField('emailNotifications', checked)}
                label="Email notifications"
                description="Receive important updates via email"
              />
              <Switch
                checked={formData.smsNotifications}
                onChange={(checked) => updateField('smsNotifications', checked)}
                label="SMS notifications"
                description="Receive urgent alerts via text message"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Marketing</h4>
            <div className="space-y-3">
              <Switch
                checked={formData.marketingEmails}
                onChange={(checked) => updateField('marketingEmails', checked)}
                label="Marketing emails"
                description="Receive promotional offers and product updates"
              />
              <Switch
                checked={formData.newsletter}
                onChange={(checked) => updateField('newsletter', checked)}
                label="Monthly newsletter"
                description="Get our monthly digest with tips and news"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Privacy & Legal</h4>
            <div className="space-y-3">
              <Switch
                checked={formData.dataProcessing}
                onChange={(checked) => updateField('dataProcessing', checked)}
                label="Data processing consent"
                description="Allow processing of your data for personalized content"
              />
              <Switch
                checked={formData.termsAccepted}
                onChange={(checked) => updateField('termsAccepted', checked)}
                label={
                  <span>
                    I accept the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>
                  </span>
                }
                error={!formData.termsAccepted && errors.length > 0}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            Save Settings
          </Button>
        </div>
      </form>
    </Card>
  )
}
```

## Props Reference

### Switch Props
| Prop             | Type                                              | Default     | Description                          |
| ---------------- | ------------------------------------------------- | ----------- | ------------------------------------ |
| `checked`        | `boolean`                                         | -           | Controlled checked state             |
| `defaultChecked` | `boolean`                                         | `false`     | Default checked state (uncontrolled) |
| `onChange`       | `(checked: boolean, e: Event) => void`            | -           | Change event handler                 |
| `label`          | `ComponentChild \| string`                        | -           | Switch label content                 |
| `description`    | `string`                                          | -           | Optional description text            |
| `onLabel`        | `string`                                          | -           | Label shown when switch is on        |
| `offLabel`       | `string`                                          | -           | Label shown when switch is off       |
| `showLabels`     | `boolean`                                         | `false`     | Whether to show on/off labels        |
| `disabled`       | `boolean`                                         | `false`     | Whether switch is disabled           |
| `loading`        | `boolean`                                         | `false`     | Whether to show loading indicator    |
| `error`          | `boolean`                                         | `false`     | Whether to show error state          |
| `success`        | `boolean`                                         | `false`     | Whether to show success state        |
| `warning`        | `boolean`                                         | `false`     | Whether to show warning state        |
| `size`           | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Size variant                         |
| `variant`        | `'default' \| 'filled' \| 'bordered'`             | `'default'` | Visual style variant                 |
| `color`          | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color theme                          |
| `id`             | `string`                                          | -           | HTML id attribute                    |
| `name`           | `string`                                          | -           | HTML name attribute                  |
| `className`      | `string`                                          | -           | Additional CSS classes               |
| `required`       | `boolean`                                         | `false`     | Whether switch is required           |
| `autoFocus`      | `boolean`                                         | `false`     | Whether to auto-focus on mount       |

## Accessibility
The Switch component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `switch` role with `aria-checked` state
- **Keyboard Navigation**: Space and Enter keys toggle the switch
- **Screen Readers**: Clear announcements of state changes and labels
- **Focus Management**: Proper focus indicators with keyboard navigation
- **High Contrast**: Support for high contrast mode
- **Label Association**: Automatic label-input association
- **State Announcements**: Clear indication of on/off states

## Examples

### Theme Switcher
```typescript
import { Switch, Card } from '@nebula/components'
import { useState, useEffect } from 'preact/hooks'

function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    setIsDark(savedTheme === 'dark' || (!savedTheme && systemPrefersDark))
  }, [])
  
  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])
  
  return (
    <Card className="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <Switch
          checked={isDark}
          onChange={setIsDark}
          label={
            <div className="flex items-center gap-2">
              <span>{isDark ? '🌙' : '☀️'}</span>
              <span>Dark mode</span>
            </div>
          }
          description={`Currently using ${isDark ? 'dark' : 'light'} theme`}
          onLabel="Dark"
          offLabel="Light"
          showLabels
        />
      </div>
    </Card>
  )
}
```
