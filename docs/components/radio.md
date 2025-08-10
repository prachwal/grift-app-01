# Radio Component Documentation

## Overview
The Radio component provides accessible radio button inputs for single-selection scenarios. It features group management, validation states, custom styling, and comprehensive keyboard navigation. Perfect for forms, settings panels, and any interface requiring mutually exclusive choices.

## Features
- **Single Selection**: Mutually exclusive choices within radio groups
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Visual Variants**: Default, filled, and bordered styles with color options
- **Group Management**: Built-in RadioGroup component for managing related options
- **Custom Content**: Support for rich labels, descriptions, and custom layouts
- **Validation States**: Error, success, and warning states with visual feedback
- **Accessibility**: Full ARIA compliance with proper keyboard navigation and screen reader support
- **Dark Mode**: Complete dark theme compatibility
- **Controlled/Uncontrolled**: Support for both usage patterns

## Basic Usage

### Simple Radio Button
```typescript
import { Radio } from '@nebula/components'

function SimpleRadio() {
  return (
    <Radio 
      name="agreement" 
      value="yes" 
      label="I agree to the terms and conditions" 
    />
  )
}
```

### Radio Group
```typescript
import { RadioGroup, Radio } from '@nebula/components'
import { useState } from 'preact/hooks'

function BasicRadioGroup() {
  const [value, setValue] = useState('option1')
  
  return (
    <RadioGroup 
      value={value} 
      onChange={setValue}
      label="Choose an option"
    >
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  )
}
```

### Uncontrolled Radio Group
```typescript
import { RadioGroup, Radio } from '@nebula/components'

function UncontrolledRadioGroup() {
  return (
    <RadioGroup 
      defaultValue="medium"
      name="size"
      label="Select size"
      onChange={(value) => console.log('Selected:', value)}
    >
      <Radio value="small" label="Small" />
      <Radio value="medium" label="Medium" />
      <Radio value="large" label="Large" />
    </RadioGroup>
  )
}
```

## Sizes
The Radio component supports three sizes:

```typescript
<Radio size="sm" label="Small radio" />
<Radio size="md" label="Medium radio" />
<Radio size="lg" label="Large radio" />
```

## States and Variants

### Basic States
```typescript
<Radio label="Normal radio" />
<Radio checked label="Checked radio" />
<Radio disabled label="Disabled radio" />
<Radio disabled checked label="Disabled checked" />
```

### Validation States
```typescript
<Radio error label="Error state radio" />
<Radio success label="Success state radio" />
<Radio warning label="Warning state radio" />
```

### Visual Variants
```typescript
<Radio variant="default" label="Default style" />
<Radio variant="filled" label="Filled style" />
<Radio variant="bordered" label="Bordered style" />
```

### Color Options
```typescript
<Radio color="primary" label="Primary color" />
<Radio color="success" label="Success color" />
<Radio color="warning" label="Warning color" />
<Radio color="danger" label="Danger color" />
```

## Custom Content

### Rich Labels
```typescript
import { Radio } from '@nebula/components'

function RichLabelRadio() {
  return (
    <RadioGroup label="Choose your plan">
      <Radio 
        value="basic"
        label={
          <div>
            <div className="font-medium">Basic Plan</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              $9/month - Perfect for individuals
            </div>
          </div>
        }
      />
      <Radio 
        value="pro"
        label={
          <div>
            <div className="font-medium">Pro Plan</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              $29/month - Great for small teams
            </div>
          </div>
        }
      />
      <Radio 
        value="enterprise"
        label={
          <div>
            <div className="font-medium">Enterprise Plan</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              $99/month - For large organizations
            </div>
          </div>
        }
      />
    </RadioGroup>
  )
}
```

### With Description
```typescript
<RadioGroup label="Notification preferences">
  <Radio 
    value="email"
    label="Email notifications"
    description="Receive updates via email"
  />
  <Radio 
    value="push"
    label="Push notifications" 
    description="Get instant notifications on your device"
  />
  <Radio 
    value="none"
    label="No notifications"
    description="Don't send any notifications"
  />
</RadioGroup>
```

### Card-style Layout
```typescript
import { RadioGroup, Radio, Card } from '@nebula/components'
import { useState } from 'preact/hooks'

function CardRadioGroup() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  
  const plans = [
    {
      value: 'basic',
      name: 'Basic',
      price: '$9',
      features: ['5 projects', '10GB storage', 'Email support']
    },
    {
      value: 'pro',
      name: 'Pro',
      price: '$29',
      features: ['Unlimited projects', '100GB storage', 'Priority support']
    },
    {
      value: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      features: ['Unlimited everything', '1TB storage', '24/7 phone support']
    }
  ]
  
  return (
    <RadioGroup 
      value={selectedPlan} 
      onChange={setSelectedPlan}
      label="Choose your plan"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card 
            key={plan.value}
            className={`cursor-pointer transition-colors ${
              selectedPlan === plan.value 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                : 'hover:border-gray-400'
            }`}
            onClick={() => setSelectedPlan(plan.value)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <Radio 
                  value={plan.value}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <span className="text-2xl font-bold text-blue-600">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    per month
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </RadioGroup>
  )
}
```

## Form Integration

### Survey Form
```typescript
import { RadioGroup, Radio, Button, Label } from '@nebula/components'
import { useState } from 'preact/hooks'

function SurveyForm() {
  const [responses, setResponses] = useState({
    satisfaction: '',
    frequency: '',
    recommendation: ''
  })
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    console.log('Survey responses:', responses)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <RadioGroup
        label="How satisfied are you with our service?"
        value={responses.satisfaction}
        onChange={(value) => setResponses(prev => ({ ...prev, satisfaction: value }))}
        required
      >
        <Radio value="very-satisfied" label="Very satisfied" />
        <Radio value="satisfied" label="Satisfied" />
        <Radio value="neutral" label="Neutral" />
        <Radio value="dissatisfied" label="Dissatisfied" />
        <Radio value="very-dissatisfied" label="Very dissatisfied" />
      </RadioGroup>
      
      <RadioGroup
        label="How often do you use our product?"
        value={responses.frequency}
        onChange={(value) => setResponses(prev => ({ ...prev, frequency: value }))}
        required
      >
        <Radio value="daily" label="Daily" />
        <Radio value="weekly" label="Weekly" />
        <Radio value="monthly" label="Monthly" />
        <Radio value="rarely" label="Rarely" />
        <Radio value="never" label="Never" />
      </RadioGroup>
      
      <RadioGroup
        label="Would you recommend us to a friend?"
        value={responses.recommendation}
        onChange={(value) => setResponses(prev => ({ ...prev, recommendation: value }))}
        direction="horizontal"
        required
      >
        <Radio value="definitely" label="Definitely" />
        <Radio value="probably" label="Probably" />
        <Radio value="not-sure" label="Not sure" />
        <Radio value="probably-not" label="Probably not" />
        <Radio value="definitely-not" label="Definitely not" />
      </RadioGroup>
      
      <Button 
        type="submit" 
        disabled={!responses.satisfaction || !responses.frequency || !responses.recommendation}
        className="w-full"
      >
        Submit Survey
      </Button>
    </form>
  )
}
```

### Settings Panel
```typescript
import { RadioGroup, Radio, Card, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function SettingsPanel() {
  const [settings, setSettings] = useState({
    theme: 'auto',
    language: 'en',
    notifications: 'important',
    privacy: 'friends'
  })
  
  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <div className="p-6">
          <RadioGroup
            label="Theme Preference"
            value={settings.theme}
            onChange={(value) => setSettings(prev => ({ ...prev, theme: value }))}
          >
            <Radio 
              value="light" 
              label="Light theme"
              description="Always use light mode"
            />
            <Radio 
              value="dark" 
              label="Dark theme"
              description="Always use dark mode"
            />
            <Radio 
              value="auto" 
              label="Auto"
              description="Match system preference"
            />
          </RadioGroup>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <RadioGroup
            label="Language"
            value={settings.language}
            onChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
          >
            <Radio value="en" label="English" />
            <Radio value="es" label="Español" />
            <Radio value="fr" label="Français" />
            <Radio value="de" label="Deutsch" />
          </RadioGroup>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <RadioGroup
            label="Email Notifications"
            value={settings.notifications}
            onChange={(value) => setSettings(prev => ({ ...prev, notifications: value }))}
          >
            <Radio 
              value="all" 
              label="All notifications"
              description="Receive all email updates"
            />
            <Radio 
              value="important" 
              label="Important only"
              description="Only critical updates and security alerts"
            />
            <Radio 
              value="none" 
              label="None"
              description="Don't send any email notifications"
            />
          </RadioGroup>
        </div>
      </Card>
      
      <Button className="w-full">Save Settings</Button>
    </div>
  )
}
```

## Payment Method Selection
```typescript
import { RadioGroup, Radio, Card } from '@nebula/components'
import { useState } from 'preact/hooks'
import { CreditCard, Smartphone, Building } from 'lucide-preact'

function PaymentMethodSelector() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  const methods = [
    {
      value: 'card',
      name: 'Credit Card',
      description: 'Pay with Visa, Mastercard, or American Express',
      icon: CreditCard
    },
    {
      value: 'paypal',
      name: 'PayPal',
      description: 'Pay securely with your PayPal account',
      icon: Smartphone
    },
    {
      value: 'bank',
      name: 'Bank Transfer',
      description: 'Direct transfer from your bank account',
      icon: Building
    }
  ]
  
  return (
    <RadioGroup
      value={paymentMethod}
      onChange={setPaymentMethod}
      label="Select Payment Method"
    >
      <div className="space-y-3">
        {methods.map(method => (
          <Card 
            key={method.value}
            className={`cursor-pointer transition-all duration-200 ${
              paymentMethod === method.value
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-md'
                : 'hover:border-gray-400 hover:shadow-sm'
            }`}
            onClick={() => setPaymentMethod(method.value)}
          >
            <div className="p-4 flex items-center gap-4">
              <Radio value={method.value} />
              <method.icon 
                className={`w-8 h-8 ${
                  paymentMethod === method.value 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`} 
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {method.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </RadioGroup>
  )
}
```

## Props Reference

### Radio Props
| Prop             | Type                                              | Default     | Description                          |
| ---------------- | ------------------------------------------------- | ----------- | ------------------------------------ |
| `checked`        | `boolean`                                         | -           | Controlled checked state             |
| `defaultChecked` | `boolean`                                         | `false`     | Default checked state (uncontrolled) |
| `value`          | `string`                                          | -           | Value for use in radio groups        |
| `onChange`       | `(checked: boolean, e: Event) => void`            | -           | Change event handler                 |
| `label`          | `ComponentChild \| string`                        | -           | Radio label content                  |
| `description`    | `string`                                          | -           | Optional description text            |
| `disabled`       | `boolean`                                         | `false`     | Whether radio is disabled            |
| `error`          | `boolean`                                         | `false`     | Whether to show error state          |
| `success`        | `boolean`                                         | `false`     | Whether to show success state        |
| `warning`        | `boolean`                                         | `false`     | Whether to show warning state        |
| `size`           | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | Size variant                         |
| `variant`        | `'default' \| 'filled' \| 'bordered'`             | `'default'` | Visual style variant                 |
| `color`          | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color theme                          |
| `name`           | `string`                                          | -           | HTML name attribute                  |
| `id`             | `string`                                          | -           | HTML id attribute                    |
| `className`      | `string`                                          | -           | Additional CSS classes               |
| `required`       | `boolean`                                         | `false`     | Whether radio is required            |
| `autoFocus`      | `boolean`                                         | `false`     | Whether to auto-focus on mount       |

### RadioGroup Props
| Prop           | Type                         | Default      | Description                            |
| -------------- | ---------------------------- | ------------ | -------------------------------------- |
| `value`        | `string`                     | -            | Currently selected value               |
| `defaultValue` | `string`                     | -            | Default selected value                 |
| `onChange`     | `(value: string) => void`    | -            | Change handler for group               |
| `label`        | `string`                     | -            | Group label                            |
| `description`  | `string`                     | -            | Group description                      |
| `disabled`     | `boolean`                    | `false`      | Whether entire group is disabled       |
| `error`        | `boolean`                    | `false`      | Whether group has error state          |
| `required`     | `boolean`                    | `false`      | Whether group is required              |
| `direction`    | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction                       |
| `spacing`      | `'sm' \| 'md' \| 'lg'`       | `'md'`       | Spacing between items                  |
| `name`         | `string`                     | -            | Name attribute for all radios in group |
| `children`     | `ComponentChild`             | -            | Radio components                       |
| `className`    | `string`                     | -            | Additional CSS classes                 |

## Accessibility
The Radio component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `radio` role with `aria-checked` state
- **Keyboard Navigation**: Arrow keys navigate between radio buttons, Space/Enter selects
- **Screen Readers**: Proper label association and group announcements
- **Focus Management**: Proper focus indicators and roving tabindex
- **High Contrast**: Support for high contrast mode
- **Label Association**: Automatic label-input association via `for` attribute
- **Group Support**: Proper fieldset/legend structure for radio groups

## Examples

### Quiz Question
```typescript
import { RadioGroup, Radio, Button, Card } from '@nebula/components'
import { useState } from 'preact/hooks'

interface Question {
  id: string
  question: string
  options: Array<{
    value: string
    label: string
  }>
  correctAnswer: string
}

function QuizQuestion() {
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  
  const question: Question = {
    id: '1',
    question: 'What is the capital of France?',
    options: [
      { value: 'london', label: 'London' },
      { value: 'berlin', label: 'Berlin' },
      { value: 'paris', label: 'Paris' },
      { value: 'madrid', label: 'Madrid' }
    ],
    correctAnswer: 'paris'
  }
  
  const handleSubmit = () => {
    setShowResult(true)
  }
  
  const isCorrect = currentAnswer === question.correctAnswer
  
  return (
    <Card className="max-w-2xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Question 1: {question.question}
        </h3>
        
        <RadioGroup
          value={currentAnswer}
          onChange={setCurrentAnswer}
          className="mb-6"
        >
          {question.options.map(option => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={showResult}
              className={showResult ? (
                option.value === question.correctAnswer
                  ? 'bg-green-50 dark:bg-green-950 border-green-200'
                  : option.value === currentAnswer && !isCorrect
                  ? 'bg-red-50 dark:bg-red-950 border-red-200'
                  : ''
              ) : ''}
            />
          ))}
        </RadioGroup>
        
        {!showResult ? (
          <Button 
            onClick={handleSubmit}
            disabled={!currentAnswer}
          >
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${
              isCorrect 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect!'}
              {!isCorrect && (
                <div className="mt-1 text-sm">
                  The correct answer is: Paris
                </div>
              )}
            </div>
            <Button variant="primary" onClick={() => {
              setCurrentAnswer('')
              setShowResult(false)
            }}>
              Next Question
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
```
