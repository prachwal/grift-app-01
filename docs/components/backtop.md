# BackTop Component Documentation

## Overview
The BackTop component provides a floating "back to top" button that appears when users scroll down and allows them to quickly return to the top of the page. Features smooth scrolling animations and customizable appearance.

## Features
- **Auto Show/Hide** - Automatically appears/disappears based on scroll position
- **Smooth Scrolling** - Animated scroll to top behavior
- **Custom Triggers** - Configurable scroll distance for visibility
- **Multiple Styles** - Various button styles and shapes
- **Custom Icons** - Support for custom icons and content
- **Target Elements** - Scroll to different elements besides page top
- **Accessibility** - Full keyboard and screen reader support
- **Dark Mode** - Complete dark mode compatibility
- **Positioning** - Flexible positioning options

## Basic Usage

```tsx
import { BackTop } from '@/nebula/components/BackTop'

export function BasicBackTopExample() {
  return (
    <div>
      {/* Your page content */}
      <div style={{ height: '200vh' }} className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-8">
        <h1 className="text-4xl font-bold mb-8">Scroll down to see BackTop button</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          This is a long page content. Keep scrolling down...
        </p>
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Content Block {i + 1}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* BackTop button - appears after scrolling 400px */}
      <BackTop />
    </div>
  )
}
```

## Variants

### Default Variant
```tsx
export function DefaultVariantExample() {
  return (
    <div>
      <div style={{ height: '150vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Default BackTop Style</h2>
        <p>Scroll down to see the default circular button.</p>
      </div>
      <BackTop variant="default" />
    </div>
  )
}
```

### Primary Variant
```tsx
export function PrimaryVariantExample() {
  return (
    <div>
      <div style={{ height: '150vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Primary BackTop Style</h2>
        <p>Scroll down to see the primary colored button.</p>
      </div>
      <BackTop variant="primary" />
    </div>
  )
}
```

### Ghost Variant
```tsx
export function GhostVariantExample() {
  return (
    <div>
      <div style={{ height: '150vh' }} className="p-8 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Ghost BackTop Style</h2>
        <p>Scroll down to see the ghost/outline button.</p>
      </div>
      <BackTop variant="ghost" />
    </div>
  )
}
```

## Visibility Control

### Custom Show Height
```tsx
export function CustomShowHeightExample() {
  return (
    <div>
      <div style={{ height: '200vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Custom Visibility Trigger</h2>
        <p className="mb-4">This BackTop button appears after scrolling 800px instead of the default 400px.</p>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded mb-4">
          <p>Keep scrolling to see the button appear...</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              Content section {i + 1}
            </div>
          ))}
        </div>
      </div>
      <BackTop visibilityHeight={800} />
    </div>
  )
}
```

### Always Visible
```tsx
export function AlwaysVisibleExample() {
  return (
    <div>
      <div style={{ height: '150vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Always Visible BackTop</h2>
        <p>This button is always visible regardless of scroll position.</p>
      </div>
      <BackTop visibilityHeight={0} />
    </div>
  )
}
```

## Custom Targets

### Scroll to Element
```tsx
export function CustomTargetExample() {
  const scrollToTarget = () => {
    const element = document.getElementById('target-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div id="target-section" className="bg-green-100 dark:bg-green-900 p-8 mb-8">
        <h2 className="text-2xl font-bold">Target Section</h2>
        <p>This BackTop button scrolls to this section instead of the page top.</p>
      </div>
      
      <div style={{ height: '200vh' }} className="p-8">
        <h3 className="text-xl font-semibold mb-4">Long Content</h3>
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              Content block {i + 1} - Scroll down to see custom BackTop behavior
            </div>
          ))}
        </div>
      </div>
      
      <BackTop onClick={scrollToTarget} />
    </div>
  )
}
```

### Multiple Targets
```tsx
export function MultipleTargetsExample() {
  const [currentTarget, setCurrentTarget] = useState('top')

  const scrollToSection = () => {
    const targets = {
      top: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      middle: () => document.getElementById('middle-section')?.scrollIntoView({ behavior: 'smooth' }),
      bottom: () => document.getElementById('bottom-section')?.scrollIntoView({ behavior: 'smooth' })
    }
    
    targets[currentTarget]()
    
    // Cycle to next target
    const nextTarget = currentTarget === 'top' ? 'middle' : currentTarget === 'middle' ? 'bottom' : 'top'
    setCurrentTarget(nextTarget)
  }

  const getButtonText = () => {
    return currentTarget === 'top' ? '↑ Top' : currentTarget === 'middle' ? '→ Middle' : '↓ Bottom'
  }

  return (
    <div>
      <div className="bg-blue-100 dark:bg-blue-900 p-8 mb-8">
        <h2 className="text-2xl font-bold">Top Section</h2>
      </div>
      
      <div style={{ height: '100vh' }} className="p-8">
        <div className="space-y-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded">
              Content before middle section {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      <div id="middle-section" className="bg-yellow-100 dark:bg-yellow-900 p-8 mb-8">
        <h2 className="text-2xl font-bold">Middle Section</h2>
      </div>
      
      <div style={{ height: '100vh' }} className="p-8">
        <div className="space-y-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded">
              Content before bottom section {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      <div id="bottom-section" className="bg-red-100 dark:bg-red-900 p-8">
        <h2 className="text-2xl font-bold">Bottom Section</h2>
      </div>
      
      <BackTop onClick={scrollToSection}>
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-lg border font-medium">
          {getButtonText()}
        </div>
      </BackTop>
    </div>
  )
}
```

## Custom Content

### Custom Icon
```tsx
export function CustomIconExample() {
  return (
    <div>
      <div style={{ height: '150vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Custom Icon BackTop</h2>
        <p>Using a custom arrow icon instead of the default.</p>
      </div>
      
      <BackTop>
        <div className="w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </BackTop>
    </div>
  )
}
```

### Text Button
```tsx
export function TextButtonExample() {
  return (
    <div>
      <div style={{ height: '150vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Text BackTop Button</h2>
        <p>Using text instead of an icon.</p>
      </div>
      
      <BackTop>
        <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-semibold shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
          Back to Top
        </div>
      </BackTop>
    </div>
  )
}
```

### Badge Style
```tsx
export function BadgeStyleExample() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (position / documentHeight) * 100
      setScrollPosition(Math.round(scrollPercentage))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <div style={{ height: '300vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Progress Badge BackTop</h2>
        <p>Shows scroll progress as a percentage.</p>
        <div className="space-y-4">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              Progress content block {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      <BackTop>
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex flex-col items-center justify-center shadow-xl">
          <div className="text-xs font-bold">{scrollPosition}%</div>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </BackTop>
    </div>
  )
}
```

## Positioning

### Different Positions
```tsx
export function PositioningExample() {
  return (
    <div>
      <div style={{ height: '200vh' }} className="p-8">
        <h2 className="text-2xl font-bold mb-4">Different Positions</h2>
        <p className="mb-4">Multiple BackTop buttons in different positions.</p>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded mb-4">
          <p>Notice the different positioned buttons:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Bottom right (default)</li>
            <li>Bottom left</li>
            <li>Top right</li>
          </ul>
        </div>
      </div>
      
      {/* Default position - bottom right */}
      <BackTop>
        <div className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          1
        </div>
      </BackTop>
      
      {/* Bottom left */}
      <BackTop 
        style={{ 
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          right: 'auto'
        }}
      >
        <div className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          2
        </div>
      </BackTop>
      
      {/* Top right */}
      <BackTop 
        style={{ 
          position: 'fixed',
          top: '24px',
          bottom: 'auto',
          right: '24px'
        }}
      >
        <div className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          3
        </div>
      </BackTop>
    </div>
  )
}
```

## Props API

| Prop               | Type                                | Default          | Description                                              |
| ------------------ | ----------------------------------- | ---------------- | -------------------------------------------------------- |
| `visibilityHeight` | `number`                            | `400`            | Scroll distance (px) before button appears               |
| `onClick`          | `() => void`                        | -                | Custom click handler (overrides default scroll behavior) |
| `target`           | `() => HTMLElement \| Window`       | `() => window`   | Target container for scrolling                           |
| `duration`         | `number`                            | `450`            | Animation duration for scroll in milliseconds            |
| `variant`          | `'default' \| 'primary' \| 'ghost'` | `'default'`      | Button style variant                                     |
| `size`             | `'small' \| 'medium' \| 'large'`    | `'medium'`       | Button size                                              |
| `shape`            | `'circle' \| 'square'`              | `'circle'`       | Button shape                                             |
| `className`        | `string`                            | -                | Additional CSS classes                                   |
| `style`            | `React.CSSProperties`               | -                | Inline styles for positioning                            |
| `children`         | `React.ReactNode`                   | Default up arrow | Custom button content                                    |

## Accessibility

The BackTop component includes comprehensive accessibility features:

- **ARIA Label** - Descriptive label for screen readers
- **Keyboard Support** - Focusable and activatable with Enter/Space
- **Focus Indicators** - Visible focus ring for keyboard navigation
- **Role Attribute** - Proper button role for assistive technology
- **Live Region** - Announces scroll position changes when appropriate

### Keyboard Shortcuts
- `Tab` - Focus the button when visible
- `Enter` / `Space` - Activate the scroll to top action
- `Escape` - Remove focus from button

## Best Practices

1. **Appropriate Trigger** - Set `visibilityHeight` based on your content length
2. **Consistent Positioning** - Use consistent positioning across your application
3. **Performance** - Component efficiently handles scroll events with debouncing
4. **Mobile Friendly** - Ensure button is large enough for touch interaction
5. **Visual Feedback** - Provide hover and focus states for better UX
6. **Don't Overuse** - One BackTop button per page is usually sufficient
7. **Custom Styling** - Match the button style to your overall design system

## Common Use Cases

### Documentation Sites
```tsx
function DocumentationLayout() {
  return (
    <div className="min-h-screen">
      {/* Header, navigation, content */}
      <BackTop visibilityHeight={300} />
    </div>
  )
}
```

### E-commerce Listings
```tsx
function ProductListing() {
  return (
    <div>
      {/* Product grid with hundreds of items */}
      <BackTop visibilityHeight={600}>
        <div className="bg-white shadow-lg rounded-full p-3">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
        </div>
      </BackTop>
    </div>
  )
}
```

### Blog Posts
```tsx
function BlogPost() {
  return (
    <article>
      {/* Long form content */}
      <BackTop 
        visibilityHeight={500}
        duration={600}
      />
    </article>
  )
}
```

The BackTop component enhances user experience by providing quick navigation back to important sections of your content, especially on long pages with extensive scrolling.

## Rozwiązywanie problemów

### Typowe problemy i rozwiązania

1. **BackTop nie pojawia się po przewinięciu**
   - Sprawdź czy `visibilityHeight` nie jest zbyt duże
   - Upewnij się, że kontener ma wystarczającą wysokość do przewinięcia

2. **Przewijanie nie działa płynnie**
   - Sprawdź czy przeglądarka obsługuje `scroll-behavior: smooth`
   - Rozważ dostosowanie wartości `duration`

3. **Problemy z pozycjonowaniem**
   - Sprawdź czy rodzic ma `position: relative` gdy używasz custom target
   - Upewnij się, że `right` i `bottom` mają odpowiednie wartości

### Kod źródłowy

Aby zobaczyć pełną implementację komponentu BackTop, sprawdź [#file:BackTop.tsx](BackTop.tsx).

### Debugowanie

Komponent BackTop zawiera wbudowane narzędzia debugowania. Aby je włączyć, ustaw `DEBUG_BACKTOP = true` w pliku źródłowym.
