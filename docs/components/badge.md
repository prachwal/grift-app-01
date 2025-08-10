# 🏷️ Badge Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Badge** to kompaktowy wskaźnik statusu i licznik powiadomień, który dostarcza wizualnego feedbacku o stanie elementów interfejsu. Idealny do oznaczania statusów, liczb powiadomień, etykiet produktów i innych wskaźników w aplikacjach.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Multiple Variants** - różne warianty kolorystyczne (default, primary, secondary, success, warning, error)
- **Size Options** - rozmiary sm, md, lg dla różnych kontekstów
- **Shape Variants** - kształty (rounded, pill, square)
- **Dot Mode** - tryb kropki dla subtelnych wskaźników
- **Number Overflow** - obsługa przepełnienia liczb (99+)
- **Flexible Content** - obsługa tekstu, liczb i custom content
- **Dark Mode Support** - pełne wsparcie trybu ciemnego
- **Accessibility** - semantyczne znaczniki i odpowiedni kontrast

### 🎨 Warianty Kolorystyczne
- **Default** - neutralny szary dla ogólnych etykiet
- **Primary** - główny kolor brandu dla ważnych oznaczników
- **Secondary** - drugorzędny kolor dla dodatkowych informacji  
- **Success** - zielony dla pozytywnych statusów
- **Warning** - pomarańczowy/żółty dla ostrzeżeń
- **Error** - czerwony dla błędów i problemów

## 🚀 Podstawowe Użycie

### Prosty Badge
```tsx
import { Badge } from '@nebula/components'

function SimpleExample() {
  return (
    <div className="space-x-2">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  )
}
```

### Badge z Liczbami
```tsx
function NumberBadges() {
  return (
    <div className="space-x-4">
      <div className="relative inline-block">
        <button className="p-2 text-gray-600">
          🔔
        </button>
        <Badge variant="error" className="absolute -top-1 -right-1">
          3
        </Badge>
      </div>
      
      <div className="relative inline-block">
        <button className="p-2 text-gray-600">
          📧
        </button>
        <Badge variant="primary" className="absolute -top-1 -right-1">
          99+
        </Badge>
      </div>
    </div>
  )
}
```

### Dot Mode (Tryb Kropki)
```tsx
function DotBadges() {
  return (
    <div className="space-x-4">
      <div className="relative inline-block">
        <button className="p-2 text-gray-600">
          👤 Profile
        </button>
        <Badge dot variant="success" className="absolute -top-1 -right-1" />
      </div>
      
      <div className="relative inline-block">
        <span className="text-gray-700">Status</span>
        <Badge dot variant="warning" className="ml-2" />
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
    <div className="space-x-2 flex items-center">
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  )
}
```

### Kształty
```tsx
function ShapeVariants() {
  return (
    <div className="space-x-2">
      <Badge shape="rounded" variant="success">Rounded</Badge>
      <Badge shape="pill" variant="warning">Pill</Badge>
      <Badge shape="square" variant="error">Square</Badge>
    </div>
  )
}
```

### Obsługa Przepełnienia Liczb
```tsx
function OverflowHandling() {
  return (
    <div className="space-x-4">
      <Badge variant="error" max={99}>5</Badge>
      <Badge variant="error" max={99}>99</Badge>
      <Badge variant="error" max={99}>150</Badge> {/* Wyświetli 99+ */}
      <Badge variant="primary" max={999}>1500</Badge> {/* Wyświetli 999+ */}
    </div>
  )
}
```

## 🎨 Praktyczne Przykłady

### Badge w Nawigacji
```tsx
function NavigationWithBadges() {
  return (
    <nav className="flex space-x-6">
      <div className="relative">
        <a href="/messages" className="text-gray-600 hover:text-gray-800">
          Messages
        </a>
        <Badge variant="primary" className="absolute -top-2 -right-4">
          12
        </Badge>
      </div>
      
      <div className="relative">
        <a href="/notifications" className="text-gray-600 hover:text-gray-800">
          Notifications
        </a>
        <Badge variant="error" className="absolute -top-2 -right-4">
          3
        </Badge>
      </div>
      
      <div className="relative">
        <a href="/tasks" className="text-gray-600 hover:text-gray-800">
          Tasks
        </a>
        <Badge dot variant="warning" className="absolute -top-2 -right-2" />
      </div>
    </nav>
  )
}
```

### Status Badges
```tsx
function StatusBadges() {
  const statuses = [
    { label: 'Active', variant: 'success' as const },
    { label: 'Pending', variant: 'warning' as const },
    { label: 'Inactive', variant: 'secondary' as const },
    { label: 'Error', variant: 'error' as const }
  ]
  
  return (
    <div className="space-y-2">
      {statuses.map((status) => (
        <div key={status.label} className="flex items-center justify-between p-3 bg-white rounded-lg shadow">
          <span className="text-gray-700">Server Status</span>
          <Badge variant={status.variant} shape="pill">
            {status.label}
          </Badge>
        </div>
      ))}
    </div>
  )
}
```

### E-commerce Product Badges
```tsx
function ProductBadges() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow relative">
        <Badge variant="error" className="absolute top-2 right-2">
          Sale
        </Badge>
        <Badge variant="success" className="absolute top-2 left-2" size="sm">
          New
        </Badge>
        <img src="/product1.jpg" alt="Product" className="w-full h-32 object-cover rounded" />
        <h3 className="mt-2 font-semibold">Amazing Product</h3>
        <p className="text-gray-600">$99.99</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow relative">
        <Badge variant="warning" className="absolute top-2 right-2">
          Limited
        </Badge>
        <img src="/product2.jpg" alt="Product" className="w-full h-32 object-cover rounded" />
        <h3 className="mt-2 font-semibold">Cool Gadget</h3>
        <p className="text-gray-600">$149.99</p>
      </div>
    </div>
  )
}
```

### Interactive Badge z Hook
```tsx
import { useState } from 'preact/hooks'

function InteractiveBadge() {
  const [count, setCount] = useState(0)
  const [isOnline, setIsOnline] = useState(false)
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Notification
        </button>
        <div className="relative">
          <span className="text-gray-700">🔔</span>
          {count > 0 && (
            <Badge variant="error" className="absolute -top-2 -right-2">
              {count}
            </Badge>
          )}
        </div>
        <button 
          onClick={() => setCount(0)}
          className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">Status:</span>
        <Badge 
          dot 
          variant={isOnline ? 'success' : 'secondary'}
        />
        <span className="text-sm text-gray-600">
          {isOnline ? 'Online' : 'Offline'}
        </span>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          className="ml-4 px-2 py-1 text-xs bg-gray-200 rounded"
        >
          Toggle
        </button>
      </div>
    </div>
  )
}
```

## 🎛️ API Reference

### Props

| Prop        | Type                                                                         | Default     | Opis                                   |
| ----------- | ---------------------------------------------------------------------------- | ----------- | -------------------------------------- |
| `variant`   | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'default'` | Wariant kolorystyczny                  |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                       | `'md'`      | Rozmiar komponentu                     |
| `shape`     | `'rounded' \| 'pill' \| 'square'`                                            | `'rounded'` | Kształt badge'a                        |
| `dot`       | `boolean`                                                                    | `false`     | Tryb kropki (bez tekstu)               |
| `max`       | `number`                                                                     | `99`        | Maksymalna liczba przed pokazaniem "+" |
| `children`  | `ComponentChildren`                                                          | -           | Zawartość badge'a                      |
| `className` | `string`                                                                     | -           | Dodatkowe klasy CSS                    |

### CSS Classes

**Bazowe klasy:**
- `.badge` - główna klasa komponentu
- `.badge-dot` - klasa dla trybu kropki

**Warianty:**
- `.badge-default` - domyślny szary
- `.badge-primary` - główny kolor brandu
- `.badge-secondary` - drugorzędny kolor
- `.badge-success` - zielony sukces
- `.badge-warning` - pomarańczowe ostrzeżenie
- `.badge-error` - czerwony błąd

**Rozmiary:**
- `.badge-sm` - mały rozmiar
- `.badge-md` - średni rozmiar (domyślny)
- `.badge-lg` - duży rozmiar

**Kształty:**
- `.badge-rounded` - zaokrąglone rogi
- `.badge-pill` - pełne zaokrąglenie
- `.badge-square` - kwadratowe rogi

## ♿ Accessibility

### ARIA Support
```tsx
function AccessibleBadge() {
  return (
    <div className="relative inline-block">
      <button 
        className="p-2 text-gray-600"
        aria-label="Messages"
      >
        📧
      </button>
      <Badge 
        variant="primary" 
        className="absolute -top-1 -right-1"
        aria-label="3 unread messages"
        role="status"
      >
        3
      </Badge>
    </div>
  )
}
```

### Screen Reader Support
```tsx
function ScreenReaderFriendly() {
  const notificationCount = 5
  
  return (
    <button 
      className="relative p-2"
      aria-label={`Notifications, ${notificationCount} unread`}
    >
      🔔
      <Badge 
        variant="error" 
        className="absolute -top-1 -right-1"
        aria-hidden="true" // Ukryj przed czytnikami, info w aria-label button
      >
        {notificationCount}
      </Badge>
    </button>
  )
}
```

### Keyboard Navigation
```tsx
function KeyboardNavigableBadges() {
  return (
    <div className="flex space-x-2" role="group" aria-label="Status filters">
      <button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Badge variant="success" size="lg">
          Active <span className="ml-1">✓</span>
        </Badge>
      </button>
      <button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Badge variant="warning" size="lg">
          Pending <span className="ml-1">⏳</span>
        </Badge>
      </button>
    </div>
  )
}
```

## 🎨 Custom Styling

### Customowe Kolory
```tsx
function CustomColorBadge() {
  return (
    <div className="space-x-2">
      <Badge className="bg-purple-500 text-white">
        Custom Purple
      </Badge>
      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        Gradient
      </Badge>
      <Badge className="bg-gray-100 text-gray-800 border border-gray-300">
        Outlined
      </Badge>
    </div>
  )
}
```

### Animowane Badge
```tsx
function AnimatedBadge() {
  return (
    <div className="relative inline-block">
      <button className="p-2 text-gray-600">
        🔔
      </button>
      <Badge 
        variant="error" 
        className="absolute -top-1 -right-1 animate-pulse"
      >
        New!
      </Badge>
    </div>
  )
}
```

## 🛠️ Zaawansowane Techniki

### Custom Hook dla Badge
```tsx
import { useState, useEffect } from 'preact/hooks'

function useBadgeCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(count > 0)
  }, [count])
  
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => Math.max(0, c - 1))
  const reset = () => setCount(0)
  
  return {
    count,
    isVisible,
    increment,
    decrement,
    reset,
    setCount
  }
}

function BadgeWithHook() {
  const notifications = useBadgeCounter()
  
  return (
    <div className="space-x-4">
      <div className="relative inline-block">
        <button className="p-2 text-gray-600">
          🔔
        </button>
        {notifications.isVisible && (
          <Badge variant="error" className="absolute -top-1 -right-1">
            {notifications.count}
          </Badge>
        )}
      </div>
      
      <div className="space-x-2">
        <button onClick={notifications.increment}>Add</button>
        <button onClick={notifications.decrement}>Remove</button>
        <button onClick={notifications.reset}>Clear</button>
      </div>
    </div>
  )
}
```

### Badge z Tooltip
```tsx
import { Tooltip } from '@nebula/components'

function BadgeWithTooltip() {
  return (
    <div className="relative inline-block">
      <button className="p-2 text-gray-600">
        📊 Dashboard
      </button>
      
      <Tooltip content="5 new alerts require attention">
        <Badge variant="warning" className="absolute -top-1 -right-1">
          5
        </Badge>
      </Tooltip>
    </div>
  )
}
```

### Multi-Badge System
```tsx
function MultiBadgeSystem() {
  const badges = [
    { type: 'messages', count: 3, variant: 'primary' as const },
    { type: 'alerts', count: 1, variant: 'error' as const },
    { type: 'updates', count: 8, variant: 'success' as const }
  ]
  
  return (
    <div className="flex space-x-4">
      {badges.map((badge) => (
        <div key={badge.type} className="relative">
          <button className="p-3 bg-gray-100 rounded-lg">
            <span className="text-sm font-medium capitalize">
              {badge.type}
            </span>
          </button>
          {badge.count > 0 && (
            <Badge 
              variant={badge.variant} 
              className="absolute -top-2 -right-2"
            >
              {badge.count}
            </Badge>
          )}
        </div>
      ))}
    </div>
  )
}
```

## 🔧 Performance i Optymalizacja

### Memoization dla Badge
```tsx
import { memo } from 'preact/compat'

const OptimizedBadge = memo<BadgeProps>(({ children, variant, ...props }) => {
  return (
    <Badge variant={variant} {...props}>
      {children}
    </Badge>
  )
})

function PerformantBadgeList() {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    count: Math.floor(Math.random() * 100),
    variant: ['success', 'warning', 'error'][Math.floor(Math.random() * 3)] as const
  }))
  
  return (
    <div className="grid grid-cols-10 gap-2">
      {items.map((item) => (
        <OptimizedBadge key={item.id} variant={item.variant}>
          {item.count}
        </OptimizedBadge>
      ))}
    </div>
  )
}
```

### Lazy Loading Badge Content
```tsx
function LazyBadgeContent({ shouldLoad }: { shouldLoad: boolean }) {
  const [content, setContent] = useState<string>('')
  
  useEffect(() => {
    if (shouldLoad && !content) {
      // Simulate async data loading
      setTimeout(() => {
        setContent('42')
      }, 500)
    }
  }, [shouldLoad, content])
  
  return (
    <Badge variant="primary">
      {content || '...'}
    </Badge>
  )
}
```

## 🧪 Testowanie

### Unit Tests
```tsx
import { render, screen } from '@testing-library/preact'
import { Badge } from './Badge'

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge>Test</Badge>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
  
  it('applies correct variant classes', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('badge-success')
  })
  
  it('handles number overflow correctly', () => {
    render(<Badge max={99}>150</Badge>)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })
  
  it('renders dot mode without text', () => {
    const { container } = render(<Badge dot variant="error" />)
    const badge = container.firstChild
    expect(badge).toHaveClass('badge-dot')
    expect(badge).toBeEmptyDOMElement()
  })
})
```

### Integration Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/preact'

describe('Badge Integration', () => {
  it('updates count when button is clicked', () => {
    const TestComponent = () => {
      const [count, setCount] = useState(0)
      return (
        <div>
          <button onClick={() => setCount(c => c + 1)}>
            Increment
          </button>
          <Badge>{count}</Badge>
        </div>
      )
    }
    
    render(<TestComponent />)
    
    const button = screen.getByText('Increment')
    const badge = screen.getByText('0')
    
    fireEvent.click(button)
    expect(badge).toHaveTextContent('1')
  })
})
```

## 📝 Najlepsze Praktyki

### Do ✅
- Używaj semantycznych wariantów kolorów (success, error, warning)
- Implementuj odpowiednie aria-label dla liczników
- Używaj dot mode dla subtelnych wskaźników statusu  
- Optymalizuj dla screen reader z właściwymi rolami
- Implementuj overflow handling dla dużych liczb
- Używaj konsystentnych rozmiarów w aplikacji

### Nie rób ❌
- Nie używaj Badge jako głównych elementów nawigacji
- Nie używaj zbyt wielu różnych wariantów w jednym widoku
- Nie pomijaj accessibility attributes dla interaktywnych Badge
- Nie używaj Badge do długich tekstów (użyj Label lub Tag)
- Nie używaj bardzo małych rozmiarów dla ważnych informacji
- Nie omiĳ kontrastu kolorów w custom styling

### Accessibility Guidelines
- Zawsze dodaj aria-label dla liczników i statusów
- Używaj role="status" dla dynamicznych aktualizacji
- Zapewnij odpowiedni kontrast kolorów (4.5:1 minimum)
- Ukrywaj dekoracyjne Badge przed screen reader (aria-hidden="true")
- Używaj semantic HTML gdy Badge jest interaktywny

## 🔄 Migracja i Aktualizacje

### Z v1.0 do v2.0
```tsx
// Stara składnia v1.0
<Badge color="red" small>Error</Badge>

// Nowa składnia v2.0  
<Badge variant="error" size="sm">Error</Badge>
```

### Breaking Changes
- `color` prop zmieniony na `variant`
- `small`, `large` props zastąpione przez `size="sm|md|lg"`
- Usunięto `outline` prop - użyj custom styling
- `count` prop zastąpiony przez `children` z logika overflow

## 📚 Powiązane Komponenty

- **[Alert](./ALERT_DOCUMENTATION.md)** - dla większych komunikatów z akcjami
- **[Tooltip](./TOOLTIP_DOCUMENTATION.md)** - dla dodatkowych informacji przy hover
- **[Tags](./TAGS_DOCUMENTATION.md)** - dla etykiet z możliwością edycji
- **[Progress](./PROGRESS_DOCUMENTATION.md)** - dla wskaźników postępu
- **[Toast](./TOAST_DOCUMENTATION.md)** - dla powiadomień popup

## 🎯 Roadmap

### Planowane funkcje v2.1
- [ ] Animacje wejścia/wyjścia
- [ ] Badge z obrazkami/avatar
- [ ] Multi-line Badge support  
- [ ] Gradient variant presets
- [ ] Badge group/cluster component
- [ ] Right-to-left (RTL) language support

### Długoterminowe plany
- [ ] Badge z drag & drop functionality
- [ ] Interactive Badge z menu kontekstowym  
- [ ] Badge analytics i tracking
- [ ] Advanced theming system
- [ ] Badge builder/generator tool
