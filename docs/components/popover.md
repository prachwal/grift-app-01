# Popover Component Documentation

## Overview
The Popover component creates contextual overlays with rich content and intelligent positioning. It provides flexible trigger mechanisms, advanced placement algorithms, and comprehensive accessibility features for displaying additional information, menus, forms, and interactive content.

## Features
- **Multiple Triggers**: Click, hover, focus, and manual control
- **Intelligent Positioning**: Automatic placement with collision detection
- **Rich Content Support**: Forms, menus, buttons, media, and complex layouts
- **Arrow Pointer**: Smart arrow positioning and customization
- **Nested Support**: Multiple popovers can be layered appropriately
- **Portal Rendering**: Renders outside DOM hierarchy for proper layering
- **Accessibility**: Full ARIA compliance with focus management and keyboard navigation
- **Animation**: Smooth show/hide transitions with customizable timing
- **Dark Mode**: Complete dark theme support

## Basic Usage
Simple popover with click trigger:

```typescript
import { Popover, Button } from '@nebula/components'

function BasicPopover() {
  return (
    <Popover
      trigger={<Button>Click me</Button>}
    >
      <div className="p-4">
        <h3 className="font-semibold mb-2">Popover Title</h3>
        <p className="text-gray-600">
          This is the popover content. It can contain any React components
          and will be displayed when the trigger is activated.
        </p>
      </div>
    </Popover>
  )
}
```

## Trigger Types
Different ways to activate popovers:

```typescript
import { Popover, Button } from '@nebula/components'
import { Info, Help, Settings } from 'lucide-react'

function TriggerTypes() {
  const [manualOpen, setManualOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Click Trigger */}
      <div>
        <label className="block text-sm font-medium mb-2">Click Trigger</label>
        <Popover
          trigger={<Button variant="outline">Click to open</Button>}
          triggerType="click"
        >
          <div className="p-4">
            <p>Click the button to show this popover.</p>
          </div>
        </Popover>
      </div>

      {/* Hover Trigger */}
      <div>
        <label className="block text-sm font-medium mb-2">Hover Trigger</label>
        <Popover
          trigger={
            <Button variant="outline" className="flex items-center space-x-2">
              <Info size={16} />
              <span>Hover for info</span>
            </Button>
          }
          triggerType="hover"
        >
          <div className="p-4 max-w-xs">
            <p className="text-sm">
              This popover appears when you hover over the button and
              disappears when you move the mouse away.
            </p>
          </div>
        </Popover>
      </div>

      {/* Focus Trigger */}
      <div>
        <label className="block text-sm font-medium mb-2">Focus Trigger</label>
        <Popover
          trigger={
            <button className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              Focus me (Tab key)
            </button>
          }
          triggerType="focus"
        >
          <div className="p-4">
            <p className="text-sm">
              This popover shows when the element receives focus
              (like when you tab to it).
            </p>
          </div>
        </Popover>
      </div>

      {/* Manual Control */}
      <div>
        <label className="block text-sm font-medium mb-2">Manual Control</label>
        <div className="flex space-x-2">
          <Button onClick={() => setManualOpen(true)}>
            Open Popover
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setManualOpen(false)}
          >
            Close Popover
          </Button>
        </div>
        <Popover
          trigger={<span />} // Empty trigger for manual control
          isOpen={manualOpen}
          onOpenChange={setManualOpen}
          triggerType="manual"
        >
          <div className="p-4">
            <p className="mb-3">This popover is controlled programmatically.</p>
            <Button 
              size="sm" 
              onClick={() => setManualOpen(false)}
            >
              Close
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  )
}
```

## Placement Options
Smart positioning with automatic adjustments:

```typescript
import { Popover, Button } from '@nebula/components'

function PlacementOptions() {
  const placements = [
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end',
    'right', 'right-start', 'right-end'
  ]

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {placements.map((placement) => (
        <Popover
          key={placement}
          trigger={
            <Button variant="outline" size="sm">
              {placement}
            </Button>
          }
          placement={placement}
        >
          <div className="p-3">
            <p className="text-sm">
              Placed at <strong>{placement}</strong>
            </p>
          </div>
        </Popover>
      ))}
    </div>
  )
}
```

## Rich Content Examples
Popovers with complex interactive content:

```typescript
import { Popover, Button, Input, Select, Checkbox } from '@nebula/components'
import { Settings, User, Calendar, Share2 } from 'lucide-react'

function RichContentPopovers() {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'user'
  })

  const [shareSettings, setShareSettings] = useState({
    public: false,
    comments: true,
    download: false
  })

  return (
    <div className="flex flex-wrap gap-4">
      {/* User Profile Popover */}
      <Popover
        trigger={
          <Button variant="outline" className="flex items-center space-x-2">
            <User size={16} />
            <span>User Profile</span>
          </Button>
        }
        placement="bottom-start"
      >
        <div className="p-4 w-80">
          <h3 className="font-semibold mb-4">Edit Profile</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="Enter your name"
                size="sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="Enter your email"
                size="sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select
                value={userForm.role}
                onChange={(value) => setUserForm({ ...userForm, role: value })}
                options={[
                  { value: 'user', label: 'User' },
                  { value: 'admin', label: 'Administrator' },
                  { value: 'editor', label: 'Editor' }
                ]}
                size="sm"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </div>
          </div>
        </div>
      </Popover>

      {/* Settings Menu Popover */}
      <Popover
        trigger={
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings size={16} />
            <span>Settings</span>
          </Button>
        }
        placement="bottom"
      >
        <div className="p-2 w-64">
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded">
              <User size={16} />
              <span>Account Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded">
              <Settings size={16} />
              <span>Preferences</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded">
              <Calendar size={16} />
              <span>Schedule</span>
            </button>
            <hr className="my-1" />
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded text-red-600">
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </Popover>

      {/* Share Options Popover */}
      <Popover
        trigger={
          <Button variant="outline" className="flex items-center space-x-2">
            <Share2 size={16} />
            <span>Share</span>
          </Button>
        }
        placement="bottom-end"
      >
        <div className="p-4 w-72">
          <h3 className="font-semibold mb-4">Share Settings</h3>
          <div className="space-y-3">
            <Checkbox
              checked={shareSettings.public}
              onChange={(checked) => setShareSettings({ ...shareSettings, public: checked })}
              label="Make public"
              description="Anyone with the link can view"
            />
            <Checkbox
              checked={shareSettings.comments}
              onChange={(checked) => setShareSettings({ ...shareSettings, comments: checked })}
              label="Allow comments"
              description="Viewers can leave comments"
            />
            <Checkbox
              checked={shareSettings.download}
              onChange={(checked) => setShareSettings({ ...shareSettings, download: checked })}
              label="Allow downloads"
              description="Viewers can download the content"
            />
          </div>
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Share link</span>
            <Button variant="outline" size="sm">Copy Link</Button>
          </div>
        </div>
      </Popover>

      {/* Color Picker Popover */}
      <Popover
        trigger={
          <Button variant="outline">
            Color Picker
          </Button>
        }
      >
        <div className="p-4">
          <h3 className="font-semibold mb-3">Choose Color</h3>
          <div className="grid grid-cols-6 gap-2 mb-4">
            {[
              '#ef4444', '#f97316', '#eab308', '#22c55e',
              '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280',
              '#000000', '#ffffff', '#fbbf24', '#06b6d4'
            ].map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <Input placeholder="#000000" size="sm" />
        </div>
      </Popover>
    </div>
  )
}
```

## Nested Popovers
Multiple layers of popovers for complex interactions:

```typescript
import { Popover, Button } from '@nebula/components'

function NestedPopovers() {
  return (
    <div className="flex justify-center p-8">
      <Popover
        trigger={<Button>Open Level 1</Button>}
        placement="right"
      >
        <div className="p-4 w-64">
          <h3 className="font-semibold mb-3">Level 1 Popover</h3>
          <p className="text-sm text-gray-600 mb-4">
            This is the first level popover. You can open another popover from here.
          </p>
          
          <Popover
            trigger={<Button size="sm" variant="outline">Open Level 2</Button>}
            placement="right"
          >
            <div className="p-4 w-64">
              <h3 className="font-semibold mb-3">Level 2 Popover</h3>
              <p className="text-sm text-gray-600 mb-4">
                This is a nested popover. You can even go deeper!
              </p>
              
              <Popover
                trigger={<Button size="sm">Open Level 3</Button>}
                placement="right"
              >
                <div className="p-4 w-48">
                  <h3 className="font-semibold mb-2">Level 3</h3>
                  <p className="text-xs text-gray-600">
                    Deep nesting is supported with proper focus management.
                  </p>
                </div>
              </Popover>
            </div>
          </Popover>
        </div>
      </Popover>
    </div>
  )
}
```

## Confirmation Dialogs
Use popovers for quick confirmation actions:

```typescript
import { Popover, Button } from '@nebula/components'
import { Trash2, AlertTriangle } from 'lucide-react'

function ConfirmationPopovers() {
  const [items, setItems] = useState([
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
    { id: 3, name: 'Document 3' }
  ])

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
          <span>{item.name}</span>
          
          <Popover
            trigger={
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 size={16} />
              </Button>
            }
            placement="left"
            triggerType="click"
          >
            <div className="p-4 w-72">
              <div className="flex items-start space-x-3">
                <AlertTriangle size={20} className="text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Delete {item.name}?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    This action cannot be undone. The document will be permanently removed.
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {/* Close popover */}}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      ))}
    </div>
  )
}
```

## Information Display
Rich content display with media and formatting:

```typescript
import { Popover, Button, Avatar, Badge } from '@nebula/components'
import { MapPin, Calendar, Star, ExternalLink } from 'lucide-react'

function InformationPopovers() {
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Senior Developer',
      avatar: '/avatars/alice.jpg',
      location: 'San Francisco, CA',
      joinDate: '2020-03-15',
      rating: 4.8,
      bio: 'Passionate full-stack developer with expertise in React, Node.js, and cloud architecture.',
      skills: ['React', 'TypeScript', 'AWS', 'GraphQL']
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'UX Designer',
      avatar: '/avatars/bob.jpg',
      location: 'New York, NY',
      joinDate: '2019-11-22',
      rating: 4.9,
      bio: 'Creative designer focused on user-centered design and accessibility.',
      skills: ['Figma', 'Sketch', 'Prototyping', 'User Research']
    }
  ]

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Avatar src={user.avatar} alt={user.name} size="md" />
          <div className="flex-1">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
          
          <Popover
            trigger={<Button variant="outline" size="sm">View Profile</Button>}
            placement="left"
          >
            <div className="p-6 w-96">
              {/* Header */}
              <div className="flex items-start space-x-4 mb-4">
                <Avatar src={user.avatar} alt={user.name} size="lg" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.role}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{user.rating}</span>
                    <span className="text-sm text-gray-500">(127 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-4">{user.bio}</p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Send Message
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>
          </Popover>
        </div>
      ))}
    </div>
  )
}
```

## Props Reference

### Popover Props

| Prop                  | Type                                        | Default    | Description                             |
| --------------------- | ------------------------------------------- | ---------- | --------------------------------------- |
| `trigger`             | `ReactElement`                              | -          | Element that triggers the popover       |
| `children`            | `ReactNode`                                 | -          | Popover content                         |
| `isOpen`              | `boolean`                                   | -          | Controlled open state                   |
| `defaultOpen`         | `boolean`                                   | `false`    | Default open state (uncontrolled)       |
| `onOpenChange`        | `(open: boolean) => void`                   | -          | Called when open state changes          |
| `triggerType`         | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'`  | How to trigger the popover              |
| `placement`           | `Placement`                                 | `'bottom'` | Where to position the popover           |
| `offset`              | `number`                                    | `8`        | Distance between trigger and popover    |
| `showArrow`           | `boolean`                                   | `true`     | Whether to show the arrow pointer       |
| `closeOnEscape`       | `boolean`                                   | `true`     | Whether ESC key closes popover          |
| `closeOnOutsideClick` | `boolean`                                   | `true`     | Whether clicking outside closes popover |
| `disabled`            | `boolean`                                   | `false`    | Whether popover is disabled             |
| `animation`           | `boolean`                                   | `true`     | Whether to animate show/hide            |
| `animationDuration`   | `number`                                    | `200`      | Animation duration in ms                |
| `hoverDelay`          | `number`                                    | `100`      | Delay before showing on hover           |
| `hoverLeaveDelay`     | `number`                                    | `100`      | Delay before hiding on hover leave      |
| `zIndex`              | `number`                                    | `1000`     | Z-index for popover                     |
| `className`           | `string`                                    | -          | Additional CSS classes                  |
| `contentClassName`    | `string`                                    | -          | Popover content CSS classes             |
| `arrowClassName`      | `string`                                    | -          | Arrow CSS classes                       |
| `overlayClassName`    | `string`                                    | -          | Overlay CSS classes                     |

### Placement Options

| Value            | Description                        |
| ---------------- | ---------------------------------- |
| `'top'`          | Above trigger, centered            |
| `'top-start'`    | Above trigger, aligned to start    |
| `'top-end'`      | Above trigger, aligned to end      |
| `'bottom'`       | Below trigger, centered            |
| `'bottom-start'` | Below trigger, aligned to start    |
| `'bottom-end'`   | Below trigger, aligned to end      |
| `'left'`         | Left of trigger, centered          |
| `'left-start'`   | Left of trigger, aligned to start  |
| `'left-end'`     | Left of trigger, aligned to end    |
| `'right'`        | Right of trigger, centered         |
| `'right-start'`  | Right of trigger, aligned to start |
| `'right-end'`    | Right of trigger, aligned to end   |

### Popover Events

| Event             | Parameters               | Description                    |
| ----------------- | ------------------------ | ------------------------------ |
| `onOpen`          | `()`                     | Called when popover opens      |
| `onClose`         | `()`                     | Called when popover closes     |
| `onOpenChange`    | `(open: boolean)`        | Called when open state changes |
| `onClickOutside`  | `(event: Event)`         | Called when clicked outside    |
| `onEscapeKeyDown` | `(event: KeyboardEvent)` | Called when ESC pressed        |

## Accessibility

The Popover component provides comprehensive accessibility support:

- **ARIA Roles**: Uses appropriate roles based on content type
- **Focus Management**: Manages focus when popover opens/closes
- **Keyboard Navigation**: ESC to close, Tab to navigate within content
- **Screen Reader Support**: Announces popover state and content
- **Focus Trap**: Optional focus trapping for modal-like behavior
- **Labels**: Supports `aria-label`, `aria-labelledby`, and `aria-describedby`
- **High Contrast**: Ensures visibility in high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### Keyboard Shortcuts

| Key           | Action                                              |
| ------------- | --------------------------------------------------- |
| `Escape`      | Close popover                                       |
| `Tab`         | Navigate to next focusable element                  |
| `Shift + Tab` | Navigate to previous focusable element              |
| `Arrow Keys`  | Navigate within popover content (context-dependent) |

## Best Practices

### Content Design
- Keep content concise and focused
- Use clear headings and sections for complex content
- Provide clear actions and navigation
- Consider mobile experience and touch targets

### Positioning
- Use appropriate placement based on screen position
- Test with different content sizes
- Ensure popovers don't extend outside viewport
- Consider responsive behavior

### User Experience
- Use hover for informational content
- Use click for interactive content
- Provide clear close mechanisms
- Avoid too many nested popovers

### Performance
- Lazy load complex content when possible
- Use portal rendering for proper layering
- Test with many simultaneous popovers
- Consider animation performance on lower-end devices

### Accessibility
- Always test with keyboard navigation
- Provide meaningful labels and descriptions
- Ensure sufficient color contrast
- Test with screen readers

## Examples

The Popover component enables rich contextual content display with intelligent positioning, supporting everything from simple tooltips to complex interactive interfaces with comprehensive customization and accessibility features.
