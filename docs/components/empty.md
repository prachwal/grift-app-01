# 📭 Empty Component - Dokumentacja Techniczna

Empty to komponent do wyświetlania znaczących stanów pustych z konfigurowalnymi ilustracjami, opisami i akcjami.

## 📋 Spis Treści

1. [Przegląd Komponentu](#przegląd-komponentu)
2. [Instalacja i Użycie](#instalacja-i-użycie)
3. [API Reference](#api-reference)
4. [Przykłady Implementacji](#przykłady-implementacji)
5. [Najlepsze Praktyki](#najlepsze-praktyki)
6. [Dostępność](#dostępność)
7. [Rozwiązywanie Problemów](#rozwiązywanie-problemów)

## Przegląd Komponentu

Empty Component jest zaprojektowany do wyświetlania spójnych i znaczących komunikatów w sytuacjach, gdy brakuje danych lub treści.

### ✨ Kluczowe Funkcje

- **Semantyczne warianty** - Default, search, error, network, data, success
- **Bogate ilustracje** - SVG-based custom illustrations dla każdego typu
- **Responsive design** - Adaptacyjny layout dla różnych ekranów  
- **Akcje użytkownika** - Wbudowane wsparcie dla przycisków akcji
- **Internationalization** - Lokalizowane domyślne komunikaty
- **Theme integration** - Automatyczne dostosowanie do dark/light mode
- **Custom content** - Pełna elastyczność w dostosowaniu treści
- **Animation support** - Subtelne animacje dla lepszego UX

## Instalacja i Użycie

```typescript
import { Empty } from 'nebula/components/Empty'

// Podstawowy stan pusty
<Empty />

// Niestandardowy opis
<Empty description="No articles found" />

// Specific variant
<Empty 
  variant="search"
  description="No search results found" 
/>

// Z akcją użytkownika
<Empty
  variant="error" 
  description="Something went wrong"
>
  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Try Again
  </button>
</Empty>

// Custom image
<Empty
  image={<CustomIllustration />}
  description="Create your first project"
>
  <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
    Get Started
  </button>
</Empty>
```

## API Reference

### Empty Props

```typescript
interface EmptyProps {
  // Content configuration
  image?: ComponentChild | EmptyImageType    // Custom image lub typ wbudowany
  imageStyle?: CSSProperties                 // Style dla obrazu
  description?: ComponentChild               // Opis stanu pustego
  children?: ComponentChild                  // Custom actions/content
  
  // Styling
  className?: string                         // CSS classes
  style?: CSSProperties                      // Inline styles
  size?: EmptySize                          // Rozmiar komponentu
  
  // Semantic variants
  variant?: EmptyImageType                   // Typ semantyczny
  
  // Accessibility
  'aria-label'?: string                      // ARIA label
}
```

### Image Types

```typescript
type EmptyImageType = 
  | 'default'    // Ogólny stan pusty
  | 'simple'     // Minimalistyczna ikona
  | 'search'     // Brak wyników wyszukiwania
  | 'error'      // Błąd systemu  
  | 'network'    // Błąd sieciowy
  | 'data'       // Brak danych
  | 'success'    // Sukces/zakończenie

type EmptySize = 'small' | 'default' | 'large'
```

### Default Messages

```typescript
const defaultMessages = {
  default: 'No Data',
  simple: 'No Data', 
  search: 'No search results',
  error: 'Something went wrong',
  network: 'Network error',
  data: 'No data available',
  success: 'All done!'
}
```

## Przykłady Implementacji

### 1. Search Results Empty State

```typescript
function SearchResults({ query, results, isLoading, error }) {
  if (isLoading) {
    return <SearchSkeleton />
  }
  
  if (error) {
    return (
      <Empty
        variant="error"
        description={`Failed to search for "${query}"`}
      >
        <div className="mt-4 space-x-2">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
          <button 
            onClick={() => setQuery('')}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            Clear Search
          </button>
        </div>
      </Empty>
    )
  }
  
  if (results.length === 0) {
    return (
      <Empty
        variant="search"
        description={
          <div className="text-center">
            <p>No results found for <strong>"{query}"</strong></p>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your search terms or filters
            </p>
          </div>
        }
      >
        <div className="mt-4 space-x-2">
          <button 
            onClick={() => setQuery('')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Clear Search
          </button>
          <button 
            onClick={() => resetFilters()}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </Empty>
    )
  }
  
  return (
    <div className="space-y-4">
      {results.map(result => (
        <SearchResultItem key={result.id} result={result} />
      ))}
    </div>
  )
}
```

### 2. Dashboard Empty States

```typescript
function DashboardWidget({ title, data, isLoading, error, onRefresh, onConfigure }) {
  const renderEmptyState = () => {
    if (error) {
      return (
        <Empty
          variant="error"
          size="small"
          description="Failed to load data"
        >
          <button 
            onClick={onRefresh}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Retry
          </button>
        </Empty>
      )
    }
    
    if (!data || data.length === 0) {
      return (
        <Empty
          variant="data"
          size="small" 
          description="No data available"
        >
          <button
            onClick={onConfigure}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Configure Widget
          </button>
        </Empty>
      )
    }
    
    return null
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <button onClick={onRefresh} className="text-gray-400 hover:text-gray-600">
          <RefreshIcon className="w-4 h-4" />
        </button>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : (
        renderEmptyState() || <WidgetContent data={data} />
      )}
    </div>
  )
}
```

### 3. File Manager Empty States

```typescript
function FileManager({ currentFolder, files, isLoading, canUpload, onUpload, onCreateFolder }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4 p-6">
        {Array(8).fill().map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    )
  }
  
  if (files.length === 0) {
    if (currentFolder.id === 'root') {
      // Root folder empty - first time user
      return (
        <Empty
          variant="default"
          description={
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Welcome to your file storage</h3>
              <p className="text-gray-500">
                Upload files or create folders to get started
              </p>
            </div>
          }
        >
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onUpload}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload Files
            </button>
            <button
              onClick={onCreateFolder}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            >
              <FolderPlusIcon className="w-4 h-4 mr-2" />
              Create Folder
            </button>
          </div>
        </Empty>
      )
    } else {
      // Subfolder empty
      return (
        <Empty
          variant="simple"
          size="small"
          description={`No files in ${currentFolder.name}`}
        >
          {canUpload && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={onUpload}
                className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Upload Here
              </button>
              <button
                onClick={onCreateFolder}
                className="text-sm px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
              >
                Create Folder
              </button>
            </div>
          )}
        </Empty>
      )
    }
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
      {files.map(file => (
        <FileItem key={file.id} file={file} />
      ))}
    </div>
  )
}
```

### 4. Shopping Cart Empty State

```typescript
function ShoppingCart({ items, onContinueShopping, onViewRecommendations }) {
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <Empty
          variant="simple"
          description={
            <div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500">
                Looks like you haven't added any items to your cart yet
              </p>
            </div>
          }
        >
          <div className="mt-6 space-y-3">
            <button
              onClick={onContinueShopping}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              Continue Shopping
            </button>
            <button
              onClick={onViewRecommendations}
              className="w-full px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              View Recommendations
            </button>
          </div>
        </Empty>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### 5. Network Error Recovery

```typescript
function DataTable({ endpoint, columns, filters }) {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
    retryCount: 0
  })
  
  const fetchData = useCallback(async (isRetry = false) => {
    try {
      setState(prev => ({ 
        ...prev, 
        loading: true, 
        error: null,
        retryCount: isRetry ? prev.retryCount + 1 : 0
      }))
      
      const response = await fetch(`${endpoint}?${new URLSearchParams(filters)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setState(prev => ({ ...prev, data, loading: false }))
      
    } catch (error) {
      console.error('Data fetch error:', error)
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Network error occurred'
      }))
    }
  }, [endpoint, filters])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  // Auto-retry with exponential backoff
  useEffect(() => {
    if (state.error && state.retryCount < 3) {
      const delay = Math.pow(2, state.retryCount) * 1000 // 1s, 2s, 4s
      const timer = setTimeout(() => fetchData(true), delay)
      return () => clearTimeout(timer)
    }
  }, [state.error, state.retryCount, fetchData])
  
  if (state.loading) {
    return <TableSkeleton columns={columns} />
  }
  
  if (state.error) {
    return (
      <Empty
        variant="network"
        description={
          <div className="text-center">
            <h3 className="font-medium mb-1">Connection Error</h3>
            <p className="text-sm text-gray-500 mb-2">{state.error}</p>
            {state.retryCount > 0 && (
              <p className="text-xs text-gray-400">
                Retry attempt: {state.retryCount}/3
              </p>
            )}
          </div>
        }
      >
        <div className="mt-4 space-x-3">
          <button
            onClick={() => fetchData(true)}
            disabled={state.retryCount >= 3}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {state.retryCount >= 3 ? 'Max Retries Reached' : 'Try Again'}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            Refresh Page
          </button>
        </div>
      </Empty>
    )
  }
  
  if (state.data.length === 0) {
    return (
      <Empty
        variant="data"
        description="No records found"
      >
        <button
          onClick={() => fetchData()}
          className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-700"
        >
          Refresh
        </button>
      </Empty>
    )
  }
  
  return <Table data={state.data} columns={columns} />
}
```

### 6. Onboarding Empty States

```typescript
function ProjectDashboard({ user, projects, onCreateProject, onJoinProject }) {
  const isFirstTimeUser = user.createdAt && Date.now() - new Date(user.createdAt).getTime() < 24 * 60 * 60 * 1000
  
  if (projects.length === 0) {
    if (isFirstTimeUser) {
      return (
        <div className="max-w-2xl mx-auto text-center py-16">
          <Empty
            variant="success"
            description={
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to the platform!</h2>
                <p className="text-gray-600 mb-4">
                  You're all set up and ready to create your first project
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-left">
                  <h4 className="font-medium mb-2">Getting Started Tips:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Create a project to organize your work</li>
                    <li>• Invite team members to collaborate</li>
                    <li>• Use templates to get started quickly</li>
                  </ul>
                </div>
              </div>
            }
          >
            <div className="mt-6 space-y-3">
              <button
                onClick={onCreateProject}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
              >
                Create Your First Project
              </button>
              <div className="text-sm text-gray-500">
                or{' '}
                <button
                  onClick={onJoinProject}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  join an existing project
                </button>
              </div>
            </div>
          </Empty>
        </div>
      )
    }
    
    return (
      <Empty
        variant="default"
        description="No projects yet"
      >
        <div className="mt-4 flex gap-3">
          <button
            onClick={onCreateProject}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            New Project
          </button>
          <button
            onClick={onJoinProject}
            className="px-6 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
          >
            Join Project
          </button>
        </div>
      </Empty>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

## Najlepsze Praktyki

### 🎯 Kontekstowe Stany Puste

```typescript
// ✅ Dobre - Specific messaging dla różnych kontekstów
const getEmptyStateConfig = (context, userRole) => {
  const configs = {
    'user-profile': {
      variant: 'default',
      title: 'Complete your profile',
      description: 'Add information to help others connect with you',
      action: 'Edit Profile'
    },
    'search-results': {
      variant: 'search', 
      title: 'No results found',
      description: 'Try different keywords or adjust your filters',
      action: 'Clear Filters'
    },
    'admin-users': {
      variant: 'data',
      title: userRole === 'admin' ? 'No users yet' : 'Access denied',
      description: userRole === 'admin' ? 'Invite users to get started' : null,
      action: userRole === 'admin' ? 'Invite Users' : null
    }
  }
  
  return configs[context] || configs['default']
}

// ✅ Dobre - Progressive disclosure
const EmptyStateWithHelp = ({ context, onAction, showHelp = false }) => {
  const config = getEmptyStateConfig(context)
  
  return (
    <Empty variant={config.variant} description={config.description}>
      <div className="mt-4 space-y-3">
        {config.action && (
          <button onClick={onAction} className="primary-button">
            {config.action}
          </button>
        )}
        
        {showHelp && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              Need help getting started?
            </summary>
            <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
              <ContextualHelpContent context={context} />
            </div>
          </details>
        )}
      </div>
    </Empty>
  )
}
```

### 🔄 Loading States Integration

```typescript
// ✅ Dobre - Smooth transitions między stanami
const DataContainer = ({ isLoading, error, data, onRetry }) => {
  const [previousData, setPreviousData] = useState(data)
  
  // Keep previous data during loading for better UX
  useEffect(() => {
    if (!isLoading && data) {
      setPreviousData(data)
    }
  }, [isLoading, data])
  
  const showStaleData = isLoading && previousData?.length > 0
  
  return (
    <div className="relative">
      {/* Stale data with loading overlay */}
      {showStaleData && (
        <>
          <div className="opacity-50">
            <DataList data={previousData} />
          </div>
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        </>
      )}
      
      {/* Fresh loading state */}
      {isLoading && !showStaleData && <LoadingSkeleton />}
      
      {/* Error state */}
      {error && (
        <Empty variant="error" description={error.message}>
          <button onClick={onRetry} className="mt-4 retry-button">
            Try Again
          </button>
        </Empty>
      )}
      
      {/* Empty data */}
      {!isLoading && !error && (!data || data.length === 0) && (
        <Empty variant="data" description="No data available" />
      )}
      
      {/* Success data */}
      {!isLoading && !error && data?.length > 0 && (
        <DataList data={data} />
      )}
    </div>
  )
}

// ✅ Dobre - Optimistic updates z fallback
const OptimisticDataList = ({ items, onAdd, onRemove }) => {
  const [optimisticItems, setOptimisticItems] = useState(items)
  const [failedOperations, setFailedOperations] = useState(new Set())
  
  const handleAdd = async (newItem) => {
    // Optimistic update
    const tempId = `temp-${Date.now()}`
    const optimisticItem = { ...newItem, id: tempId, pending: true }
    setOptimisticItems(prev => [...prev, optimisticItem])
    
    try {
      const savedItem = await onAdd(newItem)
      setOptimisticItems(prev => 
        prev.map(item => 
          item.id === tempId ? { ...savedItem, pending: false } : item
        )
      )
    } catch (error) {
      // Revert optimistic update
      setOptimisticItems(prev => prev.filter(item => item.id !== tempId))
      setFailedOperations(prev => new Set([...prev, 'add']))
      
      // Show error state temporarily
      setTimeout(() => setFailedOperations(prev => {
        const newSet = new Set(prev)
        newSet.delete('add')
        return newSet
      }), 3000)
    }
  }
  
  if (optimisticItems.length === 0) {
    return (
      <Empty 
        variant={failedOperations.has('add') ? 'error' : 'default'}
        description={
          failedOperations.has('add') 
            ? 'Failed to add item. Please try again.'
            : 'No items yet'
        }
      >
        <button onClick={() => handleAdd({ name: 'New Item' })}>
          {failedOperations.has('add') ? 'Retry' : 'Add First Item'}
        </button>
      </Empty>
    )
  }
  
  return (
    <div className="space-y-2">
      {optimisticItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          isPending={item.pending}
          onRemove={() => handleRemove(item.id)}
        />
      ))}
    </div>
  )
}
```

### 🎨 Custom Illustrations

```typescript
// ✅ Dobre - Brand-consistent custom images
const BrandEmptyState = ({ variant, ...props }) => {
  const customImages = {
    'no-projects': <NoProjectsIllustration />,
    'no-team-members': <TeamIllustration />,
    'no-notifications': <BellIllustration />,
    'maintenance': <MaintenanceIllustration />
  }
  
  const customImage = customImages[variant]
  
  return (
    <Empty
      image={customImage || variant}
      {...props}
    />
  )
}

// ✅ Dobre - Responsive illustrations
const ResponsiveEmptyState = ({ size, ...props }) => {
  const getImageSize = () => {
    if (size === 'small') return { width: 120, height: 120 }
    if (size === 'large') return { width: 240, height: 240 }
    return { width: 180, height: 180 } // default
  }
  
  const imageSize = getImageSize()
  
  return (
    <Empty
      imageStyle={{
        width: imageSize.width,
        height: imageSize.height,
        margin: '0 auto'
      }}
      size={size}
      {...props}
    />
  )
}

// ✅ Dobre - Animated illustrations  
const AnimatedEmptyState = ({ variant, animated = true }) => {
  const AnimatedImage = animated ? motion.div : 'div'
  
  const imageComponents = {
    loading: (
      <AnimatedImage
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <LoadingSpinner size="lg" />
      </AnimatedImage>
    ),
    success: (
      <AnimatedImage
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        <SuccessIcon size="lg" />
      </AnimatedImage>
    )
  }
  
  return (
    <Empty
      image={imageComponents[variant] || variant}
      variant={variant}
    />
  )
}
```

## Dostępność

### 🎯 Screen Reader Support

```typescript
// ✅ Dobra dostępność - Semantic markup
<Empty
  variant="search"
  description="No results found"
  aria-label="Search results empty state"
  role="status"
  aria-live="polite"  // Announce changes
>
  <button 
    aria-label="Clear search and start over"
    onClick={clearSearch}
  >
    Clear Search
  </button>
</Empty>

// ✅ Contextual ARIA labels
const AccessibleEmpty = ({ variant, searchTerm, resultsCount = 0 }) => {
  const getAriaLabel = () => {
    switch (variant) {
      case 'search':
        return `No search results found for "${searchTerm}". Try different keywords.`
      case 'error':
        return 'An error occurred while loading content. Please try again.'
      case 'data':
        return 'No data is currently available.'
      default:
        return 'Content area is empty.'
    }
  }
  
  return (
    <Empty
      variant={variant}
      aria-label={getAriaLabel()}
      role="status"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    />
  )
}
```

### ⌨️ Keyboard Navigation

```typescript
// ✅ Focusable actions w Empty states
const EmptyWithActions = ({ actions = [] }) => {
  const [focusIndex, setFocusIndex] = useState(0)
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        setFocusIndex(prev => Math.min(prev + 1, actions.length - 1))
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        setFocusIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        actions[focusIndex]?.handler()
        break
    }
  }
  
  return (
    <Empty variant="default" description="No content available">
      <div 
        className="mt-4 flex gap-2"
        onKeyDown={handleKeyDown}
        role="group"
        aria-label="Available actions"
      >
        {actions.map((action, index) => (
          <button
            key={action.key}
            ref={index === focusIndex ? (el) => el?.focus() : null}
            tabIndex={index === focusIndex ? 0 : -1}
            onClick={action.handler}
            className={`px-4 py-2 rounded ${
              index === focusIndex 
                ? 'ring-2 ring-blue-500 bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </Empty>
  )
}
```

### 🌍 Internationalization

```typescript
// ✅ Localized empty states
const useLocalizedEmptyStates = () => {
  const { t, locale } = useTranslation()
  
  return {
    getEmptyStateConfig: (variant) => ({
      default: {
        description: t('empty.default', 'No data available'),
        action: t('empty.action.refresh', 'Refresh')
      },
      search: {
        description: t('empty.search', 'No search results found'),
        action: t('empty.action.clearSearch', 'Clear search')
      },
      error: {
        description: t('empty.error', 'Something went wrong'),
        action: t('empty.action.tryAgain', 'Try again')  
      },
      network: {
        description: t('empty.network', 'Connection problem'),
        action: t('empty.action.retry', 'Retry')
      }
    }[variant] || {}),
    
    formatEmptyMessage: (variant, context = {}) => {
      if (variant === 'search' && context.query) {
        return t('empty.searchWithQuery', 
          'No results found for "{{query}}"', 
          { query: context.query }
        )
      }
      
      if (variant === 'data' && context.entityType) {
        return t('empty.noEntityType', 
          'No {{entityType}} found', 
          { entityType: t(`entities.${context.entityType}`, context.entityType) }
        )
      }
      
      return this.getEmptyStateConfig(variant).description
    }
  }
}

// ✅ RTL support
const RTLAwareEmpty = ({ children, ...props }) => {
  const { dir } = useDirection() // 'ltr' | 'rtl'
  
  return (
    <Empty 
      {...props}
      className={cn(
        'empty-state',
        dir === 'rtl' && 'rtl:space-x-reverse'
      )}
    >
      <div className={cn(
        'flex gap-2',
        dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'
      )}>
        {children}
      </div>
    </Empty>
  )
}
```

## Rozwiązywanie Problemów

### 🐛 Typowe Problemy

**Problem**: Empty state nie wyświetla się na właściwej wysokości

```typescript
// ✅ Rozwiązanie - Container height management
const EmptyStateContainer = ({ children, minHeight = 400 }) => {
  return (
    <div 
      className="flex items-center justify-center w-full"
      style={{ minHeight: `${minHeight}px` }}
    >
      <div className="max-w-md mx-auto px-4">
        {children}
      </div>
    </div>
  )
}

// ✅ Rozwiązanie - Responsive heights
<Empty
  className="min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
  description="Content will be displayed here"
/>

// ✅ Rozwiązanie - Flexbox parent container
<div className="flex-1 flex flex-col">
  <div className="flex-1 flex items-center justify-center">
    <Empty variant="default" />
  </div>
</div>
```

**Problem**: Custom illustrations nie skalują się responsywnie

```typescript
// ✅ Rozwiązanie - SVG viewBox i responsive sizing
const ResponsiveSVGIllustration = ({ size = 'default' }) => {
  const sizeMap = {
    small: 120,
    default: 180, 
    large: 240
  }
  
  const dimensionPx = sizeMap[size]
  
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      className={`max-w-[${dimensionPx}px] max-h-[${dimensionPx}px] w-full h-auto`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* SVG content */}
    </svg>
  )
}

// ✅ Rozwiązanie - CSS-based responsive images
.empty-illustration {
  width: 100%;
  height: auto;
  max-width: 180px;
  aspect-ratio: 1;
}

@media (max-width: 640px) {
  .empty-illustration {
    max-width: 120px;
  }
}

@media (min-width: 1024px) {
  .empty-illustration {
    max-width: 240px;
  }
}
```

**Problem**: Empty state actions nie są dostępne z klawiatury

```typescript
// ✅ Rozwiązanie - Proper focus management
const KeyboardAccessibleEmpty = ({ actions }) => {
  const actionsRef = useRef([])
  const [focusIndex, setFocusIndex] = useState(0)
  
  useEffect(() => {
    // Auto-focus first action when component mounts
    if (actions.length > 0 && actionsRef.current[0]) {
      actionsRef.current[0].focus()
    }
  }, [actions.length])
  
  const handleKeyNavigation = (e, currentIndex) => {
    switch (e.key) {
      case 'Tab':
        // Let default tab behavior work
        return
      case 'ArrowRight':
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % actions.length
        actionsRef.current[nextIndex]?.focus()
        setFocusIndex(nextIndex)
        break
      case 'ArrowLeft':
        e.preventDefault()
        const prevIndex = currentIndex === 0 ? actions.length - 1 : currentIndex - 1
        actionsRef.current[prevIndex]?.focus()
        setFocusIndex(prevIndex)
        break
    }
  }
  
  return (
    <Empty variant="default" description="No content">
      <div className="mt-4 flex gap-2" role="group" aria-label="Available actions">
        {actions.map((action, index) => (
          <button
            key={action.key}
            ref={el => actionsRef.current[index] = el}
            onKeyDown={e => handleKeyNavigation(e, index)}
            onClick={action.handler}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {action.label}
          </button>
        ))}
      </div>
    </Empty>
  )
}
```

**Problem**: Animation performance issues

```typescript
// ✅ Rozwiązanie - Optimized animations
const OptimizedAnimatedEmpty = ({ variant, animated = true }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  
  // Check for prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShouldAnimate(animated && !prefersReducedMotion)
  }, [animated])
  
  // Use CSS animations instead of JS for better performance
  return (
    <div className={cn(
      'empty-state-container',
      shouldAnimate && 'animate-fade-in'
    )}>
      <Empty
        variant={variant}
        image={
          <div className={cn(
            'empty-illustration',
            shouldAnimate && variant === 'loading' && 'animate-spin-slow'
          )}>
            <IllustrationComponent variant={variant} />
          </div>
        }
      />
    </div>
  )
}

/* CSS */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-spin-slow {
    animation: none;
  }
}
```

### 🔧 Performance Optimization

```typescript
// ✅ Lazy loading dla heavy illustrations
const LazyEmptyState = ({ variant, ...props }) => {
  const [IllustrationComponent, setIllustrationComponent] = useState(null)
  
  useEffect(() => {
    // Lazy load illustration components
    const loadIllustration = async () => {
      try {
        const module = await import(`./illustrations/${variant}Illustration`)
        setIllustrationComponent(() => module.default)
      } catch (error) {
        console.warn(`Failed to load ${variant} illustration:`, error)
        // Fallback to default
        setIllustrationComponent(() => DefaultIllustration)
      }
    }
    
    loadIllustration()
  }, [variant])
  
  if (!IllustrationComponent) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }
  
  return (
    <Empty 
      image={<IllustrationComponent />}
      variant={variant}
      {...props}
    />
  )
}

// ✅ Memoization dla expensive renders
const MemoizedEmpty = memo(Empty, (prevProps, nextProps) => {
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.description === nextProps.description &&
    prevProps.size === nextProps.size &&
    React.isValidElement(prevProps.children) === React.isValidElement(nextProps.children)
  )
})

// ✅ Virtual scrolling dla list z empty states
const VirtualizedDataList = ({ items, renderItem, emptyComponent }) => {
  if (items.length === 0) {
    return emptyComponent || <Empty variant="data" />
  }
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={100}
      itemData={items}
    >
      {renderItem}
    </FixedSizeList>
  )
}
```

---

## 💡 Podsumowanie

Empty Component oferuje:
- **Semantic variants** - Różne typy dla różnych kontekstów
- **Rich illustrations** - SVG-based custom graphics  
- **User guidance** - Meaningful actions i helpertext
- **Accessibility** - Screen reader support i keyboard navigation
- **Internationalization** - Multi-language support
- **Performance** - Optimized animations i lazy loading

Komponent został zaprojektowany aby przekształcić puste stany z frustrujących momentów w możliwości prowadzenia użytkownika przez interfejs.
