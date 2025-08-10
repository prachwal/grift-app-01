# 🧭 Breadcrumb Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Breadcrumb** to hierarchiczny element nawigacyjny, który pokazuje użytkownikowi jego bieżące położenie w strukturze strony. Jest niezbędny dla dobrego UX, ponieważ pozwala na szybkie przeskakiwanie między poziomami nawigacji i lepsze zrozumienie struktury witryny.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Responsywna Collapse** - automatyczne ukrywanie elementów na mniejszych ekranach
- **Custom Separators** - możliwość wyboru różnych separatorów (strzałka, slash, chevron, custom)
- **Home Icon** - opcjonalny link do strony głównej z ikoną
- **ARIA Navigation** - pełna dostępność z atrybutami `aria-label` i `aria-current`
- **Dark Mode** - natywne wsparcie dla trybu ciemnego
- **Keyboard Navigation** - obsługa klawiatury (Tab, Enter, Space)

### 📊 Warianty Separatorów
- `arrow` - strzałka `→`
- `slash` - ukośnik `/`  
- `chevron` - symbol `>`
- `custom` - dowolny element React/Preact

## 🔧 Instalacja i Import

```typescript
import { Breadcrumb, type BreadcrumbItem } from '@nebula/components'

// Definicja elementów ścieżki
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Laptops', href: '/products/laptops' },
  { label: 'MacBook Pro', href: null, isCurrentPage: true }
]
```

## 📝 Podstawowe Użycie

### 1. Prosta Ścieżka Nawigacji

```typescript
function SimpleBreadcrumb() {
  const items = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/dashboard/users' },
    { label: 'Profile', href: null, isCurrentPage: true }
  ]

  return <Breadcrumb items={items} />
}
```

### 2. Z Ikoną Home

```typescript
function BreadcrumbWithHome() {
  const items = [
    { label: 'Categories', href: '/categories' },
    { label: 'Electronics', href: '/categories/electronics' },
    { label: 'Smartphones' }
  ]

  return (
    <Breadcrumb 
      items={items}
      showHome={true}
      homeHref="/"
    />
  )
}
```

### 3. Custom Separatory

```typescript
function CustomSeparatorBreadcrumb() {
  return (
    <>
      {/* Strzałka */}
      <Breadcrumb 
        items={items} 
        separator="arrow" 
      />
      
      {/* Slash */}
      <Breadcrumb 
        items={items} 
        separator="slash" 
      />
      
      {/* Custom element */}
      <Breadcrumb 
        items={items} 
        separator={<span className="text-blue-500">→</span>} 
      />
    </>
  )
}
```

## 🎨 Zaawansowane Przykłady

### 1. Responsywne Collapse

```typescript
function ResponsiveBreadcrumb() {
  const longPath = [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Subcategory', href: '/category/sub' },
    { label: 'Product Type', href: '/category/sub/type' },
    { label: 'Brand', href: '/category/sub/type/brand' },
    { label: 'Model', href: '/category/sub/type/brand/model' },
    { label: 'Current Product', isCurrentPage: true }
  ]

  return (
    <Breadcrumb 
      items={longPath}
      maxItems={4}
      itemsBeforeCollapse={2}
      itemsAfterCollapse={2}
    />
  )
  // Wynik: Home > Category > ... > Model > Current Product
}
```

### 2. Z Ikonami

```typescript
import { HomeIcon, FolderIcon, DocumentIcon } from 'lucide-preact'

function IconBreadcrumb() {
  const itemsWithIcons = [
    { 
      label: 'Home', 
      href: '/', 
      icon: <HomeIcon className="w-4 h-4" />
    },
    { 
      label: 'Documents', 
      href: '/documents',
      icon: <FolderIcon className="w-4 h-4" />
    },
    { 
      label: 'Report.pdf',
      icon: <DocumentIcon className="w-4 h-4" />,
      isCurrentPage: true
    }
  ]

  return <Breadcrumb items={itemsWithIcons} />
}
```

### 3. Programatyczne Zarządzanie

```typescript
function DynamicBreadcrumb() {
  const [currentPath, setCurrentPath] = useState([
    { label: 'Dashboard', href: '/dashboard' }
  ])

  const navigateToSection = (section: string) => {
    setCurrentPath(prev => [
      ...prev,
      { label: section, href: `/dashboard/${section.toLowerCase()}` }
    ])
  }

  const goBack = (index: number) => {
    setCurrentPath(prev => prev.slice(0, index + 1))
  }

  return (
    <div className="space-y-4">
      <Breadcrumb 
        items={currentPath}
        onItemClick={(item, index) => goBack(index)}
      />
      
      <div className="flex gap-2">
        <button onClick={() => navigateToSection('Users')}>
          Go to Users
        </button>
        <button onClick={() => navigateToSection('Settings')}>
          Go to Settings
        </button>
      </div>
    </div>
  )
}
```

## 🔌 Props API

### BreadcrumbProps

| Prop                  | Type                                                 | Default     | Opis                                              |
| --------------------- | ---------------------------------------------------- | ----------- | ------------------------------------------------- |
| `items`               | `BreadcrumbItem[]`                                   | -           | **Required**. Lista elementów ścieżki             |
| `separator`           | `'arrow' \| 'slash' \| 'chevron' \| React.ReactNode` | `'chevron'` | Typ separatora między elementami                  |
| `maxItems`            | `number`                                             | `undefined` | Max liczba widocznych elementów (enable collapse) |
| `itemsBeforeCollapse` | `number`                                             | `1`         | Elementy przed elipsą                             |
| `itemsAfterCollapse`  | `number`                                             | `1`         | Elementy po elipsie                               |
| `showHome`            | `boolean`                                            | `false`     | Czy pokazywać ikonę home na początku              |
| `homeHref`            | `string`                                             | `'/'`       | Link do strony głównej                            |
| `onItemClick`         | `(item: BreadcrumbItem, index: number) => void`      | -           | Callback przy kliknięciu elementu                 |
| `className`           | `string`                                             | -           | Dodatkowe klasy CSS                               |
| `data-testid`         | `string`                                             | -           | Test ID dla automatyzacji testów                  |

### BreadcrumbItem

| Prop            | Type              | Default | Opis                                |
| --------------- | ----------------- | ------- | ----------------------------------- |
| `label`         | `string`          | -       | **Required**. Tekst do wyświetlenia |
| `href`          | `string \| null`  | -       | Link URL (null = nie kliknięty)     |
| `isCurrentPage` | `boolean`         | `false` | Czy to bieżąca strona               |
| `icon`          | `React.ReactNode` | -       | Opcjonalna ikona                    |
| `disabled`      | `boolean`         | `false` | Czy element jest nieaktywny         |

## ♿ Dostępność (Accessibility)

### ARIA Atrybuty
```html
<nav aria-label="Breadcrumb">
  <ol role="list">
    <li>
      <a href="/" aria-label="Go to Home">Home</a>
    </li>
    <li>
      <span aria-current="page">Current Page</span>
    </li>
  </ol>
</nav>
```

### Klawiatura
- **Tab** - nawigacja między linkami
- **Enter/Space** - aktywacja linku
- **Shift+Tab** - nawigacja wstecz

### Screen Readers
- Semantyczna struktura `<nav>` + `<ol>`
- Atrybuty `aria-current="page"` dla bieżącej strony
- Opisowe `aria-label` dla kontekstu

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/preact'
import { Breadcrumb } from '../Breadcrumb'

describe('Breadcrumb', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current', isCurrentPage: true }
  ]

  test('renders all breadcrumb items', () => {
    render(<Breadcrumb items={mockItems} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  test('marks current page with aria-current', () => {
    render(<Breadcrumb items={mockItems} />)
    
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page')
  })

  test('calls onItemClick when item is clicked', () => {
    const onItemClick = vi.fn()
    render(<Breadcrumb items={mockItems} onItemClick={onItemClick} />)
    
    fireEvent.click(screen.getByText('Home'))
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0], 0)
  })

  test('collapses items when maxItems is exceeded', () => {
    const longItems = Array.from({ length: 10 }, (_, i) => ({
      label: `Item ${i}`,
      href: `/item-${i}`
    }))

    render(<Breadcrumb items={longItems} maxItems={4} />)
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})
```

### E2E Testing

```typescript
// cypress/integration/breadcrumb.spec.ts
describe('Breadcrumb Navigation', () => {
  it('allows navigation through breadcrumb items', () => {
    cy.visit('/products/electronics/phones/iphone')
    
    cy.get('[data-testid="breadcrumb"]').should('be.visible')
    cy.get('[data-testid="breadcrumb"] a').should('have.length.at.least', 3)
    
    // Click on Products
    cy.get('[data-testid="breadcrumb"]').contains('Products').click()
    cy.url().should('include', '/products')
    
    // Check accessibility
    cy.get('[aria-label="Breadcrumb"]').should('exist')
    cy.get('[aria-current="page"]').should('contain', 'Products')
  })
})
```

## 🎨 Styling i Customizacja

### CSS Classes
```css
/* Główny kontener */
.nebula-breadcrumb {
  @apply flex items-center space-x-1 text-sm;
}

/* Element listy */
.nebula-breadcrumb-item {
  @apply flex items-center;
}

/* Link */
.nebula-breadcrumb-link {
  @apply text-gray-500 hover:text-gray-700 transition-colors;
}

/* Bieżąca strona */
.nebula-breadcrumb-current {
  @apply text-gray-900 font-medium;
}

/* Separator */
.nebula-breadcrumb-separator {
  @apply text-gray-400 mx-2;
}

/* Dark mode */
.dark .nebula-breadcrumb-link {
  @apply text-gray-400 hover:text-gray-200;
}

.dark .nebula-breadcrumb-current {
  @apply text-gray-100;
}
```

### Custom Theming

```typescript
function ThemedBreadcrumb() {
  return (
    <Breadcrumb 
      items={items}
      className="
        bg-blue-50 dark:bg-blue-900/20 
        p-3 rounded-lg 
        border border-blue-200 dark:border-blue-800
      "
      separator={
        <span className="text-blue-500 font-bold mx-3">
          →
        </span>
      }
    />
  )
}
```

## 📊 Performance

### Optymalizacje
- Komponenty są memoizowane z `memo()`
- Separator renderowany tylko gdy potrzebny
- Collapse logic działa bez re-renderów
- Lazy loading dla ikon

### Bundle Size
- Core: ~2.3KB (gzipped)
- Z ikonami: ~3.1KB (gzipped)
- Tree-shakable imports

## 🔗 Powiązane Komponenty

- **[Tabs](/tabs)** - alternatywna nawigacja pozioma
- **[Steps](/steps)** - nawigacja kroków w procesach
- **[Pagination](/pagination)** - stronicowanie dla dużych zbiorów danych

## 📚 Dodatkowe Zasoby

- [WAI-ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
- [Web.dev - Breadcrumbs](https://web.dev/breadcrumbs/)
- [Material Design - Breadcrumbs](https://material.io/components/breadcrumbs)
