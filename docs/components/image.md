# 🖼️ Image Component - Dokumentacja Techniczna

Image to zaawansowany komponent do wyświetlania obrazów z obsługą lazy loading, zoom, error handling i progressive enhancement.

## 📋 Spis Treści

1. [Przegląd Komponentu](#przegląd-komponentu)
2. [Instalacja i Użycie](#instalacja-i-użycie)
3. [API Reference](#api-reference)
4. [Przykłady Implementacji](#przykłady-implementacji)
5. [Najlepsze Praktyki](#najlepsze-praktyki)
6. [Dostępność](#dostępność)
7. [Rozwiązywanie Problemów](#rozwiązywanie-problemów)

## Przegląd Komponentu

Image to nowoczesny komponent obrazów oferujący zaawansowane funkcjonalności wykraczające poza standardowy tag `<img>`.

### ✨ Kluczowe Funkcje

- **Lazy Loading** - Intersection Observer API dla optymalnej wydajności
- **Interactive Zoom** - Hover/click zoom z płynną animacją
- **Error Handling** - Graceful fallbacks i custom error states
- **Loading States** - Płynne przejścia i placeholder handling
- **Responsive Images** - Wsparcie dla srcSet i sizes
- **Progressive Enhancement** - Działanie bez JavaScript
- **Dark Mode** - Automatyczne dostosowanie stylingów
- **Accessibility** - Pełne wsparcie screen readers
- **Touch Support** - Gesture handling na urządzeniach mobilnych

## Instalacja i Użycie

```typescript
import { Image } from 'nebula/components/Image'

// Podstawowe użycie
<Image 
  src="https://example.com/image.jpg"
  alt="Description of image"
  width={400}
  height={300}
/>

// Z lazy loading
<Image 
  src="https://example.com/large-image.jpg"
  alt="Large image"
  loading="lazy"
  placeholder="https://example.com/placeholder.jpg"
/>

// Z zoom functionality
<Image 
  src="https://example.com/photo.jpg"
  alt="Zoomable photo"
  zoom
  zoomScale={2}
/>

// Responsive image
<Image 
  src="https://example.com/image.jpg"
  srcSet="https://example.com/small.jpg 480w, https://example.com/large.jpg 800w"
  sizes="(max-width: 480px) 480px, 800px"
  alt="Responsive image"
/>
```

## API Reference

### Image Props

```typescript
interface ImageProps {
  // Source
  src: string                    // URL głównego obrazu (required)
  srcSet?: string               // Responsive sources
  sizes?: string                // Size hints dla responsive
  placeholder?: string          // URL placeholder image
  
  // Content
  alt: string                   // Alt text (required)
  title?: string               // Title attribute
  
  // Dimensions
  width?: number | string       // Szerokość obrazu
  height?: number | string      // Wysokość obrazu
  aspectRatio?: string         // CSS aspect-ratio
  
  // Loading Behavior
  loading?: 'lazy' | 'eager'   // Loading strategy (default: 'lazy')
  decoding?: 'sync' | 'async' | 'auto'  // Decoding hint
  fetchPriority?: 'high' | 'low' | 'auto'  // Fetch priority
  
  // Zoom Features
  zoom?: boolean               // Enable zoom functionality
  zoomScale?: number          // Zoom level (default: 2)
  zoomType?: 'hover' | 'click' | 'both'  // Zoom trigger
  
  // Error Handling
  fallback?: ComponentChild    // Custom fallback content
  onError?: (error: Event) => void      // Error callback
  onLoad?: (event: Event) => void       // Load callback
  onLoadStart?: (event: Event) => void  // Load start callback
  
  // Standard
  className?: string
  style?: CSSProperties
  'data-testid'?: string
}
```

### Image States

Komponent automatycznie zarządza stanami:

```typescript
type ImageState = {
  loading: boolean    // Czy obraz się ładuje
  loaded: boolean     // Czy obraz został załadowany
  error: boolean      // Czy wystąpił błąd
  visible: boolean    // Czy obraz jest w viewport (lazy loading)
}
```

## Przykłady Implementacji

### 1. Gallery Component

```typescript
function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={image.id} className="aspect-square">
          <Image
            src={image.thumbnail}
            alt={image.caption}
            className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
            loading={index < 8 ? 'eager' : 'lazy'}  // Prioritize first 8 images
            zoom
            zoomScale={2.5}
            onClick={() => setSelectedImage(image)}
          />
        </div>
      ))}
      
      {selectedImage && (
        <ImageModal 
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}
```

### 2. Product Showcase

```typescript
function ProductShowcase({ product }) {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="space-y-4">
      {/* Main Product Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={mainImage.url}
          alt={`${product.name} - Main view`}
          className="w-full h-full object-cover"
          zoom
          zoomScale={3}
          zoomType="hover"
          placeholder={mainImage.placeholder}
          onError={() => setImageError(true)}
          fetchPriority="high"  // High priority for main image
        />
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 overflow-x-auto">
        {product.images.map((image, index) => (
          <button
            key={image.id}
            className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
              mainImage.id === image.id 
                ? 'border-blue-500' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image.thumbnail}
              alt={`${product.name} - View ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      
      {imageError && (
        <div className="text-amber-600 text-sm flex items-center space-x-2">
          <span>⚠️</span>
          <span>Some images may not be available</span>
        </div>
      )}
    </div>
  )
}
```

### 3. Article Hero Images

```typescript
function ArticleHero({ article }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <div className="relative h-96 overflow-hidden rounded-lg">
      <Image
        src={article.heroImage.url}
        srcSet={`
          ${article.heroImage.small} 480w,
          ${article.heroImage.medium} 768w,
          ${article.heroImage.large} 1200w,
          ${article.heroImage.xlarge} 1920w
        `}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        alt={article.heroImage.caption}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        fetchPriority="high"
      />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
        <div className="p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
          <p className="text-lg opacity-90">{article.excerpt}</p>
        </div>
      </div>
      
      {/* Loading State */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading image...</div>
        </div>
      )}
    </div>
  )
}
```

### 4. User Avatar with Fallback

```typescript
function UserAvatar({ user, size = 'md' }) {
  const [avatarError, setAvatarError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }
  
  if (avatarError || !user.avatar) {
    // Fallback to initials
    return (
      <div className={`${sizeClasses[size]} bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold`}>
        {user.initials || user.name?.charAt(0) || '?'}
      </div>
    )
  }
  
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
      <Image
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        className="w-full h-full object-cover"
        onError={() => setAvatarError(true)}
        loading="lazy"
        fallback={
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
            {user.initials}
          </div>
        }
      />
    </div>
  )
}
```

### 5. Before/After Comparison

```typescript
function BeforeAfterComparison({ beforeImage, afterImage, title }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      
      <div 
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-lg cursor-col-resize"
        onMouseMove={handleMouseMove}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <Image
            src={beforeImage.url}
            alt={beforeImage.alt}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm">
            Before
          </div>
        </div>
        
        {/* After Image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={afterImage.url}
            alt={afterImage.alt}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm">
            After
          </div>
        </div>
        
        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-600">
              <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 6. Masonry Grid Gallery

```typescript
function MasonryGallery({ images }) {
  const [loadedImages, setLoadedImages] = useState(new Set())
  
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]))
  }
  
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image) => (
        <div 
          key={image.id}
          className={`break-inside-avoid transition-opacity duration-500 ${
            loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.url}
            alt={image.caption}
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
            loading="lazy"
            zoom
            zoomType="click"
            onLoad={() => handleImageLoad(image.id)}
            style={{ aspectRatio: `${image.width}/${image.height}` }}
          />
          
          {image.caption && (
            <p className="mt-2 text-sm text-gray-600 px-1">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
```

## Najlepsze Praktyki

### 🎯 Performance Optimization

```typescript
// ✅ Dobre - Prioritize above-the-fold images
<Image 
  src={heroImage}
  alt="Hero image"
  fetchPriority="high"
  loading="eager"  // For critical images
/>

// ✅ Dobre - Lazy load below-the-fold content
<Image 
  src={galleryImage}
  alt="Gallery image"
  loading="lazy"
  placeholder={lowQualityImage}  // LQIP technique
/>

// ✅ Dobre - Preload critical images
useEffect(() => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = criticalImage
  document.head.appendChild(link)
}, [])

// ✅ Dobre - Use appropriate formats
const getOptimalImageUrl = (baseUrl, format = 'webp') => {
  const isWebPSupported = 'WebP' in window
  return isWebPSupported ? `${baseUrl}.webp` : `${baseUrl}.jpg`
}
```

### 🖼️ Responsive Images

```typescript
// ✅ Dobre - Proper srcSet usage
<Image
  src="image-800w.jpg"  // Fallback
  srcSet="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w,
    image-1600w.jpg 1600w
  "
  sizes="
    (max-width: 480px) 400px,
    (max-width: 768px) 800px,
    (max-width: 1024px) 1200px,
    1600px
  "
  alt="Responsive image"
/>

// ✅ Dobre - Container queries approach
<div className="image-container">
  <Image
    src={image.src}
    srcSet={image.srcSet}
    sizes="100cqw"  // Container query width
    alt={image.alt}
    className="w-full h-auto"
  />
</div>
```

### 🔍 Zoom Implementation

```typescript
// ✅ Dobre - Contextual zoom
const ProductImage = ({ product, context }) => {
  const zoomConfig = {
    thumbnail: { zoom: false },
    gallery: { zoom: true, zoomType: 'hover', zoomScale: 2 },
    detail: { zoom: true, zoomType: 'both', zoomScale: 3 }
  }
  
  return (
    <Image
      src={product.image}
      alt={product.name}
      {...zoomConfig[context]}
    />
  )
}

// ✅ Dobre - Custom zoom controls
<div className="relative group">
  <Image 
    src={image.url}
    alt={image.alt}
    zoom
    zoomType="click"
  />
  <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white p-2 rounded">
    <SearchIcon />
  </button>
</div>
```

### 🚫 Error Handling

```typescript
// ✅ Dobre - Comprehensive error handling
const [imageState, setImageState] = useState({
  error: false,
  retryCount: 0,
  maxRetries: 3
})

const handleImageError = useCallback(() => {
  setImageState(prev => ({
    ...prev,
    error: true,
    retryCount: prev.retryCount + 1
  }))
  
  // Auto-retry logic
  if (imageState.retryCount < imageState.maxRetries) {
    setTimeout(() => {
      setImageState(prev => ({ ...prev, error: false }))
    }, 1000 * Math.pow(2, imageState.retryCount))  // Exponential backoff
  }
}, [imageState.retryCount, imageState.maxRetries])

// ✅ Dobre - Graceful degradation
const ImageWithFallback = ({ src, fallbackSrc, alt }) => {
  return (
    <Image 
      src={imageState.error && fallbackSrc ? fallbackSrc : src}
      alt={alt}
      onError={handleImageError}
      fallback={
        <div className="bg-gray-200 flex items-center justify-center h-full">
          <span className="text-gray-400">Image unavailable</span>
        </div>
      }
    />
  )
}
```

## Dostępność

### 🎯 Screen Reader Support

```typescript
// ✅ Dobra dostępność - Opisowy alt text
<Image 
  src={chartImage}
  alt="Sales growth chart showing 25% increase from January to March 2024"
  // ❌ Unikaj: alt="chart" lub alt="image"
/>

// ✅ Decorative images
<Image 
  src={decorativePattern}
  alt=""  // Empty alt for decorative images
  role="presentation"
/>

// ✅ Complex images z long description
<figure>
  <Image 
    src={complexChart}
    alt="Quarterly sales data visualization"
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    Detailed quarterly sales data showing...
  </figcaption>
</figure>
```

### ⌨️ Keyboard Navigation

```typescript
// ✅ Zoomable images z keyboard support
<Image 
  src={image.url}
  alt={image.alt}
  zoom
  tabIndex={0}  // Focusable
  role="button"
  aria-label="Click to zoom image"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleZoom()
    }
  }}
/>

// ✅ Gallery navigation
const GalleryImage = ({ image, index, total }) => (
  <Image 
    src={image.url}
    alt={`${image.caption} (${index + 1} of ${total})`}
    tabIndex={0}
    aria-label={`View image ${index + 1} of ${total}: ${image.caption}`}
  />
)
```

### 🎨 Color and Contrast

```typescript
// ✅ Loading states z proper contrast
<Image 
  src={image.url}
  alt={image.alt}
  placeholder={
    <div className="bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
      <span className="text-gray-500 dark:text-gray-400">
        Loading...
      </span>
    </div>
  }
/>

// ✅ Error states z sufficient contrast
<Image 
  src={image.url}
  alt={image.alt}
  fallback={
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4 text-center">
      <span className="text-red-700 dark:text-red-400">
        ⚠️ Failed to load image
      </span>
    </div>
  }
/>
```

## Rozwiązywanie Problemów

### 🐛 Typowe Problemy

**Problem**: Lazy loading nie działa / obrazy ładują się natychmiast

```typescript
// ✅ Rozwiązanie - Sprawdź Intersection Observer support
const isIntersectionObserverSupported = typeof IntersectionObserver !== 'undefined'

<Image 
  src={image.url}
  alt={image.alt}
  loading={isIntersectionObserverSupported ? 'lazy' : 'eager'}
/>

// ✅ Rozwiązanie - Custom threshold
<Image 
  src={image.url}
  alt={image.alt}
  loading="lazy"
  intersectionOptions={{
    threshold: 0.1,      // Trigger when 10% visible
    rootMargin: '50px'   // Pre-load 50px before entering viewport
  }}
/>
```

**Problem**: Zoom nie działa na urządzeniach dotykowych

```typescript
// ✅ Rozwiązanie - Touch handling
const [touchStart, setTouchStart] = useState(null)
const [touchEnd, setTouchEnd] = useState(null)

<Image 
  src={image.url}
  alt={image.alt}
  zoom
  onTouchStart={(e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    })
  }}
  onTouchEnd={(e) => {
    if (!touchStart) return
    
    const touchDuration = Date.now() - touchStart.time
    const touchDistance = Math.sqrt(
      Math.pow(e.changedTouches[0].clientX - touchStart.x, 2) +
      Math.pow(e.changedTouches[0].clientY - touchStart.y, 2)
    )
    
    // Double tap to zoom
    if (touchDuration < 300 && touchDistance < 10) {
      handleZoom()
    }
  }}
/>
```

**Problem**: Obrazy nie skalują się responsywnie

```typescript
// ✅ Rozwiązanie - Container-based approach
<div className="image-container max-w-full">
  <Image 
    src={image.url}
    alt={image.alt}
    className="w-full h-auto"  // Responsive by default
    style={{ maxWidth: '100%', height: 'auto' }}
  />
</div>

// ✅ Rozwiązanie - Aspect ratio preservation
<div className="aspect-video">  {/* or aspect-square, aspect-[4/3], etc. */}
  <Image 
    src={image.url}
    alt={image.alt}
    className="w-full h-full object-cover"
  />
</div>
```

**Problem**: Memory leaks z wieloma obrazami

```typescript
// ✅ Rozwiązanie - Cleanup i resource management
useEffect(() => {
  const imageUrls = images.map(img => img.url)
  const preloadedImages = []
  
  // Preload strategy
  imageUrls.forEach(url => {
    const img = new window.Image()
    img.src = url
    preloadedImages.push(img)
  })
  
  // Cleanup
  return () => {
    preloadedImages.forEach(img => {
      img.src = ''  // Release memory
    })
  }
}, [images])

// ✅ Rozwiązanie - Virtual scrolling dla dużych galerii
const VirtualImageGrid = ({ images }) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 })
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {images
        .slice(visibleRange.start, visibleRange.end)
        .map(image => (
          <Image key={image.id} {...image} loading="lazy" />
        ))}
    </div>
  )
}
```

### 🔧 Performance Debugging

```typescript
// ✅ Performance monitoring
const ImageWithMetrics = ({ src, alt, ...props }) => {
  const [metrics, setMetrics] = useState({
    loadStart: null,
    loadEnd: null,
    error: false
  })
  
  return (
    <Image 
      src={src}
      alt={alt}
      onLoadStart={() => {
        setMetrics(prev => ({ ...prev, loadStart: performance.now() }))
      }}
      onLoad={() => {
        const loadEnd = performance.now()
        setMetrics(prev => ({
          ...prev,
          loadEnd,
          loadTime: loadEnd - prev.loadStart
        }))
        
        // Log slow images
        if (loadEnd - metrics.loadStart > 3000) {
          console.warn(`Slow image load: ${src} took ${loadEnd - metrics.loadStart}ms`)
        }
      }}
      onError={() => {
        setMetrics(prev => ({ ...prev, error: true }))
        console.error(`Failed to load image: ${src}`)
      }}
      {...props}
    />
  )
}

// ✅ Bundle size optimization
// Lazy load the Image component for non-critical uses
const LazyImage = lazy(() => import('nebula/components/Image'))

const GallerySection = ({ images }) => (
  <Suspense fallback={<div>Loading gallery...</div>}>
    {images.map(image => (
      <LazyImage key={image.id} {...image} />
    ))}
  </Suspense>
)
```

---

## 💡 Podsumowanie

Image komponent oferuje:
- **Performance** - Lazy loading, responsive images, optimization hints
- **User Experience** - Smooth zoom, loading states, error handling  
- **Accessibility** - Screen reader support, keyboard navigation
- **Flexibility** - Extensive customization options
- **Reliability** - Graceful fallbacks i error recovery

Ten komponent został zaprojektowany aby obsłużyć wszystkie aspekty wyświetlania obrazów w nowoczesnych aplikacjach web, od prostych zdjęć po zaawansowane galerie z zoom i responsive behavior.
