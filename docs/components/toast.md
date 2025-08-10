# 🍞 Toast Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Toast** to system powiadomień który wyświetla krótkotrwałe informacje zwrotne dla użytkowników. Jest to jeden z najważniejszych elementów UI do komunikowania statusu operacji, błędów, ostrzeżeń i komunikatów sukcesu bez przerywania głównego flow użytkownika.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Multiple Types** - różne typy powiadomień (success, error, warning, info)
- **Auto-dismiss** - automatyczne ukrywanie po określonym czasie
- **Manual Control** - możliwość ręcznego zamykania
- **Action Buttons** - opcjonalne przyciski akcji (undo, retry)
- **Positioning System** - flexible pozycjonowanie na ekranie
- **Queue Management** - zarządzanie kolejkami powiadomień
- **Animation Support** - smooth animacje wejścia/wyjścia
- **Accessibility Compliant** - zgodność z ARIA guidelines
- **Dark Mode Support** - automatyczne dopasowanie do motywu

### 🎨 Typy Powiadomień
- **Success** - potwierdzenia udanych operacji
- **Error** - komunikaty o błędach i problemach  
- **Warning** - ostrzeżenia i informacje o potencjalnych problemach
- **Info** - neutralne informacje i komunikaty

## 🚀 Podstawowe Użycie

### Basic Toast
```tsx
import { toast } from '@nebula/components'

function BasicToast() {
  const showToast = () => {
    toast('Hello World!')
  }
  
  return (
    <button onClick={showToast}>
      Show Toast
    </button>
  )
}
```

### Different Types
```tsx
function ToastTypes() {
  const showSuccess = () => {
    toast.success('Operation completed successfully!')
  }
  
  const showError = () => {
    toast.error('Something went wrong. Please try again.')
  }
  
  const showWarning = () => {
    toast.warning('This action cannot be undone.')
  }
  
  const showInfo = () => {
    toast.info('New update available.')
  }
  
  return (
    <div className="space-x-2">
      <button onClick={showSuccess} className="px-3 py-1 bg-green-500 text-white rounded">
        Success
      </button>
      <button onClick={showError} className="px-3 py-1 bg-red-500 text-white rounded">
        Error
      </button>
      <button onClick={showWarning} className="px-3 py-1 bg-yellow-500 text-white rounded">
        Warning
      </button>
      <button onClick={showInfo} className="px-3 py-1 bg-blue-500 text-white rounded">
        Info
      </button>
    </div>
  )
}
```

### With Custom Duration
```tsx
function CustomDuration() {
  const showShortToast = () => {
    toast('Quick message!', { duration: 1000 })
  }
  
  const showLongToast = () => {
    toast('This will stay longer...', { duration: 10000 })
  }
  
  const showPersistentToast = () => {
    toast('Click to close', { duration: Infinity })
  }
  
  return (
    <div className="space-x-2">
      <button onClick={showShortToast}>Short (1s)</button>
      <button onClick={showLongToast}>Long (10s)</button>
      <button onClick={showPersistentToast}>Persistent</button>
    </div>
  )
}
```

### With Actions
```tsx
function ToastWithActions() {
  const showUndoToast = () => {
    toast('Item deleted', {
      type: 'success',
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Undo clicked')
          toast.success('Item restored!')
        }
      }
    })
  }
  
  const showRetryToast = () => {
    toast('Upload failed', {
      type: 'error',
      action: {
        label: 'Retry',
        onClick: () => {
          console.log('Retry clicked')
          toast.info('Retrying upload...')
        }
      }
    })
  }
  
  return (
    <div className="space-x-2">
      <button onClick={showUndoToast}>Delete with Undo</button>
      <button onClick={showRetryToast}>Retry Action</button>
    </div>
  )
}
```

## 🎛️ Warianty i Konfiguracja

### Positioning
```tsx
function ToastPositioning() {
  const positions = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ] as const
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {positions.map(position => (
        <button
          key={position}
          onClick={() => toast(`Toast at ${position}`, { position })}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
        >
          {position}
        </button>
      ))}
    </div>
  )
}
```

### Rich Content
```tsx
function RichToast() {
  const showRichToast = () => {
    toast((
      <div className="flex items-start space-x-3">
        <img 
          src="/avatar.jpg" 
          alt="User" 
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h4 className="font-medium">New message from John</h4>
          <p className="text-sm text-gray-600">Hey, are we still meeting today?</p>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-right'
    })
  }
  
  const showProgressToast = () => {
    const toastId = toast((
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Uploading...</span>
          <span className="text-sm">45%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
        </div>
      </div>
    ), {
      duration: Infinity,
      type: 'info'
    })
    
    // Simulate progress update
    setTimeout(() => {
      toast.update(toastId, (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Upload complete!</span>
            <span className="text-sm">100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      ), { type: 'success', duration: 3000 })
    }, 2000)
  }
  
  return (
    <div className="space-x-2">
      <button onClick={showRichToast}>Rich Content</button>
      <button onClick={showProgressToast}>Progress Toast</button>
    </div>
  )
}
```

### Loading States
```tsx
function LoadingToast() {
  const showLoadingToast = async () => {
    const loadingId = toast.loading('Processing...')
    
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      toast.success('Operation completed!', { id: loadingId })
    } catch (error) {
      toast.error('Operation failed!', { id: loadingId })
    }
  }
  
  return (
    <button onClick={showLoadingToast}>
      Show Loading Toast
    </button>
  )
}
```

## 🎨 Praktyczne Przykłady

### Form Validation Toasts
```tsx
function FormWithToasts() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    
    // Validation
    if (!formData.email) {
      toast.error('Email is required')
      return
    }
    
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    
    setIsSubmitting(true)
    const loadingToast = toast.loading('Signing in...')
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve(true) : reject(new Error('Invalid credentials'))
        }, 2000)
      })
      
      toast.success('Welcome back!', { id: loadingToast })
    } catch (error) {
      toast.error('Invalid email or password. Please try again.', { id: loadingToast })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Sign In</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: (e.target as HTMLInputElement).value }))}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: (e.target as HTMLInputElement).value }))}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
```

### Shopping Cart Toasts
```tsx
function ShoppingCartToasts() {
  const [cartItems, setCartItems] = useState<number>(0)
  
  const addToCart = (product: string) => {
    setCartItems(prev => prev + 1)
    
    toast.success(`${product} added to cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => {
          toast.info(`Cart has ${cartItems + 1} items`)
        }
      },
      position: 'bottom-right'
    })
  }
  
  const removeFromCart = (product: string) => {
    if (cartItems > 0) {
      const newCount = cartItems - 1
      setCartItems(newCount)
      
      const undoToast = toast(`${product} removed from cart`, {
        type: 'info',
        action: {
          label: 'Undo',
          onClick: () => {
            setCartItems(newCount + 1)
            toast.dismiss(undoToast)
            toast.success(`${product} restored to cart`)
          }
        },
        position: 'bottom-right',
        duration: 5000
      })
    }
  }
  
  const clearCart = () => {
    if (cartItems > 0) {
      const previousCount = cartItems
      setCartItems(0)
      
      toast.warning('Cart cleared', {
        action: {
          label: 'Undo',
          onClick: () => {
            setCartItems(previousCount)
            toast.success('Cart restored')
          }
        },
        position: 'bottom-right',
        duration: 8000
      })
    }
  }
  
  return (
    <div className="text-center space-y-4">
      <div className="text-lg font-semibold">
        Cart Items: {cartItems}
      </div>
      
      <div className="space-x-2">
        <button 
          onClick={() => addToCart('iPhone')}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Add iPhone
        </button>
        <button 
          onClick={() => addToCart('MacBook')}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Add MacBook
        </button>
      </div>
      
      <div className="space-x-2">
        <button 
          onClick={() => removeFromCart('Product')}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Remove Item
        </button>
        <button 
          onClick={clearCart}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}
```

### File Upload with Progress Toasts
```tsx
function FileUploadToasts() {
  const [uploading, setUploading] = useState(false)
  
  const handleFileUpload = async (files: FileList) => {
    if (uploading) return
    
    setUploading(true)
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      await uploadFile(file)
    }
    
    setUploading(false)
    toast.success(`${files.length} files uploaded successfully!`, {
      position: 'top-right'
    })
  }
  
  const uploadFile = async (file: File): Promise<void> => {
    const toastId = toast.loading(`Uploading ${file.name}...`, {
      position: 'top-right'
    })
    
    try {
      // Simulate upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        
        toast.update(toastId, (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium truncate max-w-[200px]">{file.name}</span>
              <span className="text-sm ml-2">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-100" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ), { type: 'info' })
      }
      
      toast.success(`${file.name} uploaded!`, { 
        id: toastId,
        duration: 2000 
      })
    } catch (error) {
      toast.error(`Failed to upload ${file.name}`, { 
        id: toastId,
        action: {
          label: 'Retry',
          onClick: () => uploadFile(file)
        }
      })
    }
  }
  
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }
  
  const handleFileInput = (e: Event) => {
    const files = (e.target as HTMLInputElement).files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }
  
  return (
    <div className="max-w-md mx-auto">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          <div className="text-gray-500">
            Drop files here or click to select
          </div>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <label 
            htmlFor="file-input"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            Choose Files
          </label>
        </div>
      </div>
      
      {uploading && (
        <div className="mt-4 text-center text-gray-500">
          Upload in progress...
        </div>
      )}
    </div>
  )
}
```

### Chat Application Toasts
```tsx
interface Message {
  id: string
  user: string
  content: string
  timestamp: Date
}

function ChatToasts() {
  const [isOnline, setIsOnline] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  
  useEffect(() => {
    // Simulate connection status changes
    const interval = setInterval(() => {
      const online = Math.random() > 0.3
      
      if (online !== isOnline) {
        setIsOnline(online)
        
        if (online) {
          toast.success('Connected to chat', {
            position: 'bottom-left',
            duration: 2000
          })
        } else {
          toast.error('Connection lost. Trying to reconnect...', {
            position: 'bottom-left',
            duration: 5000,
            action: {
              label: 'Retry',
              onClick: () => {
                toast.info('Reconnecting...', { position: 'bottom-left' })
                setTimeout(() => setIsOnline(true), 1000)
              }
            }
          })
        }
      }
    }, 10000)
    
    return () => clearInterval(interval)
  }, [isOnline])
  
  useEffect(() => {
    // Simulate incoming messages
    const messageInterval = setInterval(() => {
      if (isOnline && Math.random() > 0.7) {
        const newMessage: Message = {
          id: Date.now().toString(),
          user: ['Alice', 'Bob', 'Charlie'][Math.floor(Math.random() * 3)],
          content: 'Hey there! How are you doing?',
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, newMessage])
        
        // Show notification toast
        toast((
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {newMessage.user.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{newMessage.user}</div>
              <div className="text-sm text-gray-600">{newMessage.content}</div>
            </div>
          </div>
        ), {
          duration: 4000,
          position: 'top-right',
          action: {
            label: 'Reply',
            onClick: () => {
              toast.info(`Replying to ${newMessage.user}...`)
            }
          }
        })
      }
    }, 5000)
    
    return () => clearInterval(messageInterval)
  }, [isOnline])
  
  const sendMessage = () => {
    if (!isOnline) {
      toast.error('Cannot send message while offline')
      return
    }
    
    const messageToast = toast.loading('Sending message...')
    
    setTimeout(() => {
      if (Math.random() > 0.8) {
        toast.error('Failed to send message', {
          id: messageToast,
          action: {
            label: 'Retry',
            onClick: sendMessage
          }
        })
      } else {
        toast.success('Message sent!', { id: messageToast })
      }
    }, 1500)
  }
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Chat</h3>
        <div className={`flex items-center space-x-2 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      
      <div className="h-40 overflow-y-auto bg-gray-50 rounded p-3 mb-4">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center">No messages yet</div>
        ) : (
          <div className="space-y-2">
            {messages.slice(-5).map(message => (
              <div key={message.id} className="text-sm">
                <span className="font-medium">{message.user}:</span> {message.content}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={sendMessage}
        disabled={!isOnline}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send Message
      </button>
    </div>
  )
}
```

### System Status Toasts
```tsx
function SystemStatusToasts() {
  const [systemStatus, setSystemStatus] = useState<'online' | 'maintenance' | 'offline'>('online')
  
  useEffect(() => {
    // Simulate system status changes
    const statusCheck = setInterval(() => {
      const statuses = ['online', 'maintenance', 'offline'] as const
      const newStatus = statuses[Math.floor(Math.random() * 3)]
      
      if (newStatus !== systemStatus) {
        setSystemStatus(newStatus)
        
        switch (newStatus) {
          case 'online':
            toast.success('System is back online!', {
              position: 'top-center',
              duration: 5000,
              action: {
                label: 'Refresh',
                onClick: () => window.location.reload()
              }
            })
            break
            
          case 'maintenance':
            toast.warning('System maintenance in progress. Some features may be unavailable.', {
              position: 'top-center',
              duration: 10000
            })
            break
            
          case 'offline':
            toast.error('System is currently offline. Please try again later.', {
              position: 'top-center',
              duration: Infinity,
              action: {
                label: 'Check Status',
                onClick: () => {
                  toast.info('Checking system status...', { position: 'top-center' })
                }
              }
            })
            break
        }
      }
    }, 15000)
    
    return () => clearInterval(statusCheck)
  }, [systemStatus])
  
  const getStatusColor = () => {
    switch (systemStatus) {
      case 'online': return 'text-green-600 bg-green-100'
      case 'maintenance': return 'text-yellow-600 bg-yellow-100'
      case 'offline': return 'text-red-600 bg-red-100'
    }
  }
  
  const triggerUpdate = () => {
    toast.info('Checking for updates...', { position: 'top-center' })
    
    setTimeout(() => {
      if (Math.random() > 0.5) {
        toast.success('Update available!', {
          position: 'top-center',
          duration: 8000,
          action: {
            label: 'Install',
            onClick: () => {
              const updateToast = toast.loading('Installing update...')
              setTimeout(() => {
                toast.success('Update installed successfully!', { 
                  id: updateToast,
                  action: {
                    label: 'Restart',
                    onClick: () => toast.info('Application will restart in 3 seconds...')
                  }
                })
              }, 3000)
            }
          }
        })
      } else {
        toast.info('You\'re using the latest version!', { position: 'top-center' })
      }
    }, 2000)
  }
  
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <span>System Status:</span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {systemStatus.toUpperCase()}
        </span>
      </div>
      
      <div className="space-x-2">
        <button 
          onClick={triggerUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Check Updates
        </button>
        
        <button 
          onClick={() => toast.info('System diagnostics completed successfully')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Run Diagnostics
        </button>
      </div>
    </div>
  )
}
```

## 🎛️ API Reference

### Toast Function

#### Basic Usage
```tsx
toast(message: string | ComponentChildren, options?: ToastOptions)
```

#### Type-specific Methods
```tsx
toast.success(message, options?)
toast.error(message, options?)
toast.warning(message, options?)
toast.info(message, options?)
toast.loading(message, options?)
```

#### Management Methods
```tsx
toast.dismiss(toastId?)       // Dismiss specific or all toasts
toast.update(toastId, message, options?)  // Update existing toast
toast.promise(promise, messages, options?) // Handle promise states
```

### ToastOptions

| Option             | Type                                                                                              | Default        | Opis                                            |
| ------------------ | ------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------- |
| `id`               | `string`                                                                                          | auto           | Unikalne ID toasta                              |
| `type`             | `'success' \| 'error' \| 'warning' \| 'info' \| 'loading'`                                        | `'info'`       | Typ toasta                                      |
| `duration`         | `number`                                                                                          | `4000`         | Czas wyświetlania (ms), `Infinity` = persistent |
| `position`         | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-center'` | Pozycja na ekranie                              |
| `dismissible`      | `boolean`                                                                                         | `true`         | Czy można zamknąć ręcznie                       |
| `pauseOnHover`     | `boolean`                                                                                         | `true`         | Zatrzymaj timer na hover                        |
| `pauseOnFocusLoss` | `boolean`                                                                                         | `true`         | Zatrzymaj timer gdy okno traci fokus            |
| `className`        | `string`                                                                                          | -              | Dodatkowe klasy CSS                             |
| `style`            | `object`                                                                                          | -              | Inline styles                                   |
| `action`           | `ActionConfig`                                                                                    | -              | Przycisk akcji                                  |

### ActionConfig

| Property  | Type         | Opis                                 |
| --------- | ------------ | ------------------------------------ |
| `label`   | `string`     | Tekst przycisku                      |
| `onClick` | `() => void` | Handler kliknięcia                   |
| `altText` | `string`     | Alternatywny tekst dla accessibility |

### CSS Classes

**Bazowe klasy:**
- `.toast` - główny kontener toasta
- `.toast-success` - styl sukcesu
- `.toast-error` - styl błędu
- `.toast-warning` - styl ostrzeżenia
- `.toast-info` - styl informacyjny
- `.toast-loading` - styl ładowania

**Pozycje:**
- `.toast-container-top-left` - lewy górny róg
- `.toast-container-top-center` - środek góry
- `.toast-container-top-right` - prawy górny róg
- `.toast-container-bottom-left` - lewy dolny róg
- `.toast-container-bottom-center` - środek dołu
- `.toast-container-bottom-right` - prawy dolny róg

**Elementy:**
- `.toast-message` - treść toasta
- `.toast-action` - przycisk akcji
- `.toast-close` - przycisk zamykania
- `.toast-icon` - ikona toasta

## ♿ Accessibility

### ARIA Support
```tsx
function AccessibleToast() {
  const showAccessibleToast = () => {
    toast('Important notification', {
      type: 'info',
      // Toast automatically gets role="alert" for errors/warnings
      // and role="status" for info/success
      duration: 8000,
      action: {
        label: 'View details',
        onClick: () => console.log('Details clicked'),
        altText: 'View notification details'
      }
    })
  }
  
  return <button onClick={showAccessibleToast}>Show Accessible Toast</button>
}
```

### Screen Reader Announcements
```tsx
function ScreenReaderToasts() {
  const announceImportant = () => {
    // High priority announcement
    toast.error('Your session will expire in 2 minutes', {
      duration: Infinity,
      action: {
        label: 'Extend Session',
        onClick: () => {
          toast.success('Session extended by 30 minutes')
        }
      }
    })
  }
  
  const announcePolite = () => {
    // Low priority announcement
    toast.info('Settings saved automatically', {
      duration: 3000
    })
  }
  
  return (
    <div className="space-x-2">
      <button onClick={announceImportant}>Important Alert</button>
      <button onClick={announcePolite}>Polite Status</button>
    </div>
  )
}
```

### Keyboard Navigation
```tsx
function KeyboardNavigableToasts() {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Dismiss all toasts on Escape
        toast.dismiss()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])
  
  const showFocusableToast = () => {
    toast((
      <div>
        <p>Would you like to save your changes?</p>
        <div className="flex space-x-2 mt-2">
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            onClick={() => {
              toast.success('Changes saved!')
              toast.dismiss()
            }}
          >
            Save
          </button>
          <button 
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      dismissible: false
    })
  }
  
  return (
    <div>
      <button onClick={showFocusableToast}>
        Show Focusable Toast
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Press Escape to dismiss all toasts
      </p>
    </div>
  )
}
```

## 🎨 Custom Styling

### Brand Colors
```tsx
function BrandToasts() {
  const brandStyles = {
    primary: 'bg-blue-600 text-white border-blue-600',
    secondary: 'bg-purple-600 text-white border-purple-600',
    accent: 'bg-orange-500 text-white border-orange-500'
  }
  
  return (
    <div className="space-x-2">
      <button 
        onClick={() => toast('Primary brand message', { 
          className: brandStyles.primary 
        })}
      >
        Primary Brand
      </button>
      
      <button 
        onClick={() => toast('Secondary brand message', { 
          className: brandStyles.secondary 
        })}
      >
        Secondary Brand
      </button>
      
      <button 
        onClick={() => toast('Accent message', { 
          className: brandStyles.accent 
        })}
      >
        Accent
      </button>
    </div>
  )
}
```

### Custom Animations
```tsx
function AnimatedToasts() {
  const showSlideToast = () => {
    toast('Sliding toast!', {
      className: 'toast-slide-in',
      position: 'top-right'
    })
  }
  
  const showBounceToast = () => {
    toast('Bouncy toast!', {
      className: 'toast-bounce-in',
      position: 'bottom-center'
    })
  }
  
  return (
    <div>
      <div className="space-x-2">
        <button onClick={showSlideToast}>Slide Toast</button>
        <button onClick={showBounceToast}>Bounce Toast</button>
      </div>
      
      <style jsx>{`
        .toast-slide-in {
          animation: slideInRight 0.3s ease-out;
        }
        
        .toast-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
```

### Dark Mode Support
```tsx
function DarkModeToasts() {
  const [isDark, setIsDark] = useState(false)
  
  const showThemedToast = () => {
    toast('Theme-aware toast!', {
      className: isDark ? 'dark:bg-gray-800 dark:text-white dark:border-gray-600' : ''
    })
  }
  
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="space-x-2">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          Toggle {isDark ? 'Light' : 'Dark'} Mode
        </button>
        
        <button onClick={showThemedToast}>
          Show Themed Toast
        </button>
      </div>
    </div>
  )
}
```

## 🛠️ Zaawansowane Techniki

### Toast Provider Setup
```tsx
import { ToastProvider, ToastContainer } from '@nebula/components'

function App() {
  return (
    <ToastProvider>
      <div className="app">
        {/* Your app content */}
        <MainContent />
        
        {/* Toast container - required for positioning */}
        <ToastContainer 
          position="top-right"
          limit={5}
          pauseOnFocusLoss
          pauseOnHover
          closeOnClick
        />
      </div>
    </ToastProvider>
  )
}
```

### Custom Toast Hook
```tsx
import { useCallback } from 'preact/hooks'

interface UseToastOptions {
  defaultPosition?: ToastPosition
  defaultDuration?: number
}

function useToast(options: UseToastOptions = {}) {
  const {
    defaultPosition = 'top-right',
    defaultDuration = 4000
  } = options
  
  const notify = useCallback((message: string, overrideOptions?: Partial<ToastOptions>) => {
    return toast(message, {
      position: defaultPosition,
      duration: defaultDuration,
      ...overrideOptions
    })
  }, [defaultPosition, defaultDuration])
  
  const success = useCallback((message: string, options?: Partial<ToastOptions>) => {
    return toast.success(message, { 
      position: defaultPosition,
      duration: defaultDuration,
      ...options 
    })
  }, [defaultPosition, defaultDuration])
  
  const error = useCallback((message: string, options?: Partial<ToastOptions>) => {
    return toast.error(message, { 
      position: defaultPosition,
      duration: defaultDuration,
      ...options 
    })
  }, [defaultPosition, defaultDuration])
  
  const warning = useCallback((message: string, options?: Partial<ToastOptions>) => {
    return toast.warning(message, { 
      position: defaultPosition,
      duration: defaultDuration,
      ...options 
    })
  }, [defaultPosition, defaultDuration])
  
  const info = useCallback((message: string, options?: Partial<ToastOptions>) => {
    return toast.info(message, { 
      position: defaultPosition,
      duration: defaultDuration,
      ...options 
    })
  }, [defaultPosition, defaultDuration])
  
  const loading = useCallback((message: string, options?: Partial<ToastOptions>) => {
    return toast.loading(message, { 
      position: defaultPosition,
      ...options 
    })
  }, [defaultPosition])
  
  const promise = useCallback(<T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    },
    options?: Partial<ToastOptions>
  ) => {
    return toast.promise(promise, messages, {
      position: defaultPosition,
      ...options
    })
  }, [defaultPosition])
  
  return {
    notify,
    success,
    error,
    warning,
    info,
    loading,
    promise,
    dismiss: toast.dismiss,
    update: toast.update
  }
}

// Usage example
function ToastHookExample() {
  const toast = useToast({ 
    defaultPosition: 'bottom-right',
    defaultDuration: 3000 
  })
  
  const handleSave = async () => {
    const savePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Data saved!') : reject('Save failed!')
      }, 2000)
    })
    
    toast.promise(savePromise, {
      loading: 'Saving data...',
      success: 'Data saved successfully!',
      error: 'Failed to save data'
    })
  }
  
  return (
    <div className="space-x-2">
      <button onClick={() => toast.success('Success!')}>Success</button>
      <button onClick={() => toast.error('Error!')}>Error</button>
      <button onClick={handleSave}>Save with Promise</button>
    </div>
  )
}
```

### Toast Queue Manager
```tsx
class ToastQueue {
  private queue: Array<{ id: string; toast: any; priority: number }> = []
  private maxVisible: number = 5
  private isProcessing: boolean = false
  
  constructor(maxVisible: number = 5) {
    this.maxVisible = maxVisible
  }
  
  add(toastFn: () => string, priority: number = 0) {
    const id = Date.now().toString()
    this.queue.push({ id, toast: toastFn, priority })
    
    // Sort by priority (higher first)
    this.queue.sort((a, b) => b.priority - a.priority)
    
    this.processQueue()
    return id
  }
  
  remove(id: string) {
    this.queue = this.queue.filter(item => item.id !== id)
  }
  
  private async processQueue() {
    if (this.isProcessing) return
    
    this.isProcessing = true
    
    while (this.queue.length > 0) {
      const visibleCount = this.getVisibleToastCount()
      
      if (visibleCount >= this.maxVisible) {
        // Wait and check again
        await new Promise(resolve => setTimeout(resolve, 1000))
        continue
      }
      
      const item = this.queue.shift()
      if (item) {
        item.toast()
      }
    }
    
    this.isProcessing = false
  }
  
  private getVisibleToastCount(): number {
    // This would need to be implemented based on your toast library
    return document.querySelectorAll('.toast').length
  }
}

function QueuedToasts() {
  const [queue] = useState(() => new ToastQueue(3))
  
  const addHighPriorityToast = () => {
    queue.add(() => toast.error('High priority error!'), 10)
  }
  
  const addNormalToast = () => {
    queue.add(() => toast.info('Normal priority info'), 5)
  }
  
  const addLowPriorityToast = () => {
    queue.add(() => toast.success('Low priority success'), 1)
  }
  
  const addManyToasts = () => {
    for (let i = 1; i <= 10; i++) {
      queue.add(() => toast.info(`Toast ${i}`), Math.floor(Math.random() * 10))
    }
  }
  
  return (
    <div className="space-x-2">
      <button onClick={addHighPriorityToast}>High Priority</button>
      <button onClick={addNormalToast}>Normal Priority</button>
      <button onClick={addLowPriorityToast}>Low Priority</button>
      <button onClick={addManyToasts}>Add 10 Toasts</button>
    </div>
  )
}
```

### Toast Analytics
```tsx
interface ToastAnalytics {
  id: string
  type: string
  message: string
  timestamp: Date
  duration: number
  dismissed: boolean
  actionClicked: boolean
}

class ToastTracker {
  private analytics: ToastAnalytics[] = []
  
  track(toastId: string, type: string, message: string, duration: number) {
    this.analytics.push({
      id: toastId,
      type,
      message,
      timestamp: new Date(),
      duration,
      dismissed: false,
      actionClicked: false
    })
  }
  
  markDismissed(toastId: string) {
    const toast = this.analytics.find(t => t.id === toastId)
    if (toast) {
      toast.dismissed = true
    }
  }
  
  markActionClicked(toastId: string) {
    const toast = this.analytics.find(t => t.id === toastId)
    if (toast) {
      toast.actionClicked = true
    }
  }
  
  getStats() {
    const total = this.analytics.length
    const byType = this.analytics.reduce((acc, toast) => {
      acc[toast.type] = (acc[toast.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const dismissedCount = this.analytics.filter(t => t.dismissed).length
    const actionClickedCount = this.analytics.filter(t => t.actionClicked).length
    
    return {
      total,
      byType,
      dismissedCount,
      actionClickedCount,
      dismissalRate: total > 0 ? dismissedCount / total : 0,
      actionClickRate: total > 0 ? actionClickedCount / total : 0
    }
  }
  
  exportData() {
    return {
      analytics: this.analytics,
      stats: this.getStats(),
      exportDate: new Date()
    }
  }
}

function AnalyticsToasts() {
  const [tracker] = useState(() => new ToastTracker())
  const [stats, setStats] = useState(tracker.getStats())
  
  const showTrackedToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const toastId = Date.now().toString()
    const message = `This is a ${type} toast`
    
    tracker.track(toastId, type, message, 4000)
    
    const dismissToast = toast[type](message, {
      id: toastId,
      action: {
        label: 'Action',
        onClick: () => {
          tracker.markActionClicked(toastId)
          updateStats()
        }
      },
      onClose: () => {
        tracker.markDismissed(toastId)
        updateStats()
      }
    })
  }
  
  const updateStats = () => {
    setStats(tracker.getStats())
  }
  
  const exportAnalytics = () => {
    const data = tracker.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `toast-analytics-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <button onClick={() => showTrackedToast('success')}>Success</button>
        <button onClick={() => showTrackedToast('error')}>Error</button>
        <button onClick={() => showTrackedToast('warning')}>Warning</button>
        <button onClick={() => showTrackedToast('info')}>Info</button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Toast Analytics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Total Toasts: {stats.total}</div>
          <div>Dismissal Rate: {(stats.dismissalRate * 100).toFixed(1)}%</div>
          <div>Action Click Rate: {(stats.actionClickRate * 100).toFixed(1)}%</div>
          <div>
            By Type: {Object.entries(stats.byType).map(([type, count]) => 
              `${type}: ${count}`
            ).join(', ')}
          </div>
        </div>
        <button 
          onClick={exportAnalytics}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Export Data
        </button>
      </div>
    </div>
  )
}
```

## 🧪 Testowanie

### Unit Tests
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { toast } from './Toast'

describe('Toast Component', () => {
  beforeEach(() => {
    toast.dismiss() // Clear any existing toasts
  })
  
  it('shows and dismisses a basic toast', async () => {
    toast('Test message')
    
    expect(screen.getByText('Test message')).toBeInTheDocument()
    
    fireEvent.click(screen.getByLabelText('Close'))
    
    await waitFor(() => {
      expect(screen.queryByText('Test message')).not.toBeInTheDocument()
    })
  })
  
  it('shows different toast types', () => {
    toast.success('Success message')
    toast.error('Error message')
    toast.warning('Warning message')
    toast.info('Info message')
    
    expect(screen.getByText('Success message')).toBeInTheDocument()
    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(screen.getByText('Warning message')).toBeInTheDocument()
    expect(screen.getByText('Info message')).toBeInTheDocument()
  })
  
  it('handles action buttons', () => {
    const actionHandler = jest.fn()
    
    toast('Message with action', {
      action: {
        label: 'Action',
        onClick: actionHandler
      }
    })
    
    fireEvent.click(screen.getByText('Action'))
    
    expect(actionHandler).toHaveBeenCalledTimes(1)
  })
  
  it('auto-dismisses after specified duration', async () => {
    toast('Short message', { duration: 1000 })
    
    expect(screen.getByText('Short message')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText('Short message')).not.toBeInTheDocument()
    }, { timeout: 1500 })
  })
  
  it('pauses on hover', async () => {
    toast('Hover message', { duration: 1000 })
    
    const toastElement = screen.getByText('Hover message').closest('.toast')
    
    fireEvent.mouseEnter(toastElement!)
    
    // Wait for duration and ensure it's still visible
    await new Promise(resolve => setTimeout(resolve, 1200))
    expect(screen.getByText('Hover message')).toBeInTheDocument()
    
    fireEvent.mouseLeave(toastElement!)
    
    // Now it should dismiss
    await waitFor(() => {
      expect(screen.queryByText('Hover message')).not.toBeInTheDocument()
    })
  })
})
```

### Integration Tests
```tsx
describe('Toast Integration', () => {
  it('integrates with form validation', async () => {
    const TestForm = () => {
      const handleSubmit = (e: Event) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get('email') as string
        
        if (!email.includes('@')) {
          toast.error('Please enter a valid email')
          return
        }
        
        toast.success('Form submitted successfully!')
      }
      
      return (
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </form>
      )
    }
    
    render(<TestForm />)
    
    // Invalid submission
    fireEvent.change(screen.getByPlaceholderText('Email'), { 
      target: { value: 'invalid-email' } 
    })
    fireEvent.click(screen.getByText('Submit'))
    
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    
    // Valid submission
    fireEvent.change(screen.getByPlaceholderText('Email'), { 
      target: { value: 'test@example.com' } 
    })
    fireEvent.click(screen.getByText('Submit'))
    
    expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument()
  })
})
```

### Accessibility Tests
```tsx
describe('Toast Accessibility', () => {
  it('has correct ARIA roles', () => {
    toast.error('Error message')
    
    const toastElement = screen.getByRole('alert')
    expect(toastElement).toHaveTextContent('Error message')
  })
  
  it('focuses on action buttons', () => {
    toast('Message with action', {
      action: {
        label: 'Action',
        onClick: jest.fn()
      }
    })
    
    const actionButton = screen.getByRole('button', { name: 'Action' })
    expect(actionButton).toBeInTheDocument()
    
    fireEvent.focus(actionButton)
    expect(actionButton).toHaveFocus()
  })
  
  it('can be dismissed with keyboard', () => {
    toast('Keyboard dismissible toast')
    
    const toastElement = screen.getByText('Keyboard dismissible toast').closest('.toast')
    
    fireEvent.keyDown(toastElement!, { key: 'Escape' })
    
    expect(screen.queryByText('Keyboard dismissible toast')).not.toBeInTheDocument()
  })
})
```

## 📝 Najlepsze Praktyki

### Do ✅
- Używaj appropriate toast types dla różnych sytuacji
- Implementuj reasonable timeouts (2-8 sekund dla většość przypadków)
- Dodawaj action buttons dla actionable notifications
- Używaj consistent positioning w aplikacji
- Implement proper error handling dla failed actions
- Provide clear, concise messaging
- Test accessibility z keyboard navigation i screen readers

### Nie rób ❌
- Nie pokazuj toast dla każdej małej akcji użytkownika
- Nie używaj toasts dla critical errors wymagających immediate attention
- Nie stackuj zbyt wielu toasts jednocześnie (limit 3-5)
- Nie używaj bardzo długich messages w toasts
- Nie pomijaj loading states dla długotrwałych operacji
- Nie używaj toasts jako primary navigation method
- Nie blokuj important UI elements z toast positioning

### Performance Guidelines
- Użyj efficient toast queuing dla high-frequency notifications
- Implementuj proper cleanup dla dismissed toasts
- Avoid memory leaks w toast event handlers
- Optimize animations dla smooth performance
- Debounce rapid toast triggers
- Use lazy loading dla toast containers when possible

## 🔄 Migracja i Aktualizacje

### Z v1.0 do v2.0
```tsx
// Stara składnia v1.0
import { notification } from 'antd'
notification.open({
  message: 'Success',
  description: 'Operation completed',
  type: 'success'
})

// Nowa składnia v2.0
import { toast } from '@nebula/components'
toast.success('Operation completed')
```

### Breaking Changes
- `notification.open()` zastąpiony przez `toast()`
- `description` prop włączony do głównej message
- `placement` zmieniony na `position`
- `onClose` callback przeniesiony do options object
- `icon` prop zastąpiony przez automatic type icons

## 📚 Powiązane Komponenty

- **[Alert](./ALERT_DOCUMENTATION.md)** - dla persistent notifications i banners
- **[Modal](./MODAL_DOCUMENTATION.md)** - dla critical confirmations
- **[Notification](./NOTIFICATION_DOCUMENTATION.md)** - dla rich notification panels
- **[Popover](./POPOVER_DOCUMENTATION.md)** - dla contextual information

## 🎯 Roadmap

### Planowane funkcje v2.1
- [ ] Rich media support (images, videos w toasts)
- [ ] Advanced positioning z collision detection
- [ ] Toast templates i presets
- [ ] Integration z push notifications
- [ ] Advanced queuing strategies
- [ ] Toast performance analytics

### Długoterminowe plany
- [ ] AI-powered toast optimization
- [ ] Cross-platform toast synchronization
- [ ] Advanced accessibility enhancements
- [ ] Real-time toast analytics dashboard
- [ ] Integration z external notification services
- [ ] Toast A/B testing framework
