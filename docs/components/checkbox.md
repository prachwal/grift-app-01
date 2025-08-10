# Checkbox Component Documentation

## Overview
The Checkbox component provides accessible checkbox inputs with support for controlled/uncontrolled modes, indeterminate states, validation, and custom content. It's perfect for forms, settings panels, multi-selection interfaces, and any scenario requiring binary or tri-state choices.

## Features
- **Multiple States**: Checked, unchecked, and indeterminate states
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Visual Variants**: Default, filled, bordered styles with color options
- **Control Modes**: Both controlled and uncontrolled usage patterns
- **Custom Content**: Support for custom labels, descriptions, and rich content
- **Validation States**: Error and success states with visual feedback
- **Group Management**: Built-in support for checkbox groups and "select all" functionality
- **Accessibility**: Full ARIA compliance with proper keyboard navigation and screen reader support
- **Dark Mode**: Complete dark theme compatibility

## Basic Usage

### Simple Checkbox
```typescript
import { Checkbox } from '@nebula/components'

function SimpleCheckbox() {
  return (
    <Checkbox label="I agree to the terms and conditions" />
  )
}
```

### Controlled Checkbox
```typescript
import { Checkbox } from '@nebula/components'
import { useState } from 'preact/hooks'

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Checkbox 
      checked={checked}
      onChange={(checked) => setChecked(checked)}
      label="Enable notifications"
    />
  )
}
```

### Uncontrolled Checkbox
```typescript
import { Checkbox } from '@nebula/components'

function UncontrolledCheckbox() {
  return (
    <Checkbox 
      defaultChecked={true}
      label="Remember me"
      onChange={(checked) => console.log('Checked:', checked)}
    />
  )
}
```

## Sizes
The Checkbox component supports three sizes:

```typescript
<Checkbox size="sm" label="Small checkbox" />
<Checkbox size="md" label="Medium checkbox" />
<Checkbox size="lg" label="Large checkbox" />
```

## States and Variants

### Basic States
```typescript
<Checkbox label="Normal checkbox" />
<Checkbox checked label="Checked checkbox" />
<Checkbox disabled label="Disabled checkbox" />
<Checkbox disabled checked label="Disabled checked" />
```

### Indeterminate State
```typescript
import { Checkbox } from '@nebula/components'

function IndeterminateCheckbox() {
  return (
    <Checkbox 
      indeterminate
      label="Some items selected"
    />
  )
}
```

### Validation States
```typescript
<Checkbox error label="Error state checkbox" />
<Checkbox success label="Success state checkbox" />
<Checkbox warning label="Warning state checkbox" />
```

### Visual Variants
```typescript
<Checkbox variant="default" label="Default style" />
<Checkbox variant="filled" label="Filled style" />
<Checkbox variant="bordered" label="Bordered style" />
```

### Color Options
```typescript
<Checkbox color="primary" label="Primary color" />
<Checkbox color="success" label="Success color" />
<Checkbox color="warning" label="Warning color" />
<Checkbox color="danger" label="Danger color" />
```

## Custom Content

### Rich Labels
```typescript
import { Checkbox } from '@nebula/components'

function RichLabelCheckbox() {
  return (
    <Checkbox 
      label={
        <div>
          <div className="font-medium">Premium Plan</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Includes advanced features and priority support
          </div>
        </div>
      }
    />
  )
}
```

### With Description
```typescript
<Checkbox 
  label="Email notifications"
  description="Receive email updates about your account activity"
/>
```

### Custom HTML Content
```typescript
import { Checkbox } from '@nebula/components'

function CustomContentCheckbox() {
  return (
    <Checkbox 
      label={
        <span>
          I agree to the{' '}
          <a href="/terms" className="text-blue-600 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 underline">
            Privacy Policy
          </a>
        </span>
      }
    />
  )
}
```

## Checkbox Groups

### Simple Group
```typescript
import { CheckboxGroup, Checkbox } from '@nebula/components'
import { useState } from 'preact/hooks'

function SimpleCheckboxGroup() {
  const [values, setValues] = useState<string[]>([])
  
  return (
    <CheckboxGroup
      label="Select your interests"
      value={values}
      onChange={setValues}
    >
      <Checkbox value="technology" label="Technology" />
      <Checkbox value="design" label="Design" />
      <Checkbox value="business" label="Business" />
      <Checkbox value="marketing" label="Marketing" />
    </CheckboxGroup>
  )
}
```

### With Select All
```typescript
import { CheckboxGroup, Checkbox } from '@nebula/components'
import { useState } from 'preact/hooks'

function SelectAllCheckboxGroup() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const allItems = ['read', 'write', 'execute', 'delete']
  
  const allSelected = allItems.length === selectedItems.length
  const someSelected = selectedItems.length > 0 && selectedItems.length < allItems.length
  
  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? [...allItems] : [])
  }
  
  return (
    <div className="space-y-3">
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        onChange={handleSelectAll}
        label="Select all permissions"
        className="font-medium"
      />
      
      <div className="ml-6 space-y-2">
        <CheckboxGroup
          value={selectedItems}
          onChange={setSelectedItems}
        >
          <Checkbox value="read" label="Read" />
          <Checkbox value="write" label="Write" />
          <Checkbox value="execute" label="Execute" />
          <Checkbox value="delete" label="Delete" />
        </CheckboxGroup>
      </div>
    </div>
  )
}
```

## Form Integration

### Settings Panel
```typescript
import { Checkbox, Label, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

interface Settings {
  notifications: boolean
  emailUpdates: boolean
  darkMode: boolean
  analytics: boolean
}

function SettingsPanel() {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    emailUpdates: false,
    darkMode: true,
    analytics: false
  })
  
  const updateSetting = (key: keyof Settings) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [key]: checked }))
  }
  
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <Label>Notification Preferences</Label>
        <div className="mt-3 space-y-3">
          <Checkbox
            checked={settings.notifications}
            onChange={updateSetting('notifications')}
            label="Push notifications"
            description="Receive push notifications on your device"
          />
          <Checkbox
            checked={settings.emailUpdates}
            onChange={updateSetting('emailUpdates')}
            label="Email updates"
            description="Get notified about important updates via email"
          />
        </div>
      </div>
      
      <div>
        <Label>Appearance</Label>
        <div className="mt-3 space-y-3">
          <Checkbox
            checked={settings.darkMode}
            onChange={updateSetting('darkMode')}
            label="Dark mode"
            description="Use dark theme throughout the application"
          />
        </div>
      </div>
      
      <div>
        <Label>Privacy</Label>
        <div className="mt-3 space-y-3">
          <Checkbox
            checked={settings.analytics}
            onChange={updateSetting('analytics')}
            label="Analytics"
            description="Help improve our service by sharing usage data"
          />
        </div>
      </div>
      
      <Button className="w-full">Save Settings</Button>
    </div>
  )
}
```

### Multi-step Form with Validation
```typescript
import { Checkbox, Button, Alert } from '@nebula/components'
import { useState } from 'preact/hooks'

function SignupForm() {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    newsletter: false
  })
  const [errors, setErrors] = useState<string[]>([])
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const newErrors: string[] = []
    
    if (!agreements.terms) {
      newErrors.push('You must agree to the Terms of Service')
    }
    if (!agreements.privacy) {
      newErrors.push('You must agree to the Privacy Policy')
    }
    
    setErrors(newErrors)
    
    if (newErrors.length === 0) {
      console.log('Form submitted:', agreements)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {errors.length > 0 && (
        <Alert variant="error">
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </Alert>
      )}
      
      <div className="space-y-4">
        <Checkbox
          checked={agreements.terms}
          onChange={(checked) => setAgreements(prev => ({ ...prev, terms: checked }))}
          error={errors.some(e => e.includes('Terms'))}
          label={
            <span>
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 underline" target="_blank">
                Terms of Service
              </a>
              {' *'}
            </span>
          }
        />
        
        <Checkbox
          checked={agreements.privacy}
          onChange={(checked) => setAgreements(prev => ({ ...prev, privacy: checked }))}
          error={errors.some(e => e.includes('Privacy'))}
          label={
            <span>
              I agree to the{' '}
              <a href="/privacy" className="text-blue-600 underline" target="_blank">
                Privacy Policy
              </a>
              {' *'}
            </span>
          }
        />
        
        <Checkbox
          checked={agreements.newsletter}
          onChange={(checked) => setAgreements(prev => ({ ...prev, newsletter: checked }))}
          label="Subscribe to newsletter (optional)"
          description="Receive updates about new features and promotions"
        />
      </div>
      
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  )
}
```

## Data Selection Interface

### File Manager Selection
```typescript
import { Checkbox } from '@nebula/components'
import { useState } from 'preact/hooks'
import { File, Folder } from 'lucide-preact'

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: string
}

function FileManager() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  
  const files: FileItem[] = [
    { id: '1', name: 'Documents', type: 'folder' },
    { id: '2', name: 'presentation.pptx', type: 'file', size: '2.4 MB' },
    { id: '3', name: 'report.pdf', type: 'file', size: '1.8 MB' },
    { id: '4', name: 'images.zip', type: 'file', size: '15.2 MB' }
  ]
  
  const allSelected = files.length === selectedFiles.length
  const someSelected = selectedFiles.length > 0 && selectedFiles.length < files.length
  
  const toggleSelectAll = (checked: boolean) => {
    setSelectedFiles(checked ? files.map(f => f.id) : [])
  }
  
  const toggleFile = (fileId: string) => (checked: boolean) => {
    setSelectedFiles(prev => 
      checked 
        ? [...prev, fileId]
        : prev.filter(id => id !== fileId)
    )
  }
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onChange={toggleSelectAll}
          label={`Select all (${selectedFiles.length} of ${files.length} selected)`}
        />
      </div>
      
      {/* File List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {files.map(file => (
          <div key={file.id} className="p-4 flex items-center gap-3">
            <Checkbox
              checked={selectedFiles.includes(file.id)}
              onChange={toggleFile(file.id)}
            />
            
            <div className="flex items-center gap-3 flex-1">
              {file.type === 'folder' ? (
                <Folder className="text-blue-500" size={20} />
              ) : (
                <File className="text-gray-500" size={20} />
              )}
              
              <div>
                <div className="font-medium">{file.name}</div>
                {file.size && (
                  <div className="text-sm text-gray-500">{file.size}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Props Reference

### Checkbox Props
| Prop             | Type                                              | Default     | Description                                |
| ---------------- | ------------------------------------------------- | ----------- | ------------------------------------------ |
| `checked`        | `boolean`                                         | -           | Controlled checked state                   |
| `defaultChecked` | `boolean`                                         | `false`     | Default checked state (uncontrolled)       |
| `indeterminate`  | `boolean`                                         | `false`     | Whether checkbox is in indeterminate state |
| `onChange`       | `(checked: boolean, e: Event) => void`            | -           | Change event handler                       |
| `label`          | `ComponentChild \| string`                        | -           | Checkbox label content                     |
| `description`    | `string`                                          | -           | Optional description text                  |
| `disabled`       | `boolean`                                         | `false`     | Whether checkbox is disabled               |
| `error`          | `boolean`                                         | `false`     | Whether to show error state                |
| `success`        | `boolean`                                         | `false`     | Whether to show success state              |
| `warning`        | `boolean`                                         | `false`     | Whether to show warning state              |
| `size`           | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Size variant                               |
| `variant`        | `'default' \| 'filled' \| 'bordered'`             | `'default'` | Visual style variant                       |
| `color`          | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color theme                                |
| `value`          | `string`                                          | -           | Value for use in checkbox groups           |
| `name`           | `string`                                          | -           | HTML name attribute                        |
| `id`             | `string`                                          | -           | HTML id attribute                          |
| `className`      | `string`                                          | -           | Additional CSS classes                     |
| `required`       | `boolean`                                         | `false`     | Whether checkbox is required               |
| `autoFocus`      | `boolean`                                         | `false`     | Whether to auto-focus on mount             |

### CheckboxGroup Props
| Prop           | Type                         | Default      | Description                      |
| -------------- | ---------------------------- | ------------ | -------------------------------- |
| `value`        | `string[]`                   | -            | Array of selected values         |
| `defaultValue` | `string[]`                   | `[]`         | Default selected values          |
| `onChange`     | `(values: string[]) => void` | -            | Change handler for group         |
| `label`        | `string`                     | -            | Group label                      |
| `description`  | `string`                     | -            | Group description                |
| `disabled`     | `boolean`                    | `false`      | Whether entire group is disabled |
| `error`        | `boolean`                    | `false`      | Whether group has error state    |
| `direction`    | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction                 |
| `spacing`      | `'sm' \| 'md' \| 'lg'`       | `'md'`       | Spacing between items            |
| `children`     | `ComponentChild`             | -            | Checkbox components              |
| `className`    | `string`                     | -            | Additional CSS classes           |

## Accessibility
The Checkbox component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `checkbox` role with `aria-checked` state
- **Keyboard Navigation**: Space bar toggles checkbox, Tab navigates between checkboxes
- **Screen Readers**: Proper label association and state announcements
- **Focus Management**: Visible focus indicators and proper focus order
- **High Contrast**: Support for high contrast mode
- **Label Association**: Automatic label-input association via `for` attribute
- **Group Support**: Proper fieldset/legend structure for checkbox groups

## Examples

### Permission Management System
```typescript
import { Checkbox, Card, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

function PermissionManager() {
  const [permissions, setPermissions] = useState<string[]>([])
  
  const allPermissions: Permission[] = [
    { id: 'read_users', name: 'Read Users', description: 'View user information', category: 'Users' },
    { id: 'write_users', name: 'Write Users', description: 'Create and edit users', category: 'Users' },
    { id: 'delete_users', name: 'Delete Users', description: 'Remove users from system', category: 'Users' },
    { id: 'read_content', name: 'Read Content', description: 'View all content', category: 'Content' },
    { id: 'write_content', name: 'Write Content', description: 'Create and edit content', category: 'Content' }
  ]
  
  const categories = [...new Set(allPermissions.map(p => p.category))]
  
  return (
    <div className="space-y-6">
      {categories.map(category => {
        const categoryPermissions = allPermissions.filter(p => p.category === category)
        const selectedInCategory = categoryPermissions.filter(p => permissions.includes(p.id))
        const allCategorySelected = selectedInCategory.length === categoryPermissions.length
        const someCategorySelected = selectedInCategory.length > 0 && selectedInCategory.length < categoryPermissions.length
        
        return (
          <Card key={category}>
            <div className="p-4">
              <Checkbox
                checked={allCategorySelected}
                indeterminate={someCategorySelected}
                onChange={(checked) => {
                  if (checked) {
                    setPermissions(prev => [
                      ...prev.filter(id => !categoryPermissions.map(p => p.id).includes(id)),
                      ...categoryPermissions.map(p => p.id)
                    ])
                  } else {
                    setPermissions(prev => prev.filter(id => !categoryPermissions.map(p => p.id).includes(id)))
                  }
                }}
                label={<span className="font-medium text-lg">{category} Permissions</span>}
              />
              
              <div className="mt-4 ml-6 space-y-3">
                {categoryPermissions.map(permission => (
                  <Checkbox
                    key={permission.id}
                    checked={permissions.includes(permission.id)}
                    onChange={(checked) => {
                      setPermissions(prev => 
                        checked
                          ? [...prev, permission.id]
                          : prev.filter(id => id !== permission.id)
                      )
                    }}
                    label={permission.name}
                    description={permission.description}
                  />
                ))}
              </div>
            </div>
          </Card>
        )
      })}
      
      <Button className="w-full">Save Permissions</Button>
    </div>
  )
}
```
