# Rating Component Documentation

## Overview
The Rating component provides an interactive star rating system for collecting user feedback and displaying ratings. It supports various interaction modes, customizable icons, half-star precision, and accessibility features for comprehensive rating experiences.

## Features
- **Star Precision**: Full stars, half-stars, or quarter-star granularity
- **Interactive Modes**: Read-only display, hover feedback, click selection
- **Custom Icons**: Stars, hearts, thumbs up, or custom icon sets
- **Size Variants**: Small (sm), Medium (md), Large (lg), Extra Large (xl)
- **Value Display**: Show numerical ratings alongside visual representation
- **Accessibility**: Full keyboard navigation and screen reader support
- **Animation**: Smooth hover and selection transitions
- **Validation**: Form integration with error states

## Basic Usage
Simple rating with default star icons:

```typescript
import { Rating } from '@nebula/components'

function BasicRating() {
  const [rating, setRating] = useState(0)

  return (
    <div className="space-y-4">
      <h3>Rate this product</h3>
      <Rating
        value={rating}
        onChange={setRating}
        max={5}
      />
      <p>Current rating: {rating}/5</p>
    </div>
  )
}
```

## Size Variants
Rating component supports multiple size variants:

```typescript
import { Rating } from '@nebula/components'

function SizedRatings() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <Rating size="sm" value={4} readOnly />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Medium (Default)</label>
        <Rating size="md" value={4} readOnly />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <Rating size="lg" value={4} readOnly />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Extra Large</label>
        <Rating size="xl" value={4} readOnly />
      </div>
    </div>
  )
}
```

## Half-Star Support
Enable fractional ratings for more precise feedback:

```typescript
import { Rating } from '@nebula/components'

function HalfStarRating() {
  const [rating, setRating] = useState(3.5)

  return (
    <div className="space-y-4">
      <h3>Half-star precision</h3>
      <Rating
        value={rating}
        onChange={setRating}
        precision={0.5}
        showValue
      />
      <p>Precise rating: {rating} stars</p>
    </div>
  )
}
```

## Custom Icons
Use different icon sets for various rating contexts:

```typescript
import { Rating } from '@nebula/components'
import { Heart, Fire, ThumbsUp } from 'lucide-react'

function CustomIconRatings() {
  return (
    <div className="space-y-6">
      {/* Heart icons for favorites */}
      <div>
        <label className="block text-sm font-medium mb-2">Favorites</label>
        <Rating
          value={4}
          icon={<Heart />}
          filledIcon={<Heart className="fill-current" />}
          color="red"
          readOnly
        />
      </div>
      
      {/* Fire icons for intensity */}
      <div>
        <label className="block text-sm font-medium mb-2">Spice Level</label>
        <Rating
          value={3}
          icon={<Fire />}
          color="orange"
          readOnly
        />
      </div>
      
      {/* Thumbs up for approval */}
      <div>
        <label className="block text-sm font-medium mb-2">Approval</label>
        <Rating
          value={5}
          icon={<ThumbsUp />}
          color="green"
          readOnly
        />
      </div>
    </div>
  )
}
```

## Read-Only Display
Display ratings without interaction:

```typescript
import { Rating } from '@nebula/components'

function ReadOnlyRatings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Rating value={4.5} readOnly precision={0.5} />
        <span className="text-sm text-gray-600">4.5 out of 5 (124 reviews)</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Rating value={3} readOnly />
        <span className="text-sm text-gray-600">3 out of 5</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Rating value={5} readOnly />
        <span className="text-sm text-gray-600">Perfect rating!</span>
      </div>
    </div>
  )
}
```

## Interactive Feedback
Provide hover feedback and selection states:

```typescript
import { Rating } from '@nebula/components'

function InteractiveRating() {
  const [rating, setRating] = useState(0)
  const [hovering, setHovering] = useState(false)

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair', 
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  }

  return (
    <div className="space-y-4">
      <h3>Rate your experience</h3>
      <div className="flex items-center space-x-4">
        <Rating
          value={rating}
          onChange={setRating}
          onHoverChange={setHovering}
          highlightSelectedOnly={false}
        />
        <span className="text-sm font-medium">
          {hovering ? ratingLabels[hovering] : ratingLabels[rating] || 'Not rated'}
        </span>
      </div>
    </div>
  )
}
```

## Form Integration
Integrate rating with form validation:

```typescript
import { Rating, FieldError } from '@nebula/components'
import { useState } from 'preact/hooks'

function RatingForm() {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!formData.rating) {
      newErrors.rating = 'Please provide a rating'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Submit form
    console.log('Submitting:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Overall Rating *
        </label>
        <Rating
          value={formData.rating}
          onChange={(value) => setFormData({ ...formData, rating: value })}
          required
          error={!!errors.rating}
        />
        {errors.rating && <FieldError message={errors.rating} />}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Additional Comments
        </label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>
      
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Submit Review
      </button>
    </form>
  )
}
```

## Product Review System
Complete rating system for e-commerce:

```typescript
import { Rating } from '@nebula/components'

function ProductReviews() {
  const product = {
    averageRating: 4.3,
    totalReviews: 247,
    ratingBreakdown: {
      5: 123,
      4: 84, 
      3: 28,
      2: 8,
      1: 4
    }
  }

  return (
    <div className="max-w-md space-y-6">
      {/* Overall Rating */}
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900">
          {product.averageRating}
        </div>
        <Rating value={product.averageRating} readOnly precision={0.1} size="lg" />
        <p className="text-sm text-gray-600">
          Based on {product.totalReviews} reviews
        </p>
      </div>
      
      {/* Rating Breakdown */}
      <div className="space-y-2">
        {Object.entries(product.ratingBreakdown)
          .reverse()
          .map(([stars, count]) => {
            const percentage = (count / product.totalReviews) * 100
            
            return (
              <div key={stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-sm w-12">
                  <span>{stars}</span>
                  <svg className="w-3 h-3 fill-current text-yellow-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <span className="text-sm text-gray-600 w-8">
                  {count}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}
```

## Restaurant Rating
Specialized rating for different criteria:

```typescript
import { Rating } from '@nebula/components'

function RestaurantRating() {
  const [ratings, setRatings] = useState({
    food: 0,
    service: 0,
    ambiance: 0,
    value: 0
  })

  const updateRating = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }))
  }

  const averageRating = Object.values(ratings)
    .filter(r => r > 0)
    .reduce((sum, rating, _, arr) => sum + rating / arr.length, 0)

  return (
    <div className="max-w-md space-y-4">
      <h3 className="text-lg font-semibold">Rate this restaurant</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Food Quality</label>
          <Rating
            value={ratings.food}
            onChange={(value) => updateRating('food', value)}
            size="sm"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Service</label>
          <Rating
            value={ratings.service}
            onChange={(value) => updateRating('service', value)}
            size="sm"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Ambiance</label>
          <Rating
            value={ratings.ambiance}
            onChange={(value) => updateRating('ambiance', value)}
            size="sm"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Value for Money</label>
          <Rating
            value={ratings.value}
            onChange={(value) => updateRating('value', value)}
            size="sm"
          />
        </div>
      </div>
      
      {averageRating > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Rating</span>
            <div className="flex items-center space-x-2">
              <Rating value={averageRating} readOnly precision={0.1} size="sm" />
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

## Props Reference

### Rating Props

| Prop                    | Type                                                 | Default    | Description                                          |
| ----------------------- | ---------------------------------------------------- | ---------- | ---------------------------------------------------- |
| `value`                 | `number`                                             | `0`        | Current rating value                                 |
| `onChange`              | `(value: number) => void`                            | -          | Called when rating changes                           |
| `onHoverChange`         | `(value: number) => void`                            | -          | Called when hover state changes                      |
| `max`                   | `number`                                             | `5`        | Maximum rating value                                 |
| `precision`             | `number`                                             | `1`        | Rating precision (1 = whole stars, 0.5 = half stars) |
| `size`                  | `'sm' \| 'md' \| 'lg' \| 'xl'`                       | `'md'`     | Size variant                                         |
| `readOnly`              | `boolean`                                            | `false`    | Whether rating is read-only                          |
| `disabled`              | `boolean`                                            | `false`    | Whether rating is disabled                           |
| `required`              | `boolean`                                            | `false`    | Whether rating is required (form validation)         |
| `error`                 | `boolean`                                            | `false`    | Whether to show error state                          |
| `showValue`             | `boolean`                                            | `false`    | Whether to display numeric value                     |
| `color`                 | `'yellow' \| 'red' \| 'green' \| 'blue' \| 'purple'` | `'yellow'` | Rating color theme                                   |
| `icon`                  | `ComponentChild`                                     | -          | Custom empty icon                                    |
| `filledIcon`            | `ComponentChild`                                     | -          | Custom filled icon                                   |
| `highlightSelectedOnly` | `boolean`                                            | `false`    | Whether to highlight only selected stars             |
| `allowClear`            | `boolean`                                            | `false`    | Whether to allow clearing rating                     |
| `tooltips`              | `string[]`                                           | -          | Tooltip text for each rating                         |
| `character`             | `ComponentChild`                                     | -          | Custom character (alternative to icon)               |
| `count`                 | `number`                                             | `5`        | Number of rating items to display                    |
| `allowHalf`             | `boolean`                                            | `false`    | Allow half-star selections                           |
| `autoFocus`             | `boolean`                                            | `false`    | Auto focus on mount                                  |
| `className`             | `string`                                             | -          | Additional CSS classes                               |
| `style`                 | `CSSProperties`                                      | -          | Inline styles                                        |

### Rating Events

| Event           | Parameters                | Description               |
| --------------- | ------------------------- | ------------------------- |
| `onChange`      | `(value: number)`         | Rating value changed      |
| `onHoverChange` | `(value: number \| null)` | Hover state changed       |
| `onFocus`       | `(event: FocusEvent)`     | Rating focused            |
| `onBlur`        | `(event: FocusEvent)`     | Rating blurred            |
| `onKeyDown`     | `(event: KeyboardEvent)`  | Key pressed while focused |

## Accessibility

The Rating component provides comprehensive accessibility support:

- **ARIA Roles**: Uses `radiogroup` role for rating selection
- **Keyboard Navigation**: Arrow keys for selection, Space/Enter to confirm
- **Screen Reader Support**: Announces current rating and changes
- **Focus Management**: Visible focus indicators and proper tab order
- **Labels**: Supports `aria-label`, `aria-labelledby`, and `aria-describedby`
- **Required Fields**: Integrates with form validation and error announcements
- **High Contrast**: Ensures visibility in high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### Keyboard Shortcuts

| Key               | Action                               |
| ----------------- | ------------------------------------ |
| `Arrow Right/Up`  | Increase rating by one step          |
| `Arrow Left/Down` | Decrease rating by one step          |
| `Home`            | Set to minimum rating (1 star)       |
| `End`             | Set to maximum rating                |
| `Space/Enter`     | Confirm current rating               |
| `Escape`          | Clear rating (if allowClear is true) |

## Best Practices

### Form Integration
- Always provide labels for form ratings
- Use validation to ensure required ratings are provided
- Show clear error states with helpful messages
- Consider providing rating descriptions or tooltips

### User Experience
- Use appropriate precision for your use case (whole stars vs half-stars)
- Provide hover feedback for interactive ratings
- Consider using different icons for different rating contexts
- Show rating distributions for products/content with many reviews

### Performance
- Use `readOnly` for display-only ratings to avoid unnecessary event handlers
- Consider virtualization for very large lists of rated items
- Use appropriate sizes to match your design system

### Accessibility
- Always provide meaningful labels
- Use proper color contrast for all rating states
- Test with keyboard navigation and screen readers
- Provide alternative text for custom icons

## Examples

The Rating component enables rich feedback collection and display across various contexts, from simple product ratings to complex multi-criteria evaluations, with full accessibility and customization support.
