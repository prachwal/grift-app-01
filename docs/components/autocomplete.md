# 🔍 Autocomplete Component - Dokumentacja

## 📖 Przegląd

Autocomplete to komponent do inteligentnego wyszukiwania i wybierania opcji z automatycznymi sugestiami. Idealny do search boxów, selektorów użytkowników, tagowania, adresów i wszystkich scenariuszy wymagających szybkiego znalezienia i wyboru z dużego zbioru opcji.

## ✨ Cechy Główne

- 🔍 **Inteligentne wyszukiwanie** - Fuzzy search, highlights, ranking
- ⚡ **Async data loading** - Ładowanie opcji z API na żądanie
- 🎯 **Multi-select** - Wybieranie wielu opcji z tagami
- 🎨 **Custom rendering** - Elastyczne renderowanie opcji i wyników
- ⌨️ **Keyboard navigation** - Pełna obsługa klawiatury
- 📱 **Mobile-friendly** - Touch support i responsive design
- ♿ **Dostępność** - ARIA support i screen readers
- 🎪 **Advanced features** - Grouping, infinite scroll, caching

## 🔧 Instalacja i Import

```typescript
import { Autocomplete, AutocompleteOption } from '@nebula/components'

// Podstawowy autocomplete
function BasicAutocomplete() {
  const options = [
    { value: '1', label: 'Apple' },
    { value: '2', label: 'Banana' },
    { value: '3', label: 'Cherry' },
    { value: '4', label: 'Date' },
    { value: '5', label: 'Elderberry' }
  ]

  const [value, setValue] = useState('')
  
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Search fruits..."
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
    />
  )
}
```

## 📝 Podstawowe Użycie

### 1. User Search Autocomplete

```typescript
function UserSearchAutocomplete() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const searchUsers = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) {
      setUsers([])
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(searchTerm)}`)
      const userData = await response.json()
      
      const formattedUsers = userData.map(user => ({
        value: user.id,
        label: user.name,
        email: user.email,
        avatar: user.avatar,
        department: user.department,
        role: user.role,
        isOnline: user.status === 'online'
      }))
      
      setUsers(formattedUsers)
    } catch (error) {
      console.error('Failed to search users:', error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const renderUser = (user) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50">
      <div className="relative">
        <img 
          src={user.avatar} 
          alt={user.label}
          className="w-10 h-10 rounded-full"
        />
        {user.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{user.label}</div>
        <div className="text-sm text-gray-600">{user.email}</div>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{user.role}</span>
          <span>•</span>
          <span>{user.department}</span>
        </div>
      </div>
      <div className={`text-xs px-2 py-1 rounded-full ${
        user.isOnline 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {user.isOnline ? 'Online' : 'Offline'}
      </div>
    </div>
  )

  const renderSelected = (user) => (
    <div className="flex items-center space-x-2">
      <img 
        src={user.avatar} 
        alt={user.label}
        className="w-6 h-6 rounded-full"
      />
      <span>{user.label}</span>
    </div>
  )

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Find User</h2>
        <p className="text-sm text-gray-600">Search for team members by name or email</p>
      </div>

      <Autocomplete
        options={users}
        value={selectedUser}
        onChange={setSelectedUser}
        onSearch={searchUsers}
        loading={loading}
        placeholder="Type to search users..."
        
        // Rendering
        optionRender={renderUser}
        valueRender={renderSelected}
        
        // Search configuration
        searchDelay={300}
        minSearchLength={2}
        maxResults={10}
        
        // Behavior
        clearable={true}
        autoFocus={false}
        selectOnFocus={false}
        blurOnSelect={true}
        
        // Styling
        className="w-full"
        dropdownClassName="max-h-80 overflow-auto"
        
        // No results message
        notFoundContent={
          <div className="text-center py-6 text-gray-500">
            <div className="text-2xl mb-2">👤</div>
            <div>No users found</div>
            <div className="text-sm">Try different search terms</div>
          </div>
        }
        
        // Loading indicator
        loadingContent={
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
            <span className="ml-2">Searching users...</span>
          </div>
        }
      />
      
      {selectedUser && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Selected User</h3>
          <div className="flex items-center space-x-3">
            <img 
              src={selectedUser.avatar} 
              alt={selectedUser.label}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-medium">{selectedUser.label}</div>
              <div className="text-sm text-gray-600">{selectedUser.email}</div>
              <div className="text-xs text-gray-500">
                {selectedUser.role} • {selectedUser.department}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### 2. Multi-Select Tags Autocomplete

```typescript
function TagsAutocomplete() {
  const [availableTags] = useState([
    { value: 'javascript', label: 'JavaScript', color: '#f7df1e', category: 'language' },
    { value: 'typescript', label: 'TypeScript', color: '#3178c6', category: 'language' },
    { value: 'react', label: 'React', color: '#61dafb', category: 'framework' },
    { value: 'vue', label: 'Vue.js', color: '#4fc08d', category: 'framework' },
    { value: 'angular', label: 'Angular', color: '#dd0031', category: 'framework' },
    { value: 'nodejs', label: 'Node.js', color: '#339933', category: 'runtime' },
    { value: 'python', label: 'Python', color: '#3776ab', category: 'language' },
    { value: 'django', label: 'Django', color: '#092e20', category: 'framework' },
    { value: 'express', label: 'Express.js', color: '#000000', category: 'framework' },
    { value: 'mongodb', label: 'MongoDB', color: '#47a248', category: 'database' },
    { value: 'postgresql', label: 'PostgreSQL', color: '#336791', category: 'database' },
    { value: 'redis', label: 'Redis', color: '#dc382d', category: 'database' }
  ])
  
  const [selectedTags, setSelectedTags] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const groupedOptions = useMemo(() => {
    const filtered = availableTags.filter(tag => 
      tag.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTags.some(selected => selected.value === tag.value)
    )
    
    const grouped = filtered.reduce((acc, tag) => {
      if (!acc[tag.category]) {
        acc[tag.category] = []
      }
      acc[tag.category].push(tag)
      return acc
    }, {})
    
    return grouped
  }, [searchTerm, selectedTags, availableTags])

  const renderTag = (tag) => (
    <div className="flex items-center space-x-3 p-2">
      <div 
        className="w-4 h-4 rounded"
        style={{ backgroundColor: tag.color }}
      />
      <div className="flex-1">
        <span className="font-medium">{tag.label}</span>
        <span className="ml-2 text-xs text-gray-500 capitalize">{tag.category}</span>
      </div>
    </div>
  )

  const renderSelectedTag = (tag, onRemove) => (
    <div 
      className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm border"
      style={{ 
        backgroundColor: `${tag.color}20`, 
        borderColor: `${tag.color}40`,
        color: tag.color 
      }}
    >
      <div 
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: tag.color }}
      />
      <span className="font-medium">{tag.label}</span>
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-black/10 rounded-full p-1"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Technology Stack</h2>
        <p className="text-gray-600">Select technologies you're experienced with</p>
      </div>

      <Autocomplete
        mode="multiple"
        options={Object.entries(groupedOptions).map(([category, tags]) => ({
          label: category.charAt(0).toUpperCase() + category.slice(1),
          options: tags
        }))}
        value={selectedTags}
        onChange={setSelectedTags}
        onSearch={setSearchTerm}
        searchValue={searchTerm}
        placeholder="Search technologies..."
        
        // Multi-select configuration
        maxTagCount={10}
        maxTagTextLength={20}
        tagRender={renderSelectedTag}
        
        // Option rendering
        optionRender={renderTag}
        
        // Grouping
        groupRender={(group) => (
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
            {group.label} ({group.options.length})
          </div>
        )}
        
        // Search behavior
        filterOption={false} // We handle filtering manually
        showSearch={true}
        
        // Styling
        className="w-full"
        dropdownClassName="max-h-96"
        
        // Custom messages
        notFoundContent={
          <div className="text-center py-4 text-gray-500">
            <div className="text-xl mb-1">🔍</div>
            <div>No technologies found for "{searchTerm}"</div>
          </div>
        }
      />

      {selectedTags.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Selected Technologies ({selectedTags.length})</h3>
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => 
              renderSelectedTag(tag, () => 
                setSelectedTags(prev => prev.filter(t => t.value !== tag.value))
              )
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Categories: {[...new Set(selectedTags.map(t => t.category))].join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}
```

### 3. Address Autocomplete with Google Places

```typescript
function AddressAutocomplete() {
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  const searchAddresses = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) {
      setAddresses([])
      return
    }

    setLoading(true)
    
    try {
      // Mock Google Places API call
      const response = await fetch(
        `/api/places/autocomplete?input=${encodeURIComponent(searchTerm)}`
      )
      const data = await response.json()
      
      const formattedAddresses = data.predictions.map(prediction => ({
        value: prediction.place_id,
        label: prediction.description,
        mainText: prediction.structured_formatting.main_text,
        secondaryText: prediction.structured_formatting.secondary_text,
        types: prediction.types,
        distance: prediction.distance_meters
      }))
      
      setAddresses(formattedAddresses)
    } catch (error) {
      console.error('Failed to search addresses:', error)
      setAddresses([])
    } finally {
      setLoading(false)
    }
  }

  const getAddressDetails = async (placeId) => {
    try {
      const response = await fetch(`/api/places/details?place_id=${placeId}`)
      const data = await response.json()
      
      return {
        ...data.result,
        formatted_address: data.result.formatted_address,
        geometry: data.result.geometry,
        components: data.result.address_components
      }
    } catch (error) {
      console.error('Failed to get address details:', error)
      return null
    }
  }

  const handleAddressSelect = async (address) => {
    setSelectedAddress(address)
    
    // Get detailed address information
    const details = await getAddressDetails(address.value)
    if (details) {
      setSelectedAddress(prev => ({ ...prev, details }))
    }
  }

  const renderAddress = (address) => (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50">
      <div className="mt-1">
        {address.types.includes('establishment') ? '🏢' : 
         address.types.includes('street_address') ? '🏠' : 
         '📍'}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{address.mainText}</div>
        <div className="text-sm text-gray-600">{address.secondaryText}</div>
        {address.distance && (
          <div className="text-xs text-gray-500 mt-1">
            ~{Math.round(address.distance / 1000)} km away
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
        <p className="text-sm text-gray-600">Enter your address for delivery</p>
      </div>

      <Autocomplete
        options={addresses}
        value={selectedAddress}
        onChange={handleAddressSelect}
        onSearch={searchAddresses}
        loading={loading}
        placeholder="Enter your address..."
        
        // Search configuration
        searchDelay={500}
        minSearchLength={3}
        
        // Rendering
        optionRender={renderAddress}
        
        // Styling
        className="w-full"
        size="large"
        
        // Custom content
        notFoundContent={
          <div className="text-center py-4 text-gray-500">
            <div className="text-xl mb-1">🗺️</div>
            <div>No addresses found</div>
            <div className="text-sm">Try entering more specific details</div>
          </div>
        }
        
        // Loading state
        loadingContent={
          <div className="flex items-center justify-center py-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
            <span className="ml-2 text-sm">Searching addresses...</span>
          </div>
        }
      />

      {selectedAddress?.details && (
        <div className="mt-6 p-4 border rounded-lg bg-white">
          <h3 className="font-semibold mb-3">Selected Address</h3>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-lg">📍</span>
              <div>
                <div className="font-medium">{selectedAddress.mainText}</div>
                <div className="text-sm text-gray-600">
                  {selectedAddress.details.formatted_address}
                </div>
              </div>
            </div>
            
            {selectedAddress.details.geometry && (
              <div className="text-xs text-gray-500">
                Coordinates: {selectedAddress.details.geometry.location.lat}, 
                {selectedAddress.details.geometry.location.lng}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Confirm Address
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

## 🎨 Warianty i Konfiguracja

### Sizes and Variants

```typescript
function AutocompleteSizes() {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]

  return (
    <div className="space-y-6">
      {/* Small Size */}
      <Autocomplete
        size="small"
        options={options}
        placeholder="Small autocomplete"
      />

      {/* Medium Size (default) */}
      <Autocomplete
        size="medium"
        options={options}
        placeholder="Medium autocomplete"
      />

      {/* Large Size */}
      <Autocomplete
        size="large"
        options={options}
        placeholder="Large autocomplete"
      />

      {/* Bordered Variant */}
      <Autocomplete
        variant="bordered"
        options={options}
        placeholder="Bordered variant"
      />

      {/* Filled Variant */}
      <Autocomplete
        variant="filled"
        options={options}
        placeholder="Filled variant"
      />

      {/* Borderless Variant */}
      <Autocomplete
        variant="borderless"
        options={options}
        placeholder="Borderless variant"
      />
    </div>
  )
}
```

### Custom Filter Functions

```typescript
function CustomFilterAutocomplete() {
  const options = [
    { value: '1', label: 'JavaScript Developer', skills: ['js', 'react', 'node'] },
    { value: '2', label: 'Python Developer', skills: ['python', 'django', 'flask'] },
    { value: '3', label: 'Full Stack Developer', skills: ['js', 'python', 'sql'] }
  ]

  // Fuzzy search filter
  const fuzzyFilter = (input, option) => {
    const searchTerm = input.toLowerCase()
    const optionText = option.label.toLowerCase()
    
    // Check if all characters of input exist in order
    let j = 0
    for (let i = 0; i < optionText.length && j < searchTerm.length; i++) {
      if (optionText[i] === searchTerm[j]) {
        j++
      }
    }
    return j === searchTerm.length
  }

  // Multi-field filter
  const multiFieldFilter = (input, option) => {
    const searchTerm = input.toLowerCase()
    return (
      option.label.toLowerCase().includes(searchTerm) ||
      option.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    )
  }

  // Starts with filter
  const startsWithFilter = (input, option) => {
    return option.label.toLowerCase().startsWith(input.toLowerCase())
  }

  return (
    <div className="space-y-4">
      <Autocomplete
        options={options}
        filterOption={fuzzyFilter}
        placeholder="Fuzzy search (try: jsdvl)"
      />

      <Autocomplete
        options={options}
        filterOption={multiFieldFilter}
        placeholder="Multi-field search (try: react or python)"
        optionRender={(option) => (
          <div>
            <div className="font-medium">{option.label}</div>
            <div className="text-sm text-gray-500">
              Skills: {option.skills.join(', ')}
            </div>
          </div>
        )}
      />

      <Autocomplete
        options={options}
        filterOption={startsWithFilter}
        placeholder="Starts with filter"
      />
    </div>
  )
}
```

### Infinite Scroll Autocomplete

```typescript
function InfiniteScrollAutocomplete() {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const loadOptions = async (search, pageNum = 1, reset = false) => {
    if (loading) return

    setLoading(true)
    
    try {
      const response = await fetch(
        `/api/options?search=${search}&page=${pageNum}&limit=20`
      )
      const data = await response.json()
      
      setOptions(prev => reset ? data.results : [...prev, ...data.results])
      setHasMore(data.hasMore)
      setPage(pageNum)
    } catch (error) {
      console.error('Failed to load options:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPage(1)
    loadOptions(value, 1, true)
  }

  const loadMore = () => {
    if (hasMore && !loading) {
      loadOptions(searchTerm, page + 1, false)
    }
  }

  return (
    <Autocomplete
      options={options}
      onSearch={handleSearch}
      loading={loading}
      placeholder="Search with infinite scroll..."
      
      // Infinite scroll configuration
      onPopupScroll={(e) => {
        const { target } = e
        if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
          loadMore()
        }
      }}
      
      // Custom dropdown footer for loading more
      dropdownFooter={
        hasMore && !loading ? (
          <div className="text-center py-2">
            <button 
              onClick={loadMore}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Load more...
            </button>
          </div>
        ) : null
      }
      
      loadingContent={
        <div className="text-center py-2 text-gray-500">
          Loading more options...
        </div>
      }
    />
  )
}
```

## 🎛️ Advanced Features

### Async Search with Caching

```typescript
function CachedAsyncAutocomplete() {
  const [cache] = useState(new Map())
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const searchWithCache = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setOptions([])
        return
      }

      // Check cache first
      if (cache.has(searchTerm)) {
        setOptions(cache.get(searchTerm))
        return
      }

      setLoading(true)
      
      try {
        const response = await fetch(`/api/search?q=${searchTerm}`)
        const results = await response.json()
        
        // Cache the results
        cache.set(searchTerm, results)
        setOptions(results)
      } catch (error) {
        console.error('Search failed:', error)
        setOptions([])
      } finally {
        setLoading(false)
      }
    }, 300),
    [cache]
  )

  return (
    <Autocomplete
      options={options}
      onSearch={searchWithCache}
      loading={loading}
      placeholder="Search with caching..."
      
      // Cache configuration
      cacheOptions={true}
      cacheSize={100}
      cacheDuration={5 * 60 * 1000} // 5 minutes
      
      // Show cache indicator
      suffixIcon={
        <div className="flex items-center space-x-1">
          {cache.size > 0 && (
            <span className="text-xs text-gray-500">
              {cache.size} cached
            </span>
          )}
          <SearchIcon className="w-4 h-4 text-gray-400" />
        </div>
      }
    />
  )
}
```

### Custom Highlighting

```typescript
function HighlightedAutocomplete() {
  const [options] = useState([
    { value: '1', label: 'JavaScript Developer', company: 'Tech Corp' },
    { value: '2', label: 'Senior JavaScript Engineer', company: 'StartupXYZ' },
    { value: '3', label: 'React Developer', company: 'WebCorp' }
  ])

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200">{part}</mark>
      ) : (
        part
      )
    )
  }

  return (
    <Autocomplete
      options={options}
      showSearch={true}
      placeholder="Search with highlighting..."
      
      optionRender={(option, { searchValue }) => (
        <div className="p-2">
          <div className="font-medium">
            {highlightText(option.label, searchValue)}
          </div>
          <div className="text-sm text-gray-600">
            {highlightText(option.company, searchValue)}
          </div>
        </div>
      )}
      
      // Alternative: use built-in highlighting
      highlightSearchValue={true}
      highlightClassName="bg-yellow-200"
    />
  )
}
```

### Multi-Column Options

```typescript
function MultiColumnAutocomplete() {
  const [employees] = useState([
    { 
      id: '1', 
      name: 'Alice Johnson', 
      position: 'Senior Developer',
      department: 'Engineering',
      location: 'New York',
      email: 'alice@company.com'
    },
    {
      id: '2',
      name: 'Bob Smith',
      position: 'Product Manager', 
      department: 'Product',
      location: 'San Francisco',
      email: 'bob@company.com'
    }
  ])

  return (
    <Autocomplete
      options={employees}
      fieldNames={{ value: 'id', label: 'name' }}
      placeholder="Search employees..."
      
      optionRender={(employee) => (
        <div className="grid grid-cols-4 gap-4 p-3 hover:bg-gray-50">
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-xs text-gray-500">{employee.email}</div>
          </div>
          <div className="text-sm">
            <div>{employee.position}</div>
            <div className="text-gray-500">{employee.department}</div>
          </div>
          <div className="text-sm text-gray-600">
            {employee.location}
          </div>
          <div className="text-right">
            <button className="text-blue-500 text-sm hover:underline">
              View Profile
            </button>
          </div>
        </div>
      )}
      
      // Wide dropdown for multiple columns
      dropdownStyle={{ width: 600 }}
      dropdownClassName="shadow-lg"
    />
  )
}
```

## ♿ Dostępność (Accessibility)

### ARIA Implementation

```typescript
function AccessibleAutocomplete() {
  return (
    <Autocomplete
      options={options}
      
      // ARIA Labels
      aria-label="Search for products"
      aria-describedby="search-help"
      
      // Combobox role (automatic)
      role="combobox"
      aria-expanded={dropdownOpen}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      
      // Option list accessibility
      optionRole="option"
      optionAriaLabel={(option, index) => 
        `${option.label}, option ${index + 1} of ${filteredOptions.length}`
      }
      
      // Keyboard navigation
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowDown':
            // Move to next option
            break
          case 'ArrowUp':
            // Move to previous option
            break
          case 'Enter':
            // Select highlighted option
            break
          case 'Escape':
            // Close dropdown
            break
          case 'Home':
            // Move to first option
            break
          case 'End':
            // Move to last option
            break
        }
      }}
      
      // Screen reader announcements
      onDropdownVisibleChange={(visible) => {
        const message = visible 
          ? `${filteredOptions.length} suggestions available`
          : 'Suggestions closed'
        announceToScreenReader(message)
      }}
      
      onSelect={(value, option) => {
        announceToScreenReader(`Selected ${option.label}`)
      }}
    />
  )
}
```

### Keyboard Navigation

```typescript
function KeyboardAutocomplete() {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const optionsRef = useRef([])

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
        
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
        
      case 'Tab':
        // Select highlighted option on tab
        if (highlightedIndex >= 0) {
          e.preventDefault()
          selectOption(filteredOptions[highlightedIndex])
        }
        break
        
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          selectOption(filteredOptions[highlightedIndex])
        }
        break
        
      case 'Escape':
        e.preventDefault()
        closeDropdown()
        break
    }
  }

  return (
    <Autocomplete
      options={filteredOptions}
      highlightedIndex={highlightedIndex}
      onKeyDown={handleKeyDown}
      
      // Focus management
      autoFocus={true}
      selectOnFocus={true}
      
      // Visual focus indicators
      optionClassName={(option, index) => 
        index === highlightedIndex 
          ? 'bg-blue-100 text-blue-900' 
          : 'hover:bg-gray-50'
      }
      
      // Scroll highlighted option into view
      onHighlightChange={(index) => {
        if (index >= 0 && optionsRef.current[index]) {
          optionsRef.current[index].scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          })
        }
      }}
    />
  )
}
```

## 🔌 Props API

### AutocompleteProps

| Prop                | Type                                              | Default        | Description                       |
| ------------------- | ------------------------------------------------- | -------------- | --------------------------------- |
| `options`           | `Option[] \| OptionGroup[]`                       | `[]`           | Options data source               |
| `value`             | `string \| string[] \| Option \| Option[]`        | -              | Selected value(s)                 |
| `defaultValue`      | `string \| string[] \| Option \| Option[]`        | -              | Default selected value(s)         |
| `onChange`          | `(value: any, option: Option) => void`            | -              | Value change callback             |
| `onSearch`          | `(searchValue: string) => void`                   | -              | Search callback                   |
| `onSelect`          | `(value: any, option: Option) => void`            | -              | Select callback                   |
| `onDeselect`        | `(value: any, option: Option) => void`            | -              | Deselect callback (multiple mode) |
| `placeholder`       | `string`                                          | -              | Input placeholder                 |
| `disabled`          | `boolean`                                         | `false`        | Whether disabled                  |
| `loading`           | `boolean`                                         | `false`        | Loading state                     |
| `size`              | `'small' \| 'medium' \| 'large'`                  | `'medium'`     | Input size                        |
| `variant`           | `'bordered' \| 'filled' \| 'borderless'`          | `'bordered'`   | Input variant                     |
| `mode`              | `'single' \| 'multiple' \| 'tags'`                | `'single'`     | Selection mode                    |
| `allowClear`        | `boolean`                                         | `false`        | Show clear button                 |
| `showSearch`        | `boolean`                                         | `true`         | Enable search                     |
| `searchValue`       | `string`                                          | -              | Search input value                |
| `filterOption`      | `(input: string, option: Option) => boolean`      | -              | Filter function                   |
| `optionRender`      | `(option: Option, info: RenderInfo) => ReactNode` | -              | Custom option render              |
| `valueRender`       | `(option: Option) => ReactNode`                   | -              | Custom value render               |
| `tagRender`         | `(props: TagProps) => ReactNode`                  | -              | Custom tag render (multiple mode) |
| `notFoundContent`   | `ReactNode`                                       | `'No data'`    | Empty state content               |
| `loadingContent`    | `ReactNode`                                       | `'Loading...'` | Loading state content             |
| `dropdownClassName` | `string`                                          | -              | Dropdown CSS class                |
| `dropdownStyle`     | `CSSProperties`                                   | -              | Dropdown style                    |
| `maxTagCount`       | `number`                                          | -              | Max tags to show (multiple mode)  |
| `maxTagTextLength`  | `number`                                          | -              | Max tag text length               |
| `searchDelay`       | `number`                                          | `300`          | Search debounce delay             |
| `minSearchLength`   | `number`                                          | `0`            | Minimum search length             |
| `maxResults`        | `number`                                          | `50`           | Maximum results to show           |
| `virtual`           | `boolean`                                         | `false`        | Enable virtual scrolling          |
| `className`         | `string`                                          | -              | CSS class name                    |
| `data-testid`       | `string`                                          | -              | Test identifier                   |

### Option

| Property        | Type               | Description       |
| --------------- | ------------------ | ----------------- |
| `value`         | `string \| number` | Option value      |
| `label`         | `ReactNode`        | Option label      |
| `disabled`      | `boolean`          | Whether disabled  |
| `className`     | `string`           | Option CSS class  |
| `[key: string]` | `any`              | Custom properties |

### OptionGroup

| Property    | Type        | Description     |
| ----------- | ----------- | --------------- |
| `label`     | `ReactNode` | Group label     |
| `options`   | `Option[]`  | Group options   |
| `className` | `string`    | Group CSS class |

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { Autocomplete } from '../Autocomplete'

describe('Autocomplete', () => {
  const mockOptions = [
    { value: '1', label: 'Apple' },
    { value: '2', label: 'Banana' },
    { value: '3', label: 'Cherry' }
  ]

  const renderAutocomplete = (props = {}) => {
    const defaultProps = {
      options: mockOptions,
      placeholder: 'Search fruits',
      ...props
    }
    
    return render(<Autocomplete {...defaultProps} />)
  }

  test('renders autocomplete input', () => {
    renderAutocomplete()
    expect(screen.getByPlaceholderText('Search fruits')).toBeInTheDocument()
  })

  test('shows options on focus', async () => {
    renderAutocomplete()
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeVisible()
      expect(screen.getByText('Banana')).toBeVisible()
    })
  })

  test('filters options based on input', async () => {
    const user = userEvent.setup()
    renderAutocomplete()
    
    const input = screen.getByRole('combobox')
    await user.type(input, 'app')
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeVisible()
      expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })
  })

  test('selects option on click', async () => {
    const mockOnChange = jest.fn()
    renderAutocomplete({ onChange: mockOnChange })
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Apple'))
    })
    
    expect(mockOnChange).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({ value: '1', label: 'Apple' })
    )
  })

  test('keyboard navigation works', async () => {
    renderAutocomplete()
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    // Arrow down to highlight first option
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getByText('Apple')).toHaveClass('highlighted')
    
    // Arrow down to second option
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getByText('Banana')).toHaveClass('highlighted')
    
    // Enter to select
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input.value).toBe('Banana')
  })

  test('async search functionality', async () => {
    const mockOnSearch = jest.fn()
    const user = userEvent.setup()
    
    renderAutocomplete({ 
      onSearch: mockOnSearch,
      options: []
    })
    
    const input = screen.getByRole('combobox')
    await user.type(input, 'test')
    
    // Should debounce search calls
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test')
    })
  })

  test('multiple selection mode', async () => {
    const mockOnChange = jest.fn()
    renderAutocomplete({ 
      mode: 'multiple',
      onChange: mockOnChange
    })
    
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    
    // Select first option
    fireEvent.click(screen.getByText('Apple'))
    expect(mockOnChange).toHaveBeenCalledWith(['1'], expect.any(Array))
    
    // Select second option
    fireEvent.click(screen.getByText('Banana'))
    expect(mockOnChange).toHaveBeenCalledWith(['1', '2'], expect.any(Array))
  })
})
```

### Integration Testing

```typescript
describe('Autocomplete Integration', () => {
  test('works with external state', async () => {
    const AutocompleteWithState = () => {
      const [value, setValue] = useState('')
      const [options, setOptions] = useState([])

      const handleSearch = (searchTerm) => {
        const filtered = mockOptions.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setOptions(filtered)
      }

      return (
        <div>
          <div data-testid="selected-value">Selected: {value}</div>
          <Autocomplete
            options={options}
            value={value}
            onChange={setValue}
            onSearch={handleSearch}
          />
        </div>
      )
    }

    render(<AutocompleteWithState />)
    
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'app')
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Apple'))
    })
    
    expect(screen.getByTestId('selected-value')).toHaveTextContent('Selected: 1')
  })

  test('async data loading', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([
        { value: 'async1', label: 'Async Option 1' }
      ])
    })
    
    global.fetch = mockFetch

    const AsyncAutocomplete = () => {
      const [options, setOptions] = useState([])
      const [loading, setLoading] = useState(false)

      const handleSearch = async (searchTerm) => {
        setLoading(true)
        const response = await fetch(`/api/search?q=${searchTerm}`)
        const data = await response.json()
        setOptions(data)
        setLoading(false)
      }

      return (
        <Autocomplete
          options={options}
          loading={loading}
          onSearch={handleSearch}
        />
      )
    }

    render(<AsyncAutocomplete />)
    
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'test')
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/search?q=test')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Async Option 1')).toBeInTheDocument()
    })
  })
})
```

## 📚 Najlepsze Praktyki

### 1. **Performance Optimization**
```typescript
// Debounce search calls
const debouncedSearch = useCallback(
  debounce((searchTerm) => {
    performSearch(searchTerm)
  }, 300),
  []
)

// Virtualize large option lists
<Autocomplete
  options={largeOptionList}
  virtual={true}
  maxResults={50}
/>

// Cache search results
const [cache] = useState(new LRUCache(100))
```

### 2. **Accessibility Best Practices**
```typescript
// Proper ARIA labels
<Autocomplete
  aria-label="Search users"
  aria-describedby="search-help"
  optionAriaLabel={(option) => option.description}
/>

// Keyboard navigation support
<Autocomplete
  onKeyDown={handleKeyboardNavigation}
  highlightFirstOption={true}
/>

// Screen reader announcements
<Autocomplete
  onDropdownVisibleChange={announceResults}
  onSelect={announceSelection}
/>
```

### 3. **Error Handling**
```typescript
function RobustAutocomplete() {
  const [error, setError] = useState(null)

  const handleSearch = async (searchTerm) => {
    try {
      setError(null)
      const results = await searchAPI(searchTerm)
      setOptions(results)
    } catch (err) {
      setError(err.message)
      setOptions([])
    }
  }

  return (
    <Autocomplete
      onSearch={handleSearch}
      notFoundContent={error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div>No results found</div>
      )}
    />
  )
}
```

Autocomplete component oferuje zaawansowane możliwości wyszukiwania i selekcji z pełnym wsparciem dla dostępności, wydajności i customizacji.
