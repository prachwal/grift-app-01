# Collapse Component Documentation

## Overview
The Collapse component provides collapsible content areas with smooth animations, support for accordion behavior, and customizable triggers. Perfect for FAQ sections, navigation menus, and content organization.

## Features
- **Smooth Animations** - CSS-based expand/collapse transitions
- **Accordion Mode** - Multiple panels with exclusive opening
- **Custom Triggers** - Flexible trigger button customization
- **Controlled/Uncontrolled** - Both controlled and uncontrolled modes
- **Nested Support** - Collapsible content within collapsible content
- **Accessibility** - Full ARIA support and keyboard navigation
- **Icon Support** - Customizable expand/collapse icons
- **Dark Mode** - Complete dark mode compatibility

## Basic Usage

```tsx
import { Collapse } from '@/nebula/components/Collapse'

export function BasicCollapseExample() {
  return (
    <Collapse>
      <Collapse.Panel key="1" header="What is Nebula UI?">
        <p>Nebula UI is a modern, accessible component library built with Preact and TypeScript.</p>
      </Collapse.Panel>
      
      <Collapse.Panel key="2" header="How do I get started?">
        <p>Install Nebula UI via npm and import the components you need in your project.</p>
      </Collapse.Panel>
      
      <Collapse.Panel key="3" header="Is it free to use?">
        <p>Yes! Nebula UI is open source and free to use in both personal and commercial projects.</p>
      </Collapse.Panel>
    </Collapse>
  )
}
```

## Accordion Mode

In accordion mode, only one panel can be open at a time:

```tsx
export function AccordionExample() {
  return (
    <Collapse accordion>
      <Collapse.Panel key="profile" header="Profile Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="Enter your email" />
          </div>
        </div>
      </Collapse.Panel>
      
      <Collapse.Panel key="security" header="Security Settings">
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Enable two-factor authentication
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Email notifications for logins
            </label>
          </div>
        </div>
      </Collapse.Panel>
      
      <Collapse.Panel key="notifications" header="Notification Preferences">
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Email notifications
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Push notifications
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              SMS notifications
            </label>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  )
}
```

## Controlled Mode

Control the collapse state programmatically:

```tsx
import { useState } from 'preact/hooks'

export function ControlledCollapseExample() {
  const [activeKeys, setActiveKeys] = useState<string[]>(['panel1'])

  const handleChange = (keys: string[]) => {
    setActiveKeys(keys)
    console.log('Active panels:', keys)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveKeys(['panel1'])}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Panel 1
        </button>
        <button
          onClick={() => setActiveKeys(['panel2'])}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Open Panel 2
        </button>
        <button
          onClick={() => setActiveKeys([])}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close All
        </button>
      </div>

      <Collapse activeKey={activeKeys} onChange={handleChange}>
        <Collapse.Panel key="panel1" header="Controlled Panel 1">
          <p>This panel is controlled by external buttons and state.</p>
        </Collapse.Panel>
        
        <Collapse.Panel key="panel2" header="Controlled Panel 2">
          <p>The active state is managed by the parent component.</p>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}
```

## Custom Headers

Customize panel headers with additional content:

```tsx
export function CustomHeaderExample() {
  return (
    <Collapse>
      <Collapse.Panel 
        key="1" 
        header={
          <div className="flex items-center justify-between w-full">
            <span className="font-medium">User Profile</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Personal Information</span>
          </div>
        }
      >
        <div className="space-y-3">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      </Collapse.Panel>
      
      <Collapse.Panel 
        key="2" 
        header={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span className="font-medium">System Status</span>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Online</span>
          </div>
        }
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>CPU Usage:</span>
            <span className="font-mono">45%</span>
          </div>
          <div className="flex justify-between">
            <span>Memory Usage:</span>
            <span className="font-mono">2.1 GB / 8 GB</span>
          </div>
          <div className="flex justify-between">
            <span>Uptime:</span>
            <span className="font-mono">72 hours</span>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  )
}
```

## Nested Collapse

Create nested collapsible structures:

```tsx
export function NestedCollapseExample() {
  return (
    <Collapse>
      <Collapse.Panel key="documentation" header="Documentation">
        <div className="ml-4">
          <Collapse size="small">
            <Collapse.Panel key="getting-started" header="Getting Started">
              <ul className="space-y-2">
                <li>• Installation</li>
                <li>• Quick Start Guide</li>
                <li>• Basic Configuration</li>
              </ul>
            </Collapse.Panel>
            
            <Collapse.Panel key="components" header="Components">
              <div className="ml-4">
                <Collapse size="small">
                  <Collapse.Panel key="buttons" header="Buttons">
                    <p>Button component documentation and examples.</p>
                  </Collapse.Panel>
                  
                  <Collapse.Panel key="forms" header="Forms">
                    <p>Form components including inputs, selects, and validation.</p>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
      </Collapse.Panel>
      
      <Collapse.Panel key="support" header="Support & Help">
        <div className="space-y-3">
          <p>Need help? Here are your options:</p>
          <ul className="space-y-2 ml-4">
            <li>• Check our FAQ section</li>
            <li>• Search the documentation</li>
            <li>• Contact support team</li>
            <li>• Join our community forum</li>
          </ul>
        </div>
      </Collapse.Panel>
    </Collapse>
  )
}
```

## Size Variants

```tsx
export function SizeVariantsExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <Collapse size="small">
          <Collapse.Panel key="1" header="Small Panel">
            <p>This is a small-sized collapse panel with compact spacing.</p>
          </Collapse.Panel>
        </Collapse>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Default)</h3>
        <Collapse size="medium">
          <Collapse.Panel key="1" header="Medium Panel">
            <p>This is a medium-sized collapse panel with standard spacing.</p>
          </Collapse.Panel>
        </Collapse>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <Collapse size="large">
          <Collapse.Panel key="1" header="Large Panel">
            <p>This is a large-sized collapse panel with generous spacing.</p>
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  )
}
```

## Disabled Panels

```tsx
export function DisabledPanelsExample() {
  return (
    <Collapse>
      <Collapse.Panel key="1" header="Active Panel">
        <p>This panel is active and can be opened/closed.</p>
      </Collapse.Panel>
      
      <Collapse.Panel key="2" header="Disabled Panel" disabled>
        <p>This panel is disabled and cannot be opened.</p>
      </Collapse.Panel>
      
      <Collapse.Panel key="3" header="Another Active Panel">
        <p>This panel is also active.</p>
      </Collapse.Panel>
    </Collapse>
  )
}
```

## Ghost Style

Borderless collapse for minimal design:

```tsx
export function GhostStyleExample() {
  return (
    <Collapse ghost>
      <Collapse.Panel key="1" header="Ghost Panel 1">
        <p>This collapse has no border or background for a minimal look.</p>
      </Collapse.Panel>
      
      <Collapse.Panel key="2" header="Ghost Panel 2">
        <p>Perfect for clean, minimal interfaces where borders would be distracting.</p>
      </Collapse.Panel>
    </Collapse>
  )
}
```

## FAQ Example

```tsx
export function FAQExample() {
  const faqData = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in original packaging. Returns are free for defective items, and a small fee applies for other returns."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available and takes 1-2 business days. Free shipping is available on orders over $50."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs vary by destination and are calculated at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with a tracking number. You can also track your order by logging into your account on our website."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay."
    }
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions about our service
        </p>
      </div>
      
      <Collapse accordion>
        {faqData.map((faq, index) => (
          <Collapse.Panel key={index} header={faq.question}>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  )
}
```

## Props API

### Collapse Props

| Prop               | Type                                     | Default    | Description                             |
| ------------------ | ---------------------------------------- | ---------- | --------------------------------------- |
| `activeKey`        | `string \| string[]`                     | -          | Active panel key(s) for controlled mode |
| `defaultActiveKey` | `string \| string[]`                     | -          | Default active panel key(s)             |
| `accordion`        | `boolean`                                | `false`    | Accordion mode (only one panel open)    |
| `bordered`         | `boolean`                                | `true`     | Show border around panels               |
| `ghost`            | `boolean`                                | `false`    | Borderless style                        |
| `size`             | `'small' \| 'medium' \| 'large'`         | `'medium'` | Size of the collapse panels             |
| `expandIcon`       | `(isActive: boolean) => React.ReactNode` | -          | Custom expand icon                      |
| `onChange`         | `(key: string \| string[]) => void`      | -          | Panel change callback                   |
| `className`        | `string`                                 | -          | Additional CSS classes                  |

### Panel Props

| Prop          | Type              | Default | Description                         |
| ------------- | ----------------- | ------- | ----------------------------------- |
| `key`         | `string`          | -       | Unique identifier for the panel     |
| `header`      | `React.ReactNode` | -       | Panel header content                |
| `disabled`    | `boolean`         | `false` | Whether the panel is disabled       |
| `showArrow`   | `boolean`         | `true`  | Show/hide the expand arrow          |
| `extra`       | `React.ReactNode` | -       | Extra content in the header         |
| `forceRender` | `boolean`         | `false` | Force render content when collapsed |
| `className`   | `string`          | -       | Additional CSS classes              |
| `children`    | `React.ReactNode` | -       | Panel content                       |

## Accessibility

The Collapse component includes comprehensive accessibility features:

- **ARIA Attributes** - Proper `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes
- **Keyboard Navigation** - Full keyboard support with Enter/Space to toggle
- **Focus Management** - Proper focus indicators and management
- **Screen Reader Support** - Descriptive labels and state announcements
- **Semantic HTML** - Uses proper heading and button elements

### Keyboard Shortcuts
- `Tab` / `Shift + Tab` - Navigate between panel headers
- `Enter` / `Space` - Toggle panel open/closed
- `Home` - Focus first panel
- `End` - Focus last panel

## Best Practices

1. **Clear Headers** - Use descriptive headers that clearly indicate the content
2. **Logical Grouping** - Group related content together in panels
3. **Performance** - Use `forceRender` sparingly to avoid rendering hidden content
4. **Consistent Behavior** - Choose either accordion or multi-panel mode consistently
5. **Content Length** - Keep panel content reasonably sized for good user experience
6. **Loading States** - Consider loading states for dynamic content
7. **Mobile Optimization** - Ensure touch targets are large enough on mobile devices

The Collapse component is perfect for organizing content, creating FAQ sections, building navigation menus, and any scenario where you need to save space while providing access to detailed information.
