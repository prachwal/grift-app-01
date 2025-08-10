# 🎠 Carousel Component - Dokumentacja

## 📖 Przegląd

Carousel to komponent do wyświetlania sekwencji treści w obrotowym, interaktywnym formacie. Idealny do galerii obrazów, slideshowów produktów, testimoniali i prezentowania kolekcji treści w kompaktowej przestrzeni.

## ✨ Cechy Główne

- 🔄 **Automatyczne przewijanie** - Konfigurowalny timing i kierunek
- 🎯 **Nawigacja** - Strzałki, wskaźniki i nawigacja gestami
- 📱 **Responsywność** - Adaptuje się do różnych rozmiarów ekranu  
- ♿ **Dostępność** - Pełne wsparcie dla czytników ekranu i klawiatury
- 🎨 **Customizacja** - Elastyczne stylowanie i efekty przejścia
- 🖼️ **Lazy Loading** - Ładowanie obrazów na żądanie
- 👆 **Touch/Swipe** - Obsługa gestów dotykowych na urządzeniach mobilnych

## 🔧 Instalacja i Import

```typescript
import { Carousel, CarouselItem, CarouselIndicators, CarouselControls } from '@nebula/components'

// Podstawowy carousel
function BasicCarousel() {
  const items = [
    { id: 1, src: '/image1.jpg', alt: 'First image' },
    { id: 2, src: '/image2.jpg', alt: 'Second image' },
    { id: 3, src: '/image3.jpg', alt: 'Third image' }
  ]

  return (
    <Carousel autoplay interval={3000}>
      {items.map(item => (
        <CarouselItem key={item.id}>
          <img src={item.src} alt={item.alt} />
        </CarouselItem>
      ))}
      <CarouselControls />
      <CarouselIndicators />
    </Carousel>
  )
}
```

## 📝 Podstawowe Użycie

### 1. Image Gallery Carousel

```typescript
function ImageGalleryCarousel() {
  const photos = [
    {
      id: 1,
      src: '/gallery/photo1.jpg',
      alt: 'Sunset over mountains',
      title: 'Mountain Sunset'
    },
    {
      id: 2,
      src: '/gallery/photo2.jpg', 
      alt: 'Ocean waves',
      title: 'Ocean View'
    },
    {
      id: 3,
      src: '/gallery/photo3.jpg',
      alt: 'Forest path',
      title: 'Forest Trail'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Carousel 
        autoplay={false}
        loop={true}
        showArrows={true}
        showIndicators={true}
      >
        {photos.map(photo => (
          <CarouselItem key={photo.id}>
            <div className="relative">
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded">
                <h3 className="font-semibold">{photo.title}</h3>
              </div>
            </div>
          </CarouselItem>
        ))}
        <CarouselControls variant="floating" />
        <CarouselIndicators position="bottom" />
      </Carousel>
    </div>
  )
}
```

### 2. Product Showcase Carousel

```typescript
function ProductCarousel() {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: '/products/headphones.jpg',
      price: '$299',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Smart Watch',
      image: '/products/watch.jpg', 
      price: '$399',
      rating: 4.6
    },
    {
      id: 3,
      name: 'Laptop Pro',
      image: '/products/laptop.jpg',
      price: '$1299',
      rating: 4.9
    }
  ]

  return (
    <Carousel 
      itemsPerView={3}
      itemsPerViewMobile={1}
      itemsPerViewTablet={2}
      spacing={16}
      centerMode={true}
    >
      {products.map(product => (
        <CarouselItem key={product.id}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      ))}
      <CarouselControls variant="outside" />
    </Carousel>
  )
}
```

### 3. Testimonials Carousel

```typescript
function TestimonialsCarousel() {
  const testimonials = [
    {
      id: 1,
      text: "This product completely transformed our workflow. The team loves it!",
      author: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 2,
      text: "Outstanding support and incredible performance. Highly recommended!",
      author: "Mike Johnson", 
      role: "CTO",
      company: "StartupXYZ",
      avatar: "/avatars/mike.jpg"
    },
    {
      id: 3,
      text: "The best investment we made this year. ROI was immediate.",
      author: "Lisa Wang",
      role: "CEO",
      company: "InnovateLab",
      avatar: "/avatars/lisa.jpg"
    }
  ]

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        
        <Carousel 
          autoplay={true}
          interval={5000}
          pauseOnHover={true}
          fade={true}
        >
          {testimonials.map(testimonial => (
            <CarouselItem key={testimonial.id}>
              <div className="text-center px-8">
                <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
          <CarouselIndicators variant="dots" />
        </Carousel>
      </div>
    </div>
  )
}
```

## 🎨 Warianty i Konfiguracja

### Effect Variants

```typescript
function EffectVariants() {
  return (
    <div className="space-y-8">
      {/* Slide Effect (domyślny) */}
      <Carousel effect="slide" duration={300}>
        <CarouselItem>Slide Item 1</CarouselItem>
        <CarouselItem>Slide Item 2</CarouselItem>
        <CarouselItem>Slide Item 3</CarouselItem>
      </Carousel>

      {/* Fade Effect */}
      <Carousel effect="fade" duration={500}>
        <CarouselItem>Fade Item 1</CarouselItem>
        <CarouselItem>Fade Item 2</CarouselItem>
        <CarouselItem>Fade Item 3</CarouselItem>
      </Carousel>

      {/* Cube Effect */}
      <Carousel effect="cube" perspective={1000}>
        <CarouselItem>Cube Item 1</CarouselItem>
        <CarouselItem>Cube Item 2</CarouselItem>
        <CarouselItem>Cube Item 3</CarouselItem>
      </Carousel>

      {/* Coverflow Effect */}
      <Carousel 
        effect="coverflow" 
        coverflowRotate={45}
        coverflowStretch={0}
        coverflowDepth={100}
        coverflowModifier={1}
      >
        <CarouselItem>Cover 1</CarouselItem>
        <CarouselItem>Cover 2</CarouselItem>
        <CarouselItem>Cover 3</CarouselItem>
        <CarouselItem>Cover 4</CarouselItem>
        <CarouselItem>Cover 5</CarouselItem>
      </Carousel>
    </div>
  )
}
```

### Navigation Variants

```typescript
function NavigationVariants() {
  return (
    <div className="space-y-8">
      {/* Floating Controls */}
      <Carousel>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
        <CarouselControls 
          variant="floating"
          position="center"
          showOnHover={true}
        />
      </Carousel>

      {/* Outside Controls */}
      <Carousel>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
        <CarouselControls 
          variant="outside"
          spacing={16}
        />
      </Carousel>

      {/* Custom Controls */}
      <Carousel>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
        <CarouselControls>
          <CarouselControls.Prev>
            <ChevronLeftIcon className="w-6 h-6" />
          </CarouselControls.Prev>
          <CarouselControls.Next>
            <ChevronRightIcon className="w-6 h-6" />
          </CarouselControls.Next>
        </CarouselControls>
      </Carousel>
    </div>
  )
}
```

## 📱 Responsywne Zachowanie

```typescript
function ResponsiveCarousel() {
  return (
    <Carousel
      // Desktop - 4 items
      itemsPerView={4}
      // Tablet - 2 items  
      itemsPerViewTablet={2}
      // Mobile - 1 item
      itemsPerViewMobile={1}
      
      // Responsive spacing
      spacing={{ base: 8, md: 16, lg: 24 }}
      
      // Responsive controls
      showArrows={{ base: false, md: true }}
      showIndicators={{ base: true, md: false }}
      
      // Responsive autoplay
      autoplay={{ base: true, md: false }}
      interval={{ base: 4000, md: 6000 }}
    >
      {items.map(item => (
        <CarouselItem key={item.id}>
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  )
}
```

## 🎛️ Advanced Features

### Thumbnail Navigation

```typescript
function CarouselWithThumbnails() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const images = [
    { id: 1, src: '/large1.jpg', thumb: '/thumb1.jpg', alt: 'Image 1' },
    { id: 2, src: '/large2.jpg', thumb: '/thumb2.jpg', alt: 'Image 2' },
    { id: 3, src: '/large3.jpg', thumb: '/thumb3.jpg', alt: 'Image 3' },
    { id: 4, src: '/large4.jpg', thumb: '/thumb4.jpg', alt: 'Image 4' }
  ]

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <Carousel 
        activeIndex={activeIndex}
        onSlideChange={setActiveIndex}
        showArrows={true}
        showIndicators={false}
      >
        {images.map(image => (
          <CarouselItem key={image.id}>
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-96 object-cover rounded-lg"
            />
          </CarouselItem>
        ))}
      </Carousel>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center space-x-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
              activeIndex === index 
                ? 'border-blue-500' 
                : 'border-gray-200 hover:border-gray-400'
            )}
          >
            <img 
              src={image.thumb} 
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
```

### Progress Bar Carousel

```typescript
function ProgressCarousel() {
  const [progress, setProgress] = useState(0)
  
  return (
    <div>
      <Carousel 
        autoplay={true}
        interval={4000}
        onProgress={setProgress}
        pauseOnHover={true}
      >
        <CarouselItem>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-64 flex items-center justify-center text-white">
            <h2 className="text-3xl font-bold">Slide 1</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 h-64 flex items-center justify-center text-white">
            <h2 className="text-3xl font-bold">Slide 2</h2>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 h-64 flex items-center justify-center text-white">
            <h2 className="text-3xl font-bold">Slide 3</h2>
          </div>
        </CarouselItem>
      </Carousel>
      
      {/* Progress Bar */}
      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
```

### Infinite Loop Carousel

```typescript
function InfiniteCarousel() {
  const items = generateItems(20) // Wiele elementów

  return (
    <Carousel
      loop={true}
      centeredSlides={true}
      itemsPerView={5}
      spaceBetween={16}
      speed={1000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: false
      }}
      cssMode={false}
      freeMode={true}
    >
      {items.map(item => (
        <CarouselItem key={item.id}>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">{item.number}</span>
            </div>
            <h3 className="font-semibold">{item.title}</h3>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  )
}
```

## ♿ Dostępność (Accessibility)

### ARIA Implementation

```typescript
function AccessibleCarousel() {
  return (
    <Carousel
      role="region"
      aria-label="Product showcase carousel"
      aria-roledescription="carousel"
    >
      <CarouselItem
        role="group"
        aria-roledescription="slide"
        aria-label="1 of 4"
      >
        <img src="/product1.jpg" alt="Wireless headphones with noise cancellation" />
        <div className="sr-only">Product 1: Wireless headphones priced at $299</div>
      </CarouselItem>
      
      <CarouselItem
        role="group"
        aria-roledescription="slide" 
        aria-label="2 of 4"
      >
        <img src="/product2.jpg" alt="Smart fitness tracker watch" />
        <div className="sr-only">Product 2: Smart watch priced at $199</div>
      </CarouselItem>

      <CarouselControls>
        <CarouselControls.Prev 
          aria-label="Go to previous slide"
          title="Previous slide"
        >
          <ChevronLeftIcon />
        </CarouselControls.Prev>
        <CarouselControls.Next 
          aria-label="Go to next slide"
          title="Next slide"
        >
          <ChevronRightIcon />
        </CarouselControls.Next>
      </CarouselControls>

      <CarouselIndicators 
        role="tablist"
        aria-label="Slide navigation"
      >
        {items.map((_, index) => (
          <CarouselIndicators.Dot
            key={index}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            tabIndex={index === activeIndex ? 0 : -1}
          />
        ))}
      </CarouselIndicators>
    </Carousel>
  )
}
```

### Keyboard Navigation

```typescript
function KeyboardAccessibleCarousel() {
  return (
    <Carousel
      // Automatyczne zatrzymanie przy focus
      pauseOnFocus={true}
      
      // Nawigacja klawiszami strzałek
      keyboard={{
        enabled: true,
        onlyInViewport: true
      }}
      
      // Focus management
      grabCursor={false}
      watchSlidesProgress={true}
      watchSlidesVisibility={true}
      
      // Reduced motion support
      respectsReducedMotion={true}
    >
      <CarouselItem tabIndex={0}>
        <button className="w-full h-full focus:ring-2 focus:ring-blue-500 focus:outline-none">
          Focusable slide content
        </button>
      </CarouselItem>
      
      <CarouselControls
        // Tab navigation
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            // Handle activation
          }
        }}
      />
    </Carousel>
  )
}
```

## 🔌 Props API

### CarouselProps

| Prop             | Type                                         | Default   | Description                  |
| ---------------- | -------------------------------------------- | --------- | ---------------------------- |
| `children`       | `ReactNode`                                  | -         | Carousel items               |
| `activeIndex`    | `number`                                     | `0`       | Currently active slide index |
| `onSlideChange`  | `(index: number) => void`                    | -         | Callback when slide changes  |
| `autoplay`       | `boolean \| AutoplayConfig`                  | `false`   | Auto-play configuration      |
| `interval`       | `number`                                     | `3000`    | Auto-play interval in ms     |
| `loop`           | `boolean`                                    | `false`   | Enable infinite loop         |
| `effect`         | `'slide' \| 'fade' \| 'cube' \| 'coverflow'` | `'slide'` | Transition effect            |
| `duration`       | `number`                                     | `300`     | Transition duration          |
| `itemsPerView`   | `number \| 'auto'`                           | `1`       | Items visible at once        |
| `spacing`        | `number \| ResponsiveValue`                  | `0`       | Space between items          |
| `centeredSlides` | `boolean`                                    | `false`   | Center active slide          |
| `showArrows`     | `boolean \| ResponsiveValue`                 | `true`    | Show navigation arrows       |
| `showIndicators` | `boolean \| ResponsiveValue`                 | `true`    | Show slide indicators        |
| `pauseOnHover`   | `boolean`                                    | `false`   | Pause autoplay on hover      |
| `pauseOnFocus`   | `boolean`                                    | `true`    | Pause autoplay on focus      |
| `keyboard`       | `boolean \| KeyboardConfig`                  | `true`    | Keyboard navigation          |
| `touch`          | `boolean \| TouchConfig`                     | `true`    | Touch/swipe support          |
| `mousewheel`     | `boolean`                                    | `false`   | Mouse wheel navigation       |
| `lazy`           | `boolean \| LazyConfig`                      | `false`   | Lazy loading                 |
| `className`      | `string`                                     | -         | CSS class name               |
| `data-testid`    | `string`                                     | -         | Test identifier              |

### CarouselItemProps

| Prop          | Type        | Default | Description     |
| ------------- | ----------- | ------- | --------------- |
| `children`    | `ReactNode` | -       | Slide content   |
| `className`   | `string`    | -       | CSS class name  |
| `data-testid` | `string`    | -       | Test identifier |

### CarouselControlsProps

| Prop          | Type                            | Default      | Description            |
| ------------- | ------------------------------- | ------------ | ---------------------- |
| `variant`     | `'floating' \| 'outside'`       | `'floating'` | Controls style         |
| `position`    | `'center' \| 'top' \| 'bottom'` | `'center'`   | Controls position      |
| `showOnHover` | `boolean`                       | `false`      | Show only on hover     |
| `spacing`     | `number`                        | `8`          | Space from carousel    |
| `children`    | `ReactNode`                     | -            | Custom control content |

### CarouselIndicatorsProps

| Prop        | Type                                     | Default    | Description             |
| ----------- | ---------------------------------------- | ---------- | ----------------------- |
| `variant`   | `'dots' \| 'lines' \| 'thumbnails'`      | `'dots'`   | Indicator style         |
| `position`  | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Position                |
| `clickable` | `boolean`                                | `true`     | Enable click navigation |
| `children`  | `ReactNode`                              | -          | Custom indicators       |

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Carousel, CarouselItem, CarouselControls } from '../Carousel'

describe('Carousel', () => {
  const renderBasicCarousel = () => {
    render(
      <Carousel data-testid="carousel">
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
        <CarouselControls />
      </Carousel>
    )
  }

  test('renders carousel with slides', () => {
    renderBasicCarousel()
    
    expect(screen.getByTestId('carousel')).toBeInTheDocument()
    expect(screen.getByText('Slide 1')).toBeVisible()
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })

  test('navigates to next slide', async () => {
    renderBasicCarousel()
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    await waitFor(() => {
      expect(screen.getByText('Slide 2')).toBeVisible()
    })
  })

  test('supports keyboard navigation', () => {
    renderBasicCarousel()
    
    const carousel = screen.getByTestId('carousel')
    fireEvent.keyDown(carousel, { key: 'ArrowRight' })
    
    expect(screen.getByText('Slide 2')).toBeVisible()
  })

  test('autoplay functionality', async () => {
    render(
      <Carousel autoplay interval={1000}>
        <CarouselItem>Auto 1</CarouselItem>
        <CarouselItem>Auto 2</CarouselItem>
      </Carousel>
    )
    
    expect(screen.getByText('Auto 1')).toBeVisible()
    
    await waitFor(() => {
      expect(screen.getByText('Auto 2')).toBeVisible()
    }, { timeout: 1500 })
  })

  test('touch/swipe support', () => {
    renderBasicCarousel()
    
    const carousel = screen.getByTestId('carousel')
    
    fireEvent.touchStart(carousel, {
      touches: [{ clientX: 100, clientY: 0 }]
    })
    fireEvent.touchMove(carousel, {
      touches: [{ clientX: 50, clientY: 0 }]
    })
    fireEvent.touchEnd(carousel)
    
    expect(screen.getByText('Slide 2')).toBeVisible()
  })
})
```

### Integration Testing

```typescript
describe('Carousel Integration', () => {
  test('works with external state management', () => {
    const CarouselWithState = () => {
      const [activeIndex, setActiveIndex] = useState(0)
      const [isPlaying, setIsPlaying] = useState(false)

      return (
        <div>
          <div data-testid="current-index">Current: {activeIndex}</div>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <Carousel
            activeIndex={activeIndex}
            onSlideChange={setActiveIndex}
            autoplay={isPlaying}
          >
            <CarouselItem>State Slide 1</CarouselItem>
            <CarouselItem>State Slide 2</CarouselItem>
            <CarouselItem>State Slide 3</CarouselItem>
          </Carousel>
        </div>
      )
    }

    render(<CarouselWithState />)
    
    expect(screen.getByTestId('current-index')).toHaveTextContent('Current: 0')
    
    fireEvent.click(screen.getByText('Play'))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    
    expect(screen.getByTestId('current-index')).toHaveTextContent('Current: 1')
  })
})
```

## 🎨 Styling i Customizacja

### CSS Variables

```css
:root {
  --carousel-duration: 300ms;
  --carousel-timing: ease-in-out;
  --carousel-controls-size: 44px;
  --carousel-controls-bg: rgba(0, 0, 0, 0.5);
  --carousel-indicator-size: 12px;
  --carousel-indicator-spacing: 8px;
}

.carousel {
  --duration: var(--carousel-duration);
  --timing: var(--carousel-timing);
}

.carousel-controls {
  --size: var(--carousel-controls-size);
  --background: var(--carousel-controls-bg);
}

.carousel-indicators {
  --size: var(--carousel-indicator-size);
  --spacing: var(--carousel-indicator-spacing);
}
```

### Custom Styling

```typescript
function CustomStyledCarousel() {
  return (
    <Carousel
      className="
        bg-gray-900 
        rounded-2xl 
        overflow-hidden
        shadow-2xl
        border-4 border-gray-700
      "
      effect="fade"
      autoplay={true}
    >
      <CarouselItem>
        <div className="h-64 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Custom Style 1</h2>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="h-64 bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">Custom Style 2</h2>
        </div>
      </CarouselItem>
      
      <CarouselControls
        className="
          [&>button]:bg-white/20 
          [&>button]:backdrop-blur-sm
          [&>button]:border-white/30
          [&>button]:text-white
          [&>button]:hover:bg-white/30
          [&>button]:w-12
          [&>button]:h-12
          [&>button]:rounded-full
        "
      />
      
      <CarouselIndicators
        className="
          [&>button]:w-3 
          [&>button]:h-3
          [&>button]:bg-white/50
          [&>button]:rounded-full
          [&>button.active]:bg-white
          [&>button.active]:scale-125
        "
      />
    </Carousel>
  )
}
```

## 📚 Najlepsze Praktyki

### 1. **Performance Optimization**
```typescript
// Lazy loading dla dużych galerii
<Carousel lazy={{ loadPrevNext: true, loadPrevNextAmount: 1 }}>
  {images.map(image => (
    <CarouselItem key={image.id}>
      <img 
        data-src={image.src} // lazy loading
        alt={image.alt}
        className="carousel-lazy"
      />
    </CarouselItem>
  ))}
</Carousel>

// Virtualization dla bardzo dużych list
<Carousel 
  virtual={{
    enabled: true,
    addSlidesBefore: 2,
    addSlidesAfter: 2
  }}
>
  {/* Tylko widoczne slajdy są renderowane */}
</Carousel>
```

### 2. **Accessibility Best Practices**
```typescript
// Zawsze podawaj opisowe alt texts i labels
<Carousel aria-label="Product gallery">
  <CarouselItem aria-label="1 of 5: Product overview">
    <img src="/product.jpg" alt="Wireless headphones in black color" />
  </CarouselItem>
</Carousel>

// Wspieraj reduced motion
<Carousel respectsReducedMotion={true}>
  {/* Content */}
</Carousel>
```

### 3. **Content Guidelines**
```typescript
// Optymalne rozmiary obrazów
const imageConfig = {
  desktop: { width: 1200, height: 600, quality: 80 },
  tablet: { width: 768, height: 384, quality: 75 },
  mobile: { width: 375, height: 188, quality: 70 }
}

// Responsive images
<CarouselItem>
  <picture>
    <source media="(min-width: 1024px)" srcSet="/large.jpg" />
    <source media="(min-width: 768px)" srcSet="/medium.jpg" />
    <img src="/small.jpg" alt="Description" />
  </picture>
</CarouselItem>
```

### 4. **Error Handling**
```typescript
function RobustCarousel({ images }) {
  const [loadErrors, setLoadErrors] = useState(new Set())
  
  const handleImageError = (imageId) => {
    setLoadErrors(prev => new Set([...prev, imageId]))
  }
  
  return (
    <Carousel>
      {images.map(image => (
        <CarouselItem key={image.id}>
          {loadErrors.has(image.id) ? (
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <span>Image not available</span>
            </div>
          ) : (
            <img 
              src={image.src} 
              alt={image.alt}
              onError={() => handleImageError(image.id)}
            />
          )}
        </CarouselItem>
      ))}
    </Carousel>
  )
}
```

Carousel component oferuje kompletne rozwiązanie do prezentowania treści w rotacyjnym formacie, z bogactwemdostawienymi opcjami konfiguracji, efektów wizualnych i funkcji accessibility. Idealny do galerii zdjęć, prezentacji produktów i interaktywnych showcaseów.
