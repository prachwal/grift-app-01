# Card Component Documentation

## Overview
The Card component provides a flexible container for displaying content with consistent styling, structure, and visual hierarchy. It serves as a fundamental building block for layouts, featuring headers, content areas, footers, and various styling options to accommodate different design needs.

## Features
- **Flexible Structure**: Support for header, body, and footer sections
- **Visual Variants**: Bordered, shadow, elevated, and flat styles
- **Interactive States**: Hover effects and clickable card support
- **Content Organization**: Built-in spacing and layout management
- **Image Integration**: Support for card images with proper aspect ratios
- **Accessibility**: Proper semantic structure and ARIA compliance
- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode**: Complete dark theme support

## Basic Usage

### Simple Card
```typescript
import { Card } from '@nebula/components'

function SimpleCard() {
  return (
    <Card>
      <p>This is a basic card with some content inside.</p>
    </Card>
  )
}
```

### Card with Header
```typescript
import { Card, CardHeader, CardContent } from '@nebula/components'

function CardWithHeader() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Card Title</h3>
        <p className="text-sm text-gray-600">Optional subtitle</p>
      </CardHeader>
      <CardContent>
        <p>Main content area with detailed information.</p>
      </CardContent>
    </Card>
  )
}
```

### Complete Card Structure
```typescript
import { Card, CardHeader, CardContent, CardFooter, Button } from '@nebula/components'

function CompleteCard() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Complete Card</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          With header, content, and footer
        </p>
      </CardHeader>
      
      <CardContent>
        <p className="mb-4">
          This card demonstrates all available sections including 
          a header with title and subtitle, main content area, and 
          a footer with actions.
        </p>
        <ul className="space-y-2">
          <li>• Feature 1</li>
          <li>• Feature 2</li>
          <li>• Feature 3</li>
        </ul>
      </CardContent>
      
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Save</Button>
      </CardFooter>
    </Card>
  )
}
```

## Card Variants
Different visual styles for various contexts:

### Shadow Variants
```typescript
// No shadow (flat)
<Card shadow="none">
  Flat card without shadow
</Card>

// Small shadow (default)
<Card shadow="sm">
  Card with small shadow
</Card>

// Medium shadow
<Card shadow="md">
  Card with medium shadow
</Card>

// Large shadow (elevated)
<Card shadow="lg">
  Elevated card with large shadow
</Card>
```

### Border Variants
```typescript
// No border
<Card border="none">
  Borderless card
</Card>

// With border (default)
<Card border="default">
  Card with default border
</Card>

// Thick border
<Card border="thick">
  Card with thick border
</Card>

// Colored border
<Card border="colored" borderColor="blue">
  Card with blue border
</Card>
```

### Padding Variants
```typescript
// No padding
<Card padding="none">
  <div className="p-4">Custom padded content</div>
</Card>

// Small padding
<Card padding="sm">
  Content with small padding
</Card>

// Medium padding (default)
<Card padding="md">
  Content with medium padding
</Card>

// Large padding
<Card padding="lg">
  Content with large padding
</Card>
```

## Interactive Cards
Make cards clickable with hover effects:

```typescript
import { Card } from '@nebula/components'

function ClickableCard() {
  const handleCardClick = () => {
    console.log('Card clicked!')
  }
  
  return (
    <Card 
      clickable
      onClick={handleCardClick}
      className="cursor-pointer transition-transform hover:scale-105"
    >
      <CardContent>
        <h3 className="text-lg font-medium mb-2">Clickable Card</h3>
        <p>This card responds to clicks and has hover effects.</p>
      </CardContent>
    </Card>
  )
}
```

## Card with Images
Display images in cards with proper aspect ratios:

```typescript
import { Card, CardHeader, CardContent } from '@nebula/components'

function ImageCard() {
  return (
    <Card className="max-w-sm">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src="https://picsum.photos/400/225" 
          alt="Card image"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      
      <CardHeader>
        <h3 className="text-lg font-medium">Image Card</h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400">
          Card with an image at the top and content below.
        </p>
      </CardContent>
    </Card>
  )
}
```

## Profile Cards
Common pattern for user profiles:

```typescript
import { Card, CardContent, Button, Avatar } from '@nebula/components'
import { Mail, MapPin, Calendar } from 'lucide-preact'

function ProfileCard() {
  return (
    <Card className="max-w-sm">
      <CardContent className="text-center">
        <Avatar 
          src="https://picsum.photos/100/100" 
          alt="John Doe"
          size="lg"
          className="mx-auto mb-4"
        />
        
        <h3 className="text-xl font-semibold mb-1">John Doe</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Software Engineer
        </p>
        
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center justify-center gap-2">
            <Mail size={16} />
            <span>john.doe@example.com</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin size={16} />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Calendar size={16} />
            <span>Joined March 2021</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="primary" className="flex-1">
            Follow
          </Button>
          <Button variant="outline" className="flex-1">
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Product Cards
E-commerce style product cards:

```typescript
import { Card, CardContent, Button, Badge } from '@nebula/components'
import { Star, ShoppingCart } from 'lucide-preact'

function ProductCard() {
  return (
    <Card className="max-w-sm">
      <div className="relative">
        <img 
          src="https://picsum.photos/300/200" 
          alt="Product"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge 
          variant="success" 
          className="absolute top-2 right-2"
        >
          Sale
        </Badge>
      </div>
      
      <CardContent>
        <h3 className="text-lg font-semibold mb-1">Product Name</h3>
        
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">(24 reviews)</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-green-600">$49.99</span>
          <span className="text-lg text-gray-500 line-through">$69.99</span>
        </div>
        
        <Button 
          variant="primary" 
          className="w-full flex items-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Stat Cards
Display statistics and metrics:

```typescript
import { Card, CardContent } from '@nebula/components'
import { TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-preact'

function StatsGrid() {
  const stats = [
    {
      label: 'Total Users',
      value: '12,345',
      change: '+12%',
      trend: 'up',
      icon: Users
    },
    {
      label: 'Revenue',
      value: '$98,765',
      change: '+8%',
      trend: 'up',
      icon: DollarSign
    }
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span className={`text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <stat.icon size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## Props Reference

### Card Props
| Prop          | Type                                          | Default     | Description                          |
| ------------- | --------------------------------------------- | ----------- | ------------------------------------ |
| `children`    | `ComponentChild`                              | -           | Card content                         |
| `shadow`      | `'none' \| 'sm' \| 'md' \| 'lg'`              | `'sm'`      | Shadow variant                       |
| `border`      | `'none' \| 'default' \| 'thick' \| 'colored'` | `'default'` | Border style                         |
| `borderColor` | `string`                                      | -           | Border color (when border="colored") |
| `padding`     | `'none' \| 'sm' \| 'md' \| 'lg'`              | `'md'`      | Internal padding                     |
| `clickable`   | `boolean`                                     | `false`     | Whether card is clickable            |
| `onClick`     | `(e: MouseEvent) => void`                     | -           | Click handler                        |
| `className`   | `string`                                      | -           | Additional CSS classes               |

### CardHeader Props
| Prop        | Type             | Default | Description            |
| ----------- | ---------------- | ------- | ---------------------- |
| `children`  | `ComponentChild` | -       | Header content         |
| `className` | `string`         | -       | Additional CSS classes |

### CardContent Props
| Prop        | Type             | Default | Description            |
| ----------- | ---------------- | ------- | ---------------------- |
| `children`  | `ComponentChild` | -       | Content area content   |
| `className` | `string`         | -       | Additional CSS classes |

### CardFooter Props
| Prop        | Type             | Default | Description            |
| ----------- | ---------------- | ------- | ---------------------- |
| `children`  | `ComponentChild` | -       | Footer content         |
| `className` | `string`         | -       | Additional CSS classes |

## Accessibility
The Card component provides accessibility features:

- **Semantic Structure**: Uses proper HTML landmarks when appropriate
- **ARIA Labels**: Supports `aria-label` and other ARIA attributes
- **Keyboard Navigation**: Clickable cards support keyboard interaction
- **Focus Management**: Proper focus indicators for interactive cards
- **Screen Readers**: Clear content structure for screen reader navigation
- **High Contrast**: Proper contrast ratios for borders and text

## Examples

### Dashboard Cards Grid
```typescript
import { Card, CardHeader, CardContent } from '@nebula/components'

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Recent Activity</h3>
        </CardHeader>
        <CardContent>
          <p>Latest updates and activities...</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Performance</h3>
        </CardHeader>
        <CardContent>
          <p>System performance metrics...</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Settings</h3>
        </CardHeader>
        <CardContent>
          <p>Configuration options...</p>
        </CardContent>
      </Card>
    </div>
  )
}
```
