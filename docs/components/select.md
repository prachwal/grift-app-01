# Select Component Documentation

## Overview
The Select component provides a customizable dropdown selection interface with search functionality, multi-select capabilities, and comprehensive accessibility support. Perfect for forms, filters, and any interface requiring option selection from a list.

## Features
- **Single & Multi-Select**: Support for both single and multiple option selection
- **Search & Filter**: Built-in search functionality to filter options
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Visual Variants**: Default, filled, and bordered styles with color options
- **Async Loading**: Support for loading options dynamically
- **Custom Options**: Rich option rendering with icons, descriptions, and custom content
- **Validation States**: Error, success, and warning states with visual feedback
- **Accessibility**: Full ARIA compliance with proper keyboard navigation
- **Dark Mode**: Complete dark theme compatibility
- **Controlled/Uncontrolled**: Support for both usage patterns

## Basic Usage

### Simple Select
```typescript
import { Select } from '@nebula/components'

function SimpleSelect() {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' }
  ]
  
  return (
    <Select
      options={options}
      placeholder="Choose a fruit"
      label="Favorite Fruit"
    />
  )
}
```

### Controlled Select
```typescript
import { Select } from '@nebula/components'
import { useState } from 'preact/hooks'

function ControlledSelect() {
  const [selectedValue, setSelectedValue] = useState('')
  
  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'preact', label: 'Preact' }
  ]
  
  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={(value) => setSelectedValue(value)}
      label="Preferred Framework"
      placeholder="Select framework..."
    />
  )
}
```

### Multi-Select
```typescript
import { Select } from '@nebula/components'
import { useState } from 'preact/hooks'

function MultiSelect() {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ]
  
  return (
    <Select
      options={options}
      value={selectedValues}
      onChange={(values) => setSelectedValues(values as string[])}
      multiple
      label="Programming Languages"
      placeholder="Select languages..."
      maxSelectedDisplay={3}
    />
  )
}
```

## Sizes
The Select component supports three sizes:

```typescript
<Select options={options} size="sm" label="Small select" />
<Select options={options} size="md" label="Medium select" />
<Select options={options} size="lg" label="Large select" />
```

## States and Variants

### Basic States
```typescript
<Select options={options} label="Normal select" />
<Select options={options} disabled label="Disabled select" />
<Select options={options} loading label="Loading select" />
<Select options={options} clearable label="Clearable select" />
```

### Validation States
```typescript
<Select options={options} error label="Error state select" />
<Select options={options} success label="Success state select" />
<Select options={options} warning label="Warning state select" />
```

### Visual Variants
```typescript
<Select options={options} variant="default" label="Default style" />
<Select options={options} variant="filled" label="Filled style" />
<Select options={options} variant="bordered" label="Bordered style" />
```

## Search and Filtering

### Searchable Select
```typescript
import { Select } from '@nebula/components'
import { useState } from 'preact/hooks'

function SearchableSelect() {
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' }
  ]
  
  return (
    <Select
      options={countries}
      searchable
      label="Country"
      placeholder="Search countries..."
      noOptionsMessage="No countries found"
    />
  )
}
```

### Custom Filter Function
```typescript
import { Select } from '@nebula/components'

function CustomFilterSelect() {
  const employees = [
    { 
      value: 'john-doe', 
      label: 'John Doe',
      email: 'john@example.com',
      department: 'Engineering'
    },
    { 
      value: 'jane-smith', 
      label: 'Jane Smith',
      email: 'jane@example.com',
      department: 'Design'
    },
    { 
      value: 'bob-johnson', 
      label: 'Bob Johnson',
      email: 'bob@example.com',
      department: 'Marketing'
    }
  ]
  
  const customFilter = (option: any, searchValue: string) => {
    const search = searchValue.toLowerCase()
    return (
      option.label.toLowerCase().includes(search) ||
      option.email.toLowerCase().includes(search) ||
      option.department.toLowerCase().includes(search)
    )
  }
  
  return (
    <Select
      options={employees}
      searchable
      filterOption={customFilter}
      label="Employee"
      placeholder="Search by name, email, or department..."
      getOptionLabel={(option) => `${option.label} - ${option.department}`}
    />
  )
}
```

## Custom Option Rendering

### Rich Options with Icons
```typescript
import { Select } from '@nebula/components'
import { User, Mail, Phone, MapPin } from 'lucide-preact'

function IconSelect() {
  const contactMethods = [
    { 
      value: 'email', 
      label: 'Email', 
      icon: Mail,
      description: 'Send via email'
    },
    { 
      value: 'phone', 
      label: 'Phone', 
      icon: Phone,
      description: 'Call directly'
    },
    { 
      value: 'sms', 
      label: 'SMS', 
      icon: Phone,
      description: 'Text message'
    },
    { 
      value: 'mail', 
      label: 'Mail', 
      icon: MapPin,
      description: 'Physical mail'
    }
  ]
  
  const renderOption = (option: any) => (
    <div className="flex items-center gap-3 py-2">
      <option.icon className="w-4 h-4 text-gray-500" />
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-500">{option.description}</div>
      </div>
    </div>
  )
  
  const renderValue = (option: any) => (
    <div className="flex items-center gap-2">
      <option.icon className="w-4 h-4" />
      <span>{option.label}</span>
    </div>
  )
  
  return (
    <Select
      options={contactMethods}
      renderOption={renderOption}
      renderValue={renderValue}
      label="Contact Method"
      placeholder="Choose contact method..."
    />
  )
}
```

### Profile Selector
```typescript
import { Select } from '@nebula/components'
import { useState } from 'preact/hooks'

function ProfileSelector() {
  const [selectedProfile, setSelectedProfile] = useState('')
  
  const profiles = [
    {
      value: 'admin',
      label: 'Administrator',
      description: 'Full system access',
      avatar: '👑',
      permissions: 'All permissions'
    },
    {
      value: 'editor',
      label: 'Editor',
      description: 'Content management',
      avatar: '✏️',
      permissions: 'Create, edit, delete content'
    },
    {
      value: 'viewer',
      label: 'Viewer',
      description: 'Read-only access',
      avatar: '👁️',
      permissions: 'View content only'
    },
    {
      value: 'guest',
      label: 'Guest',
      description: 'Limited access',
      avatar: '👤',
      permissions: 'Basic viewing'
    }
  ]
  
  const renderOption = (option: any) => (
    <div className="flex items-start gap-3 py-3">
      <div className="text-2xl">{option.avatar}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{option.label}</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            {option.value}
          </span>
        </div>
        <div className="text-sm text-gray-600 mt-1">{option.description}</div>
        <div className="text-xs text-gray-500 mt-1">{option.permissions}</div>
      </div>
    </div>
  )
  
  const renderValue = (option: any) => (
    <div className="flex items-center gap-2">
      <span className="text-lg">{option.avatar}</span>
      <div>
        <span className="font-medium">{option.label}</span>
        <div className="text-xs text-gray-500">{option.description}</div>
      </div>
    </div>
  )
  
  return (
    <Select
      options={profiles}
      value={selectedProfile}
      onChange={setSelectedProfile}
      renderOption={renderOption}
      renderValue={renderValue}
      label="User Role"
      placeholder="Select user role..."
      className="min-w-64"
    />
  )
}
```

## Async Loading

### Load Options on Mount
```typescript
import { Select } from '@nebula/components'
import { useState, useEffect } from 'preact/hooks'

interface User {
  id: number
  name: string
  email: string
  username: string
}

function AsyncSelect() {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const users: User[] = await response.json()
        
        const userOptions = users.map(user => ({
          value: user.id.toString(),
          label: user.name,
          email: user.email,
          username: user.username
        }))
        
        setOptions(userOptions)
        setError('')
      } catch (err) {
        setError('Failed to load users')
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [])
  
  const renderOption = (option: any) => (
    <div className="py-2">
      <div className="font-medium">{option.label}</div>
      <div className="text-sm text-gray-500">@{option.username}</div>
      <div className="text-xs text-gray-400">{option.email}</div>
    </div>
  )
  
  return (
    <Select
      options={options}
      loading={loading}
      error={!!error}
      renderOption={renderOption}
      label="Assign to User"
      placeholder={loading ? "Loading users..." : "Select user..."}
      noOptionsMessage={error || "No users available"}
      searchable
    />
  )
}
```

### Search with API
```typescript
import { Select } from '@nebula/components'
import { useState, useCallback } from 'preact/hooks'

function AsyncSearchSelect() {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  const searchRepositories = useCallback(async (query: string) => {
    if (!query) {
      setOptions([])
      return
    }
    
    setLoading(true)
    
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=10`
      )
      const data = await response.json()
      
      const repoOptions = data.items?.map((repo: any) => ({
        value: repo.id.toString(),
        label: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language
      })) || []
      
      setOptions(repoOptions)
    } catch (error) {
      console.error('Error searching repositories:', error)
      setOptions([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  const renderOption = (option: any) => (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">{option.label}</span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          {option.language && (
            <span className="px-1 py-0.5 bg-blue-100 text-blue-700 rounded">
              {option.language}
            </span>
          )}
          <span>⭐ {option.stars}</span>
        </div>
      </div>
      <div className="text-sm text-gray-600">{option.fullName}</div>
      {option.description && (
        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
          {option.description}
        </div>
      )}
    </div>
  )
  
  return (
    <Select
      options={options}
      onInputChange={searchRepositories}
      loading={loading}
      renderOption={renderOption}
      label="GitHub Repository"
      placeholder="Search repositories..."
      noOptionsMessage="Type to search repositories"
      searchable
      clearSearchOnSelect
    />
  )
}
```

## Form Integration

### User Registration Form
```typescript
import { Select, Input, Button, Card } from '@nebula/components'
import { useState } from 'preact/hooks'

interface FormData {
  firstName: string
  lastName: string
  email: string
  country: string
  interests: string[]
  experience: string
}

function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    interests: [],
    experience: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const countries = [
    { value: 'us', label: '🇺🇸 United States' },
    { value: 'ca', label: '🇨🇦 Canada' },
    { value: 'uk', label: '🇬🇧 United Kingdom' },
    { value: 'de', label: '🇩🇪 Germany' },
    { value: 'fr', label: '🇫🇷 France' },
    { value: 'au', label: '🇦🇺 Australia' }
  ]
  
  const interests = [
    { value: 'web-dev', label: 'Web Development' },
    { value: 'mobile-dev', label: 'Mobile Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'devops', label: 'DevOps' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'frontend', label: 'Frontend Development' }
  ]
  
  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (2-4 years)' },
    { value: 'advanced', label: 'Advanced (5-7 years)' },
    { value: 'expert', label: 'Expert (8+ years)' }
  ]
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (formData.interests.length === 0) newErrors.interests = 'Select at least one interest'
    if (!formData.experience) newErrors.experience = 'Experience level is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log('Form submitted:', formData)
    }
  }
  
  return (
    <Card className="max-w-2xl">
      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="text-lg font-semibold mb-6">Create Account</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
          />
        </div>
        
        <div className="mb-4">
          <Input
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </div>
        
        <div className="mb-4">
          <Select
            options={countries}
            value={formData.country}
            onChange={(value) => setFormData(prev => ({ ...prev, country: value as string }))}
            label="Country"
            placeholder="Select your country..."
            error={!!errors.country}
            helperText={errors.country}
            searchable
            required
          />
        </div>
        
        <div className="mb-4">
          <Select
            options={interests}
            value={formData.interests}
            onChange={(values) => setFormData(prev => ({ ...prev, interests: values as string[] }))}
            label="Areas of Interest"
            placeholder="Select your interests..."
            error={!!errors.interests}
            helperText={errors.interests}
            multiple
            required
          />
        </div>
        
        <div className="mb-6">
          <Select
            options={experienceLevels}
            value={formData.experience}
            onChange={(value) => setFormData(prev => ({ ...prev, experience: value as string }))}
            label="Experience Level"
            placeholder="Select your experience level..."
            error={!!errors.experience}
            helperText={errors.experience}
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </Card>
  )
}
```

## Props Reference

### Select Props
| Prop                  | Type                                                               | Default        | Description                 |
| --------------------- | ------------------------------------------------------------------ | -------------- | --------------------------- |
| `options`             | `Option[]`                                                         | `[]`           | Array of options to display |
| `value`               | `string \| string[]`                                               | -              | Selected value(s)           |
| `defaultValue`        | `string \| string[]`                                               | -              | Default selected value(s)   |
| `onChange`            | `(value: string \| string[], option?: Option \| Option[]) => void` | -              | Change handler              |
| `onInputChange`       | `(value: string) => void`                                          | -              | Search input change handler |
| `multiple`            | `boolean`                                                          | `false`        | Enable multi-select         |
| `searchable`          | `boolean`                                                          | `false`        | Enable search functionality |
| `clearable`           | `boolean`                                                          | `false`        | Show clear button           |
| `disabled`            | `boolean`                                                          | `false`        | Disable the select          |
| `loading`             | `boolean`                                                          | `false`        | Show loading spinner        |
| `error`               | `boolean`                                                          | `false`        | Show error state            |
| `success`             | `boolean`                                                          | `false`        | Show success state          |
| `warning`             | `boolean`                                                          | `false`        | Show warning state          |
| `size`                | `'sm' \| 'md' \| 'lg'`                                             | `'md'`         | Size variant                |
| `variant`             | `'default' \| 'filled' \| 'bordered'`                              | `'default'`    | Visual variant              |
| `placeholder`         | `string`                                                           | -              | Placeholder text            |
| `label`               | `string`                                                           | -              | Field label                 |
| `helperText`          | `string`                                                           | -              | Helper or error text        |
| `noOptionsMessage`    | `string`                                                           | `'No options'` | Message when no options     |
| `maxSelectedDisplay`  | `number`                                                           | -              | Max selected items to show  |
| `renderOption`        | `(option: Option) => ComponentChild`                               | -              | Custom option renderer      |
| `renderValue`         | `(option: Option) => ComponentChild`                               | -              | Custom value renderer       |
| `filterOption`        | `(option: Option, search: string) => boolean`                      | -              | Custom filter function      |
| `getOptionLabel`      | `(option: Option) => string`                                       | -              | Get option display label    |
| `getOptionValue`      | `(option: Option) => string`                                       | -              | Get option value            |
| `clearSearchOnSelect` | `boolean`                                                          | `true`         | Clear search on selection   |
| `closeOnSelect`       | `boolean`                                                          | `true`         | Close dropdown on selection |
| `required`            | `boolean`                                                          | `false`        | Mark field as required      |
| `className`           | `string`                                                           | -              | Additional CSS classes      |

### Option Interface
```typescript
interface Option {
  value: string
  label: string
  disabled?: boolean
  [key: string]: any // Additional custom properties
}
```

## Accessibility
The Select component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `combobox` role with complete ARIA attributes
- **Keyboard Navigation**: Arrow keys, Enter, Space, Escape, and typing for search
- **Screen Readers**: Clear announcements of selections and state changes
- **Focus Management**: Proper focus indicators and focus trapping in dropdown
- **High Contrast**: Support for high contrast mode and custom themes
- **Label Association**: Automatic label-input association
- **Option Announcements**: Clear indication of available options and selections

## Examples

### Advanced Filter Panel
```typescript
import { Select, Card, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

interface FilterData {
  categories: string[]
  priceRange: string
  brand: string
  rating: string
  availability: string
}

function ProductFilters() {
  const [filters, setFilters] = useState<FilterData>({
    categories: [],
    priceRange: '',
    brand: '',
    rating: '',
    availability: ''
  })
  
  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' }
  ]
  
  const priceRanges = [
    { value: '0-25', label: '$0 - $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ]
  
  const brands = [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'sony', label: 'Sony' }
  ]
  
  const ratings = [
    { value: '4+', label: '4+ stars' },
    { value: '3+', label: '3+ stars' },
    { value: '2+', label: '2+ stars' },
    { value: '1+', label: '1+ stars' }
  ]
  
  const availability = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'pre-order', label: 'Pre-order' }
  ]
  
  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: '',
      brand: '',
      rating: '',
      availability: ''
    })
  }
  
  const applyFilters = () => {
    console.log('Applying filters:', filters)
  }
  
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
        
        <div className="space-y-4">
          <Select
            options={categories}
            value={filters.categories}
            onChange={(values) => setFilters(prev => ({ ...prev, categories: values as string[] }))}
            label="Categories"
            placeholder="Select categories..."
            multiple
            searchable
          />
          
          <Select
            options={priceRanges}
            value={filters.priceRange}
            onChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as string }))}
            label="Price Range"
            placeholder="Select price range..."
          />
          
          <Select
            options={brands}
            value={filters.brand}
            onChange={(value) => setFilters(prev => ({ ...prev, brand: value as string }))}
            label="Brand"
            placeholder="Select brand..."
            searchable
            clearable
          />
          
          <Select
            options={ratings}
            value={filters.rating}
            onChange={(value) => setFilters(prev => ({ ...prev, rating: value as string }))}
            label="Minimum Rating"
            placeholder="Select rating..."
          />
          
          <Select
            options={availability}
            value={filters.availability}
            onChange={(value) => setFilters(prev => ({ ...prev, availability: value as string }))}
            label="Availability"
            placeholder="Select availability..."
          />
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  )
}
```
