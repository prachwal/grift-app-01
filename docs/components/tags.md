# 🏷️ Tags Component - Dokumentacja Techniczna

Tags to zaawansowany komponent do tworzenia etykiet, tagów i kategorii z obsługą różnych wariantów, kolorów i stanów.

## 📋 Spis Treści

1. [Przegląd Komponentu](#przegląd-komponentu)
2. [Instalacja i Użycie](#instalacja-i-użycie)
3. [API Reference](#api-reference)
4. [Przykłady Implementacji](#przykłady-implementacji)
5. [Najlepsze Praktyki](#najlepsze-praktyki)
6. [Dostępność](#dostępność)
7. [Rozwiązywanie Problemów](#rozwiązywanie-problemów)

## Przegląd Komponentu

Tags to uniwersalny komponent do tworzenia interaktywnych etykiet używanych do kategoryzacji, filtrowania i oznaczania treści.

### ✨ Kluczowe Funkcje

- **Różne warianty** - Solid, outline, ghost, subtle styling
- **Bogata paleta kolorów** - Semantyczne i brandowe kolory
- **Interakcyjność** - Closable tags z onClose callback
- **Rozmiary** - SM, MD, LG z spójną typografią
- **Custom content** - Icons, badges, counters
- **Keyboard support** - Pełna nawigacja klawiaturą
- **Dark mode** - Automatyczne dostosowanie kolorów
- **Loading states** - Skeleton states dla async operations
- **Animation** - Smooth transitions i hover effects

## Instalacja i Użycie

```typescript
import { Tag } from 'nebula/components/Tag'

// Podstawowy tag
<Tag>Frontend</Tag>

// Tag z kolorem i wariantem
<Tag color="blue" variant="solid">
  React
</Tag>

// Tag z możliwością zamknięcia
<Tag 
  closable
  onClose={() => removeTag('javascript')}
  color="green"
>
  JavaScript
</Tag>

// Tag z ikoną
<Tag 
  icon={<StarIcon />}
  color="yellow"
  variant="outline"
>
  Favorite
</Tag>

// Grupa tagów
<div className="flex flex-wrap gap-2">
  {categories.map(category => (
    <Tag 
      key={category.id}
      color={category.color}
      variant="subtle"
    >
      {category.name}
    </Tag>
  ))}
</div>
```

## API Reference

### Tag Props

```typescript
interface TagProps {
  // Content
  children: ComponentChildren        // Tag content (required)
  icon?: ComponentChild             // Leading icon
  
  // Appearance
  color?: TagColor                  // Color theme
  variant?: TagVariant              // Visual style
  size?: TagSize                   // Size variant
  
  // Behavior
  closable?: boolean               // Show close button
  disabled?: boolean               // Disabled state
  loading?: boolean                // Loading state
  
  // Events
  onClick?: (event: MouseEvent) => void     // Click handler
  onClose?: (event: MouseEvent) => void     // Close handler
  onMouseEnter?: (event: MouseEvent) => void // Hover handler
  onMouseLeave?: (event: MouseEvent) => void // Hover leave
  
  // Standard
  className?: string
  style?: CSSProperties
  'data-testid'?: string
  'aria-label'?: string
}
```

### Type Definitions

```typescript
type TagColor = 
  | 'gray' | 'red' | 'orange' | 'yellow' | 'green' 
  | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
  | 'primary' | 'secondary' | 'success' | 'warning' 
  | 'error' | 'info'

type TagVariant = 
  | 'solid'      // Filled background
  | 'outline'    // Border only
  | 'ghost'      // Transparent background  
  | 'subtle'     // Light background

type TagSize = 'sm' | 'md' | 'lg'
```

Ten komponent został zaprojektowany z myślą o realnych zastosowaniach i oferuje wszystkie funkcje potrzebne do budowania profesjonalnych interfejsów użytkownika z systemami tagów i kategoryzacji.
- **Icon Support**: Leading and trailing icons with custom positioning
- **Badge Integration**: Counter badges and status indicators
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark Mode**: Complete dark theme compatibility
- **Custom Content**: Support for rich content and custom layouts

## Basic Usage

### Simple Tags
```typescript
import { Tag } from '@nebula/components'

function SimpleTags() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag>Design</Tag>
      <Tag>Development</Tag>
      <Tag>Marketing</Tag>
      <Tag>Sales</Tag>
    </div>
  )
}
```

### Removable Tags
```typescript
import { Tag } from '@nebula/components'
import { useState } from 'preact/hooks'

function RemovableTags() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Vite'])
  
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag 
          key={tag}
          onRemove={() => removeTag(tag)}
          removable
        >
          {tag}
        </Tag>
      ))}
    </div>
  )
}
```

### Clickable Tags
```typescript
import { Tag } from '@nebula/components'
import { useState } from 'preact/hooks'

function ClickableTags() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const tags = ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust']
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant={selectedTags.includes(tag) ? 'solid' : 'outline'}
            color={selectedTags.includes(tag) ? 'primary' : 'gray'}
            clickable
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="text-sm text-gray-600">
          Selected: {selectedTags.join(', ')}
        </div>
      )}
    </div>
  )
}
```

## Sizes
The Tag component supports three sizes:

```typescript
<div className="flex items-center gap-2">
  <Tag size="sm">Small</Tag>
  <Tag size="md">Medium</Tag>
  <Tag size="lg">Large</Tag>
</div>
```

## Variants
Different visual styles for various use cases:

```typescript
<div className="space-y-4">
  <div className="flex flex-wrap gap-2">
    <Tag variant="solid">Solid</Tag>
    <Tag variant="outline">Outline</Tag>
    <Tag variant="subtle">Subtle</Tag>
    <Tag variant="ghost">Ghost</Tag>
  </div>
  
  <div className="flex flex-wrap gap-2">
    <Tag variant="solid" color="primary">Primary</Tag>
    <Tag variant="solid" color="success">Success</Tag>
    <Tag variant="solid" color="warning">Warning</Tag>
    <Tag variant="solid" color="danger">Danger</Tag>
  </div>
</div>
```

## Colors
Support for various color themes:

```typescript
<div className="space-y-2">
  {/* Primary colors */}
  <div className="flex flex-wrap gap-2">
    <Tag color="primary">Primary</Tag>
    <Tag color="secondary">Secondary</Tag>
    <Tag color="gray">Gray</Tag>
  </div>
  
  {/* Status colors */}
  <div className="flex flex-wrap gap-2">
    <Tag color="success">Success</Tag>
    <Tag color="warning">Warning</Tag>
    <Tag color="danger">Danger</Tag>
    <Tag color="info">Info</Tag>
  </div>
</div>
```

## Icons and Badges

### Tags with Icons
```typescript
import { Tag } from '@nebula/components'
import { Star, Heart, Bookmark, Share, Download } from 'lucide-preact'

function IconTags() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Tag icon={<Star className="w-3 h-3" />}>Starred</Tag>
        <Tag icon={<Heart className="w-3 h-3" />} color="danger">Favorite</Tag>
        <Tag icon={<Bookmark className="w-3 h-3" />} color="success">Saved</Tag>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Tag 
          trailingIcon={<Share className="w-3 h-3" />}
          clickable
        >
          Share
        </Tag>
        <Tag 
          trailingIcon={<Download className="w-3 h-3" />}
          clickable
        >
          Download
        </Tag>
      </div>
    </div>
  )
}
```

### Tags with Badges
```typescript
import { Tag, Badge } from '@nebula/components'

function BadgeTags() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag>
        Messages
        <Badge variant="solid" color="danger" size="sm" className="ml-2">
          5
        </Badge>
      </Tag>
      
      <Tag>
        Notifications
        <Badge variant="solid" color="primary" size="sm" className="ml-2">
          12
        </Badge>
      </Tag>
      
      <Tag>
        Updates
        <Badge variant="dot" color="success" className="ml-2" />
      </Tag>
    </div>
  )
}
```

## Interactive Features

### Tag Input with Autocomplete
```typescript
import { Tag, Input } from '@nebula/components'
import { useState } from 'preact/hooks'

function TagInput() {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript'])
  const [inputValue, setInputValue] = useState('')
  
  const suggestions = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Svelte',
    'Node.js', 'Express', 'Next.js', 'Tailwind', 'CSS', 'HTML'
  ]
  
  const filteredSuggestions = suggestions.filter(
    suggestion => 
      !tags.includes(suggestion) &&
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  )
  
  const addTag = (tag: string) => {
    if (!tags.includes(tag) && tag.trim()) {
      setTags(prev => [...prev, tag.trim()])
      setInputValue('')
    }
  }
  
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Skills</label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-[44px]">
          {tags.map((tag) => (
            <Tag 
              key={tag}
              size="sm"
              removable
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Tag>
          ))}
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "Add skills..." : ""}
            className="flex-1 min-w-32 outline-none bg-transparent"
          />
        </div>
      </div>
      
      {inputValue && filteredSuggestions.length > 0 && (
        <div className="border rounded-lg p-2 bg-white dark:bg-gray-800 shadow-lg">
          <div className="text-xs text-gray-500 mb-2">Suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {filteredSuggestions.slice(0, 6).map((suggestion) => (
              <Tag
                key={suggestion}
                size="sm"
                variant="ghost"
                clickable
                onClick={() => addTag(suggestion)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {suggestion}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

### Category Filter
```typescript
import { Tag } from '@nebula/components'
import { useState } from 'preact/hooks'

interface Category {
  id: string
  name: string
  count: number
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  const categories: Category[] = [
    { id: 'all', name: 'All', count: 156, color: 'primary' },
    { id: 'frontend', name: 'Frontend', count: 45, color: 'info' },
    { id: 'backend', name: 'Backend', count: 32, color: 'success' },
    { id: 'design', name: 'Design', count: 28, color: 'warning' },
    { id: 'devops', name: 'DevOps', count: 18, color: 'danger' },
    { id: 'mobile', name: 'Mobile', count: 23, color: 'info' },
    { id: 'ai', name: 'AI/ML', count: 10, color: 'success' }
  ]
  
  const toggleCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all'])
    } else {
      setSelectedCategories(prev => {
        const newSelection = prev.filter(id => id !== 'all')
        
        if (newSelection.includes(categoryId)) {
          const filtered = newSelection.filter(id => id !== categoryId)
          return filtered.length === 0 ? ['all'] : filtered
        } else {
          return [...newSelection, categoryId]
        }
      })
    }
  }
  
  const isSelected = (categoryId: string) => {
    return selectedCategories.includes(categoryId)
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Tag
              key={category.id}
              variant={isSelected(category.id) ? 'solid' : 'outline'}
              color={isSelected(category.id) ? category.color : 'gray'}
              clickable
              onClick={() => toggleCategory(category.id)}
              className="transition-all duration-200"
            >
              {category.name}
              <span className="ml-1 text-xs opacity-75">
                ({category.count})
              </span>
            </Tag>
          ))}
        </div>
      </div>
      
      {selectedCategories.length > 0 && !selectedCategories.includes('all') && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            Filtered by: {selectedCategories.map(id => 
              categories.find(c => c.id === id)?.name
            ).join(', ')}
          </div>
          <button
            onClick={() => setSelectedCategories(['all'])}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
```

## Status and Priority Tags

### Status Tags
```typescript
import { Tag } from '@nebula/components'
import { Clock, CheckCircle, XCircle, AlertCircle, Pause } from 'lucide-preact'

function StatusTags() {
  const statusOptions = [
    { status: 'pending', label: 'Pending', color: 'warning', icon: Clock },
    { status: 'in-progress', label: 'In Progress', color: 'info', icon: AlertCircle },
    { status: 'completed', label: 'Completed', color: 'success', icon: CheckCircle },
    { status: 'cancelled', label: 'Cancelled', color: 'danger', icon: XCircle },
    { status: 'paused', label: 'Paused', color: 'gray', icon: Pause }
  ]
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Project Status</h4>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Tag
              key={option.status}
              color={option.color}
              icon={<option.icon className="w-3 h-3" />}
              variant="subtle"
            >
              {option.label}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Priority Tags
```typescript
import { Tag } from '@nebula/components'
import { ArrowUp, ArrowDown, Minus } from 'lucide-preact'

function PriorityTags() {
  const priorities = [
    { 
      level: 'high', 
      label: 'High Priority', 
      color: 'danger', 
      icon: <ArrowUp className="w-3 h-3" /> 
    },
    { 
      level: 'medium', 
      label: 'Medium Priority', 
      color: 'warning', 
      icon: <Minus className="w-3 h-3" /> 
    },
    { 
      level: 'low', 
      label: 'Low Priority', 
      color: 'success', 
      icon: <ArrowDown className="w-3 h-3" /> 
    }
  ]
  
  return (
    <div className="space-y-2">
      {priorities.map((priority) => (
        <div key={priority.level} className="flex items-center gap-3">
          <Tag
            color={priority.color}
            icon={priority.icon}
            size="sm"
          >
            {priority.level.toUpperCase()}
          </Tag>
          <span className="text-sm">{priority.label}</span>
        </div>
      ))}
    </div>
  )
}
```

## Advanced Usage

### Tag Cloud
```typescript
import { Tag } from '@nebula/components'
import { useState } from 'preact/hooks'

interface CloudTag {
  text: string
  count: number
  category: string
}

function TagCloud() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  const cloudTags: CloudTag[] = [
    { text: 'JavaScript', count: 156, category: 'language' },
    { text: 'React', count: 134, category: 'framework' },
    { text: 'TypeScript', count: 98, category: 'language' },
    { text: 'Node.js', count: 87, category: 'runtime' },
    { text: 'CSS', count: 76, category: 'styling' },
    { text: 'HTML', count: 65, category: 'markup' },
    { text: 'Vue.js', count: 54, category: 'framework' },
    { text: 'Python', count: 43, category: 'language' },
    { text: 'Tailwind', count: 38, category: 'styling' },
    { text: 'Next.js', count: 32, category: 'framework' }
  ]
  
  const getTagSize = (count: number) => {
    if (count > 100) return 'lg'
    if (count > 50) return 'md'
    return 'sm'
  }
  
  const getTagColor = (category: string) => {
    const colors = {
      language: 'primary',
      framework: 'success',
      runtime: 'warning',
      styling: 'info',
      markup: 'danger'
    }
    return colors[category] || 'gray'
  }
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-3">Technology Tag Cloud</h3>
        <div className="flex flex-wrap gap-2 justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {cloudTags.map((tag) => (
            <Tag
              key={tag.text}
              size={getTagSize(tag.count)}
              color={getTagColor(tag.category)}
              variant={selectedTag === tag.text ? 'solid' : 'subtle'}
              clickable
              onClick={() => setSelectedTag(
                selectedTag === tag.text ? null : tag.text
              )}
              className="transition-all duration-200 hover:scale-105"
            >
              {tag.text}
              <span className="ml-1 text-xs opacity-75">
                {tag.count}
              </span>
            </Tag>
          ))}
        </div>
      </div>
      
      {selectedTag && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            Selected: <strong>{selectedTag}</strong>
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
            {cloudTags.find(t => t.text === selectedTag)?.count} posts tagged with "{selectedTag}"
          </div>
        </div>
      )}
    </div>
  )
}
```

### Multi-Select Tag Manager
```typescript
import { Tag, Button, Input } from '@nebula/components'
import { useState } from 'preact/hooks'
import { Plus, X } from 'lucide-preact'

interface TagItem {
  id: string
  label: string
  color: string
  category: string
  selected: boolean
}

function TagManager() {
  const [tags, setTags] = useState<TagItem[]>([
    { id: '1', label: 'Frontend', color: 'blue', category: 'skill', selected: false },
    { id: '2', label: 'Backend', color: 'green', category: 'skill', selected: true },
    { id: '3', label: 'Design', color: 'purple', category: 'skill', selected: false },
    { id: '4', label: 'Mobile', color: 'orange', category: 'skill', selected: false },
    { id: '5', label: 'DevOps', color: 'red', category: 'skill', selected: true }
  ])
  
  const [newTagLabel, setNewTagLabel] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  
  const categories = ['all', 'skill', 'project', 'tool', 'framework']
  
  const toggleTag = (id: string) => {
    setTags(prev => prev.map(tag => 
      tag.id === id ? { ...tag, selected: !tag.selected } : tag
    ))
  }
  
  const addTag = () => {
    if (newTagLabel.trim()) {
      const newTag: TagItem = {
        id: Date.now().toString(),
        label: newTagLabel.trim(),
        color: 'gray',
        category: 'skill',
        selected: false
      }
      setTags(prev => [...prev, newTag])
      setNewTagLabel('')
    }
  }
  
  const removeTag = (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id))
  }
  
  const filteredTags = filterCategory === 'all' 
    ? tags 
    : tags.filter(tag => tag.category === filterCategory)
  
  const selectedCount = tags.filter(tag => tag.selected).length
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Tag Manager</h3>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <Tag
              key={category}
              variant={filterCategory === category ? 'solid' : 'outline'}
              color={filterCategory === category ? 'primary' : 'gray'}
              size="sm"
              clickable
              onClick={() => setFilterCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Tag>
          ))}
        </div>
        
        {/* Add New Tag */}
        <div className="flex gap-2 mb-4">
          <Input
            value={newTagLabel}
            onChange={setNewTagLabel}
            placeholder="Add new tag..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
          />
          <Button 
            onClick={addTag}
            disabled={!newTagLabel.trim()}
            size="sm"
            icon={<Plus className="w-4 h-4" />}
          >
            Add
          </Button>
        </div>
        
        {/* Tag List */}
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-2">
              {selectedCount} of {filteredTags.length} tags selected
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-1">
                  <Tag
                    variant={tag.selected ? 'solid' : 'outline'}
                    color={tag.selected ? 'primary' : 'gray'}
                    clickable
                    onClick={() => toggleTag(tag.id)}
                    className="transition-all duration-200"
                  >
                    {tag.label}
                  </Tag>
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {selectedCount > 0 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-sm text-blue-800 dark:text-blue-200">
                Selected tags: {tags.filter(t => t.selected).map(t => t.label).join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

## Props Reference

### Tag Props
| Prop           | Type                                                                                 | Default     | Description            |
| -------------- | ------------------------------------------------------------------------------------ | ----------- | ---------------------- |
| `children`     | `ComponentChild`                                                                     | -           | Tag content            |
| `variant`      | `'solid' \| 'outline' \| 'subtle' \| 'ghost'`                                        | `'solid'`   | Visual style variant   |
| `color`        | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'gray'` | `'primary'` | Color theme            |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                               | `'md'`      | Size variant           |
| `clickable`    | `boolean`                                                                            | `false`     | Make tag clickable     |
| `removable`    | `boolean`                                                                            | `false`     | Show remove button     |
| `disabled`     | `boolean`                                                                            | `false`     | Disable interactions   |
| `selected`     | `boolean`                                                                            | `false`     | Show selected state    |
| `onClick`      | `(e: MouseEvent) => void`                                                            | -           | Click handler          |
| `onRemove`     | `() => void`                                                                         | -           | Remove handler         |
| `icon`         | `ComponentChild`                                                                     | -           | Leading icon           |
| `trailingIcon` | `ComponentChild`                                                                     | -           | Trailing icon          |
| `rounded`      | `boolean \| 'full'`                                                                  | `true`      | Border radius style    |
| `className`    | `string`                                                                             | -           | Additional CSS classes |
| `id`           | `string`                                                                             | -           | HTML id attribute      |

### TagGroup Props
| Prop          | Type                           | Default   | Description            |
| ------------- | ------------------------------ | --------- | ---------------------- |
| `children`    | `ComponentChild`               | -         | Tag components         |
| `label`       | `string`                       | -         | Group label            |
| `description` | `string`                       | -         | Group description      |
| `wrap`        | `boolean`                      | `true`    | Allow tags to wrap     |
| `spacing`     | `'sm' \| 'md' \| 'lg'`         | `'md'`    | Spacing between tags   |
| `alignment`   | `'start' \| 'center' \| 'end'` | `'start'` | Tag alignment          |
| `className`   | `string`                       | -         | Additional CSS classes |

## Accessibility
The Tag component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `button` role for interactive tags
- **Keyboard Navigation**: Tab navigation and Enter/Space activation
- **Screen Readers**: Clear announcements of tag actions and states
- **Focus Management**: Proper focus indicators and focus order
- **High Contrast**: Support for high contrast mode
- **Semantic Structure**: Proper use of semantic elements
- **State Announcements**: Clear indication of selected/removed states

## Examples

### Product Tag System
```typescript
import { Tag } from '@nebula/components'
import { useState } from 'preact/hooks'

interface Product {
  id: string
  name: string
  tags: string[]
  price: number
  category: string
}

function ProductTagSystem() {
  const [products] = useState<Product[]>([
    { 
      id: '1', 
      name: 'Wireless Headphones', 
      tags: ['electronics', 'audio', 'wireless', 'new'], 
      price: 199, 
      category: 'audio' 
    },
    { 
      id: '2', 
      name: 'Gaming Laptop', 
      tags: ['electronics', 'gaming', 'computers', 'sale'], 
      price: 1299, 
      category: 'computers' 
    },
    { 
      id: '3', 
      name: 'Smart Watch', 
      tags: ['electronics', 'wearable', 'fitness', 'new'], 
      price: 299, 
      category: 'wearables' 
    }
  ])
  
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(products.flatMap(product => product.tags))
  ).sort()
  
  const toggleTagFilter = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  // Filter products by selected tags
  const filteredProducts = selectedTags.length === 0
    ? products
    : products.filter(product =>
        selectedTags.every(tag => product.tags.includes(tag))
      )
  
  const getTagColor = (tag: string) => {
    const colorMap = {
      'new': 'success',
      'sale': 'danger', 
      'electronics': 'primary',
      'gaming': 'warning',
      'wireless': 'info',
      'fitness': 'success'
    }
    return colorMap[tag] || 'gray'
  }
  
  return (
    <div className="space-y-6">
      {/* Tag Filters */}
      <div>
        <h3 className="font-medium mb-3">Filter by Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Tag
              key={tag}
              variant={selectedTags.includes(tag) ? 'solid' : 'outline'}
              color={selectedTags.includes(tag) ? getTagColor(tag) : 'gray'}
              clickable
              onClick={() => toggleTagFilter(tag)}
              size="sm"
            >
              {tag}
            </Tag>
          ))}
        </div>
        
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      {/* Product List */}
      <div>
        <h3 className="font-medium mb-3">
          Products ({filteredProducts.length})
        </h3>
        <div className="grid gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{product.name}</h4>
                <span className="text-lg font-bold text-green-600">
                  ${product.price}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {product.tags.map(tag => (
                  <Tag
                    key={tag}
                    size="sm"
                    color={getTagColor(tag)}
                    variant="subtle"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```
