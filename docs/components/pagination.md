# 📄 Pagination Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Pagination** to zaawansowany element nawigacyjny służący do dzielenia dużych zbiorów danych na mniejsze, łatwiejsze do zarządzania strony. Zapewnia intuicyjne sterowanie i pełną dostępność, umożliwiając użytkownikom sprawne poruszanie się po danych.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Responsywny Design** - adaptacyjny layout na różnych ekranach  
- **Smart Page Display** - inteligentne wyświetlanie numerów stron z elipsą
- **Jump Controls** - bezpośredni skok do wybranej strony
- **Page Size Selector** - zmiana liczby elementów na stronie
- **Keyboard Navigation** - pełna obsługa klawiatury (strzałki, Home, End)
- **ARIA Live Regions** - ogłaszanie zmian dla screen readerów
- **Dark Mode Support** - natywne wsparcie trybu ciemnego

### 🔧 Komponenty Funkcjonalne
- Previous/Next navigation
- Numbered page buttons  
- First/Last page shortcuts
- Quick jump input field
- Items per page selector
- Total items information

## 🔧 Instalacja i Import

```typescript
import { Pagination } from '@nebula/components'

// Podstawowe użycie
const [currentPage, setCurrentPage] = useState(1)
const totalPages = Math.ceil(totalItems / itemsPerPage)
```

## 📝 Podstawowe Użycie

### 1. Prosta Paginacja

```typescript
function SimplePagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 20

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  )
}
```

### 2. Z Page Size Selector

```typescript
function PaginationWithPageSize() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalItems = 250

  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      showPageSizeSelector={true}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      pageSizeOptions={[10, 20, 50, 100]}
      totalItems={totalItems}
      showTotalItems={true}
    />
  )
}
```

### 3. Z Quick Jump

```typescript
function PaginationWithJump() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={50}
      onPageChange={setCurrentPage}
      showQuickJump={true}
      showFirstLast={true}
      maxButtons={7}
    />
  )
}
```

## 🎨 Zaawansowane Przykłady

### 1. Kompletna Paginacja z Danymi

```typescript
function DataPagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [data, setData] = useState<Item[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)

  const totalPages = Math.ceil(totalItems / pageSize)

  const fetchData = async (page: number, size: number) => {
    setLoading(true)
    try {
      const response = await api.getItems({
        page,
        size,
        offset: (page - 1) * size
      })
      
      setData(response.items)
      setTotalItems(response.total)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentPage, pageSize)
  }, [currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      {/* Data Table */}
      <div className="min-h-96">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <LoadingSpinner />
          </div>
        ) : (
          <DataTable items={data} />
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize)
          setCurrentPage(1) // Reset to first page
        }}
        totalItems={totalItems}
        showPageSizeSelector={true}
        showTotalItems={true}
        showQuickJump={true}
        showFirstLast={true}
        disabled={loading}
      />
    </div>
  )
}
```

### 2. Server-Side Pagination

```typescript
function ServerPagination() {
  const [state, setState] = useState({
    currentPage: 1,
    pageSize: 25,
    totalPages: 0,
    totalItems: 0,
    data: [],
    loading: false,
    error: null
  })

  const fetchPage = async (page: number, size: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(`/api/data?page=${page}&size=${size}`)
      
      if (!response.ok) throw new Error('Failed to fetch')
      
      const result = await response.json()
      
      setState(prev => ({
        ...prev,
        data: result.data,
        totalPages: result.totalPages,
        totalItems: result.totalItems,
        currentPage: page,
        pageSize: size,
        loading: false
      }))
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }))
    }
  }

  return (
    <>
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
          Error: {state.error}
        </div>
      )}
      
      <DataGrid 
        data={state.data} 
        loading={state.loading} 
      />
      
      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onPageChange={(page) => fetchPage(page, state.pageSize)}
        totalItems={state.totalItems}
        pageSize={state.pageSize}
        onPageSizeChange={(size) => fetchPage(1, size)}
        disabled={state.loading}
        compact={false}
      />
    </>
  )
}
```

### 3. Mobile-Optimized Pagination  

```typescript
function MobilePagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={25}
      onPageChange={setCurrentPage}
      compact={isMobile}
      maxButtons={isMobile ? 3 : 7}
      showQuickJump={!isMobile}
      showFirstLast={!isMobile}
      size={isMobile ? 'sm' : 'md'}
      labels={{
        previous: isMobile ? 'Prev' : 'Previous',
        next: isMobile ? 'Next' : 'Next Page',
      }}
    />
  )
}
```

## 🔌 Props API

### PaginationProps

| Prop                   | Type                     | Default        | Opis                                       |
| ---------------------- | ------------------------ | -------------- | ------------------------------------------ |
| `currentPage`          | `number`                 | -              | **Required**. Bieżąca strona (1-indexed)   |
| `totalPages`           | `number`                 | -              | **Required**. Całkowita liczba stron       |
| `onPageChange`         | `(page: number) => void` | -              | **Required**. Callback zmiany strony       |
| `siblingCount`         | `number`                 | `1`            | Liczba sąsiednich stron wokół bieżącej     |
| `boundaryCount`        | `number`                 | `1`            | Liczba stron na początku/końcu             |
| `showFirstLast`        | `boolean`                | `true`         | Czy pokazywać przyciski First/Last         |
| `showPrevNext`         | `boolean`                | `true`         | Czy pokazywać Previous/Next                |
| `showQuickJump`        | `boolean`                | `false`        | Czy pokazywać pole skoku do strony         |
| `showPageSizeSelector` | `boolean`                | `false`        | Czy pokazywać selektor rozmiaru strony     |
| `showTotalItems`       | `boolean`                | `false`        | Czy pokazywać informację o łącznej liczbie |
| `pageSize`             | `number`                 | `10`           | Liczba elementów na stronie                |
| `onPageSizeChange`     | `(size: number) => void` | -              | Callback zmiany rozmiaru strony            |
| `pageSizeOptions`      | `number[]`               | `[10, 20, 50]` | Opcje rozmiaru strony                      |
| `totalItems`           | `number`                 | -              | Całkowita liczba elementów                 |
| `size`                 | `'sm' \| 'md' \| 'lg'`   | `'md'`         | Rozmiar komponentu                         |
| `compact`              | `boolean`                | `false`        | Tryb kompaktowy (mobilny)                  |
| `disabled`             | `boolean`                | `false`        | Czy cała paginacja jest nieaktywna         |
| `labels`               | `PaginationLabels`       | -              | Custom labels dla przycisków               |
| `className`            | `string`                 | -              | Dodatkowe klasy CSS                        |
| `data-testid`          | `string`                 | -              | Test ID dla automatyzacji                  |

### PaginationLabels

| Prop           | Type     | Default                                  | Opis                           |
| -------------- | -------- | ---------------------------------------- | ------------------------------ |
| `previous`     | `string` | `'Previous'`                             | Label dla przycisku Previous   |
| `next`         | `string` | `'Next'`                                 | Label dla przycisku Next       |
| `first`        | `string` | `'First'`                                | Label dla przycisku First      |
| `last`         | `string` | `'Last'`                                 | Label dla przycisku Last       |
| `jumpTo`       | `string` | `'Jump to page'`                         | Placeholder dla jump input     |
| `itemsPerPage` | `string` | `'Items per page'`                       | Label dla page size selector   |
| `showingItems` | `string` | `'Showing {from}-{to} of {total} items'` | Template dla info o elementach |

## ♿ Dostępność (Accessibility)

### ARIA Navigation
```html
<nav role="navigation" aria-label="Pagination">
  <ul role="list">
    <li>
      <button aria-label="Go to previous page" aria-disabled="false">
        Previous
      </button>
    </li>
    <li>
      <button aria-label="Go to page 1" aria-current="page">
        1
      </button>
    </li>
  </ul>
</nav>
```

### Keyboard Support
- **Left/Right Arrows** - navigacja między przyciskami
- **Home** - przejście do pierwszej strony
- **End** - przejście do ostatniej strony  
- **Enter/Space** - aktywacja przycisku
- **Tab** - nawigacja sekwencyjna

### Screen Reader Support
- ARIA live region dla ogłoszeń zmian
- Opisowe `aria-label` dla każdego przycisku
- `aria-current="page"` dla bieżącej strony
- `aria-disabled` dla nieaktywnych przycisków

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Pagination } from '../Pagination'

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correct number of page buttons', () => {
    render(<Pagination {...defaultProps} />)
    
    // Should show: Previous, 1, 2, 3, 4, 5, ..., 10, Next
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('calls onPageChange when page button is clicked', () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
    
    fireEvent.click(screen.getByText('3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  test('disables Previous on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)
    
    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Next')).not.toBeDisabled()
  })

  test('disables Next on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />)
    
    expect(screen.getByText('Previous')).not.toBeDisabled()
    expect(screen.getByText('Next')).toBeDisabled()
  })

  test('shows page size selector when enabled', () => {
    render(
      <Pagination 
        {...defaultProps} 
        showPageSizeSelector={true}
        pageSize={10}
        onPageSizeChange={vi.fn()}
      />
    )
    
    expect(screen.getByDisplayValue('10')).toBeInTheDocument()
  })

  test('handles keyboard navigation', () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />)
    
    const pagination = screen.getByRole('navigation')
    
    // Test Home key
    fireEvent.keyDown(pagination, { key: 'Home' })
    expect(onPageChange).toHaveBeenCalledWith(1)
    
    // Test End key
    fireEvent.keyDown(pagination, { key: 'End' })
    expect(onPageChange).toHaveBeenCalledWith(10)
  })
})
```

### Integration Testing

```typescript
describe('Pagination Integration', () => {
  test('works with data fetching', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: Array.from({length: 10}, (_, i) => ({id: i})),
        totalPages: 5,
        totalItems: 50
      })
    })

    global.fetch = mockFetch

    const { result } = renderHook(() => usePaginatedData())
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    // Change page
    act(() => {
      result.current.setPage(2)
    })
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/data?page=2&size=10')
    })
  })
})
```

## 🎨 Styling i Customizacja

### CSS Classes

```css
/* Kontener główny */
.nebula-pagination {
  @apply flex items-center justify-between flex-wrap gap-4;
}

/* Navigation */
.nebula-pagination-nav {
  @apply flex items-center space-x-1;
}

/* Przycisk strony */
.nebula-pagination-button {
  @apply px-3 py-2 text-sm font-medium rounded-md transition-colors;
  @apply text-gray-700 hover:bg-gray-100;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Aktywna strona */
.nebula-pagination-button-active {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

/* Kompaktowy tryb */
.nebula-pagination-compact .nebula-pagination-nav {
  @apply space-x-0.5;
}

.nebula-pagination-compact .nebula-pagination-button {
  @apply px-2 py-1 text-xs;
}

/* Dark mode */
.dark .nebula-pagination-button {
  @apply text-gray-300 hover:bg-gray-700;
}
```

### Custom Theme

```typescript
function ThemedPagination() {
  return (
    <Pagination
      currentPage={1}
      totalPages={10}
      onPageChange={console.log}
      className="
        bg-gradient-to-r from-blue-50 to-purple-50 
        dark:from-blue-900/20 dark:to-purple-900/20
        p-4 rounded-xl border border-blue-200 dark:border-blue-800
      "
      size="lg"
    />
  )
}
```

## 📊 Performance

### Optymalizacje
- Memoized page number generation
- Debounced quick jump input
- Virtual scrolling dla bardzo dużej liczby stron
- Lazy loading page size options

### Bundle Size
- Core: ~3.8KB (gzipped)
- Z wszystkimi funkcjami: ~4.7KB (gzipped)
- Tree-shakable exports

### Memory Management
- Automatic cleanup of event listeners
- Optimized re-renders with React.memo
- Efficient page range calculations

## 🔗 Powiązane Komponenty

- **[Table](/table)** - tabele z wbudowaną paginacją
- **[Breadcrumb](/breadcrumb)** - hierarchiczna nawigacja
- **[Steps](/steps)** - nawigacja kroków w procesach

## 📚 Dodatkowe Zasoby

- [ARIA Pagination Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/pagination/)
- [Web.dev - Pagination UX](https://web.dev/pagination/)
- [Material Design - Pagination](https://material.io/components/data-tables#pagination)
