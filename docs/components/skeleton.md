# 💀 Skeleton Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Skeleton** to zaawansowany system loading placeholder, który symuluje struktura treści podczas ładowania danych. Zapewnia lepsze user experience poprzez pokazanie oczekiwanych kształtów i układów zamiast pustych przestrzeni lub spinnerów.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Multiple Shapes** - różne kształty (text, avatar, rectangular, circular)
- **Flexible Dimensions** - konfigurowane wymiary (width, height)
- **Multi-line Support** - wsparcie wieloliniowego tekstu
- **Animation Options** - animacje (pulse, wave, none)
- **Performance Optimized** - zoptymalizowane dla złożonych layoutów
- **Responsive Design** - automatyczne dostosowanie do różnych ekranów
- **Accessibility Compliant** - zgodność z aria-hidden dla screen reader
- **Dark Mode Support** - pełne wsparcie trybu ciemnego

### 🎨 Warianty Kształtów
- **Text** - linie tekstu z różnymi szerokościami
- **Avatar** - okrągłe placeholder dla zdjęć profilowych
- **Rectangular** - prostokątne bloki dla obrazów i kart
- **Circular** - okrągłe elementy dla ikon i przycisków

## 🚀 Podstawowe Użycie

### Text Skeleton
```tsx
import { Skeleton } from '@nebula/components'

function TextSkeletons() {
  return (
    <div className="space-y-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  )
}
```

### Avatar Skeleton
```tsx
function AvatarSkeleton() {
  return (
    <div className="flex items-center space-x-3">
      <Skeleton variant="avatar" />
      <div className="space-y-2">
        <Skeleton variant="text" width="100px" />
        <Skeleton variant="text" width="80px" />
      </div>
    </div>
  )
}
```

### Rectangular Skeleton
```tsx
function CardSkeleton() {
  return (
    <div className="max-w-sm">
      <Skeleton variant="rectangular" width="100%" height="200px" />
      <div className="p-4 space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  )
}
```

### Multi-line Text
```tsx
function MultiLineText() {
  return (
    <div className="space-y-1">
      <Skeleton variant="text" lines={3} />
      <Skeleton variant="text" lines={2} width="80%" />
    </div>
  )
}
```

## 🎛️ Warianty i Konfiguracja

### Animacje
```tsx
function AnimationVariants() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Pulse Animation (default)</h3>
        <Skeleton variant="text" animation="pulse" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Wave Animation</h3>
        <Skeleton variant="text" animation="wave" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">No Animation</h3>
        <Skeleton variant="text" animation="none" />
      </div>
    </div>
  )
}
```

### Custom Wymiary
```tsx
function CustomDimensions() {
  return (
    <div className="space-y-4">
      <Skeleton variant="rectangular" width={300} height={100} />
      <Skeleton variant="circular" width={60} height={60} />
      <Skeleton variant="text" width="250px" height="18px" />
    </div>
  )
}
```

### Różne Rozmiary Avatar
```tsx
function AvatarSizes() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton variant="avatar" width={32} height={32} />
      <Skeleton variant="avatar" width={48} height={48} />
      <Skeleton variant="avatar" width={64} height={64} />
      <Skeleton variant="avatar" width={96} height={96} />
    </div>
  )
}
```

## 🎨 Praktyczne Przykłady

### User Profile Card Skeleton
```tsx
function ProfileCardSkeleton() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Avatar i podstawowe info */}
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton variant="avatar" width={80} height={80} />
        <div className="space-y-2">
          <Skeleton variant="text" width="120px" height="20px" />
          <Skeleton variant="text" width="90px" height="16px" />
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center space-y-1">
            <Skeleton variant="text" width="40px" height="24px" />
            <Skeleton variant="text" width="60px" height="14px" />
          </div>
        ))}
      </div>
      
      {/* Bio */}
      <div className="space-y-2">
        <Skeleton variant="text" lines={3} />
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-2 mt-4">
        <Skeleton variant="rectangular" width="100px" height="36px" />
        <Skeleton variant="rectangular" width="80px" height="36px" />
      </div>
    </div>
  )
}
```

### Article List Skeleton
```tsx
function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4 p-4 bg-white rounded-lg shadow">
          <Skeleton variant="rectangular" width={100} height={80} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="90%" height="20px" />
            <Skeleton variant="text" lines={2} />
            <div className="flex items-center space-x-4 mt-3">
              <Skeleton variant="avatar" width={24} height={24} />
              <Skeleton variant="text" width="80px" height="14px" />
              <Skeleton variant="text" width="60px" height="14px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Dashboard Cards Skeleton
```tsx
function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Stat Cards */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <Skeleton variant="text" width="60px" height="14px" />
            <Skeleton variant="circular" width={20} height={20} />
          </div>
          <Skeleton variant="text" width="80px" height="32px" />
          <Skeleton variant="text" width="100px" height="12px" />
        </div>
      ))}
      
      {/* Chart area */}
      <div className="col-span-full bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <Skeleton variant="text" width="150px" height="20px" />
          <Skeleton variant="rectangular" width="100px" height="32px" />
        </div>
        <Skeleton variant="rectangular" width="100%" height="300px" />
      </div>
      
      {/* Recent activity */}
      <div className="col-span-full lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <Skeleton variant="text" width="120px" height="20px" className="mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton variant="avatar" width={32} height={32} />
              <div className="flex-1 space-y-1">
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="40%" height="12px" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="col-span-full lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <Skeleton variant="text" width="100px" height="20px" className="mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2 p-3 rounded border">
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width="80px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Table Skeleton
```tsx
function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <Skeleton variant="text" width="120px" height="20px" />
          <Skeleton variant="rectangular" width="100px" height="32px" />
        </div>
      </div>
      
      {/* Table content */}
      <div className="divide-y divide-gray-200">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-4 flex items-center space-x-4">
            <Skeleton variant="avatar" width={40} height={40} />
            <div className="flex-1 grid grid-cols-4 gap-4">
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rectangular" width="80px" height="24px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Shopping Cart Skeleton
```tsx
function ShoppingCartSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Skeleton variant="text" width="200px" height="32px" className="mb-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-4 p-4 bg-white rounded-lg shadow">
              <Skeleton variant="rectangular" width={100} height={100} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="80%" height="18px" />
                <Skeleton variant="text" width="60%" height="14px" />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Skeleton variant="rectangular" width={60} height={32} />
                  </div>
                  <Skeleton variant="text" width="60px" height="18px" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <Skeleton variant="text" width="100px" height="20px" className="mb-4" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton variant="text" width="80px" />
                <Skeleton variant="text" width="60px" />
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-4">
            <Skeleton variant="text" width="50px" height="20px" />
            <Skeleton variant="text" width="80px" height="20px" />
          </div>
          <Skeleton variant="rectangular" width="100%" height="48px" />
        </div>
      </div>
    </div>
  )
}
```

### Social Media Feed Skeleton
```tsx
function SocialFeedSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4">
          {/* Post header */}
          <div className="flex items-center space-x-3 mb-3">
            <Skeleton variant="avatar" width={48} height={48} />
            <div className="flex-1 space-y-1">
              <Skeleton variant="text" width="120px" height="16px" />
              <Skeleton variant="text" width="80px" height="12px" />
            </div>
            <Skeleton variant="circular" width={24} height={24} />
          </div>
          
          {/* Post content */}
          <div className="space-y-2 mb-3">
            <Skeleton variant="text" lines={Math.floor(Math.random() * 3) + 1} />
          </div>
          
          {/* Post image */}
          {Math.random() > 0.5 && (
            <Skeleton variant="rectangular" width="100%" height="300px" className="mb-3" />
          )}
          
          {/* Engagement */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <Skeleton variant="text" width="60px" height="16px" />
              <Skeleton variant="text" width="70px" height="16px" />
              <Skeleton variant="text" width="50px" height="16px" />
            </div>
            <Skeleton variant="text" width="80px" height="16px" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 🎛️ API Reference

### Props

| Prop        | Type                                                | Default   | Opis                                    |
| ----------- | --------------------------------------------------- | --------- | --------------------------------------- |
| `variant`   | `'text' \| 'avatar' \| 'rectangular' \| 'circular'` | `'text'`  | Kształt skeleton                        |
| `width`     | `string \| number`                                  | `'100%'`  | Szerokość elementu                      |
| `height`    | `string \| number`                                  | `auto`    | Wysokość elementu                       |
| `animation` | `'pulse' \| 'wave' \| 'none'`                       | `'pulse'` | Typ animacji                            |
| `lines`     | `number`                                            | `1`       | Liczba linii (tylko dla variant="text") |
| `className` | `string`                                            | -         | Dodatkowe klasy CSS                     |
| `children`  | `ComponentChildren`                                 | -         | Zawartość wewnątrz skeleton             |

### CSS Classes

**Bazowe klasy:**
- `.skeleton` - główna klasa komponentu
- `.skeleton-text` - dla tekstu
- `.skeleton-avatar` - dla avatarów
- `.skeleton-rectangular` - dla prostokątów
- `.skeleton-circular` - dla kół

**Animacje:**
- `.skeleton-pulse` - animacja pulsowania
- `.skeleton-wave` - animacja fali
- `.skeleton-no-animation` - brak animacji

**Pomocnicze:**
- `.skeleton-multiline` - dla wieloliniowego tekstu

## ♿ Accessibility

### ARIA Support
```tsx
function AccessibleSkeleton() {
  return (
    <div>
      <div aria-hidden="true">
        <Skeleton variant="text" lines={3} />
      </div>
      
      {/* Alternative dla screen reader */}
      <div className="sr-only">
        Loading article content, please wait...
      </div>
    </div>
  )
}
```

### Loading State Announcements
```tsx
function AnnouncedLoadingState() {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <div>
      <div aria-live="polite" aria-atomic="true">
        {isLoading ? 'Loading content...' : 'Content loaded'}
      </div>
      
      {isLoading ? (
        <div aria-hidden="true">
          <Skeleton variant="text" lines={3} />
        </div>
      ) : (
        <div>
          <h2>Article Title</h2>
          <p>Article content goes here...</p>
        </div>
      )}
    </div>
  )
}
```

### Skip Links for Skeleton
```tsx
function SkippableSkeleton() {
  return (
    <div>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2"
      >
        Skip loading placeholder
      </a>
      
      <div id="loading-placeholder" aria-hidden="true">
        <Skeleton variant="text" lines={5} />
      </div>
      
      <div id="main-content">
        {/* Actual content when loaded */}
      </div>
    </div>
  )
}
```

## 🎨 Custom Styling

### Custom Colors
```tsx
function CustomColorSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton 
        variant="text" 
        className="bg-blue-200 dark:bg-blue-800" 
      />
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height="100px"
        className="bg-gradient-to-r from-purple-200 to-pink-200" 
      />
      <Skeleton 
        variant="avatar" 
        className="bg-green-200 dark:bg-green-800"
      />
    </div>
  )
}
```

### Custom Animation
```tsx
function CustomAnimationSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton 
        variant="text" 
        className="skeleton-shimmer"
      />
      
      <style jsx>{`
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  )
}
```

### Rounded Skeleton
```tsx
function RoundedSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height="200px"
        className="rounded-xl"
      />
      <Skeleton 
        variant="text" 
        className="rounded-full h-4"
      />
    </div>
  )
}
```

## 🛠️ Zaawansowane Techniki

### Smart Skeleton Hook
```tsx
import { useState, useEffect } from 'preact/hooks'

interface UseSkeletonOptions {
  delay?: number
  minDuration?: number
}

function useSkeleton<T>(
  dataLoader: () => Promise<T>, 
  options: UseSkeletonOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const { delay = 0, minDuration = 500 } = options
  
  useEffect(() => {
    let isMounted = true
    const startTime = Date.now()
    
    const loadData = async () => {
      try {
        // Delay before starting
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay))
        }
        
        const result = await dataLoader()
        
        // Ensure minimum duration
        const elapsed = Date.now() - startTime
        const remaining = minDuration - elapsed
        
        if (remaining > 0) {
          await new Promise(resolve => setTimeout(resolve, remaining))
        }
        
        if (isMounted) {
          setData(result)
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
          setIsLoading(false)
        }
      }
    }
    
    loadData()
    
    return () => {
      isMounted = false
    }
  }, [dataLoader, delay, minDuration])
  
  return { data, isLoading, error }
}

function SmartSkeletonExample() {
  const { data, isLoading } = useSkeleton(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    return {
      title: "Article Title",
      content: "Article content goes here...",
      author: "John Doe"
    }
  }, { minDuration: 1000 })
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="text" width="60%" height="32px" />
        <Skeleton variant="text" lines={3} />
        <div className="flex items-center space-x-2">
          <Skeleton variant="avatar" width={32} height={32} />
          <Skeleton variant="text" width="100px" />
        </div>
      </div>
    )
  }
  
  return (
    <article>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <span>{data?.author}</span>
      </div>
    </article>
  )
}
```

### Skeleton Factory
```tsx
interface SkeletonConfig {
  variant: 'text' | 'avatar' | 'rectangular' | 'circular'
  width?: string | number
  height?: string | number
  lines?: number
}

class SkeletonFactory {
  static createProfileCard(): SkeletonConfig[] {
    return [
      { variant: 'avatar', width: 80, height: 80 },
      { variant: 'text', width: '60%', height: '20px' },
      { variant: 'text', width: '40%', height: '16px' },
      { variant: 'text', lines: 3 }
    ]
  }
  
  static createArticleCard(): SkeletonConfig[] {
    return [
      { variant: 'rectangular', width: '100%', height: '200px' },
      { variant: 'text', width: '80%', height: '24px' },
      { variant: 'text', lines: 2 },
      { variant: 'text', width: '30%', height: '14px' }
    ]
  }
  
  static createListItem(): SkeletonConfig[] {
    return [
      { variant: 'avatar', width: 40, height: 40 },
      { variant: 'text', width: '70%' },
      { variant: 'text', width: '50%', height: '14px' }
    ]
  }
}

function FactorySkeletonExample() {
  const profileConfig = SkeletonFactory.createProfileCard()
  
  return (
    <div className="space-y-4">
      {profileConfig.map((config, index) => (
        <Skeleton key={index} {...config} />
      ))}
    </div>
  )
}
```

### Responsive Skeleton
```tsx
function ResponsiveSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow">
          {/* Mobile: stack vertically, Desktop: side by side */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
            <Skeleton 
              variant="avatar" 
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" />
              <Skeleton variant="text" width="70%" />
            </div>
          </div>
          
          {/* Image placeholder - different aspect ratios */}
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            className="mt-3 h-32 md:h-40 lg:h-48"
          />
        </div>
      ))}
    </div>
  )
}
```

## 🔧 Performance i Optymalizacja

### Lazy Skeleton Loading
```tsx
import { lazy, Suspense } from 'preact/compat'
import { useState, useEffect } from 'preact/hooks'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function LazySkeletonLoader() {
  const [shouldLoad, setShouldLoad] = useState(false)
  
  useEffect(() => {
    // Delay loading to show skeleton
    const timer = setTimeout(() => setShouldLoad(true), 1500)
    return () => clearTimeout(timer)
  }, [])
  
  const SkeletonFallback = () => (
    <div className="space-y-4">
      <Skeleton variant="text" width="50%" height="24px" />
      <Skeleton variant="rectangular" width="100%" height="200px" />
      <Skeleton variant="text" lines={3} />
    </div>
  )
  
  return (
    <div>
      {shouldLoad ? (
        <Suspense fallback={<SkeletonFallback />}>
          <HeavyComponent />
        </Suspense>
      ) : (
        <SkeletonFallback />
      )}
    </div>
  )
}
```

### Optimized Skeleton List
```tsx
import { memo } from 'preact/compat'

const SkeletonItem = memo(() => (
  <div className="flex space-x-3 p-3">
    <Skeleton variant="avatar" width={40} height={40} />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="50%" />
    </div>
  </div>
))

function OptimizedSkeletonList({ count = 10 }: { count?: number }) {
  // Create array once to avoid re-renders
  const items = useMemo(() => Array.from({ length: count }, (_, i) => i), [count])
  
  return (
    <div>
      {items.map(i => <SkeletonItem key={i} />)}
    </div>
  )
}
```

### Skeleton with Intersection Observer
```tsx
function InViewSkeleton() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div ref={ref}>
      {isVisible ? (
        <Skeleton variant="rectangular" width="100%" height="200px" />
      ) : (
        <div className="w-full h-50 bg-transparent" />
      )}
    </div>
  )
}
```

## 🧪 Testowanie

### Unit Tests
```tsx
import { render, screen } from '@testing-library/preact'
import { Skeleton } from './Skeleton'

describe('Skeleton Component', () => {
  it('renders with default props', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('skeleton-text')
  })
  
  it('renders correct variant', () => {
    render(<Skeleton variant="avatar" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('skeleton-avatar')
  })
  
  it('applies custom dimensions', () => {
    render(<Skeleton width="200px" height="100px" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '100px'
    })
  })
  
  it('renders multiple lines for text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />)
    const lines = container.querySelectorAll('.skeleton-line')
    expect(lines).toHaveLength(3)
  })
  
  it('is hidden from screen readers', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  })
})
```

### Integration Tests
```tsx
describe('Skeleton Integration', () => {
  it('transitions from skeleton to content', async () => {
    const TestComponent = () => {
      const [loading, setLoading] = useState(true)
      
      useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
      }, [])
      
      return loading ? <Skeleton /> : <div>Loaded Content</div>
    }
    
    render(<TestComponent />)
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('Loaded Content')).toBeInTheDocument()
    })
    
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  })
})
```

## 📝 Najlepsze Praktyki

### Do ✅
- Używaj aria-hidden="true" dla wszystkich skeleton elementów
- Dopasowuj kształty skeleton do rzeczywistej treści
- Implementuj realistic timing dla skeleton display
- Używaj consistent animation duration (1-2 sekundy)
- Zachowuj layout stability podczas przejścia skeleton->content
- Używaj semantic loading states dla screen readers

### Nie rób ❌
- Nie pokazuj skeleton dla bardzo szybkich operacji (<200ms)
- Nie używaj skeleton jako stałych elementów UI
- Nie pomijaj alternative text dla screen readers
- Nie używaj zbyt wielu different animation types w jednym widoku
- Nie blokuj user interaction podczas skeleton display
- Nie używaj skeleton dla error states (użyj error message)

### Performance Guidelines
- Używaj CSS animations zamiast JavaScript dla smooth performance
- Implementuj lazy loading dla off-screen skeleton
- Optymalizuj skeleton dla different screen sizes
- Avoid excessive DOM nodes w complex skeleton layouts
- Use memoization dla repeated skeleton patterns

## 🔄 Migracja i Aktualizacje

### Z v1.0 do v2.0
```tsx
// Stara składnia v1.0
<Skeleton loading={true} avatar active>
  <div>Content</div>
</Skeleton>

// Nowa składnia v2.0
{isLoading ? <Skeleton variant="avatar" /> : <div>Content</div>}
```

### Breaking Changes
- Usunięto `loading` prop - używaj conditional rendering
- `active` prop zmieniony na `animation="pulse"`
- `avatar` prop zmieniony na `variant="avatar"`
- `title` i `paragraph` props zastąpione przez `variant="text"` z `lines`

## 📚 Powiązane Komponenty

- **[Progress](./PROGRESS_DOCUMENTATION.md)** - dla określonych wskaźników postępu
- **[Spinner](./SPINNER_DOCUMENTATION.md)** - dla prostych loading states
- **[Empty](./EMPTY_DOCUMENTATION.md)** - dla pustych stanów po załadowaniu
- **[Alert](./ALERT_DOCUMENTATION.md)** - dla komunikatów o błędach ładowania

## 🎯 Roadmap

### Planowane funkcje v2.1
- [ ] Advanced skeleton shapes (charts, tables, forms)
- [ ] Smart skeleton detection based na content
- [ ] Skeleton themes i presets
- [ ] Animation synchronization dla multiple skeletons
- [ ] Skeleton builder/generator tool
- [ ] Progressive skeleton loading

### Długoterminowe plany
- [ ] AI-powered skeleton generation
- [ ] Real-time skeleton optimization
- [ ] Skeleton analytics i metrics
- [ ] Advanced accessibility features
- [ ] Integration z performance monitoring
- [ ] Skeleton A/B testing framework
