# 🌀 Spinner Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Spinner** to uniwersalny loader wykorzystywany do komunikowania użytkownikom, że operacja jest w toku. Jest to jeden z najczęściej używanych elementów UI w aplikacjach webowych do wskazywania aktywnych procesów, ładowania danych czy operacji w tle.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Multiple Variants** - różne style animacji (circle, dots, bars, pulse)
- **Flexible Sizing** - dostosowywalne rozmiary (sm, md, lg, xl)
- **Color Customization** - pełna personalizacja kolorów
- **Speed Control** - regulacja prędkości animacji
- **Overlay Support** - nakładki dla blocking operations
- **Performance Optimized** - zoptymalizowane animacje CSS
- **Accessibility Ready** - zgodność z ARIA guidelines
- **Dark Mode Support** - automatyczne dopasowanie do motywu

### 🎨 Warianty Spinnerów
- **Circle** - klasyczny obracający się spinner
- **Dots** - animowane kropki w sekwencji
- **Bars** - pionowe paski z falową animacją
- **Pulse** - pulsujące koło z efektem fade

## 🚀 Podstawowe Użycie

### Circle Spinner (Default)
```tsx
import { Spinner } from '@nebula/components'

function BasicSpinner() {
  return <Spinner />
}

function SizedSpinners() {
  return (
    <div className="flex items-center space-x-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  )
}
```

### Colored Spinners
```tsx
function ColoredSpinners() {
  return (
    <div className="flex items-center space-x-4">
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="error" />
    </div>
  )
}
```

### Different Variants
```tsx
function SpinnerVariants() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
      <div className="text-center">
        <Spinner variant="circle" />
        <p className="text-sm mt-2">Circle</p>
      </div>
      
      <div className="text-center">
        <Spinner variant="dots" />
        <p className="text-sm mt-2">Dots</p>
      </div>
      
      <div className="text-center">
        <Spinner variant="bars" />
        <p className="text-sm mt-2">Bars</p>
      </div>
      
      <div className="text-center">
        <Spinner variant="pulse" />
        <p className="text-sm mt-2">Pulse</p>
      </div>
    </div>
  )
}
```

### With Text Labels
```tsx
function SpinnersWithText() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Spinner size="sm" />
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <Spinner size="lg" />
        <span className="text-base font-medium">Processing your request</span>
      </div>
      
      <div className="text-center space-y-3">
        <Spinner variant="dots" size="md" />
        <div>
          <h3 className="font-semibold">Uploading files</h3>
          <p className="text-sm text-gray-500">Please wait while we upload your files...</p>
        </div>
      </div>
    </div>
  )
}
```

## 🎛️ Warianty i Konfiguracja

### Speed Control
```tsx
function SpeedVariants() {
  return (
    <div className="flex items-center space-x-8">
      <div className="text-center">
        <Spinner speed="slow" />
        <p className="text-xs mt-1">Slow</p>
      </div>
      
      <div className="text-center">
        <Spinner speed="normal" />
        <p className="text-xs mt-1">Normal</p>
      </div>
      
      <div className="text-center">
        <Spinner speed="fast" />
        <p className="text-xs mt-1">Fast</p>
      </div>
    </div>
  )
}
```

### Custom Colors
```tsx
function CustomColorSpinners() {
  return (
    <div className="flex items-center space-x-4">
      <Spinner className="text-purple-500" />
      <Spinner className="text-pink-500" />
      <Spinner className="text-indigo-500" />
      <Spinner 
        variant="dots" 
        className="text-gradient bg-gradient-to-r from-blue-500 to-purple-500"
      />
    </div>
  )
}
```

### Overlay Spinner
```tsx
function OverlaySpinner() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsLoading(false)
  }
  
  return (
    <div className="relative">
      {/* Main content */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Submit Form</h2>
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
      
      {/* Overlay spinner */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        </div>
      )}
    </div>
  )
}
```

## 🎨 Praktyczne Przykłady

### Loading Button
```tsx
import { useState } from 'preact/hooks'

interface LoadingButtonProps {
  children: ComponentChildren
  onClick: () => Promise<void>
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

function LoadingButton({ children, onClick, variant = 'primary', disabled }: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = async () => {
    if (isLoading || disabled) return
    
    setIsLoading(true)
    try {
      await onClick()
    } finally {
      setIsLoading(false)
    }
  }
  
  const baseClasses = "px-4 py-2 rounded font-medium transition-all duration-200 relative"
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  }
  
  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" className="text-white" />
        </div>
      )}
    </button>
  )
}

function LoadingButtonExample() {
  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Saved!')
  }
  
  const handleDelete = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Deleted!')
  }
  
  return (
    <div className="space-x-3">
      <LoadingButton onClick={handleSave}>
        Save Changes
      </LoadingButton>
      
      <LoadingButton onClick={handleDelete} variant="secondary">
        Delete Item
      </LoadingButton>
    </div>
  )
}
```

### Form Submission with Spinner
```tsx
function FormWithSpinner() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<string>('')
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult('')
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2500))
      setResult('Form submitted successfully!')
    } catch (error) {
      setResult('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            type="text" 
            disabled={isSubmitting}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            disabled={isSubmitting}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea 
            rows={4}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" className="text-white" />
              <span>Submitting...</span>
            </>
          ) : (
            'Submit Form'
          )}
        </button>
        
        {result && (
          <div className={`text-center text-sm ${result.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {result}
          </div>
        )}
      </form>
    </div>
  )
}
```

### Data Loading States
```tsx
interface User {
  id: number
  name: string
  email: string
  avatar: string
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  
  useEffect(() => {
    loadUsers()
  }, [])
  
  const loadUsers = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/avatars/john.jpg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/avatars/jane.jpg' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', avatar: '/avatars/bob.jpg' }
      ]
      
      setUsers(mockUsers)
    } catch (err) {
      setError('Failed to load users. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={loadUsers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Users</h2>
      </div>
      
      <div className="divide-y">
        {users.map(user => (
          <div key={user.id} className="p-4 flex items-center space-x-3">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-avatar.png'
              }}
            />
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Global Loading State
```tsx
import { createContext, useContext } from 'preact/compat'
import { useState } from 'preact/hooks'

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  loadingMessage: string
  setLoadingMessage: (message: string) => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
  loadingMessage: '',
  setLoadingMessage: () => {}
})

export function LoadingProvider({ children }: { children: ComponentChildren }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  
  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
    if (!loading) {
      setLoadingMessage('')
    }
  }
  
  return (
    <LoadingContext.Provider value={{
      isLoading,
      setLoading,
      loadingMessage,
      setLoadingMessage
    }}>
      {children}
      
      {/* Global loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center min-w-[200px]">
            <Spinner size="lg" />
            {loadingMessage && (
              <p className="mt-4 text-gray-600">{loadingMessage}</p>
            )}
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingContext)
}

function GlobalLoadingExample() {
  const { setLoading, setLoadingMessage } = useLoading()
  
  const handleLongOperation = async () => {
    setLoadingMessage('Processing your request...')
    setLoading(true)
    
    // Simulate long operation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setLoading(false)
  }
  
  const handleUpload = async () => {
    setLoadingMessage('Uploading files...')
    setLoading(true)
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
  }
  
  return (
    <div className="space-x-4">
      <button 
        onClick={handleLongOperation}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Long Operation
      </button>
      
      <button 
        onClick={handleUpload}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Upload Files
      </button>
    </div>
  )
}
```

### Infinite Scroll with Spinner
```tsx
function InfiniteScrollList() {
  const [items, setItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  
  useEffect(() => {
    loadMoreItems()
  }, [])
  
  const loadMoreItems = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newItems = Array.from(
        { length: 10 }, 
        (_, i) => `Item ${(page - 1) * 10 + i + 1}`
      )
      
      setItems(prev => [...prev, ...newItems])
      setPage(prev => prev + 1)
      
      // Stop loading after 5 pages
      if (page >= 5) {
        setHasMore(false)
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleScroll = (e: Event) => {
    const element = e.target as HTMLElement
    if (
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      hasMore &&
      !isLoading
    ) {
      loadMoreItems()
    }
  }
  
  return (
    <div 
      className="max-w-md mx-auto bg-white rounded-lg shadow max-h-96 overflow-y-auto"
      onScroll={handleScroll}
    >
      <div className="p-4 border-b">
        <h2 className="font-semibold">Infinite Scroll List</h2>
      </div>
      
      <div className="divide-y">
        {items.map((item, index) => (
          <div key={index} className="p-3">
            {item}
          </div>
        ))}
      </div>
      
      {isLoading && (
        <div className="p-4 text-center">
          <Spinner size="sm" />
          <p className="text-sm text-gray-500 mt-1">Loading more...</p>
        </div>
      )}
      
      {!hasMore && (
        <div className="p-4 text-center text-gray-500 text-sm">
          No more items to load
        </div>
      )}
    </div>
  )
}
```

### Search with Spinner
```tsx
function SearchWithSpinner() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 2) {
        performSearch(query)
      } else {
        setResults([])
        setHasSearched(false)
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [query])
  
  const performSearch = async (searchQuery: string) => {
    setIsSearching(true)
    setHasSearched(true)
    
    try {
      // Simulate search API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockResults = [
        `Result for "${searchQuery}" #1`,
        `Result for "${searchQuery}" #2`,
        `Result for "${searchQuery}" #3`,
        `Another match for "${searchQuery}"`,
        `Best result for "${searchQuery}"`
      ]
      
      setResults(mockResults)
    } finally {
      setIsSearching(false)
    }
  }
  
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          placeholder="Search..."
          className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {isSearching && (
          <div className="absolute right-3 top-2.5">
            <Spinner size="sm" />
          </div>
        )}
      </div>
      
      <div className="mt-2 bg-white border rounded-lg shadow-sm max-h-60 overflow-y-auto">
        {isSearching ? (
          <div className="p-4 text-center">
            <Spinner size="sm" />
            <p className="text-sm text-gray-500 mt-1">Searching...</p>
          </div>
        ) : hasSearched && results.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No results found for "{query}"
          </div>
        ) : results.length > 0 ? (
          <div className="divide-y">
            {results.map((result, index) => (
              <div key={index} className="p-3 hover:bg-gray-50 cursor-pointer">
                {result}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
```

## 🎛️ API Reference

### Props

| Prop        | Type                                                                         | Default     | Opis                                         |
| ----------- | ---------------------------------------------------------------------------- | ----------- | -------------------------------------------- |
| `variant`   | `'circle' \| 'dots' \| 'bars' \| 'pulse'`                                    | `'circle'`  | Styl animacji spinnera                       |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl'`                                               | `'md'`      | Rozmiar spinnera                             |
| `color`     | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'current'` | `'primary'` | Kolor spinnera                               |
| `speed`     | `'slow' \| 'normal' \| 'fast'`                                               | `'normal'`  | Prędkość animacji                            |
| `className` | `string`                                                                     | -           | Dodatkowe klasy CSS                          |
| `children`  | `ComponentChildren`                                                          | -           | Tekst lub elementy wyświetlane obok spinnera |

### CSS Classes

**Bazowe klasy:**
- `.spinner` - główna klasa komponentu
- `.spinner-circle` - okrągły spinner
- `.spinner-dots` - spinner z kropkami
- `.spinner-bars` - spinner z paskami
- `.spinner-pulse` - pulsujący spinner

**Rozmiary:**
- `.spinner-sm` - mały (16px)
- `.spinner-md` - średni (24px, domyślny)
- `.spinner-lg` - duży (32px)
- `.spinner-xl` - extra duży (48px)

**Kolory:**
- `.spinner-primary` - primary color
- `.spinner-secondary` - secondary color
- `.spinner-success` - kolor sukcesu
- `.spinner-warning` - kolor ostrzeżenia
- `.spinner-error` - kolor błędu
- `.spinner-current` - dziedziczy kolor z kontekstu

**Prędkość:**
- `.spinner-slow` - 2s duration
- `.spinner-normal` - 1.2s duration (domyślny)
- `.spinner-fast` - 0.8s duration

## ♿ Accessibility

### ARIA Support
```tsx
function AccessibleSpinner() {
  return (
    <div>
      <Spinner 
        aria-label="Loading content, please wait" 
        role="status"
      />
      
      {/* Alternative dla screen reader */}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  )
}
```

### Loading Announcements
```tsx
function AnnouncedSpinner() {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div>
      {/* Aria live region for announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isLoading ? 'Loading started' : 'Loading completed'}
      </div>
      
      <button 
        onClick={() => setIsLoading(!isLoading)}
        aria-describedby={isLoading ? 'loading-status' : undefined}
      >
        {isLoading ? 'Cancel Loading' : 'Start Loading'}
      </button>
      
      {isLoading && (
        <div id="loading-status" className="mt-2 flex items-center space-x-2">
          <Spinner 
            size="sm" 
            aria-label="Loading in progress"
            role="status"
          />
          <span>Processing your request...</span>
        </div>
      )}
    </div>
  )
}
```

### Keyboard Navigation
```tsx
function KeyboardAccessibleSpinner() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isLoading) {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isLoading])
  
  return (
    <div>
      <button 
        onClick={() => setIsLoading(true)}
        disabled={isLoading}
      >
        Start Process
      </button>
      
      {isLoading && (
        <div className="mt-4 p-4 border rounded">
          <div className="flex items-center space-x-3">
            <Spinner aria-label="Processing" role="status" />
            <div>
              <p>Processing your request...</p>
              <p className="text-sm text-gray-500">Press Escape to cancel</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

## 🎨 Custom Styling

### Custom Color Schemes
```tsx
function CustomColorSpinners() {
  return (
    <div className="space-y-4">
      {/* Gradient spinner */}
      <Spinner 
        className="bg-gradient-to-r from-purple-500 to-pink-500" 
        variant="circle"
      />
      
      {/* Multi-color dots */}
      <div className="spinner-dots-multicolor">
        <div className="dot bg-red-500"></div>
        <div className="dot bg-yellow-500"></div>
        <div className="dot bg-green-500"></div>
        <div className="dot bg-blue-500"></div>
      </div>
      
      {/* Custom CSS animation */}
      <div className="custom-rainbow-spinner">
        <div className="spinner-inner"></div>
      </div>
      
      <style jsx>{`
        .custom-rainbow-spinner .spinner-inner {
          width: 32px;
          height: 32px;
          border: 3px solid transparent;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
          background-size: 400% 400%;
          animation: rainbow-spin 2s linear infinite;
        }
        
        @keyframes rainbow-spin {
          0% { transform: rotate(0deg); background-position: 0% 50%; }
          100% { transform: rotate(360deg); background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
```

### Size Customization
```tsx
function CustomSizeSpinners() {
  return (
    <div className="flex items-center space-x-4">
      <Spinner style={{ width: '12px', height: '12px' }} />
      <Spinner style={{ width: '20px', height: '20px' }} />
      <Spinner style={{ width: '40px', height: '40px' }} />
      <Spinner style={{ width: '64px', height: '64px' }} />
    </div>
  )
}
```

### Brand Themed Spinners
```tsx
function BrandSpinners() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {/* Tech brand theme */}
      <div className="text-center">
        <Spinner 
          variant="circle" 
          className="text-blue-500"
          size="lg"
        />
        <p className="text-sm mt-2">Tech</p>
      </div>
      
      {/* Nature theme */}
      <div className="text-center">
        <Spinner 
          variant="pulse" 
          className="text-green-500"
          size="lg"
        />
        <p className="text-sm mt-2">Nature</p>
      </div>
      
      {/* Fire theme */}
      <div className="text-center">
        <Spinner 
          variant="bars" 
          className="text-red-500"
          size="lg"
        />
        <p className="text-sm mt-2">Fire</p>
      </div>
      
      {/* Ocean theme */}
      <div className="text-center">
        <Spinner 
          variant="dots" 
          className="text-cyan-500"
          size="lg"
        />
        <p className="text-sm mt-2">Ocean</p>
      </div>
      
      {/* Sunset theme */}
      <div className="text-center">
        <div className="sunset-spinner">
          <Spinner variant="circle" size="lg" />
        </div>
        <p className="text-sm mt-2">Sunset</p>
      </div>
      
      <style jsx>{`
        .sunset-spinner .spinner {
          background: linear-gradient(45deg, #ff6b6b, #ffd93d, #ff9a9e);
          background-size: 400% 400%;
          animation: sunset 3s ease-in-out infinite;
        }
        
        @keyframes sunset {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
```

## 🛠️ Zaawansowane Techniki

### Spinner Hook
```tsx
import { useState, useCallback } from 'preact/hooks'

interface UseSpinnerOptions {
  delay?: number
  timeout?: number
  message?: string
}

function useSpinner(options: UseSpinnerOptions = {}) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [message, setMessage] = useState(options.message || '')
  
  const startSpinner = useCallback((newMessage?: string) => {
    if (newMessage) setMessage(newMessage)
    
    if (options.delay) {
      setTimeout(() => setIsSpinning(true), options.delay)
    } else {
      setIsSpinning(true)
    }
    
    if (options.timeout) {
      setTimeout(() => {
        setIsSpinning(false)
        setMessage('')
      }, options.timeout)
    }
  }, [options.delay, options.timeout])
  
  const stopSpinner = useCallback(() => {
    setIsSpinning(false)
    setMessage('')
  }, [])
  
  const updateMessage = useCallback((newMessage: string) => {
    setMessage(newMessage)
  }, [])
  
  return {
    isSpinning,
    message,
    startSpinner,
    stopSpinner,
    updateMessage
  }
}

function SpinnerHookExample() {
  const spinner = useSpinner({ 
    delay: 300, // Start spinner after 300ms
    timeout: 5000 // Auto-stop after 5s
  })
  
  const handleOperation = async () => {
    spinner.startSpinner('Processing...')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      spinner.updateMessage('Almost done...')
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      spinner.stopSpinner()
    }
  }
  
  return (
    <div>
      <button onClick={handleOperation} disabled={spinner.isSpinning}>
        Start Operation
      </button>
      
      {spinner.isSpinning && (
        <div className="mt-4 flex items-center space-x-2">
          <Spinner size="sm" />
          <span>{spinner.message}</span>
        </div>
      )}
    </div>
  )
}
```

### Progressive Spinner States
```tsx
function ProgressiveSpinner() {
  const [stage, setStage] = useState<'idle' | 'preparing' | 'processing' | 'finishing' | 'complete'>('idle')
  
  const stages = {
    idle: { message: '', spinner: null },
    preparing: { message: 'Preparing...', spinner: 'dots' },
    processing: { message: 'Processing your request...', spinner: 'circle' },
    finishing: { message: 'Finishing up...', spinner: 'bars' },
    complete: { message: 'Complete!', spinner: null }
  }
  
  const runProcess = async () => {
    setStage('preparing')
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setStage('processing')
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setStage('finishing')
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setStage('complete')
    setTimeout(() => setStage('idle'), 2000)
  }
  
  const currentStage = stages[stage]
  
  return (
    <div className="text-center">
      <button 
        onClick={runProcess}
        disabled={stage !== 'idle'}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Start Process
      </button>
      
      {currentStage.spinner && (
        <div className="mt-6">
          <Spinner 
            variant={currentStage.spinner as any} 
            size="lg"
          />
          <p className="mt-2 text-gray-600">{currentStage.message}</p>
        </div>
      )}
      
      {stage === 'complete' && (
        <div className="mt-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-2 text-green-600 font-medium">{currentStage.message}</p>
        </div>
      )}
    </div>
  )
}
```

### Spinner Manager
```tsx
class SpinnerManager {
  private static instance: SpinnerManager
  private spinners: Map<string, boolean> = new Map()
  private listeners: Set<(spinners: Map<string, boolean>) => void> = new Set()
  
  static getInstance(): SpinnerManager {
    if (!SpinnerManager.instance) {
      SpinnerManager.instance = new SpinnerManager()
    }
    return SpinnerManager.instance
  }
  
  start(id: string): void {
    this.spinners.set(id, true)
    this.notifyListeners()
  }
  
  stop(id: string): void {
    this.spinners.delete(id)
    this.notifyListeners()
  }
  
  isSpinning(id: string): boolean {
    return this.spinners.has(id)
  }
  
  hasAnySpinner(): boolean {
    return this.spinners.size > 0
  }
  
  getAllSpinners(): string[] {
    return Array.from(this.spinners.keys())
  }
  
  addListener(callback: (spinners: Map<string, boolean>) => void): void {
    this.listeners.add(callback)
  }
  
  removeListener(callback: (spinners: Map<string, boolean>) => void): void {
    this.listeners.delete(callback)
  }
  
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(new Map(this.spinners)))
  }
}

function useSpinnerManager() {
  const [spinners, setSpinners] = useState<Map<string, boolean>>(new Map())
  const manager = SpinnerManager.getInstance()
  
  useEffect(() => {
    const updateSpinners = (newSpinners: Map<string, boolean>) => {
      setSpinners(newSpinners)
    }
    
    manager.addListener(updateSpinners)
    return () => manager.removeListener(updateSpinners)
  }, [manager])
  
  return {
    start: (id: string) => manager.start(id),
    stop: (id: string) => manager.stop(id),
    isSpinning: (id: string) => manager.isSpinning(id),
    hasAnySpinner: () => manager.hasAnySpinner(),
    allSpinners: manager.getAllSpinners(),
    spinners
  }
}

function SpinnerManagerExample() {
  const spinnerManager = useSpinnerManager()
  
  const operations = [
    { id: 'upload', label: 'Upload Files', duration: 2000 },
    { id: 'process', label: 'Process Data', duration: 3000 },
    { id: 'save', label: 'Save Changes', duration: 1500 }
  ]
  
  const runOperation = async (operation: typeof operations[0]) => {
    spinnerManager.start(operation.id)
    await new Promise(resolve => setTimeout(resolve, operation.duration))
    spinnerManager.stop(operation.id)
  }
  
  return (
    <div>
      <div className="space-y-2 mb-6">
        {operations.map(operation => (
          <div key={operation.id} className="flex items-center justify-between p-3 bg-gray-100 rounded">
            <span>{operation.label}</span>
            <div className="flex items-center space-x-3">
              {spinnerManager.isSpinning(operation.id) && (
                <Spinner size="sm" />
              )}
              <button
                onClick={() => runOperation(operation)}
                disabled={spinnerManager.isSpinning(operation.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
              >
                {spinnerManager.isSpinning(operation.id) ? 'Running...' : 'Start'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {spinnerManager.hasAnySpinner() && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center">
            <Spinner size="sm" />
            <span className="ml-2 font-medium">
              {spinnerManager.allSpinners.length} operation(s) running
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
```

## 🧪 Testowanie

### Unit Tests
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Spinner } from './Spinner'

describe('Spinner Component', () => {
  it('renders with default props', () => {
    render(<Spinner data-testid="spinner" />)
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner-circle', 'spinner-md', 'spinner-primary')
  })
  
  it('renders different variants', () => {
    const { rerender } = render(<Spinner variant="dots" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-dots')
    
    rerender(<Spinner variant="bars" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-bars')
  })
  
  it('applies size classes correctly', () => {
    const { rerender } = render(<Spinner size="sm" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-sm')
    
    rerender(<Spinner size="lg" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-lg')
  })
  
  it('applies color classes correctly', () => {
    render(<Spinner color="success" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-success')
  })
  
  it('has correct accessibility attributes', () => {
    render(<Spinner aria-label="Loading data" role="status" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading data')
  })
  
  it('applies custom className', () => {
    render(<Spinner className="custom-class" data-testid="spinner" />)
    expect(screen.getByTestId('spinner')).toHaveClass('custom-class')
  })
})
```

### Integration Tests
```tsx
describe('Loading Button Integration', () => {
  it('shows spinner during loading', async () => {
    const mockAction = jest.fn().mockResolvedValue(undefined)
    
    render(
      <LoadingButton onClick={mockAction}>
        Save
      </LoadingButton>
    )
    
    const button = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(button)
    
    expect(button).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(button).not.toBeDisabled()
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })
    
    expect(mockAction).toHaveBeenCalledTimes(1)
  })
})
```

### Accessibility Tests
```tsx
describe('Spinner Accessibility', () => {
  it('announces loading state to screen readers', () => {
    render(
      <div>
        <div aria-live="polite" data-testid="status">Loading</div>
        <Spinner role="status" aria-label="Loading content" />
      </div>
    )
    
    expect(screen.getByTestId('status')).toHaveTextContent('Loading')
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading content')
  })
})
```

## 📝 Najlepsze Praktyki

### Do ✅
- Używaj role="status" dla spinnerów informacyjnych
- Dodawaj aria-label opisujący co jest ładowane
- Implementuj timeout dla długotrwałych operacji
- Pokazuj relevant messaging wraz ze spinnerem
- Użyj consistent timing dla podobnych operacji
- Disable user interaction podczas ważnych procesów

### Nie rób ❌
- Nie pokazuj spinnerów dla operacji <200ms
- Nie używaj zbyt wielu różnych wariantów jednocześnie
- Nie blokuj całej aplikacji dla lokalnych operacji
- Nie pomijaj error handling po zakończeniu ładowania
- Nie używaj spinner bez clear indication co się dzieje
- Nie pozostawiaj spinnerów "zawieszonymi" bez timeout

### Performance Guidelines
- Użyj CSS animations zamiast JavaScript
- Implementuj lazy loading dla off-screen content
- Optymalizuj spinner display timing
- Avoid excessive DOM updates podczas spinning
- Use efficient update patterns w React/Preact
- Implement proper cleanup dla unmounted components

## 🔄 Migracja i Aktualizacje

### Z v1.0 do v2.0
```tsx
// Stara składnia v1.0
<Spinner spinning={true} tip="Loading...">
  <div>Content</div>
</Spinner>

// Nowa składnia v2.0
{isLoading ? <Spinner>Loading...</Spinner> : <div>Content</div>}
```

### Breaking Changes
- Usunięto `spinning` prop - używaj conditional rendering
- `tip` prop zmieniony na `children` lub osobny element
- `delay` przeniesiony do separate hook lub utility
- `wrapperClassName` zastąpiony przez proper CSS layout

## 📚 Powiązane Komponenty

- **[Progress](./PROGRESS_DOCUMENTATION.md)** - dla określonych wskaźników postępu
- **[Skeleton](./SKELETON_DOCUMENTATION.md)** - dla structural loading placeholders
- **[Alert](./ALERT_DOCUMENTATION.md)** - dla komunikatów po zakończeniu operacji
- **[Button](./BUTTON_DOCUMENTATION.md)** - dla integracji z loading states

## 🎯 Roadmap

### Planowane funkcje v2.1
- [ ] Custom spinner animations builder
- [ ] Advanced timing controls
- [ ] Spinner queue management system
- [ ] Integration z global state management
- [ ] Automatic spinner timeout handling
- [ ] Enhanced accessibility features

### Długoterminowe plany
- [ ] AI-powered loading prediction
- [ ] Advanced performance analytics
- [ ] Spinner A/B testing framework
- [ ] Real-time loading optimization
- [ ] Enhanced cross-platform support
- [ ] Integration z monitoring tools
