# Affix - Dokumentacja

## Przegląd

Komponent `Affix` umożliwia "przyklejenie" elementu do określonej pozycji na ekranie podczas przewijania strony. Jest szczególnie przydatny do tworzenia elementów nawigacji, przycisków akcji lub paneli bocznych, które powinny pozostać widoczne podczas przewijania treści.

## Funkcje

- **Pozycjonowanie** - Możliwość przyklejenia do góry lub dołu ekranu
- **Offsety** - Kontrola odległości od krawędzi ekranu
- **Target** - Możliwość określenia elementu kontenera do monitorowania
- **Threshold** - Próg aktywacji przyklejenia
- **Rozmiary** - Warianty rozmiaru (sm, md, lg)
- **Zdarzenia** - Callback'i dla różnych stanów komponentu
- **Dostępność** - Pełne wsparcie dla technologii asystujących

## Podstawowe użycie

```tsx
import { Affix } from '@preact-nebula/ui'

function BasicAffixExample() {
  return (
    <div className="h-screen">
      <div className="h-96 bg-gray-100 p-4">
        Przewiń w dół...
      </div>
      
      <Affix offsetTop={20}>
        <div className="bg-blue-500 text-white p-4 rounded">
          Ten element zostanie przyklejony do góry ekranu
        </div>
      </Affix>
      
      <div className="h-screen bg-gray-200 p-4">
        Długa treść strony...
      </div>
    </div>
  )
}
```

## Zaawansowane przykłady

### Affix z pozycjonowaniem na dole

```tsx
function BottomAffixExample() {
  return (
    <div className="min-h-screen">
      <div className="h-screen bg-gray-100 p-4">
        Treść strony
      </div>
      
      <Affix 
        position="bottom" 
        offsetBottom={20}
        onAffix={(affixed) => console.log('Affixed:', affixed)}
      >
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Przycisk przyklejony do dołu
        </button>
      </Affix>
    </div>
  )
}
```

### Affix z custom target

```tsx
function CustomTargetAffixExample() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  
  return (
    <div className="h-screen flex">
      <div className="flex-1 p-4">Treść główna</div>
      
      <div 
        ref={setTarget}
        className="w-64 h-96 overflow-y-auto bg-gray-50 p-4"
      >
        <div className="h-64 bg-gray-200 mb-4">
          Przewijalny kontener
        </div>
        
        <Affix 
          target={target}
          offsetTop={10}
          size="sm"
        >
          <div className="bg-blue-400 text-white p-2 rounded">
            Przyklejony w kontenerze
          </div>
        </Affix>
        
        <div className="h-96 bg-gray-200 mt-4">
          Więcej treści...
        </div>
      </div>
    </div>
  )
}
```

### Responsywny Affix z threshold

```tsx
function ResponsiveAffixExample() {
  const [affixed, setAffixed] = useState(false)
  
  return (
    <div className="min-h-screen">
      <header className="h-20 bg-blue-600 text-white flex items-center px-6">
        <h1>Nagłówek strony</h1>
      </header>
      
      <div className="h-40 bg-gray-100 p-4">
        Przewiń w dół aby aktywować przyklejenie
      </div>
      
      <Affix
        offsetTop={0}
        threshold={80}
        onChange={setAffixed}
        onScroll={(scrollTop, affixed) => {
          console.log(`Scroll: ${scrollTop}px, Affixed: ${affixed}`)
        }}
        className={cn(
          "transition-shadow duration-300",
          affixed && "shadow-lg"
        )}
      >
        <nav className="bg-white border-b px-6 py-3">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Nawigacja
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Produkty
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Kontakt
            </a>
          </div>
        </nav>
      </Affix>
      
      <div className="h-screen bg-gray-200 p-4">
        <p>Długa treść strony...</p>
      </div>
    </div>
  )
}
```

### Affix z różnymi rozmiarami

```tsx
function SizedAffixExample() {
  return (
    <div className="min-h-screen space-y-8">
      <div className="h-64 bg-gray-100 p-4">
        Przewiń aby zobaczyć różne rozmiary
      </div>
      
      <Affix offsetTop={20} size="sm">
        <div className="bg-red-400 text-white p-2 rounded text-sm">
          Mały Affix (sm)
        </div>
      </Affix>
      
      <Affix offsetTop={60} size="md">
        <div className="bg-green-500 text-white p-3 rounded">
          Średni Affix (md) - domyślny
        </div>
      </Affix>
      
      <Affix offsetTop={110} size="lg">
        <div className="bg-blue-600 text-white p-4 rounded text-lg">
          Duży Affix (lg)
        </div>
      </Affix>
      
      <div className="h-screen bg-gray-200 p-4">
        Treść strony
      </div>
    </div>
  )
}
```

## Props API

### AffixProps

| Prop           | Typ                                                                | Domyślna    | Opis                                         |
| -------------- | ------------------------------------------------------------------ | ----------- | -------------------------------------------- |
| `size`         | `'sm' \| 'md' \| 'lg'`                                             | `'md'`      | Rozmiar komponentu                           |
| `offsetTop`    | `number`                                                           | `0`         | Odległość od góry przy pozycjonowaniu górnym |
| `offsetBottom` | `number`                                                           | `undefined` | Odległość od dołu przy pozycjonowaniu dolnym |
| `target`       | `HTMLElement \| Window \| string \| (() => HTMLElement \| Window)` | `window`    | Element do monitorowania przewijania         |
| `position`     | `'top' \| 'bottom'`                                                | `'top'`     | Pozycja przyklejenia                         |
| `disabled`     | `boolean`                                                          | `false`     | Wyłącza funkcjonalność przyklejania          |
| `threshold`    | `number`                                                           | `0`         | Próg w pikselach do aktywacji                |
| `onAffix`      | `(affixed: boolean) => void`                                       | `undefined` | Callback wywoływany przy zmianie stanu       |
| `onChange`     | `(affixed: boolean) => void`                                       | `undefined` | Alias dla onAffix                            |
| `onScroll`     | `(scrollTop: number, affixed: boolean) => void`                    | `undefined` | Callback przy przewijaniu                    |
| `className`    | `string`                                                           | `undefined` | Dodatkowe klasy CSS                          |
| `children`     | `ComponentChild`                                                   | `undefined` | Zawartość komponentu                         |

### Rozmiary

- **sm** - Kompaktowy rozmiar dla małych elementów
- **md** - Standardowy rozmiar (domyślny)
- **lg** - Większy rozmiar dla istotnych elementów

### Target Options

- **HTMLElement** - Konkretny element DOM
- **Window** - Okno przeglądarki (domyślne)
- **string** - Selektor CSS
- **function** - Funkcja zwracająca element

## Dostępność

### ARIA Support

```tsx
<Affix
  aria-label="Przyklejona nawigacja"
  aria-describedby="affix-help"
  role="navigation"
>
  <nav>
    <span id="affix-help" className="sr-only">
      Ta nawigacja zostanie przyklejona podczas przewijania
    </span>
    {/* Elementy nawigacji */}
  </nav>
</Affix>
```

### Najlepsze praktyki dostępności

- Używaj odpowiednich ról ARIA dla przyklejonych elementów
- Zapewnij alternatywny sposób dostępu do przyklejonych treści
- Unikaj zakłócania naturalnego flow nawigacji klawiszem Tab
- Testuj z czytnikami ekranu
- Rozważ opcje wyłączenia dla użytkowników z wrażliwością na ruch

## Najlepsze praktyki

### Użycie

```tsx
// ✅ Dobrze - podstawowe przyklejenie
<Affix offsetTop={20}>
  <button>Przyklejony przycisk</button>
</Affix>

// ✅ Dobrze - z odpowiednim ARIA
<Affix 
  position="bottom" 
  offsetBottom={20}
  aria-label="Pasek narzędzi"
>
  <div role="toolbar">
    <button>Zapisz</button>
    <button>Anuluj</button>
  </div>
</Affix>

// ❌ Źle - za dużo przyklejonych elementów
<>
  <Affix offsetTop={0}><nav>Nav 1</nav></Affix>
  <Affix offsetTop={60}><nav>Nav 2</nav></Affix>
  <Affix offsetTop={120}><nav>Nav 3</nav></Affix>
</>
```

### Performance

- Używaj `threshold` aby uniknąć niepotrzebnych przeliczeń
- Ogranicz liczbę jednocześnie aktywnych elementów Affix
- Rozważ `disabled` w przypadkach gdy funkcjonalność nie jest potrzebna
- Używaj `target` dla elementów w przewijalnych kontenerach

### Responsive Design

```tsx
// Adaptatywne offsety
<Affix 
  offsetTop={20}
  className="lg:static lg:relative" // Wyłącz na dużych ekranach
>
  <div className="lg:p-0 p-4">
    Responsywna zawartość
  </div>
</Affix>
```

### Z-index Management

```tsx
// Kontrola warstw
<Affix 
  offsetTop={20}
  className="z-50" // Zapewnij odpowiedni z-index
>
  <div className="bg-white shadow-lg">
    Przyklejona zawartość
  </div>
</Affix>
```

## Integracja z innymi komponentami

### Z BackTop

```tsx
<>
  <Affix offsetTop={20}>
    <nav className="bg-white shadow">
      Główna nawigacja
    </nav>
  </Affix>
  
  <BackTop 
    visibilityHeight={300}
    className="fixed bottom-4 right-4"
  />
</>
```

### Z Drawer

```tsx
function DrawerWithAffix() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  
  return (
    <>
      <Affix offsetTop={0}>
        <header className="bg-white border-b px-4 py-3">
          <button 
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden"
          >
            Menu
          </button>
        </header>
      </Affix>
      
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
      >
        <nav>Elementy menu mobilnego</nav>
      </Drawer>
    </>
  )
}
```

## Przykłady zaawansowane

### Affix z animacjami

```tsx
function AnimatedAffixExample() {
  const [isAffixed, setIsAffixed] = useState(false)
  
  return (
    <Affix
      offsetTop={20}
      onChange={setIsAffixed}
      className={cn(
        "transition-all duration-300 ease-in-out",
        isAffixed ? "transform scale-95 shadow-xl" : "transform scale-100"
      )}
    >
      <div className={cn(
        "bg-white rounded-lg p-4",
        isAffixed ? "border-2 border-blue-500" : "border border-gray-200"
      )}>
        <h3 className="text-lg font-semibold">
          {isAffixed ? "🔒 Przyklejony" : "📄 Normalny"}
        </h3>
        <p>Status komponentu zmienia się wraz z przewijaniem</p>
      </div>
    </Affix>
  )
}
```

### Smart Navigation z Affix

```tsx
function SmartNavigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  return (
    <Affix
      offsetTop={isScrollingUp ? 0 : -80}
      onScroll={(scrollTop) => {
        setIsScrollingUp(scrollTop < lastScrollY)
        setLastScrollY(scrollTop)
      }}
      className={cn(
        "transition-transform duration-300",
        !isScrollingUp && "transform -translate-y-full"
      )}
    >
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-6 py-4">
            {['home', 'about', 'services', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn(
                  "px-3 py-2 rounded-md transition-colors",
                  activeSection === section
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                )}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </Affix>
  )
}
```

Komponent `Affix` jest potężnym narzędziem do tworzenia przyklejanych interfejsów, które poprawiają użyteczność i dostępność aplikacji poprzez utrzymywanie kluczowych elementów w zasięgu użytkownika podczas przewijania treści.
