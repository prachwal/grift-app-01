# 📊 Progress Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Progress** to zaawansowany wskaźnik postępu, który informuje użytkowników o stanie trwających operacji. Zapewnia wizualny feedback podczas długotrwałych procesów, ładowania danych, przesyłania plików i innych czasochłonnych zadań.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Linear & Circular** - warianty liniowy i kołowy
- **Determinate & Indeterminate** - określony i nieokreślony postęp
- **Size Options** - rozmiary sm, md, lg dla różnych kontekstów
- **Color Variants** - kolory primary, secondary, success, warning, error
- **Label Display** - opcjonalne wyświetlanie etykiet i procentów
- **Smooth Animations** - płynne animacje przejść
- **ARIA Support** - pełna dostępność dla screen reader
- **Dark Mode Support** - natywne wsparcie trybu ciemnego

### 📈 Typy Progress
- **Linear** - poziomy pasek postępu dla standardowych operacji
- **Circular** - okrągły wskaźnik dla kompaktowych przestrzeni
- **Determinate** - gdy znamy dokładny postęp (0-100%)
- **Indeterminate** - gdy czas trwania jest nieznany

## 🚀 Podstawowe Użycie

### Linear Progress
```tsx
import { Progress } from '@nebula/components'

function BasicLinearProgress() {
  return (
    <div className="space-y-4">
      <Progress value={25} />
      <Progress value={50} color="success" />
      <Progress value={75} color="warning" showLabel />
      <Progress value={90} color="error" showLabel label="Upload" />
    </div>
  )
}
```

### Circular Progress
```tsx
function BasicCircularProgress() {
  return (
    <div className="flex space-x-6">
      <Progress variant="circular" value={30} />
      <Progress variant="circular" value={65} color="success" />
      <Progress variant="circular" value={85} color="warning" showLabel />
    </div>
  )
}
```

### Indeterminate Progress
```tsx
function IndeterminateProgress() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Loading data...</p>
        <Progress indeterminate />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Processing...</p>
        <Progress variant="circular" indeterminate size="lg" />
      </div>
    </div>
  )
}
```

## 🎛️ Warianty i Konfiguracja

### Rozmiary
```tsx
function SizeVariants() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-600 mb-2">Small (sm)</p>
        <Progress value={60} size="sm" />
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-2">Medium (md) - Default</p>
        <Progress value={60} size="md" />
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-2">Large (lg)</p>
        <Progress value={60} size="lg" />
      </div>
    </div>
  )
}
```

### Kolory
```tsx
function ColorVariants() {
  return (
    <div className="space-y-4">
      <Progress value={60} color="primary" label="Primary" showLabel />
      <Progress value={60} color="secondary" label="Secondary" showLabel />
      <Progress value={60} color="success" label="Success" showLabel />
      <Progress value={60} color="warning" label="Warning" showLabel />
      <Progress value={60} color="error" label="Error" showLabel />
    </div>
  )
}
```

### Circular z Różnymi Rozmiarami
```tsx
function CircularSizes() {
  return (
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <Progress variant="circular" value={75} size="sm" />
        <p className="text-xs text-gray-500 mt-1">Small</p>
      </div>
      
      <div className="text-center">
        <Progress variant="circular" value={75} size="md" showLabel />
        <p className="text-xs text-gray-500 mt-1">Medium</p>
      </div>
      
      <div className="text-center">
        <Progress variant="circular" value={75} size="lg" showLabel />
        <p className="text-xs text-gray-500 mt-1">Large</p>
      </div>
    </div>
  )
}
```

## 🎨 Praktyczne Przykłady

### File Upload Progress
```tsx
import { useState, useEffect } from 'preact/hooks'

function FileUploadProgress() {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  
  const handleUpload = () => {
    setIsUploading(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }
  
  return (
    <div className="space-y-4">
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Click to upload file</p>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
        
        {isUploading && (
          <div className="mt-4 space-y-2">
            <Progress 
              value={progress} 
              color="success" 
              showLabel 
              label={`Uploading ${Math.round(progress)}%`}
            />
            <p className="text-xs text-gray-500">
              {progress < 100 ? `${Math.round(progress)}% completed` : 'Upload completed!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
```

### Multi-Step Process
```tsx
function MultiStepProgress() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    'Personal Info',
    'Address Details', 
    'Payment Method',
    'Confirmation'
  ]
  
  const progress = ((currentStep + 1) / steps.length) * 100
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} color="primary" />
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800">
          {steps[currentStep]}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Complete this step to continue
        </p>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 text-gray-600 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
```

### Loading States Dashboard
```tsx
function LoadingDashboard() {
  const [loadingStates, setLoadingStates] = useState({
    users: false,
    analytics: false,
    reports: false
  })
  
  const [progress, setProgress] = useState({
    users: 0,
    analytics: 0,
    reports: 0
  })
  
  const simulateLoading = (type: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [type]: true }))
    setProgress(prev => ({ ...prev, [type]: 0 }))
    
    const interval = setInterval(() => {
      setProgress(prev => ({
        ...prev,
        [type]: Math.min(100, prev[type] + Math.random() * 20)
      }))
    }, 300)
    
    setTimeout(() => {
      clearInterval(interval)
      setLoadingStates(prev => ({ ...prev, [type]: false }))
      setProgress(prev => ({ ...prev, [type]: 100 }))
    }, 3000)
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(loadingStates).map(([key, isLoading]) => (
        <div key={key} className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold capitalize">{key}</h3>
            <button
              onClick={() => simulateLoading(key as keyof typeof loadingStates)}
              disabled={isLoading}
              className="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          </div>
          
          {isLoading ? (
            <Progress 
              value={progress[key as keyof typeof progress]} 
              color="primary" 
              showLabel 
            />
          ) : (
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: progress[key as keyof typeof progress] === 100 ? '100%' : '0%' }}
              />
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-2">
            {isLoading ? 'Loading data...' : 
             progress[key as keyof typeof progress] === 100 ? 'Data loaded!' : 'Ready to load'}
          </p>
        </div>
      ))}
    </div>
  )
}
```

### Circular Progress with Custom Content
```tsx
function CircularProgressWithContent() {
  const [score, setScore] = useState(85)
  
  return (
    <div className="flex justify-center space-x-8">
      <div className="text-center">
        <div className="relative inline-block">
          <Progress 
            variant="circular" 
            value={score} 
            color="success"
            size="lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{score}</div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Performance</p>
      </div>
      
      <div className="text-center">
        <div className="relative inline-block">
          <Progress 
            variant="circular" 
            value={67} 
            color="warning"
            size="lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">67%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Project</p>
      </div>
    </div>
  )
}
```

### Progress with Animation Control
```tsx
function AnimatedProgressControl() {
  const [value, setValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const startAnimation = () => {
    setIsAnimating(true)
    setValue(0)
    
    const interval = setInterval(() => {
      setValue(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnimating(false)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Animation Demo</h3>
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isAnimating ? 'Animating...' : 'Start Animation'}
        </button>
      </div>
      
      <div className="space-y-2">
        <Progress 
          value={value} 
          color="primary" 
          showLabel 
          label={`Progress: ${Math.round(value)}%`}
        />
        
        <div className="flex justify-between text-sm text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Progress 
          variant="circular" 
          value={value} 
          color="success" 
          size="lg"
          showLabel
        />
      </div>
    </div>
  )
}
```

## 🎛️ API Reference

### Props

| Prop            | Type                                                            | Default     | Opis                               |
| --------------- | --------------------------------------------------------------- | ----------- | ---------------------------------- |
| `value`         | `number`                                                        | `0`         | Wartość postępu (0-100)            |
| `variant`       | `'linear' \| 'circular'`                                        | `'linear'`  | Typ wskaźnika postępu              |
| `size`          | `'sm' \| 'md' \| 'lg'`                                          | `'md'`      | Rozmiar komponentu                 |
| `color`         | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Kolor wskaźnika                    |
| `indeterminate` | `boolean`                                                       | `false`     | Czy postęp jest nieokreślony       |
| `showLabel`     | `boolean`                                                       | `false`     | Czy pokazywać etykietę z procentem |
| `label`         | `string`                                                        | -           | Custom etykieta                    |
| `className`     | `string`                                                        | -           | Dodatkowe klasy CSS                |
| `max`           | `number`                                                        | `100`       | Maksymalna wartość                 |

### CSS Classes

**Bazowe klasy:**
- `.progress` - główna klasa komponentu
- `.progress-linear` - dla wariantu liniowego
- `.progress-circular` - dla wariantu kołowego

**Rozmiary:**
- `.progress-sm` - mały rozmiar
- `.progress-md` - średni rozmiar (domyślny)  
- `.progress-lg` - duży rozmiar

**Kolory:**
- `.progress-primary` - główny kolor
- `.progress-secondary` - drugorzędny kolor
- `.progress-success` - zielony sukces
- `.progress-warning` - pomarańczowe ostrzeżenie
- `.progress-error` - czerwony błąd

**Stany:**
- `.progress-indeterminate` - animacja nieokreślonego postępu
- `.progress-with-label` - z etykietą

## ♿ Accessibility

### ARIA Support
```tsx
function AccessibleProgress() {
  const progress = 75
  
  return (
    <div>
      <div className="mb-2">
        <label id="progress-label" className="text-sm font-medium text-gray-700">
          File Upload
        </label>
      </div>
      
      <Progress
        value={progress}
        aria-labelledby="progress-label"
        aria-describedby="progress-description"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-valuetext={`${progress} percent complete`}
      />
      
      <div id="progress-description" className="text-xs text-gray-500 mt-1">
        Upload in progress, please wait
      </div>
    </div>
  )
}
```

### Screen Reader Support
```tsx
function ScreenReaderFriendly() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle')
  
  useEffect(() => {
    if (status === 'uploading') {
      const announcements = [25, 50, 75, 100]
      announcements.forEach((milestone, index) => {
        setTimeout(() => {
          if (progress >= milestone) {
            // Screen reader announcement
            const announcement = document.createElement('div')
            announcement.setAttribute('aria-live', 'polite')
            announcement.textContent = `Upload ${milestone}% complete`
            document.body.appendChild(announcement)
            setTimeout(() => document.body.removeChild(announcement), 1000)
          }
        }, index * 1000)
      })
    }
  }, [status, progress])
  
  return (
    <div>
      <Progress 
        value={progress} 
        aria-live="polite"
        aria-atomic="false"
      />
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {status === 'complete' && 'Upload completed successfully'}
        {status === 'error' && 'Upload failed, please try again'}
      </div>
    </div>
  )
}
```

### Keyboard Navigation
```tsx
function KeyboardAccessibleProgress() {
  const [progress, setProgress] = useState(50)
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setProgress(Math.max(0, progress - 10))}
          className="px-2 py-1 text-sm bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Decrease progress by 10%"
        >
          -10%
        </button>
        <button
          onClick={() => setProgress(Math.min(100, progress + 10))}  
          className="px-2 py-1 text-sm bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Increase progress by 10%"
        >
          +10%
        </button>
      </div>
      
      <Progress
        value={progress}
        showLabel
        aria-label="Progress control demo"
      />
    </div>
  )
}
```

## 🎨 Custom Styling

### Gradient Progress
```tsx
function GradientProgress() {
  return (
    <div className="space-y-4">
      <Progress 
        value={70}
        className="progress-gradient-blue"
        showLabel
      />
      
      <Progress 
        value={85}
        className="progress-gradient-purple"
        showLabel
      />
      
      <style jsx>{`
        .progress-gradient-blue .progress-bar {
          background: linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%);
        }
        
        .progress-gradient-purple .progress-bar {
          background: linear-gradient(90deg, #8B5CF6 0%, #6D28D9 100%);
        }
      `}</style>
    </div>
  )
}
```

### Striped Progress
```tsx
function StripedProgress() {
  return (
    <div className="space-y-4">
      <Progress 
        value={60}
        className="progress-striped"
        showLabel
      />
      
      <Progress 
        value={40}
        className="progress-striped progress-animated"
        showLabel
      />
      
      <style jsx>{`
        .progress-striped .progress-bar {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        }
        
        .progress-animated .progress-bar {
          animation: progress-bar-stripes 1s linear infinite;
        }
        
        @keyframes progress-bar-stripes {
          0% { background-position-x: 1rem; }
          100% { background-position-x: 0; }
        }
      `}</style>
    </div>
  )
}
```

### Custom Circular Progress
```tsx
function CustomCircularProgress() {
  return (
    <div className="flex space-x-6">
      <div className="relative">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40" 
            r="32"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 32}
            strokeDashoffset={2 * Math.PI * 32 * (1 - 0.75)}
            className="text-blue-500 transition-all duration-500"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">75%</span>
        </div>
      </div>
    </div>
  )
}
```

## 🛠️ Zaawansowane Techniki

### Custom Hook dla Progress
```tsx
import { useState, useEffect } from 'preact/hooks'

function useProgress(duration: number = 3000) {
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const start = () => {
    setIsActive(true)
    setIsComplete(false)
    setProgress(0)
  }
  
  const pause = () => setIsActive(false)
  const resume = () => setIsActive(true)
  const reset = () => {
    setProgress(0)
    setIsActive(false)
    setIsComplete(false)
  }
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isActive && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (100 / (duration / 100))
          if (next >= 100) {
            setIsActive(false)
            setIsComplete(true)
            return 100
          }
          return next
        })
      }, 100)
    }
    
    return () => clearInterval(interval)
  }, [isActive, progress, duration])
  
  return {
    progress: Math.min(100, Math.max(0, progress)),
    isActive,
    isComplete,
    start,
    pause,
    resume,
    reset
  }
}

function ProgressWithHook() {
  const uploadProgress = useProgress(5000)
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button onClick={uploadProgress.start}>Start</button>
        <button onClick={uploadProgress.pause}>Pause</button>
        <button onClick={uploadProgress.resume}>Resume</button>
        <button onClick={uploadProgress.reset}>Reset</button>
      </div>
      
      <Progress
        value={uploadProgress.progress}
        showLabel
        color={uploadProgress.isComplete ? 'success' : 'primary'}
        label={
          uploadProgress.isComplete 
            ? 'Complete!' 
            : `${Math.round(uploadProgress.progress)}%`
        }
      />
    </div>
  )
}
```

### Progress Queue System
```tsx
interface ProgressItem {
  id: string
  label: string
  progress: number
  status: 'pending' | 'active' | 'complete' | 'error'
}

function ProgressQueue() {
  const [items, setItems] = useState<ProgressItem[]>([
    { id: '1', label: 'Download File 1', progress: 0, status: 'pending' },
    { id: '2', label: 'Download File 2', progress: 0, status: 'pending' },
    { id: '3', label: 'Download File 3', progress: 0, status: 'pending' }
  ])
  
  const processQueue = async () => {
    for (const item of items) {
      setItems(prev => prev.map(p => 
        p.id === item.id ? { ...p, status: 'active' } : p
      ))
      
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setItems(prev => prev.map(p => 
          p.id === item.id ? { ...p, progress: i } : p
        ))
      }
      
      setItems(prev => prev.map(p => 
        p.id === item.id ? { ...p, status: 'complete' } : p
      ))
    }
  }
  
  return (
    <div className="space-y-4">
      <button
        onClick={processQueue}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Queue
      </button>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-3 bg-white rounded border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs text-gray-500 capitalize">
                {item.status}
              </span>
            </div>
            
            <Progress
              value={item.progress}
              color={
                item.status === 'complete' ? 'success' :
                item.status === 'error' ? 'error' :
                item.status === 'active' ? 'primary' : 'secondary'
              }
              showLabel={item.status === 'active' || item.status === 'complete'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 🔧 Performance i Optymalizacja

### Throttled Progress Updates
```tsx
import { useCallback, useRef } from 'preact/hooks'

function useThrottledProgress() {
  const progressRef = useRef(0)
  const lastUpdateRef = useRef(0)
  
  const updateProgress = useCallback((newProgress: number) => {
    const now = Date.now()
    const timeSinceLastUpdate = now - lastUpdateRef.current
    
    // Throttle updates to max 60fps
    if (timeSinceLastUpdate >= 16) {
      progressRef.current = newProgress
      lastUpdateRef.current = now
      return true
    }
    return false
  }, [])
  
  return { updateProgress }
}

function OptimizedProgress() {
  const [displayProgress, setDisplayProgress] = useState(0)
  const { updateProgress } = useThrottledProgress()
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newProgress = Math.min(100, displayProgress + Math.random() * 3)
      
      if (updateProgress(newProgress)) {
        setDisplayProgress(newProgress)
      }
    }, 10)
    
    return () => clearInterval(interval)
  }, [displayProgress, updateProgress])
  
  return <Progress value={displayProgress} showLabel />
}
```

### Memoized Progress Component
```tsx
import { memo } from 'preact/compat'

const MemoizedProgress = memo<ProgressProps>(({ value, ...props }) => {
  return <Progress value={value} {...props} />
}, (prevProps, nextProps) => {
  // Only re-render if progress changed by more than 1%
  return Math.abs(prevProps.value - nextProps.value) < 1
})

function HighFrequencyProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 0.1) % 100)
    }, 10)
    
    return () => clearInterval(interval)
  }, [])
  
  return <MemoizedProgress value={progress} showLabel />
}
```

## 🧪 Testowanie

### Unit Tests
```tsx
import { render, screen } from '@testing-library/preact'
import { Progress } from './Progress'

describe('Progress Component', () => {
  it('renders with correct progress value', () => {
    render(<Progress value={50} showLabel />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
  
  it('applies correct ARIA attributes', () => {
    render(<Progress value={75} aria-label="Upload progress" />)
    const progressBar = screen.getByRole('progressbar')
    
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    expect(progressBar).toHaveAttribute('aria-label', 'Upload progress')
  })
  
  it('renders circular variant correctly', () => {
    const { container } = render(<Progress variant="circular" value={30} />)
    expect(container.querySelector('.progress-circular')).toBeInTheDocument()
  })
  
  it('shows indeterminate animation', () => {
    const { container } = render(<Progress indeterminate />)
    expect(container.querySelector('.progress-indeterminate')).toBeInTheDocument()
  })
})
```

### Integration Tests
```tsx
describe('Progress Integration', () => {
  it('updates progress value when controlled', async () => {
    const TestComponent = () => {
      const [progress, setProgress] = useState(0)
      
      useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 100)
        return () => clearTimeout(timer)
      }, [])
      
      return <Progress value={progress} showLabel />
    }
    
    render(<TestComponent />)
    
    expect(screen.getByText('0%')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('100%')).toBeInTheDocument()
    })
  })
})
```

## 📝 Najlepsze Praktyki

### Do ✅
- Używaj ARIA attributes dla screen reader
- Implementuj aria-live dla dynamicznych aktualizacji
- Używaj determinate progress gdy znasz czas trwania
- Dodawaj meaningful labels i descriptions
- Optymalizuj animacje dla performance
- Używaj odpowiednich kolorów dla różnych stanów

### Nie rób ❌
- Nie używaj Progress dla instantanych operacji
- Nie pomijaj ARIA support dla accessibility
- Nie aktualizuj progress zbyt często (throttle updates)  
- Nie używaj indeterminate dla długich operacji bez informacji
- Nie używaj tylko kolorów do przekazania informacji (dodaj tekst)
- Nie blokuj UI podczas progress operations

### Accessibility Guidelines
- Zawsze dodawaj role="progressbar"
- Używaj aria-valuemin, aria-valuemax, aria-valuenow
- Implementuj aria-label lub aria-labelledby
- Dodawaj aria-live dla screen reader announcements
- Zapewnij alternative text dla visual-only progress
- Używaj semantic colors z appropriate contrast ratios

## 🔄 Migracja i Aktualizacje

### Z v1.0 do v2.0
```tsx
// Stara składnia v1.0
<Progress percent={50} type="line" strokeColor="blue" />

// Nowa składnia v2.0
<Progress value={50} variant="linear" color="primary" />
```

### Breaking Changes
- `percent` prop zmieniony na `value`
- `type` prop zmieniony na `variant`  
- `strokeColor` prop zmieniony na `color`
- Usunięto `strokeWidth` - użyj `size` prop
- `showInfo` prop zmieniony na `showLabel`

## 📚 Powiązane Komponenty

- **[Skeleton](./SKELETON_DOCUMENTATION.md)** - dla loading placeholders
- **[Spinner](./SPINNER_DOCUMENTATION.md)** - dla prostych wskaźników ładowania
- **[Alert](./ALERT_DOCUMENTATION.md)** - dla komunikatów o stanie operacji
- **[Toast](./TOAST_DOCUMENTATION.md)** - dla powiadomień o zakończeniu
- **[Badge](./BADGE_DOCUMENTATION.md)** - dla liczników i statusów

## 🎯 Roadmap

### Planowane funkcje v2.1
- [ ] Multi-segment progress bars
- [ ] Progress with checkpoints/milestones
- [ ] Animated progress transitions
- [ ] Progress with time estimates
- [ ] Customizable progress shapes
- [ ] Progress with pause/resume functionality

### Długoterminowe plany
- [ ] Progress analytics i tracking
- [ ] Real-time progress synchronization
- [ ] Progress with cancellation support
- [ ] Advanced circular progress variants
- [ ] Progress performance monitoring
- [ ] Integration z performance API
