# ↔️ Transfer Component - Dokumentacja

## 📖 Przegląd

Transfer to komponent do dwukierunkowego przenoszenia elementów między dwoma listami. Idealny do zarządzania uprawnieniami użytkowników, wybierania opcji, konfiguracji list dostępu i wszystkich scenariuszy wymagających przenoszenia danych między zbiorami.

## ✨ Cechy Główne

- 🔄 **Dwukierunkowy transfer** - Przenoszenie elementów w obu kierunkach
- 🔍 **Wbudowane filtrowanie** - Szukaj i filtruj elementy w obu listach  
- ✅ **Bulk operations** - Zaznaczanie i przenoszenie wielu elementów
- 🎯 **Drag & Drop** - Przeciągaj elementy między listami
- ♿ **Dostępność** - Pełne wsparcie dla czytników ekranu i klawiatury
- 📊 **Statystyki** - Liczniki wybranych/dostępnych elementów
- 🎨 **Customizacja** - Elastyczne renderowanie elementów i przycisków
- 📱 **Responsywność** - Adaptuje się do różnych rozmiarów ekranu

## 🔧 Instalacja i Import

```typescript
import { Transfer, TransferList, TransferItem, TransferControls } from '@nebula/components'

// Podstawowy transfer
function BasicTransfer() {
  const [sourceItems, setSourceItems] = useState([
    { key: '1', title: 'Item 1', description: 'First item' },
    { key: '2', title: 'Item 2', description: 'Second item' },
    { key: '3', title: 'Item 3', description: 'Third item' }
  ])
  const [targetItems, setTargetItems] = useState([])

  return (
    <Transfer
      dataSource={sourceItems}
      targetKeys={targetItems.map(item => item.key)}
      onChange={(nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys)
        console.log('direction:', direction)
        console.log('moveKeys:', moveKeys)
      }}
      render={(item) => item.title}
    />
  )
}
```

## 📝 Podstawowe Użycie

### 1. User Permissions Manager

```typescript
function PermissionsTransfer() {
  const [permissions] = useState([
    { 
      key: '1', 
      title: 'Read Posts', 
      description: 'View all posts and comments',
      category: 'content'
    },
    { 
      key: '2', 
      title: 'Write Posts', 
      description: 'Create and edit posts',
      category: 'content'
    },
    { 
      key: '3', 
      title: 'Delete Posts', 
      description: 'Remove posts permanently',
      category: 'content'
    },
    { 
      key: '4', 
      title: 'Manage Users', 
      description: 'Add, edit, remove users',
      category: 'admin'
    },
    { 
      key: '5', 
      title: 'System Settings', 
      description: 'Modify system configuration',
      category: 'admin'
    }
  ])
  
  const [selectedPermissions, setSelectedPermissions] = useState(['1', '2'])

  const handleChange = (targetKeys, direction, moveKeys) => {
    setSelectedPermissions(targetKeys)
    console.log(`Moved ${moveKeys.length} permissions ${direction}`)
  }

  const renderItem = (item) => (
    <div className="flex items-start space-x-3">
      <div className={`w-3 h-3 rounded-full mt-1 ${
        item.category === 'admin' ? 'bg-red-500' : 'bg-blue-500'
      }`} />
      <div>
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-gray-500">{item.description}</div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Permissions</h2>
      
      <Transfer
        dataSource={permissions}
        targetKeys={selectedPermissions}
        onChange={handleChange}
        render={renderItem}
        titles={['Available Permissions', 'Assigned Permissions']}
        showSearch={true}
        searchPlaceholder={['Search permissions...', 'Search assigned...']}
        oneWay={false}
        listStyle={{ 
          width: '300px', 
          height: '400px' 
        }}
        operationStyle={{ 
          flexDirection: 'column',
          gap: '8px'
        }}
        showSelectAll={true}
      />
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Summary</h3>
        <p>Selected permissions: {selectedPermissions.length}</p>
        <p>Available permissions: {permissions.length - selectedPermissions.length}</p>
      </div>
    </div>
  )
}
```

### 2. Team Assignment Transfer

```typescript
function TeamAssignmentTransfer() {
  const [employees] = useState([
    { 
      key: '1', 
      name: 'Alice Johnson', 
      role: 'Frontend Developer',
      avatar: '/avatars/alice.jpg',
      skills: ['React', 'TypeScript', 'CSS']
    },
    { 
      key: '2', 
      name: 'Bob Smith', 
      role: 'Backend Developer',
      avatar: '/avatars/bob.jpg',
      skills: ['Node.js', 'Python', 'SQL']
    },
    { 
      key: '3', 
      name: 'Carol Wilson', 
      role: 'UI/UX Designer',
      avatar: '/avatars/carol.jpg',
      skills: ['Figma', 'Prototyping', 'User Research']
    },
    { 
      key: '4', 
      name: 'David Brown', 
      role: 'DevOps Engineer',
      avatar: '/avatars/david.jpg',
      skills: ['Docker', 'AWS', 'Kubernetes']
    }
  ])
  
  const [projectTeam, setProjectTeam] = useState(['1', '3'])

  const renderEmployee = (employee) => (
    <div className="flex items-center space-x-3 p-2">
      <img 
        src={employee.avatar} 
        alt={employee.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="font-semibold">{employee.name}</div>
        <div className="text-sm text-gray-600">{employee.role}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {employee.skills.slice(0, 2).map(skill => (
            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {skill}
            </span>
          ))}
          {employee.skills.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{employee.skills.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  const filterOption = (inputValue, item) => {
    return item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
           item.role.toLowerCase().includes(inputValue.toLowerCase()) ||
           item.skills.some(skill => skill.toLowerCase().includes(inputValue.toLowerCase()))
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Project Team Assignment</h2>
        <p className="text-gray-600">Select team members for the new project</p>
      </div>
      
      <Transfer
        dataSource={employees}
        targetKeys={projectTeam}
        onChange={(targetKeys, direction, moveKeys) => {
          setProjectTeam(targetKeys)
          if (direction === 'right') {
            console.log(`Added ${moveKeys.length} members to project team`)
          } else {
            console.log(`Removed ${moveKeys.length} members from project team`)
          }
        }}
        render={renderEmployee}
        titles={[
          `Available Employees (${employees.length - projectTeam.length})`,
          `Project Team (${projectTeam.length})`
        ]}
        showSearch={true}
        filterOption={filterOption}
        searchPlaceholder={['Search employees...', 'Search team members...']}
        listStyle={{ 
          width: '400px', 
          height: '500px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}
        itemHeight={80}
        showSelectAll={true}
        selectAllLabels={[
          'Select all employees', 
          'Select all team members'
        ]}
        pagination={{
          pageSize: 10,
          showSizeChanger: false
        }}
      />
    </div>
  )
}
```

### 3. Category Management Transfer

```typescript
function CategoryTransfer() {
  const [allCategories] = useState([
    { key: '1', name: 'Technology', count: 245, color: '#3b82f6', icon: '💻' },
    { key: '2', name: 'Design', count: 132, color: '#8b5cf6', icon: '🎨' },
    { key: '3', name: 'Marketing', count: 89, color: '#06b6d4', icon: '📈' },
    { key: '4', name: 'Sales', count: 156, color: '#10b981', icon: '💼' },
    { key: '5', name: 'Support', count: 78, color: '#f59e0b', icon: '🎧' },
    { key: '6', name: 'HR', count: 45, color: '#ef4444', icon: '👥' },
    { key: '7', name: 'Finance', count: 67, color: '#84cc16', icon: '💰' },
    { key: '8', name: 'Operations', count: 123, color: '#f97316', icon: '⚙️' }
  ])
  
  const [visibleCategories, setVisibleCategories] = useState(['1', '2', '3', '4'])

  const renderCategory = (category) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
        style={{ backgroundColor: category.color }}
      >
        {category.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">{category.name}</span>
          <span className="text-sm text-gray-500">{category.count} items</span>
        </div>
      </div>
    </div>
  )

  const customControls = (props) => (
    <div className="flex flex-col space-y-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={props.onMoveToTarget}
        disabled={props.leftSelectedKeys.length === 0}
        title={`Show ${props.leftSelectedKeys.length} categories`}
      >
        Show →
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={props.onMoveToSource}
        disabled={props.rightSelectedKeys.length === 0}
        title={`Hide ${props.rightSelectedKeys.length} categories`}
      >
        ← Hide
      </button>
      <div className="text-xs text-gray-500 text-center mt-2">
        <div>{props.leftSelectedKeys.length} selected</div>
        <div>{props.rightSelectedKeys.length} selected</div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Category Visibility Settings</h2>
        <p className="text-gray-600">Choose which categories should be visible in the navigation</p>
      </div>

      <Transfer
        dataSource={allCategories}
        targetKeys={visibleCategories}
        onChange={(targetKeys, direction, moveKeys) => {
          setVisibleCategories(targetKeys)
          
          const action = direction === 'right' ? 'shown' : 'hidden'
          console.log(`${moveKeys.length} categories ${action}`)
        }}
        render={renderCategory}
        titles={['Available Categories', 'Visible Categories']}
        showSearch={true}
        searchPlaceholder={['Search categories...', 'Search visible...']}
        listStyle={{ 
          width: '350px', 
          height: '450px',
          backgroundColor: '#ffffff',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
        operationStyle={{
          margin: '0 24px'
        }}
        footer={(props) => (
          <div className="p-3 bg-gray-50 border-t text-sm text-gray-600 text-center">
            {props.direction === 'left' 
              ? `${props.checkedKeys.length} of ${allCategories.length - visibleCategories.length} selected`
              : `${props.checkedKeys.length} of ${visibleCategories.length} selected`
            }
          </div>
        )}
        operations={customControls}
        disabled={false}
        showSelectAll={true}
        selectAllLabels={['Select all', 'Select all visible']}
      />
    </div>
  )
}
```

## 🎨 Warianty i Konfiguracja

### One-Way Transfer

```typescript
function OneWayTransfer() {
  const [availableItems, setAvailableItems] = useState([
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' }
  ])
  const [selectedItems, setSelectedItems] = useState([])

  return (
    <Transfer
      dataSource={availableItems}
      targetKeys={selectedItems}
      onChange={(targetKeys) => setSelectedItems(targetKeys)}
      render={(item) => item.title}
      oneWay={true}
      titles={['Available Items', 'Selected Items']}
      operations={['Add', 'Remove']} // Custom operation labels
      disabled={false}
    />
  )
}
```

### Tree Transfer with Grouping

```typescript
function TreeTransfer() {
  const [treeData] = useState([
    {
      key: '0-0',
      title: 'Frontend Team',
      children: [
        { key: '0-0-0', title: 'React Developer', parent: '0-0' },
        { key: '0-0-1', title: 'Vue Developer', parent: '0-0' },
        { key: '0-0-2', title: 'CSS Specialist', parent: '0-0' }
      ]
    },
    {
      key: '0-1', 
      title: 'Backend Team',
      children: [
        { key: '0-1-0', title: 'Node.js Developer', parent: '0-1' },
        { key: '0-1-1', title: 'Python Developer', parent: '0-1' },
        { key: '0-1-2', title: 'Database Admin', parent: '0-1' }
      ]
    }
  ])

  const [assignedKeys, setAssignedKeys] = useState(['0-0-0', '0-1-0'])

  const renderTreeItem = (item) => (
    <div className={`flex items-center space-x-2 ${item.children ? 'font-semibold' : ''}`}>
      {item.children ? (
        <>
          <span>👥</span>
          <span>{item.title}</span>
          <span className="text-xs text-gray-500">({item.children.length})</span>
        </>
      ) : (
        <>
          <span className="ml-4">👤</span>
          <span>{item.title}</span>
        </>
      )}
    </div>
  )

  return (
    <Transfer
      dataSource={treeData}
      targetKeys={assignedKeys}
      onChange={setAssignedKeys}
      render={renderTreeItem}
      titles={['Team Structure', 'Project Assignment']}
      showSearch={true}
      treeTransfer={true}
      treeCheckable={true}
      treeDefaultExpandAll={true}
      listStyle={{ width: '300px', height: '400px' }}
    />
  )
}
```

### Custom Render Transfer

```typescript
function CustomRenderTransfer() {
  const [products] = useState([
    { 
      key: '1', 
      name: 'Laptop Pro', 
      price: 1299, 
      image: '/products/laptop.jpg',
      rating: 4.8,
      inStock: true
    },
    { 
      key: '2', 
      name: 'Wireless Mouse', 
      price: 79, 
      image: '/products/mouse.jpg',
      rating: 4.5,
      inStock: true
    },
    { 
      key: '3', 
      name: 'Mechanical Keyboard', 
      price: 159, 
      image: '/products/keyboard.jpg',
      rating: 4.7,
      inStock: false
    }
  ])

  const [cart, setCart] = useState([])

  const renderProduct = (product) => (
    <div className={`p-3 border rounded-lg ${!product.inStock ? 'opacity-50' : ''}`}>
      <div className="flex space-x-3">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-green-600">${product.price}</span>
            <div className="flex items-center">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>
          <div className={`text-xs mt-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  )

  const disabledKeys = products.filter(p => !p.inStock).map(p => p.key)

  return (
    <Transfer
      dataSource={products}
      targetKeys={cart}
      onChange={(targetKeys) => setCart(targetKeys)}
      render={renderProduct}
      titles={['Products', 'Shopping Cart']}
      showSearch={true}
      filterOption={(inputValue, item) => 
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      }
      disabled={disabledKeys}
      listStyle={{ 
        width: '400px', 
        height: '500px',
        border: '1px solid #d1d5db',
        borderRadius: '8px'
      }}
      itemHeight={100}
      footer={(props) => (
        <div className="p-2 bg-gray-50 border-t text-sm text-center">
          {props.direction === 'left' 
            ? `${products.length - cart.length} available`
            : `${cart.length} in cart - Total: $${
                products
                  .filter(p => cart.includes(p.key))
                  .reduce((sum, p) => sum + p.price, 0)
              }`
          }
        </div>
      )}
    />
  )
}
```

## 🎛️ Advanced Features

### Drag and Drop Transfer

```typescript
function DragDropTransfer() {
  const [items] = useState([
    { key: '1', title: 'Task 1', priority: 'high', assignee: 'Alice' },
    { key: '2', title: 'Task 2', priority: 'medium', assignee: 'Bob' },
    { key: '3', title: 'Task 3', priority: 'low', assignee: 'Carol' }
  ])
  
  const [completedTasks, setCompletedTasks] = useState([])

  const renderTask = (task) => (
    <div className="p-3 border rounded-lg bg-white hover:shadow-md cursor-move">
      <div className="flex items-center justify-between">
        <span className="font-medium">{task.title}</span>
        <span className={`px-2 py-1 text-xs rounded ${
          task.priority === 'high' ? 'bg-red-100 text-red-800' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {task.priority}
        </span>
      </div>
      <div className="text-sm text-gray-600 mt-1">
        Assigned to: {task.assignee}
      </div>
    </div>
  )

  return (
    <Transfer
      dataSource={items}
      targetKeys={completedTasks}
      onChange={setCompletedTasks}
      render={renderTask}
      titles={['Pending Tasks', 'Completed Tasks']}
      dragDrop={true}
      dragDropConfig={{
        animation: 200,
        ghostClass: 'opacity-50',
        chosenClass: 'shadow-lg scale-105',
        dragClass: 'rotate-3'
      }}
      onDragEnd={(evt) => {
        console.log('Drag completed:', evt)
      }}
      listStyle={{ width: '300px', height: '400px' }}
    />
  )
}
```

### Async Data Transfer

```typescript
function AsyncTransfer() {
  const [dataSource, setDataSource] = useState([])
  const [targetKeys, setTargetKeys] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/transfer-data')
      const data = await response.json()
      setDataSource(data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTransfer = async (targetKeys, direction, moveKeys) => {
    setLoading(true)
    
    try {
      await fetch('/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetKeys,
          direction,
          moveKeys
        })
      })
      
      setTargetKeys(targetKeys)
    } catch (error) {
      console.error('Transfer failed:', error)
      // Revert changes or show error
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={handleTransfer}
      loading={loading}
      render={(item) => (
        <div className="flex items-center space-x-2">
          {loading && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
          <span>{item.title}</span>
        </div>
      )}
      titles={['Available', 'Selected']}
      showSearch={true}
      listStyle={{ width: '300px', height: '400px' }}
      locale={{
        itemUnit: 'item',
        itemsUnit: 'items',
        searchPlaceholder: 'Search here...',
        notFoundContent: 'No data found'
      }}
    />
  )
}
```

### Pagination Transfer

```typescript
function PaginationTransfer() {
  const [allData] = useState(
    Array.from({ length: 100 }, (_, index) => ({
      key: index.toString(),
      title: `Item ${index + 1}`,
      description: `Description for item ${index + 1}`,
      category: index % 3 === 0 ? 'A' : index % 3 === 1 ? 'B' : 'C'
    }))
  )
  
  const [selectedKeys, setSelectedKeys] = useState([])

  return (
    <Transfer
      dataSource={allData}
      targetKeys={selectedKeys}
      onChange={setSelectedKeys}
      render={(item) => (
        <div className="p-2">
          <div className="font-medium">{item.title}</div>
          <div className="text-sm text-gray-600">{item.description}</div>
          <div className="text-xs text-blue-600">Category {item.category}</div>
        </div>
      )}
      titles={['All Items', 'Selected Items']}
      showSearch={true}
      listStyle={{ width: '350px', height: '450px' }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} of ${total} items`,
        pageSizeOptions: ['5', '10', '20', '50']
      }}
      itemHeight={60}
      virtual={true}
    />
  )
}
```

## ♿ Dostępność (Accessibility)

### ARIA Implementation

```typescript
function AccessibleTransfer() {
  return (
    <Transfer
      dataSource={items}
      targetKeys={selectedKeys}
      onChange={handleChange}
      render={renderItem}
      
      // ARIA Labels
      aria-label="User permissions transfer"
      titles={['Available Permissions', 'Assigned Permissions']}
      
      // List accessibility
      listRole="listbox"
      listAriaLabel={['Available permissions list', 'Assigned permissions list']}
      
      // Item accessibility
      itemRole="option"
      itemAriaSelected={(item, isSelected) => isSelected}
      
      // Operation buttons accessibility
      operationAriaLabel={['Move selected items to assigned', 'Move selected items to available']}
      
      // Search accessibility
      searchAriaLabel={['Search available permissions', 'Search assigned permissions']}
      
      // Status announcements
      onTransferComplete={(direction, moveKeys) => {
        const message = `${moveKeys.length} ${moveKeys.length === 1 ? 'item' : 'items'} moved ${
          direction === 'right' ? 'to assigned' : 'to available'
        }`
        
        // Announce to screen readers
        const announcement = document.createElement('div')
        announcement.setAttribute('aria-live', 'polite')
        announcement.setAttribute('aria-atomic', 'true')
        announcement.className = 'sr-only'
        announcement.textContent = message
        document.body.appendChild(announcement)
        
        setTimeout(() => document.body.removeChild(announcement), 1000)
      }}
      
      // Keyboard navigation
      onKeyDown={(e, context) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (context.type === 'item') {
            e.preventDefault()
            context.onSelect(context.item.key)
          }
        }
      }}
    />
  )
}
```

### Keyboard Navigation

```typescript
function KeyboardTransfer() {
  const transferRef = useRef(null)

  const handleKeyboardShortcuts = (e) => {
    // Ctrl/Cmd + A: Select all in focused list
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.preventDefault()
      // Implementation for select all
    }
    
    // Ctrl/Cmd + Right/Left: Move selected items
    if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault()
      // Implementation for keyboard transfer
    }
    
    // Escape: Clear selection
    if (e.key === 'Escape') {
      e.preventDefault()
      // Clear current selection
    }
  }

  return (
    <div
      ref={transferRef}
      onKeyDown={handleKeyboardShortcuts}
      tabIndex={-1}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
    >
      <Transfer
        dataSource={items}
        targetKeys={selectedKeys}
        onChange={handleChange}
        render={renderItem}
        
        // Enhanced keyboard support
        keyboard={{
          selectAll: 'ctrl+a',
          moveRight: 'ctrl+right',
          moveLeft: 'ctrl+left',
          clearSelection: 'escape'
        }}
        
        // Focus management
        focusManagement={{
          autoFocus: true,
          restoreFocus: true,
          trapFocus: false
        }}
        
        // Reduced motion support
        respectsReducedMotion={true}
      />
    </div>
  )
}
```

## 🔌 Props API

### TransferProps

| Prop                | Type                                                                    | Default                | Description                  |
| ------------------- | ----------------------------------------------------------------------- | ---------------------- | ---------------------------- |
| `dataSource`        | `TransferItem[]`                                                        | `[]`                   | Data source array            |
| `targetKeys`        | `string[]`                                                              | `[]`                   | Keys of items in target list |
| `onChange`          | `(targetKeys: string[], direction: string, moveKeys: string[]) => void` | -                      | Transfer change callback     |
| `render`            | `(item: TransferItem) => ReactNode`                                     | -                      | Custom item render function  |
| `titles`            | `[string, string]`                                                      | `['Source', 'Target']` | List titles                  |
| `operations`        | `[string, string]`                                                      | `['>', '<']`           | Operation button labels      |
| `showSearch`        | `boolean \| [boolean, boolean]`                                         | `false`                | Show search boxes            |
| `searchPlaceholder` | `[string, string]`                                                      | -                      | Search input placeholders    |
| `filterOption`      | `(inputValue: string, item: TransferItem) => boolean`                   | -                      | Custom filter function       |
| `listStyle`         | `CSSProperties`                                                         | -                      | Custom list style            |
| `operationStyle`    | `CSSProperties`                                                         | -                      | Operation buttons style      |
| `itemHeight`        | `number`                                                                | `32`                   | Height of each item          |
| `showSelectAll`     | `boolean`                                                               | `true`                 | Show select all checkbox     |
| `selectAllLabels`   | `[string, string]`                                                      | -                      | Select all labels            |
| `oneWay`            | `boolean`                                                               | `false`                | One direction transfer only  |
| `pagination`        | `PaginationConfig \| boolean`                                           | `false`                | Pagination configuration     |
| `dragDrop`          | `boolean`                                                               | `false`                | Enable drag and drop         |
| `loading`           | `boolean`                                                               | `false`                | Loading state                |
| `disabled`          | `boolean \| string[]`                                                   | `false`                | Disabled items               |
| `footer`            | `(props: FooterProps) => ReactNode`                                     | -                      | Custom footer                |
| `locale`            | `TransferLocale`                                                        | -                      | Localization strings         |
| `className`         | `string`                                                                | -                      | CSS class name               |
| `data-testid`       | `string`                                                                | -                      | Test identifier              |

### TransferItem

| Property        | Type      | Description              |
| --------------- | --------- | ------------------------ |
| `key`           | `string`  | Unique identifier        |
| `title`         | `string`  | Display title            |
| `description?`  | `string`  | Optional description     |
| `disabled?`     | `boolean` | Whether item is disabled |
| `[key: string]` | `any`     | Additional properties    |

### PaginationConfig

| Property          | Type                                                 | Default | Description             |
| ----------------- | ---------------------------------------------------- | ------- | ----------------------- |
| `pageSize`        | `number`                                             | `10`    | Items per page          |
| `showSizeChanger` | `boolean`                                            | `false` | Show page size selector |
| `showQuickJumper` | `boolean`                                            | `false` | Show quick jump input   |
| `showTotal`       | `(total: number, range: [number, number]) => string` | -       | Show total function     |

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Transfer } from '../Transfer'

describe('Transfer', () => {
  const mockData = [
    { key: '1', title: 'Item 1', description: 'First item' },
    { key: '2', title: 'Item 2', description: 'Second item' },
    { key: '3', title: 'Item 3', description: 'Third item' }
  ]

  const renderBasicTransfer = (props = {}) => {
    const defaultProps = {
      dataSource: mockData,
      targetKeys: [],
      onChange: jest.fn(),
      render: (item) => item.title,
      ...props
    }
    
    return render(<Transfer {...defaultProps} />)
  }

  test('renders transfer lists correctly', () => {
    renderBasicTransfer()
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  test('moves items between lists', async () => {
    const mockOnChange = jest.fn()
    renderBasicTransfer({ onChange: mockOnChange })
    
    // Select an item
    const item1 = screen.getByText('Item 1')
    fireEvent.click(item1)
    
    // Click move button
    const moveButton = screen.getByRole('button', { name: /move.*right/i })
    fireEvent.click(moveButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(['1'], 'right', ['1'])
  })

  test('search functionality works', async () => {
    renderBasicTransfer({ showSearch: true })
    
    const searchInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(searchInput, { target: { value: 'Item 2' } })
    
    await waitFor(() => {
      expect(screen.getByText('Item 2')).toBeVisible()
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    })
  })

  test('select all functionality', () => {
    const mockOnChange = jest.fn()
    renderBasicTransfer({ 
      onChange: mockOnChange,
      showSelectAll: true 
    })
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(selectAllCheckbox)
    
    const moveButton = screen.getByRole('button', { name: /move.*right/i })
    fireEvent.click(moveButton)
    
    expect(mockOnChange).toHaveBeenCalledWith(['1', '2', '3'], 'right', ['1', '2', '3'])
  })

  test('disabled items cannot be selected', () => {
    const mockOnChange = jest.fn()
    renderBasicTransfer({ 
      onChange: mockOnChange,
      disabled: ['1']
    })
    
    const disabledItem = screen.getByText('Item 1')
    fireEvent.click(disabledItem)
    
    const moveButton = screen.getByRole('button', { name: /move.*right/i })
    fireEvent.click(moveButton)
    
    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
```

### Integration Testing

```typescript
describe('Transfer Integration', () => {
  test('works with external state management', () => {
    const TransferWithState = () => {
      const [targetKeys, setTargetKeys] = useState([])
      const [searchValue, setSearchValue] = useState('')

      return (
        <div>
          <input 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="External search"
          />
          <div data-testid="target-count">Selected: {targetKeys.length}</div>
          
          <Transfer
            dataSource={mockData.filter(item => 
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )}
            targetKeys={targetKeys}
            onChange={(keys) => setTargetKeys(keys)}
            render={(item) => item.title}
            showSearch={false}
          />
        </div>
      )
    }

    render(<TransferWithState />)
    
    // External search
    const externalSearch = screen.getByPlaceholderText('External search')
    fireEvent.change(externalSearch, { target: { value: 'Item 1' } })
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
    
    // Transfer item
    fireEvent.click(screen.getByText('Item 1'))
    fireEvent.click(screen.getByRole('button', { name: /move.*right/i }))
    
    expect(screen.getByTestId('target-count')).toHaveTextContent('Selected: 1')
  })

  test('async operations', async () => {
    const AsyncTransfer = () => {
      const [loading, setLoading] = useState(false)
      const [targetKeys, setTargetKeys] = useState([])

      const handleChange = async (keys, direction, moveKeys) => {
        setLoading(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setTargetKeys(keys)
        setLoading(false)
      }

      return (
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeys}
          onChange={handleChange}
          loading={loading}
          render={(item) => (
            <div>
              {loading && <span>Loading...</span>}
              {item.title}
            </div>
          )}
        />
      )
    }

    render(<AsyncTransfer />)
    
    fireEvent.click(screen.getByText('Item 1'))
    fireEvent.click(screen.getByRole('button', { name: /move.*right/i }))
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    }, { timeout: 1500 })
  })
})
```

## 📚 Najlepsze Praktyki

### 1. **Performance dla Dużych Zbiorów Danych**
```typescript
// Włącz virtualizację dla dużych list
<Transfer
  dataSource={largeDataset}
  virtual={true}
  itemHeight={60}
  listStyle={{ height: '400px' }}
/>

// Używaj paginacji
<Transfer
  pagination={{
    pageSize: 20,
    showSizeChanger: true
  }}
/>
```

### 2. **Search i Filtering**
```typescript
// Custom filter dla złożonych kryteriów
const customFilter = (inputValue, item) => {
  const searchTerm = inputValue.toLowerCase()
  return (
    item.title.toLowerCase().includes(searchTerm) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    item.category.toLowerCase().includes(searchTerm)
  )
}

<Transfer
  filterOption={customFilter}
  searchPlaceholder={['Search by title, tags, or category...', 'Search selected...']}
/>
```

### 3. **Error Handling**
```typescript
function RobustTransfer() {
  const [error, setError] = useState(null)

  const handleTransfer = async (targetKeys, direction, moveKeys) => {
    try {
      setError(null)
      await performTransfer(targetKeys, direction, moveKeys)
    } catch (err) {
      setError(err.message)
      // Revert state or show retry option
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      <Transfer onChange={handleTransfer} />
    </div>
  )
}
```

Transfer component oferuje kompleksowe rozwiązanie do zarządzania przepływem danych między listami, z bogactwem funkcji customizacji, dostępności i optymalizacji wydajności.
