# 📈 Steps Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Steps** to zaawansowany wizard nawigacyjny, który prowadzi użytkowników przez sekwencję kroków w sposób jasny i intuicyjny. Idealny do formularzy wieloetapowych, procesów onboardingu, przepływów zakupowych i innych scenariuszy wymagających etapowego postępu.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Multi-Step Navigation** - wizualna reprezentacja postępu w procesie
- **Status Indicators** - różne statusy kroków (wait, process, finish, error)
- **Horizontal/Vertical** - orientacja pozioma i pionowa
- **Clickable Steps** - opcjonalna nawigacja przez kliknięcie
- **Custom Icons** - możliwość dodania custom ikon dla każdego kroku
- **Progress Dots** - alternatywny widok z kropkami zamiast numerów
- **Size Variants** - różne rozmiary (default, small)
- **Dark Mode Support** - pełne wsparcie trybu ciemnego

### 🔄 Status Kroków
- **Wait** - krok oczekuje na wykonanie (nieaktywny)
- **Process** - krok aktualnie wykonywany
- **Finish** - krok zakończony pomyślnie
- **Error** - krok zakończony błędem

## 🔧 Instalacja i Import

```typescript
import { Steps, Step } from '@nebula/components'

// Definicja kroków
const steps = [
  { title: 'Account Setup', description: 'Create your account' },
  { title: 'Profile Info', description: 'Add personal information' },
  { title: 'Verification', description: 'Verify your email' },
  { title: 'Complete', description: 'Setup finished' }
]
```

## 📝 Podstawowe Użycie

### 1. Podstawowy Steps

```typescript
function BasicSteps() {
  const [current, setCurrent] = useState(0)

  const steps = [
    { title: 'Start', description: 'Begin the process' },
    { title: 'Configure', description: 'Set up your preferences' },
    { title: 'Review', description: 'Check your settings' },
    { title: 'Finish', description: 'Complete setup' }
  ]

  return (
    <div className="space-y-6">
      <Steps
        current={current}
        steps={steps}
        onChange={setCurrent}
      />
      
      <div className="flex gap-4">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
          disabled={current === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
```

### 2. Form Wizard

```typescript
function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personal: {},
    contact: {},
    preferences: {}
  })

  const steps = [
    { 
      title: 'Personal Info',
      description: 'Your basic information'
    },
    { 
      title: 'Contact Details',
      description: 'How to reach you'
    },
    { 
      title: 'Preferences',
      description: 'Your settings and preferences'
    },
    { 
      title: 'Review',
      description: 'Confirm your information'
    }
  ]

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const validateCurrentStep = () => {
    // Add your validation logic here
    return true
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm data={formData.personal} onChange={(data) => 
          setFormData(prev => ({ ...prev, personal: data }))} 
        />
      case 1:
        return <ContactForm data={formData.contact} onChange={(data) => 
          setFormData(prev => ({ ...prev, contact: data }))} 
        />
      case 2:
        return <PreferencesForm data={formData.preferences} onChange={(data) => 
          setFormData(prev => ({ ...prev, preferences: data }))} 
        />
      case 3:
        return <ReviewForm data={formData} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Steps
        current={currentStep}
        steps={steps}
        onChange={setCurrentStep}
        size="default"
      />
      
      <div className="mt-8 min-h-96">
        {renderStepContent()}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-6 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        
        {currentStep === steps.length - 1 ? (
          <button
            onClick={() => console.log('Submit form:', formData)}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
```

### 3. Vertical Steps

```typescript
function VerticalSteps() {
  const [current, setCurrent] = useState(1)

  const steps = [
    {
      title: 'Order Placed',
      description: 'Your order has been received',
      icon: <CheckCircleIcon className="w-5 h-5" />
    },
    {
      title: 'Processing',
      description: 'We are preparing your items',
      icon: <ClockIcon className="w-5 h-5" />
    },
    {
      title: 'Shipped',
      description: 'Your order is on the way',
      icon: <TruckIcon className="w-5 h-5" />
    },
    {
      title: 'Delivered',
      description: 'Package delivered successfully',
      icon: <HomeIcon className="w-5 h-5" />
    }
  ]

  return (
    <div className="flex gap-8">
      <div className="w-80">
        <Steps
          current={current}
          steps={steps}
          direction="vertical"
          onChange={setCurrent}
        />
      </div>
      
      <div className="flex-1 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          {steps[current].title}
        </h3>
        <p className="text-gray-600 mb-6">
          {steps[current].description}
        </p>
        
        {/* Step-specific content */}
        <StepContent step={current} />
      </div>
    </div>
  )
}
```

## 🎨 Zaawansowane Przykłady

### 1. Steps z Error Handling

```typescript
function StepsWithErrors() {
  const [current, setCurrent] = useState(0)
  const [stepStatus, setStepStatus] = useState<Record<number, StepStatus>>({})

  const steps = [
    { title: 'Validate Data', description: 'Check input data' },
    { title: 'Process', description: 'Execute the operation' },
    { title: 'Verify', description: 'Confirm results' },
    { title: 'Complete', description: 'Finish process' }
  ]

  const processStep = async (stepIndex: number) => {
    setStepStatus(prev => ({ ...prev, [stepIndex]: 'process' }))
    
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate random error for demo
      if (Math.random() > 0.7) {
        throw new Error('Processing failed')
      }
      
      setStepStatus(prev => ({ ...prev, [stepIndex]: 'finish' }))
      
      if (stepIndex < steps.length - 1) {
        setCurrent(stepIndex + 1)
      }
    } catch (error) {
      setStepStatus(prev => ({ ...prev, [stepIndex]: 'error' }))
    }
  }

  const retryStep = (stepIndex: number) => {
    setStepStatus(prev => ({ ...prev, [stepIndex]: 'wait' }))
    processStep(stepIndex)
  }

  return (
    <div className="space-y-6">
      <Steps
        current={current}
        status={stepStatus[current] || 'wait'}
        steps={steps.map((step, index) => ({
          ...step,
          status: stepStatus[index]
        }))}
      />
      
      <div className="p-6 bg-white border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Step {current + 1}: {steps[current].title}
        </h3>
        
        {stepStatus[current] === 'process' && (
          <div className="flex items-center gap-3">
            <LoadingSpinner />
            <span>Processing...</span>
          </div>
        )}
        
        {stepStatus[current] === 'error' && (
          <div className="text-red-600">
            <p className="mb-3">❌ Processing failed</p>
            <button
              onClick={() => retryStep(current)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}
        
        {stepStatus[current] === 'finish' && (
          <div className="text-green-600">
            ✅ Step completed successfully
          </div>
        )}
        
        {!stepStatus[current] || stepStatus[current] === 'wait' && (
          <button
            onClick={() => processStep(current)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Start {steps[current].title}
          </button>
        )}
      </div>
    </div>
  )
}
```

### 2. Custom Icons i Progress Dots

```typescript
function CustomIconSteps() {
  const [current, setCurrent] = useState(0)
  const [useProgressDots, setUseProgressDots] = useState(false)

  const steps = [
    {
      title: 'Account',
      description: 'Create account',
      icon: <UserIcon className="w-5 h-5" />
    },
    {
      title: 'Payment',
      description: 'Add payment method', 
      icon: <CreditCardIcon className="w-5 h-5" />
    },
    {
      title: 'Shipping',
      description: 'Shipping details',
      icon: <TruckIcon className="w-5 h-5" />
    },
    {
      title: 'Confirmation',
      description: 'Confirm order',
      icon: <CheckCircleIcon className="w-5 h-5" />
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useProgressDots}
            onChange={(e) => setUseProgressDots(e.target.checked)}
          />
          Use Progress Dots
        </label>
      </div>

      <Steps
        current={current}
        steps={steps}
        progressDot={useProgressDots}
        onChange={setCurrent}
        size="default"
      />

      {/* Custom progress dot renderer */}
      {useProgressDots && (
        <Steps
          current={current}
          steps={steps}
          progressDot={(index, status) => (
            <div className={`
              w-3 h-3 rounded-full border-2 
              ${status === 'finish' ? 'bg-green-500 border-green-500' : 
                status === 'process' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                status === 'error' ? 'bg-red-500 border-red-500' :
                'bg-gray-200 border-gray-300'}
            `} />
          )}
          onChange={setCurrent}
        />
      )}
      
      <div className="flex justify-between">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
          disabled={current === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
```

### 3. Responsive Mobile Steps

```typescript
function ResponsiveSteps() {
  const [current, setCurrent] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const steps = [
    { title: 'Info', description: 'Basic information' },
    { title: 'Payment', description: 'Payment details' },
    { title: 'Review', description: 'Review order' },
    { title: 'Complete', description: 'Order placed' }
  ]

  // Mobile: show only current step and progress
  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Current step info */}
        <div className="text-center">
          <div className="text-sm text-gray-500">
            Step {current + 1} of {steps.length}
          </div>
          <h3 className="text-lg font-semibold">
            {steps[current].title}
          </h3>
          <p className="text-gray-600">
            {steps[current].description}
          </p>
        </div>

        <StepContent stepIndex={current} />
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
            disabled={current === steps.length - 1}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  // Desktop: full steps component
  return (
    <Steps
      current={current}
      steps={steps}
      onChange={setCurrent}
      size="default"
    />
  )
}
```

## 🔌 Props API

### StepsProps

| Prop          | Type                                                      | Default        | Opis                                |
| ------------- | --------------------------------------------------------- | -------------- | ----------------------------------- |
| `current`     | `number`                                                  | `0`            | Indeks aktualnego kroku (0-indexed) |
| `status`      | `'wait' \| 'process' \| 'finish' \| 'error'`              | `'process'`    | Status aktualnego kroku             |
| `direction`   | `'horizontal' \| 'vertical'`                              | `'horizontal'` | Orientacja kroków                   |
| `size`        | `'default' \| 'small'`                                    | `'default'`    | Rozmiar komponentu                  |
| `progressDot` | `boolean \| (index: number, status: string) => ReactNode` | `false`        | Custom renderer dla progress dots   |
| `onChange`    | `(current: number) => void`                               | -              | Callback zmiany aktualnego kroku    |
| `steps`       | `StepData[]`                                              | -              | **Required**. Lista kroków          |
| `className`   | `string`                                                  | -              | Dodatkowe klasy CSS                 |

### StepData

| Prop          | Type                                         | Default | Opis                      |
| ------------- | -------------------------------------------- | ------- | ------------------------- |
| `title`       | `string`                                     | -       | **Required**. Tytuł kroku |
| `description` | `string`                                     | -       | Opis kroku                |
| `icon`        | `ReactNode`                                  | -       | Custom ikona kroku        |
| `status`      | `'wait' \| 'process' \| 'finish' \| 'error'` | -       | Status konkretnego kroku  |
| `disabled`    | `boolean`                                    | `false` | Czy krok jest nieaktywny  |

### StepProps (pojedynczy Step)

| Prop          | Type                                         | Default  | Opis                      |
| ------------- | -------------------------------------------- | -------- | ------------------------- |
| `title`       | `string`                                     | -        | **Required**. Tytuł kroku |
| `description` | `string`                                     | -        | Opis kroku                |
| `icon`        | `ReactNode`                                  | -        | Custom ikona              |
| `status`      | `'wait' \| 'process' \| 'finish' \| 'error'` | `'wait'` | Status kroku              |
| `disabled`    | `boolean`                                    | `false`  | Czy krok jest nieaktywny  |
| `onClick`     | `() => void`                                 | -        | Callback kliknięcia kroku |

## ♿ Dostępność (Accessibility)

### ARIA Navigation
```html
<div role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="4">
  <ol role="list" aria-label="Progress steps">
    <li role="listitem">
      <button 
        aria-current="step"
        aria-describedby="step-1-desc"
      >
        Step 1
      </button>
      <div id="step-1-desc">Description of step 1</div>
    </li>
  </ol>
</div>
```

### Keyboard Support
- **Tab** - nawigacja między kroklikowymi krokami
- **Enter/Space** - aktywacja kroku
- **Left/Right Arrows** - nawigacja między krokami (horizontal)
- **Up/Down Arrows** - nawigacja między krokami (vertical)

### Screen Reader Support
- Progres ogłaszany jako "Step X of Y"
- Status każdego kroku jest opisywany
- Aria-current wskazuje aktualny krok
- Opisowe labele dla każdego kroku

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/preact'
import { Steps } from '../Steps'

describe('Steps', () => {
  const defaultSteps = [
    { title: 'Step 1', description: 'First step' },
    { title: 'Step 2', description: 'Second step' },
    { title: 'Step 3', description: 'Third step' }
  ]

  test('renders all steps', () => {
    render(<Steps current={0} steps={defaultSteps} />)
    
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  test('highlights current step', () => {
    render(<Steps current={1} steps={defaultSteps} />)
    
    const currentStep = screen.getByText('Step 2').closest('button')
    expect(currentStep).toHaveAttribute('aria-current', 'step')
  })

  test('calls onChange when step is clicked', () => {
    const onChange = vi.fn()
    render(<Steps current={0} steps={defaultSteps} onChange={onChange} />)
    
    fireEvent.click(screen.getByText('Step 2'))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  test('shows correct status for each step', () => {
    const stepsWithStatus = [
      { title: 'Completed', status: 'finish' },
      { title: 'Current', status: 'process' },
      { title: 'Waiting', status: 'wait' },
      { title: 'Error', status: 'error' }
    ]

    render(<Steps current={1} steps={stepsWithStatus} />)
    
    expect(screen.getByText('Completed')).toHaveClass('step-finish')
    expect(screen.getByText('Current')).toHaveClass('step-process')
    expect(screen.getByText('Error')).toHaveClass('step-error')
  })
})
```

### Integration Testing

```typescript
describe('Steps Integration', () => {
  test('works with form wizard', () => {
    const FormWizard = () => {
      const [current, setCurrent] = useState(0)
      const steps = [
        { title: 'Personal', description: 'Personal info' },
        { title: 'Contact', description: 'Contact details' }
      ]

      return (
        <div>
          <Steps current={current} steps={steps} onChange={setCurrent} />
          <div>
            {current === 0 && <input data-testid="personal-form" />}
            {current === 1 && <input data-testid="contact-form" />}
          </div>
        </div>
      )
    }

    render(<FormWizard />)
    
    expect(screen.getByTestId('personal-form')).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Contact'))
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })
})
```

## 🎨 Styling i Customizacja

### CSS Classes

```css
/* Steps container */
.nebula-steps {
  @apply flex items-start;
}

.nebula-steps[data-direction="vertical"] {
  @apply flex-col;
}

/* Single step */
.nebula-step {
  @apply flex items-center relative;
}

.nebula-step:not(:last-child)::after {
  @apply absolute top-4 left-8 w-full h-px bg-gray-200;
  content: '';
}

/* Step indicator */
.nebula-step-indicator {
  @apply w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium;
}

.nebula-step-indicator[data-status="wait"] {
  @apply bg-white border-gray-300 text-gray-500;
}

.nebula-step-indicator[data-status="process"] {
  @apply bg-blue-500 border-blue-500 text-white;
}

.nebula-step-indicator[data-status="finish"] {
  @apply bg-green-500 border-green-500 text-white;
}

.nebula-step-indicator[data-status="error"] {
  @apply bg-red-500 border-red-500 text-white;
}

/* Step content */
.nebula-step-content {
  @apply ml-3;
}

.nebula-step-title {
  @apply text-sm font-medium text-gray-900;
}

.nebula-step-description {
  @apply text-xs text-gray-500 mt-0.5;
}
```

### Custom Theme

```typescript
function ThemedSteps() {
  return (
    <Steps
      current={1}
      steps={steps}
      className="
        p-6 bg-gradient-to-r from-blue-50 to-purple-50 
        dark:from-blue-900/20 dark:to-purple-900/20 
        rounded-xl border border-blue-200 dark:border-blue-800
      "
    />
  )
}
```

## 📊 Performance

### Optymalizacje
- Memoized step components
- Efficient status calculations
- Optimized re-renders
- Lazy content loading

### Bundle Size
- Core: ~3.2KB (gzipped)
- Z ikonami: ~4.1KB (gzipped)  
- Tree-shakable components

## 🔗 Powiązane Komponenty

- **[Breadcrumb](/breadcrumb)** - hierarchiczna nawigacja
- **[Tabs](/tabs)** - organizacja treści w zakładki
- **[Pagination](/pagination)** - nawigacja po stronach danych

## 📚 Dodatkowe Zasoby

- [Material Design Stepper](https://material.io/archive/guidelines/components/steppers.html)
- [Ant Design Steps](https://ant.design/components/steps/)
- [ARIA Progress Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/)
