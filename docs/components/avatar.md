# 👤 Avatar Component - Dokumentacja Techniczna

Avatar to kompletny system wyświetlania awatarów użytkowników z obsługą obrazów, inicjałów, grup i wskaźników statusu.

## 📋 Spis Treści

1. [Przegląd Komponentu](#przegląd-komponentu)
2. [Instalacja i Użycie](#instalacja-i-użycie)
3. [API Reference](#api-reference)
4. [Przykłady Implementacji](#przykłady-implementacji)
5. [Najlepsze Praktyki](#najlepsze-praktyki)
6. [Dostępność](#dostępność)
7. [Rozwiązywanie Problemów](#rozwiązywanie-problemów)

## Przegląd Komponentu

Avatar to uniwersalny komponent do wyświetlania reprezentacji użytkowników w interfejsie. Oferuje następujące funkcjonalności:

### ✨ Kluczowe Funkcje

- **Obrazy z fallback** - Automatyczne przełączanie na inicjały przy błędzie ładowania
- **Generowanie inicjałów** - Inteligentne tworzenie inicjałów z imion i nazwisk
- **Wielokrotne rozmiary** - 6 predefiniowanych rozmiarów (xs → 2xl)
- **Różne kształty** - Circle, square, rounded corners
- **System grup** - AvatarGroup z overflow handling (+N indicator)
- **Status badges** - AvatarBadge z pozycjonowaniem i statusami
- **Lazy loading** - Obsługa lazy loading dla obrazów
- **Accessibility** - Pełne wsparcie dla screen readers
- **Dark mode** - Automatyczne dostosowanie do ciemnego motywu

## Instalacja i Użycie

```typescript
import { Avatar, AvatarGroup, AvatarBadge } from 'nebula/components/Avatar'

// Podstawowe użycie z obrazem
<Avatar 
  src="https://example.com/user.jpg" 
  alt="John Doe" 
  name="John Doe"
  size="lg"
/>

// Awatar z inicjałami
<Avatar 
  name="Jane Smith" 
  size="md" 
  shape="rounded"
/>

// Grupa awatarów
<AvatarGroup max={3} spacing="normal">
  <Avatar name="User 1" />
  <Avatar name="User 2" />
  <Avatar name="User 3" />
  <Avatar name="User 4" />
</AvatarGroup>

// Awatar ze statusem
<div className="relative">
  <Avatar name="Online User" />
  <AvatarBadge 
    placement="bottom-end" 
    status="online"
  />
</div>
```

## API Reference

### Avatar Props

```typescript
interface AvatarProps {
  // Content
  src?: string                    // URL obrazu
  alt?: string                   // Alt text dla obrazu  
  name?: string                  // Imię dla generowania inicjałów
  initials?: string             // Manualne inicjały (override)
  children?: ComponentChildren   // Custom content (ikony, emoji)
  
  // Appearance
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'  // Default: 'md'
  shape?: 'circle' | 'square' | 'rounded'          // Default: 'circle'
  
  // Behavior  
  loading?: 'eager' | 'lazy'     // Default: 'lazy'
  onError?: (event) => void      // Callback przy błędzie ładowania
  
  // Standard
  className?: string
  'data-testid'?: string
}
```

### AvatarGroup Props

```typescript
interface AvatarGroupProps {
  max?: number                   // Maksymalna liczba awatarów
  size?: AvatarSize             // Rozmiar dla wszystkich awatarów
  shape?: AvatarShape           // Kształt dla wszystkich awatarów
  spacing?: 'tight' | 'normal' | 'loose'  // Odległość między awatarami
  children: ComponentChildren    // Avatar komponenty
  className?: string
  'data-testid'?: string
}
```

### AvatarBadge Props

```typescript
interface AvatarBadgeProps {
  placement?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  status?: 'online' | 'offline' | 'busy' | 'away'  // Predefiniowane statusy
  count?: number                 // Liczba dla notyfikacji
  children?: ComponentChildren   // Custom content
  className?: string
  'data-testid'?: string
}
```

## Przykłady Implementacji

### 1. Profile Cards

```typescript
function UserProfileCard({ user }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar 
            src={user.avatar}
            name={user.fullName}
            size="xl"
            shape="rounded"
          />
          <AvatarBadge 
            placement="bottom-end"
            status={user.onlineStatus}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{user.fullName}</h3>
          <p className="text-gray-500">{user.role}</p>
        </div>
      </div>
    </div>
  )
}
```

### 2. Team Member List

```typescript
function TeamMembersList({ members }) {
  return (
    <div className="space-y-4">
      {members.map(member => (
        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Avatar 
              src={member.avatar}
              name={member.name}
              size="lg"
            />
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-gray-500">{member.email}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {member.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 3. Notification Avatars

```typescript
function NotificationItem({ notification }) {
  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-gray-50">
      <div className="relative flex-shrink-0">
        <Avatar 
          src={notification.sender.avatar}
          name={notification.sender.name}
          size="md"
        />
        {notification.unreadCount > 0 && (
          <AvatarBadge 
            placement="top-end"
            count={notification.unreadCount}
            className="bg-red-500 text-white"
          />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {notification.sender.name}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {notification.timestamp}
        </p>
      </div>
    </div>
  )
}
```

### 4. Comment System

```typescript
function CommentThread({ comments }) {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="flex space-x-3">
          <Avatar 
            src={comment.author.avatar}
            name={comment.author.name}
            size="sm"
            className="mt-1"
          />
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-sm">{comment.author.name}</span>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 5. Activity Feed

```typescript
function ActivityFeedItem({ activity }) {
  const renderActivityIcon = () => {
    switch (activity.type) {
      case 'like':
        return <span className="text-red-500">❤️</span>
      case 'comment':
        return <span className="text-blue-500">💬</span>
      case 'share':
        return <span className="text-green-500">🔄</span>
      default:
        return <span>📝</span>
    }
  }

  return (
    <div className="flex items-center space-x-3 p-4 border-b">
      <div className="relative">
        <Avatar 
          src={activity.user.avatar}
          name={activity.user.name}
          size="md"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          {renderActivityIcon()}
        </div>
      </div>
      
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{activity.user.name}</span>
          <span className="text-gray-600 ml-1">{activity.description}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
      </div>
    </div>
  )
}
```

## Najlepsze Praktyki

### 🎯 Użycie Rozmiarów

```typescript
// ✅ Dobre - Konsekwentne rozmiary w interfejsie
const AVATAR_SIZES = {
  list: 'sm',      // Listy użytkowników
  card: 'md',      // Karty profilów  
  header: 'lg',    // Header/navbar
  profile: 'xl',   // Strony profilów
  hero: '2xl'      // Sekcje hero
} as const

// ✅ Dobre - Rozmiary względem kontekstu
<Avatar size={isMobile ? 'sm' : 'md'} />

// ❌ Unikaj - Niespójnych rozmiarów
<Avatar size="xl" /> // w małym komponencie
<Avatar size="xs" /> // jako główny element
```

### 🖼️ Obsługa Obrazów

```typescript
// ✅ Dobre - Zawsze podawaj name jako fallback
<Avatar 
  src={user.avatar}
  name={user.fullName}  // ← Ważne dla fallback
  alt={user.fullName}
/>

// ✅ Dobre - Obsługa błędów ładowania
const [imageError, setImageError] = useState(false)

<Avatar 
  src={!imageError ? user.avatar : undefined}
  name={user.fullName}
  onError={() => setImageError(true)}
/>

// ✅ Dobre - Lazy loading dla długich list
<Avatar 
  src={user.avatar}
  name={user.fullName}
  loading="lazy"  // Default
/>
```

### 👥 AvatarGroup Usage

```typescript
// ✅ Dobre - Limit dla wydajności
<AvatarGroup max={5} spacing="normal">
  {team.members.slice(0, 8).map(member => (
    <Avatar key={member.id} name={member.name} />
  ))}
</AvatarGroup>

// ✅ Dobre - Tooltip dla overflow
<AvatarGroup max={3}>
  {team.members.map(member => (
    <Tooltip key={member.id} content={member.name}>
      <Avatar name={member.name} />
    </Tooltip>
  ))}
</AvatarGroup>

// ❌ Unikaj - Zbyt dużo awatarów bez limitu
<AvatarGroup>  {/* Brak max - może być problem */}
  {allUsers.map(...)} {/* Tysiące użytkowników */}
</AvatarGroup>
```

### 🏷️ Status Badges

```typescript
// ✅ Dobre - Semantyczne statusy
const statusConfig = {
  online: { color: 'bg-green-500', label: 'Online' },
  offline: { color: 'bg-gray-400', label: 'Offline' },  
  busy: { color: 'bg-red-500', label: 'Busy' },
  away: { color: 'bg-yellow-500', label: 'Away' }
}

// ✅ Dobre - Accessibility labels
<div className="relative">
  <Avatar name="User" />
  <AvatarBadge 
    status="online"
    aria-label="User is online"
  />
</div>

// ✅ Dobre - Liczniki dla notyfikacji
<AvatarBadge 
  count={unreadCount}
  placement="top-end"
  className="bg-red-500 text-white"
/>
```

## Dostępność

### 🎯 ARIA i Screen Readers

```typescript
// ✅ Dobra dostępność
<Avatar 
  src={user.avatar}
  alt={`${user.name}'s profile picture`}  // Opisowy alt
  name={user.name}
  aria-label={`View ${user.name}'s profile`}
/>

// ✅ Status dostępny dla screen readers
<div className="relative">
  <Avatar name="John Doe" />
  <AvatarBadge 
    status="online"
    aria-label="John Doe is currently online"
  />
</div>

// ✅ Grupy z właściwymi labels
<AvatarGroup 
  max={3}
  aria-label="Team members"
  role="group"
>
  {members.map(member => (
    <Avatar 
      key={member.id}
      name={member.name}
      aria-label={member.name}
    />
  ))}
</AvatarGroup>
```

### ⌨️ Keyboard Navigation

```typescript
// ✅ Interaktywne awatary
<button 
  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
  onClick={() => openProfile(user.id)}
>
  <Avatar 
    src={user.avatar}
    name={user.name}
    tabIndex={-1}  // Button handles focus
  />
</button>

// ✅ Linki z awatarami
<Link 
  to={`/profile/${user.id}`}
  className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
>
  <Avatar 
    src={user.avatar} 
    name={user.name}
    tabIndex={-1}
  />
</Link>
```

## Rozwiązywanie Problemów

### 🐛 Typowe Problemy

**Problem**: Obrazy nie ładują się / pokazują się błędnie

```typescript
// ✅ Rozwiązanie - Debugging i fallback
const [imageError, setImageError] = useState(false)
const [isLoading, setIsLoading] = useState(true)

<Avatar 
  src={user.avatar}
  name={user.fullName}
  onError={(e) => {
    console.log('Avatar image failed to load:', e)
    setImageError(true)
  }}
  onLoad={() => setIsLoading(false)}
/>

// ✅ Rozwiązanie - URL validation
const isValidImageUrl = (url) => {
  try {
    new URL(url)
    return url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)
  } catch {
    return false
  }
}

<Avatar 
  src={isValidImageUrl(user.avatar) ? user.avatar : undefined}
  name={user.fullName}
/>
```

**Problem**: Inicjały nie generują się poprawnie

```typescript
// ✅ Rozwiązanie - Custom initials logic
const getDisplayInitials = (name, initials) => {
  if (initials) return initials
  
  if (!name) return ''
  
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  
  return words.slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

<Avatar 
  name="Jan Kowalski-Nowak"
  initials={getDisplayInitials("Jan Kowalski-Nowak")} // "JK"
/>
```

**Problem**: AvatarGroup nie wyświetla overflow poprawnie

```typescript
// ✅ Rozwiązanie - Sprawdź Children
const validAvatars = children.filter(child => 
  child && child.type === Avatar
)

<AvatarGroup max={3}>
  {users.map(user => (
    <Avatar 
      key={user.id}  // ← Ważne: unikalne keys
      name={user.name}
    />
  ))}
</AvatarGroup>
```

### 🔧 Performance Tips

```typescript
// ✅ Lazy loading dla długich list
const VirtualizedUserList = ({ users }) => {
  return (
    <VirtualList 
      items={users}
      renderItem={({ item: user }) => (
        <Avatar 
          src={user.avatar}
          name={user.name}
          loading="lazy"
          size="sm"
        />
      )}
    />
  )
}

// ✅ Memoization dla często re-renderowanych awatarów
const MemoizedAvatar = memo(Avatar)

// ✅ Preload critical avatars
useEffect(() => {
  currentUser.avatar && preloadImage(currentUser.avatar)
}, [currentUser])

const preloadImage = (src) => {
  const img = new Image()
  img.src = src
}
```

---

## 💡 Podsumowanie

Avatar to potężny system komponentów oferujący:
- **Flexibility** - Obrazy, inicjały, custom content
- **Scalability** - Grupy z overflow handling  
- **Accessibility** - Pełne wsparcie ARIA
- **Performance** - Lazy loading i error handling
- **Design** - Spójny system wizualny

Komponent został zaprojektowany z myślą o realnych zastosowaniach i oferuje wszystkie funkcje potrzebne do budowania profesjonalnych interfejsów użytkownika.
