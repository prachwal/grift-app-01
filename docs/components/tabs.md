# 🗂️ Tabs Component - Dokumentacja

## 📖 Wprowadzenie

Komponent **Tabs** to zaawansowany system zakładek, który umożliwia organizację treści w przejrzyste, intuicyjne panele. Zapewnia płynną nawigację między sekcjami i pełną dostępność, wspierając zarówno orientację poziomą jak i pionową.

## 🎯 Kluczowe Funkcje

### ✨ Główne Cechy
- **Horizontal & Vertical** - orientacja pozioma i pionowa
- **Multiple Variants** - różne style wizualne (line, enclosed, soft-rounded)
- **Size Variants** - rozmiary sm, md, lg
- **Color Schemes** - predefiniowane schematy kolorów
- **Controlled/Uncontrolled** - zarządzany i niezarządzany stan
- **Keyboard Navigation** - pełna obsługa klawiatury (strzałki, Home, End)
- **Focus Management** - zarządzanie focusem zgodne z ARIA
- **Dark Mode Support** - natywne wsparcie trybu ciemnego

### 🎨 Warianty Stylów
- **Line** - minimalistyczny z linią pod aktywną zakładką
- **Enclosed** - zamknięte zakładki w stylu tradycyjnych kart
- **Soft-rounded** - miękko zaokrąglone z subtelnym tłem

## 🔧 Instalacja i Import

```typescript
import { 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel 
} from '@nebula/components'

// Podstawowy zestup
function BasicTabs() {
  return (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="tab1">Content for first tab</TabPanel>
        <TabPanel value="tab2">Content for second tab</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

## 📝 Podstawowe Użycie

### 1. Niekontrolowane Tabs (Uncontrolled)

```typescript
function UncontrolledTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="reports">Reports</Tab>
        <Tab value="notifications">Notifications</Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel value="overview">
          <div className="py-6">
            <h3 className="text-xl font-bold mb-4">Project Overview</h3>
            <p>Dashboard showing key project metrics and status.</p>
          </div>
        </TabPanel>
        
        <TabPanel value="analytics">
          <div className="py-6">
            <h3 className="text-xl font-bold mb-4">Analytics Data</h3>
            <p>Detailed analytics and performance metrics.</p>
          </div>
        </TabPanel>
        
        <TabPanel value="reports">
          <div className="py-6">
            <h3 className="text-xl font-bold mb-4">Generated Reports</h3>
            <p>View and download generated reports.</p>
          </div>
        </TabPanel>
        
        <TabPanel value="notifications">
          <div className="py-6">
            <h3 className="text-xl font-bold mb-4">Notifications</h3>
            <p>Manage your notification preferences.</p>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

### 2. Kontrolowane Tabs (Controlled)

```typescript
function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('profile')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    
    // Optional: Track tab changes
    analytics.track('tab_changed', { tab: value })
  }

  return (
    <Tabs value={activeTab} onChange={handleTabChange}>
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="account">Account</Tab>
        <Tab value="password">Password</Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel value="profile">
          <ProfileForm />
        </TabPanel>
        <TabPanel value="account">
          <AccountSettings />
        </TabPanel>
        <TabPanel value="password">
          <PasswordChange />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

### 3. Różne Warianty Stylów

```typescript
function StyledTabs() {
  return (
    <div className="space-y-8">
      {/* Line variant */}
      <Tabs defaultValue="tab1" variant="line">
        <TabList>
          <Tab value="tab1">Overview</Tab>
          <Tab value="tab2">Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Line variant content</TabPanel>
          <TabPanel value="tab2">More line variant content</TabPanel>
        </TabPanels>
      </Tabs>

      {/* Enclosed variant */}
      <Tabs defaultValue="tab1" variant="enclosed">
        <TabList>
          <Tab value="tab1">Features</Tab>
          <Tab value="tab2">Pricing</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Enclosed variant content</TabPanel>
          <TabPanel value="tab2">More enclosed content</TabPanel>
        </TabPanels>
      </Tabs>

      {/* Soft-rounded variant */}
      <Tabs defaultValue="tab1" variant="soft-rounded" colorScheme="success">
        <TabList>
          <Tab value="tab1">Success</Tab>
          <Tab value="tab2">More Info</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Soft-rounded success content</TabPanel>
          <TabPanel value="tab2">Additional information</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
```

## 🎨 Zaawansowane Przykłady

### 1. Vertical Tabs

```typescript
function VerticalTabs() {
  return (
    <Tabs 
      defaultValue="general" 
      orientation="vertical"
      className="flex gap-6"
    >
      <TabList className="min-w-40">
        <Tab value="general">General</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="integrations">Integrations</Tab>
        <Tab value="advanced">Advanced</Tab>
      </TabList>
      
      <TabPanels className="flex-1">
        <TabPanel value="general">
          <div className="p-6 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">General Settings</h3>
            <GeneralSettingsForm />
          </div>
        </TabPanel>
        
        <TabPanel value="security">
          <div className="p-6 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Security Options</h3>
            <SecuritySettingsForm />
          </div>
        </TabPanel>
        
        <TabPanel value="integrations">
          <div className="p-6 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Integrations</h3>
            <IntegrationsPanel />
          </div>
        </TabPanel>
        
        <TabPanel value="advanced">
          <div className="p-6 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
            <AdvancedOptions />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

### 2. Tabs z Ikonami i Odznaczkami

```typescript
import { 
  HomeIcon, 
  ChartBarIcon, 
  CogIcon, 
  BellIcon 
} from 'lucide-preact'

function IconTabs() {
  const [notifications, setNotifications] = useState(3)

  return (
    <Tabs defaultValue="dashboard">
      <TabList>
        <Tab value="dashboard">
          <HomeIcon className="w-4 h-4 mr-2" />
          Dashboard
        </Tab>
        
        <Tab value="analytics">
          <ChartBarIcon className="w-4 h-4 mr-2" />
          Analytics
        </Tab>
        
        <Tab value="settings">
          <CogIcon className="w-4 h-4 mr-2" />
          Settings
        </Tab>
        
        <Tab value="notifications">
          <div className="flex items-center">
            <BellIcon className="w-4 h-4 mr-2" />
            Notifications
            {notifications > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {notifications}
              </span>
            )}
          </div>
        </Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel value="dashboard">
          <DashboardContent />
        </TabPanel>
        <TabPanel value="analytics">
          <AnalyticsContent />
        </TabPanel>
        <TabPanel value="settings">
          <SettingsContent />
        </TabPanel>
        <TabPanel value="notifications">
          <NotificationsContent 
            onMarkAllRead={() => setNotifications(0)} 
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

### 3. Dynamic Tabs z Możliwością Zamykania

```typescript
function DynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: 'tab1', title: 'Welcome', content: 'Welcome to the application!' },
    { id: 'tab2', title: 'Getting Started', content: 'Here is how to get started...' }
  ])
  const [activeTab, setActiveTab] = useState('tab1')

  const addTab = () => {
    const newTab = {
      id: `tab${Date.now()}`,
      title: `New Tab ${tabs.length + 1}`,
      content: `Content for new tab ${tabs.length + 1}`
    }
    setTabs(prev => [...prev, newTab])
    setActiveTab(newTab.id)
  }

  const closeTab = (tabId: string, e: Event) => {
    e.stopPropagation()
    
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId)
      
      // If we're closing the active tab, switch to another one
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[0].id)
      }
      
      return newTabs
    })
  }

  return (
    <div className="space-y-4">
      <button 
        onClick={addTab}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Tab
      </button>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabList>
          {tabs.map(tab => (
            <Tab 
              key={tab.id} 
              value={tab.id}
              className="group relative"
            >
              {tab.title}
              {tabs.length > 1 && (
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                >
                  ×
                </button>
              )}
            </Tab>
          ))}
        </TabList>
        
        <TabPanels>
          {tabs.map(tab => (
            <TabPanel key={tab.id} value={tab.id}>
              <div className="py-6">
                <p>{tab.content}</p>
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  )
}
```

### 4. Lazy Loading Tabs

```typescript
function LazyTabs() {
  const [loadedTabs, setLoadedTabs] = useState(new Set(['overview']))
  const [activeTab, setActiveTab] = useState('overview')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    
    // Mark this tab as loaded
    setLoadedTabs(prev => new Set([...prev, value]))
  }

  return (
    <Tabs value={activeTab} onChange={handleTabChange}>
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="performance">Performance</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="reports">Reports</Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel value="overview">
          <OverviewContent />
        </TabPanel>
        
        <TabPanel value="performance">
          {loadedTabs.has('performance') ? (
            <PerformanceContent />
          ) : (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          )}
        </TabPanel>
        
        <TabPanel value="analytics">
          {loadedTabs.has('analytics') ? (
            <AnalyticsContent />
          ) : (
            <TabSkeleton />
          )}
        </TabPanel>
        
        <TabPanel value="reports">
          {loadedTabs.has('reports') ? (
            <ReportsContent />
          ) : (
            <TabSkeleton />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

## 🔌 Props API

### TabsProps

| Prop           | Type                                                            | Default        | Opis                                     |
| -------------- | --------------------------------------------------------------- | -------------- | ---------------------------------------- |
| `defaultValue` | `string`                                                        | -              | Domyślna aktywna zakładka (uncontrolled) |
| `value`        | `string`                                                        | -              | Aktywna zakładka (controlled)            |
| `onChange`     | `(value: string) => void`                                       | -              | Callback zmiany zakładki                 |
| `orientation`  | `'horizontal' \| 'vertical'`                                    | `'horizontal'` | Orientacja zakładek                      |
| `variant`      | `'line' \| 'enclosed' \| 'soft-rounded'`                        | `'line'`       | Wariant wizualny                         |
| `size`         | `'sm' \| 'md' \| 'lg'`                                          | `'md'`         | Rozmiar komponentu                       |
| `colorScheme`  | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'`    | Schemat kolorów                          |
| `className`    | `string`                                                        | -              | Dodatkowe klasy CSS                      |
| `children`     | `ReactNode`                                                     | -              | **Required**. TabList i TabPanels        |

### TabListProps

| Prop        | Type        | Default | Opis                         |
| ----------- | ----------- | ------- | ---------------------------- |
| `children`  | `ReactNode` | -       | **Required**. Komponenty Tab |
| `className` | `string`    | -       | Dodatkowe klasy CSS          |

### TabProps

| Prop        | Type        | Default | Opis                                    |
| ----------- | ----------- | ------- | --------------------------------------- |
| `value`     | `string`    | -       | **Required**. Unikalna wartość zakładki |
| `disabled`  | `boolean`   | `false` | Czy zakładka jest nieaktywna            |
| `children`  | `ReactNode` | -       | **Required**. Zawartość zakładki        |
| `className` | `string`    | -       | Dodatkowe klasy CSS                     |

### TabPanelsProps

| Prop        | Type        | Default | Opis                              |
| ----------- | ----------- | ------- | --------------------------------- |
| `children`  | `ReactNode` | -       | **Required**. Komponenty TabPanel |
| `className` | `string`    | -       | Dodatkowe klasy CSS               |

### TabPanelProps

| Prop        | Type        | Default | Opis                                    |
| ----------- | ----------- | ------- | --------------------------------------- |
| `value`     | `string`    | -       | **Required**. Wartość odpowiadająca Tab |
| `children`  | `ReactNode` | -       | Zawartość panelu                        |
| `className` | `string`    | -       | Dodatkowe klasy CSS                     |

## ♿ Dostępność (Accessibility)

### ARIA Implementation
```html
<div role="tablist" aria-orientation="horizontal">
  <button 
    role="tab" 
    aria-selected="true" 
    aria-controls="panel-1"
    id="tab-1"
  >
    First Tab
  </button>
  <button 
    role="tab" 
    aria-selected="false"
    aria-controls="panel-2" 
    id="tab-2"
    tabindex="-1"
  >
    Second Tab
  </button>
</div>

<div role="tabpanel" aria-labelledby="tab-1" id="panel-1">
  Content for first tab
</div>
```

### Keyboard Navigation
- **Left/Right Arrows** (horizontal) - nawigacja między zakładkami
- **Up/Down Arrows** (vertical) - nawigacja między zakładkami  
- **Home** - przejście do pierwszej zakładki
- **End** - przejście do ostatniej zakładki
- **Tab** - przeniesienie focusu do panelu
- **Enter/Space** - aktywacja zakładki

### Focus Management
- Focus ring widoczny na aktywnej zakładce
- Automatic focus management podczas zmiany zakładek
- Proper tab order between tabs and panels

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/preact'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../Tabs'

describe('Tabs', () => {
  const renderBasicTabs = () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">First Tab</Tab>
          <Tab value="tab2">Second Tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">First Content</TabPanel>
          <TabPanel value="tab2">Second Content</TabPanel>
        </TabPanels>
      </Tabs>
    )
  }

  test('renders tabs and content correctly', () => {
    renderBasicTabs()
    
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByText('First Tab')).toBeInTheDocument()
    expect(screen.getByText('Second Tab')).toBeInTheDocument()
    expect(screen.getByText('First Content')).toBeInTheDocument()
    expect(screen.queryByText('Second Content')).not.toBeVisible()
  })

  test('switches tabs when clicked', () => {
    renderBasicTabs()
    
    fireEvent.click(screen.getByText('Second Tab'))
    
    expect(screen.getByText('Second Content')).toBeVisible()
    expect(screen.queryByText('First Content')).not.toBeVisible()
  })

  test('supports keyboard navigation', () => {
    renderBasicTabs()
    
    const firstTab = screen.getByText('First Tab')
    const secondTab = screen.getByText('Second Tab')
    
    firstTab.focus()
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' })
    
    expect(secondTab).toHaveFocus()
  })

  test('handles disabled tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Active Tab</Tab>
          <Tab value="tab2" disabled>Disabled Tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Active Content</TabPanel>
          <TabPanel value="tab2">Disabled Content</TabPanel>
        </TabPanels>
      </Tabs>
    )
    
    const disabledTab = screen.getByText('Disabled Tab')
    expect(disabledTab).toBeDisabled()
    
    fireEvent.click(disabledTab)
    expect(screen.getByText('Active Content')).toBeVisible()
  })
})
```

### Integration Testing

```typescript
describe('Tabs Integration', () => {
  test('works with form state', () => {
    const FormTabs = () => {
      const [formData, setFormData] = useState({ activeTab: 'personal' })

      return (
        <Tabs 
          value={formData.activeTab} 
          onChange={(value) => setFormData(prev => ({ ...prev, activeTab: value }))}
        >
          <TabList>
            <Tab value="personal">Personal</Tab>
            <Tab value="contact">Contact</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="personal">
              <PersonalInfoForm />
            </TabPanel>
            <TabPanel value="contact">
              <ContactInfoForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )
    }

    render(<FormTabs />)
    
    fireEvent.click(screen.getByText('Contact'))
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })
})
```

## 🎨 Styling i Customizacja

### CSS Classes

```css
/* Główny kontener */
.nebula-tabs {
  @apply w-full;
}

/* Lista zakładek */
.nebula-tabs-list {
  @apply flex border-b border-gray-200 dark:border-gray-700;
}

.nebula-tabs-list[data-orientation="vertical"] {
  @apply flex-col border-b-0 border-r;
}

/* Zakładka */
.nebula-tab {
  @apply px-4 py-2 font-medium text-sm transition-colors;
  @apply text-gray-600 hover:text-gray-900;
  @apply border-b-2 border-transparent;
}

.nebula-tab[aria-selected="true"] {
  @apply text-blue-600 border-blue-600;
}

.nebula-tab:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Panele */
.nebula-tab-panels {
  @apply mt-4;
}

.nebula-tab-panel {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500;
}

/* Warianty */
.nebula-tabs[data-variant="enclosed"] .nebula-tab {
  @apply border border-gray-200 rounded-t-md -mb-px;
}

.nebula-tabs[data-variant="soft-rounded"] .nebula-tab {
  @apply rounded-md mx-1;
}

.nebula-tabs[data-variant="soft-rounded"] .nebula-tab[aria-selected="true"] {
  @apply bg-blue-100 text-blue-700 border-transparent;
}
```

### Custom Theme

```typescript
function CustomTabs() {
  return (
    <Tabs 
      defaultValue="tab1"
      className="
        bg-gradient-to-r from-purple-50 to-pink-50 
        dark:from-purple-900/20 dark:to-pink-900/20
        rounded-lg p-4
      "
    >
      <TabList className="bg-white/50 rounded-lg p-1">
        <Tab value="tab1" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
          Custom Tab 1
        </Tab>
        <Tab value="tab2" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
          Custom Tab 2
        </Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel value="tab1">Custom themed content</TabPanel>
        <TabPanel value="tab2">More custom content</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

## 📊 Performance

### Optymalizacje
- Lazy mounting tab panels (opcjonalne)
- Memoized tab context
- Efficient keyboard navigation
- Minimal re-renders

### Bundle Size
- Core: ~4.2KB (gzipped)
- Z wszystkimi wariantami: ~5.1KB (gzipped)
- Tree-shakable components

## 🔗 Powiązane Komponenty

- **[Breadcrumb](/breadcrumb)** - hierarchiczna nawigacja
- **[Steps](/steps)** - nawigacja kroków w procesie
- **[Accordion](/accordion)** - składane sekcje treści

## 📚 Dodatkowe Zasoby

- [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Material Design Tabs](https://material.io/components/tabs)
- [React Tabs Best Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel)
