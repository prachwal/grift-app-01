# 🌳 TreeView Component - Dokumentacja

## 📖 Przegląd

TreeView to komponent do wyświetlania danych hierarchicznych w strukturze drzewiastej. Idealny do nawigacji folderów, kategorii produktów, struktur organizacyjnych, menu wielopoziomowych i wszystkich przypadków wymagających reprezentacji danych w formie drzewa.

## ✨ Cechy Główne

- 🌲 **Hierarchiczna struktura** - Wielopoziomowe zagnieżdżanie węzłów
- ✅ **Zaznaczanie** - Single i multiple selection z checkboxami
- 🔍 **Filtrowanie** - Wbudowane wyszukiwanie z podświetlaniem
- 📂 **Expand/Collapse** - Rozwijanie i zwijanie węzłów
- 🎯 **Lazy Loading** - Ładowanie dzieci na żądanie
- 🎛️ **Drag & Drop** - Przeciąganie i reorganizacja węzłów
- ♿ **Dostępność** - Pełne wsparcie dla czytników ekranu i klawiatury
- 🎨 **Customizacja** - Elastyczne renderowanie węzłów i ikon

## 🔧 Instalacja i Import

```typescript
import { TreeView, TreeNode, TreeSelect } from '@nebula/components'

// Podstawowe drzewo
function BasicTree() {
  const treeData = [
    {
      key: '1',
      title: 'Root Folder',
      children: [
        { key: '1-1', title: 'Subfolder 1' },
        { key: '1-2', title: 'Subfolder 2' },
      ]
    },
    {
      key: '2', 
      title: 'Documents',
      children: [
        { key: '2-1', title: 'Reports' },
        { key: '2-2', title: 'Presentations' }
      ]
    }
  ]

  return (
    <TreeView
      treeData={treeData}
      defaultExpandAll={true}
      onSelect={(selectedKeys, info) => {
        console.log('Selected:', selectedKeys, info)
      }}
    />
  )
}
```

## 📝 Podstawowe Użycie

### 1. File Manager Tree

```typescript
function FileManagerTree() {
  const [treeData] = useState([
    {
      key: 'root',
      title: 'My Files',
      icon: '📁',
      type: 'folder',
      size: null,
      modified: '2024-01-15',
      children: [
        {
          key: 'documents',
          title: 'Documents',
          icon: '📂',
          type: 'folder', 
          size: null,
          modified: '2024-01-10',
          children: [
            {
              key: 'resume.pdf',
              title: 'Resume.pdf',
              icon: '📄',
              type: 'file',
              size: '1.2 MB',
              modified: '2024-01-08'
            },
            {
              key: 'report.docx',
              title: 'Report.docx',
              icon: '📄',
              type: 'file',
              size: '3.5 MB',
              modified: '2024-01-09'
            }
          ]
        },
        {
          key: 'images',
          title: 'Images',
          icon: '📂',
          type: 'folder',
          size: null,
          modified: '2024-01-12',
          children: [
            {
              key: 'vacation.jpg',
              title: 'Vacation.jpg',
              icon: '🖼️',
              type: 'file',
              size: '2.8 MB',
              modified: '2024-01-11'
            },
            {
              key: 'profile.png',
              title: 'Profile.png', 
              icon: '🖼️',
              type: 'file',
              size: '156 KB',
              modified: '2024-01-12'
            }
          ]
        },
        {
          key: 'projects',
          title: 'Projects',
          icon: '📂',
          type: 'folder',
          size: null,
          modified: '2024-01-15',
          children: [
            {
              key: 'website',
              title: 'Website',
              icon: '📁',
              type: 'folder',
              size: null,
              modified: '2024-01-15',
              children: [
                {
                  key: 'index.html',
                  title: 'index.html',
                  icon: '🌐',
                  type: 'file',
                  size: '8.2 KB',
                  modified: '2024-01-15'
                },
                {
                  key: 'style.css',
                  title: 'style.css',
                  icon: '🎨',
                  type: 'file',
                  size: '15.7 KB',
                  modified: '2024-01-14'
                }
              ]
            }
          ]
        }
      ]
    }
  ])

  const [selectedKeys, setSelectedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(['root', 'documents'])

  const renderTreeNode = (nodeData) => (
    <div className="flex items-center space-x-2 py-1">
      <span className="text-lg">{nodeData.icon}</span>
      <span className="flex-1 font-medium">{nodeData.title}</span>
      {nodeData.type === 'file' && (
        <div className="text-xs text-gray-500 flex space-x-4">
          <span>{nodeData.size}</span>
          <span>{nodeData.modified}</span>
        </div>
      )}
    </div>
  )

  const handleContextMenu = (info) => {
    console.log('Context menu:', info.node)
    // Show context menu with options like copy, delete, rename
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">File Manager</h2>
        <div className="text-sm text-gray-600">
          Selected: {selectedKeys.length} items
        </div>
      </div>
      
      <div className="border rounded-lg bg-white shadow">
        <TreeView
          treeData={treeData}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onSelect={(keys, info) => setSelectedKeys(keys)}
          onExpand={(keys) => setExpandedKeys(keys)}
          onRightClick={handleContextMenu}
          titleRender={renderTreeNode}
          showLine={true}
          showIcon={false}
          selectable={true}
          multiple={true}
          className="p-4"
          height={400}
          virtual={false}
          draggable={true}
          onDrop={(info) => {
            console.log('File moved:', info)
            // Handle file move operation
          }}
          allowDrop={(info) => {
            // Allow dropping files into folders only
            return info.dropNode.type === 'folder'
          }}
        />
      </div>
      
      {selectedKeys.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium">Actions for selected items:</span>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                Copy
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### 2. Organization Structure Tree

```typescript
function OrganizationTree() {
  const [orgData] = useState([
    {
      key: 'ceo',
      title: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      avatar: '/avatars/sarah.jpg',
      department: 'Executive',
      email: 'sarah@company.com',
      children: [
        {
          key: 'cto',
          title: 'Mike Chen',
          role: 'Chief Technology Officer', 
          avatar: '/avatars/mike.jpg',
          department: 'Technology',
          email: 'mike@company.com',
          children: [
            {
              key: 'frontend-lead',
              title: 'Alice Smith',
              role: 'Frontend Team Lead',
              avatar: '/avatars/alice.jpg',
              department: 'Engineering',
              email: 'alice@company.com',
              children: [
                {
                  key: 'frontend-dev1',
                  title: 'Bob Wilson',
                  role: 'Senior Frontend Developer',
                  avatar: '/avatars/bob.jpg',
                  department: 'Engineering',
                  email: 'bob@company.com'
                },
                {
                  key: 'frontend-dev2',
                  title: 'Carol Davis',
                  role: 'Frontend Developer',
                  avatar: '/avatars/carol.jpg',
                  department: 'Engineering',
                  email: 'carol@company.com'
                }
              ]
            },
            {
              key: 'backend-lead',
              title: 'David Lee',
              role: 'Backend Team Lead',
              avatar: '/avatars/david.jpg',
              department: 'Engineering',
              email: 'david@company.com',
              children: [
                {
                  key: 'backend-dev1',
                  title: 'Eva Brown',
                  role: 'Senior Backend Developer',
                  avatar: '/avatars/eva.jpg',
                  department: 'Engineering',
                  email: 'eva@company.com'
                }
              ]
            }
          ]
        },
        {
          key: 'cmo',
          title: 'Lisa Wang',
          role: 'Chief Marketing Officer',
          avatar: '/avatars/lisa.jpg',
          department: 'Marketing',
          email: 'lisa@company.com',
          children: [
            {
              key: 'marketing-manager',
              title: 'Tom Garcia',
              role: 'Marketing Manager',
              avatar: '/avatars/tom.jpg',
              department: 'Marketing',
              email: 'tom@company.com'
            }
          ]
        }
      ]
    }
  ])

  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const renderEmployee = (employee) => (
    <div className="flex items-center space-x-3 py-2 px-2 hover:bg-gray-50 rounded-lg cursor-pointer">
      <img 
        src={employee.avatar} 
        alt={employee.title}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="font-medium text-sm">{employee.title}</div>
        <div className="text-xs text-gray-600">{employee.role}</div>
      </div>
      <div className={`w-2 h-2 rounded-full ${
        employee.department === 'Executive' ? 'bg-purple-500' :
        employee.department === 'Technology' ? 'bg-blue-500' :
        employee.department === 'Engineering' ? 'bg-green-500' :
        'bg-orange-500'
      }`} />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Tree */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Organization Structure</h2>
          
          <TreeView
            treeData={orgData}
            defaultExpandAll={true}
            onSelect={(keys, info) => {
              setSelectedEmployee(info.selectedNodes[0]?.data || null)
            }}
            titleRender={renderEmployee}
            showLine={true}
            showIcon={false}
            selectable={true}
            expandAction="doubleClick"
            className="h-96 overflow-auto"
          />
        </div>

        {/* Employee Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Employee Details</h2>
          
          {selectedEmployee ? (
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={selectedEmployee.avatar} 
                  alt={selectedEmployee.title}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold">{selectedEmployee.title}</h3>
                <p className="text-gray-600">{selectedEmployee.role}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Department:</span>
                  <span>{selectedEmployee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <a href={`mailto:${selectedEmployee.email}`} className="text-blue-600 hover:underline">
                    {selectedEmployee.email}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Reports To:</span>
                  <span>{selectedEmployee.reportsTo || 'N/A'}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  View Full Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-2">👥</div>
              <p>Select an employee from the organization tree to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

### 3. Category Navigation Tree

```typescript
function CategoryNavigationTree() {
  const [categories] = useState([
    {
      key: 'electronics',
      title: 'Electronics',
      icon: '📱',
      count: 1250,
      children: [
        {
          key: 'smartphones',
          title: 'Smartphones',
          icon: '📱',
          count: 450,
          children: [
            { key: 'iphone', title: 'iPhone', icon: '📱', count: 120 },
            { key: 'android', title: 'Android', icon: '📱', count: 280 },
            { key: 'accessories', title: 'Accessories', icon: '🔌', count: 50 }
          ]
        },
        {
          key: 'laptops',
          title: 'Laptops',
          icon: '💻',
          count: 320,
          children: [
            { key: 'gaming', title: 'Gaming Laptops', icon: '🎮', count: 85 },
            { key: 'business', title: 'Business Laptops', icon: '💼', count: 150 },
            { key: 'ultrabooks', title: 'Ultrabooks', icon: '💻', count: 85 }
          ]
        },
        {
          key: 'audio',
          title: 'Audio',
          icon: '🎧',
          count: 480,
          children: [
            { key: 'headphones', title: 'Headphones', icon: '🎧', count: 200 },
            { key: 'speakers', title: 'Speakers', icon: '🔊', count: 180 },
            { key: 'earbuds', title: 'Earbuds', icon: '🎧', count: 100 }
          ]
        }
      ]
    },
    {
      key: 'fashion',
      title: 'Fashion',
      icon: '👗',
      count: 2100,
      children: [
        {
          key: 'clothing',
          title: 'Clothing',
          icon: '👕',
          count: 1500,
          children: [
            { key: 'mens', title: "Men's Clothing", icon: '👔', count: 600 },
            { key: 'womens', title: "Women's Clothing", icon: '👗', count: 750 },
            { key: 'kids', title: "Kids' Clothing", icon: '👶', count: 150 }
          ]
        },
        {
          key: 'shoes',
          title: 'Shoes',
          icon: '👟',
          count: 400,
          children: [
            { key: 'sneakers', title: 'Sneakers', icon: '👟', count: 180 },
            { key: 'boots', title: 'Boots', icon: '🥾', count: 120 },
            { key: 'sandals', title: 'Sandals', icon: '🩴', count: 100 }
          ]
        }
      ]
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [expandedKeys, setExpandedKeys] = useState(['electronics', 'fashion'])
  const [searchValue, setSearchValue] = useState('')

  const renderCategory = (category) => (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-blue-50 rounded-lg group">
      <div className="flex items-center space-x-3">
        <span className="text-lg">{category.icon}</span>
        <span className="font-medium">{category.title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">({category.count})</span>
        <button 
          className="opacity-0 group-hover:opacity-100 text-blue-500 hover:text-blue-700 text-sm"
          onClick={(e) => {
            e.stopPropagation()
            console.log('Edit category:', category.key)
          }}
        >
          Edit
        </button>
      </div>
    </div>
  )

  const handleSearch = (value) => {
    setSearchValue(value)
    if (value) {
      // Expand all nodes when searching
      const allKeys = getAllKeys(categories)
      setExpandedKeys(allKeys)
    } else {
      // Reset to default expansion
      setExpandedKeys(['electronics', 'fashion'])
    }
  }

  const filteredData = searchValue 
    ? filterTreeData(categories, searchValue)
    : categories

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Tree */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">Product Categories</h2>
            
            <input
              type="text"
              placeholder="Search categories..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <TreeView
            treeData={filteredData}
            selectedKeys={selectedCategory ? [selectedCategory.key] : []}
            expandedKeys={expandedKeys}
            onSelect={(keys, info) => {
              if (info.selectedNodes.length > 0) {
                setSelectedCategory(info.selectedNodes[0].data)
              }
            }}
            onExpand={setExpandedKeys}
            titleRender={renderCategory}
            showLine={true}
            showIcon={false}
            selectable={true}
            searchValue={searchValue}
            filterTreeNode={(node) => {
              if (!searchValue) return true
              return node.title.toLowerCase().includes(searchValue.toLowerCase())
            }}
            className="h-96 overflow-auto"
            blockNode={false}
          />
        </div>

        {/* Category Content */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          {selectedCategory ? (
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl">{selectedCategory.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCategory.title}</h2>
                  <p className="text-gray-600">{selectedCategory.count} products available</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedCategory.count}</div>
                  <div className="text-sm text-gray-600">Total Products</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedCategory.children?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Subcategories</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">4.8</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>

              {selectedCategory.children && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Subcategories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCategory.children.map(child => (
                      <div 
                        key={child.key}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedCategory(child)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{child.icon}</span>
                          <span className="font-medium">{child.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">({child.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t flex space-x-3">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Browse Products
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Add to Favorites
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-lg font-semibold mb-2">Select a Category</h3>
              <p>Choose a category from the tree to view details and browse products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

## 🎨 Warianty i Konfiguracja

### Checkable Tree

```typescript
function CheckableTree() {
  const [checkedKeys, setCheckedKeys] = useState(['1-1', '2-1'])
  const [halfCheckedKeys, setHalfCheckedKeys] = useState(['1'])

  return (
    <TreeView
      treeData={treeData}
      checkable={true}
      checkedKeys={checkedKeys}
      halfCheckedKeys={halfCheckedKeys}
      onCheck={(checkedKeys, info) => {
        setCheckedKeys(checkedKeys)
        setHalfCheckedKeys(info.halfCheckedKeys)
        console.log('Checked:', checkedKeys)
        console.log('Half checked:', info.halfCheckedKeys)
      }}
      checkStrictly={false} // Parent-child relationship
      selectable={false}
      showLine={true}
    />
  )
}
```

### Async Loading Tree

```typescript
function AsyncLoadingTree() {
  const [treeData, setTreeData] = useState([
    { key: '1', title: 'Folder 1', isLeaf: false },
    { key: '2', title: 'Folder 2', isLeaf: false },
    { key: '3', title: 'File 1', isLeaf: true }
  ])

  const loadData = async (treeNode) => {
    const { key, title } = treeNode.props.dataRef
    
    return new Promise(resolve => {
      setTimeout(() => {
        const children = [
          { key: `${key}-1`, title: `${title} - Child 1`, isLeaf: true },
          { key: `${key}-2`, title: `${title} - Child 2`, isLeaf: false }
        ]
        
        setTreeData(prev => updateTreeData(prev, key, children))
        resolve()
      }, 1000)
    })
  }

  return (
    <TreeView
      treeData={treeData}
      loadData={loadData}
      loadedKeys={['1-1', '1-2']} // Already loaded nodes
      titleRender={(nodeData) => (
        <div className="flex items-center space-x-2">
          {!nodeData.isLeaf && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
          <span>{nodeData.title}</span>
        </div>
      )}
    />
  )
}
```

### Virtual Scrolling Tree

```typescript
function VirtualScrollingTree() {
  const [treeData] = useState(
    generateLargeTreeData(1000) // 1000 nodes
  )

  return (
    <TreeView
      treeData={treeData}
      height={400}
      virtual={true}
      itemHeight={32}
      scrollable={{
        x: false,
        y: true
      }}
      // Optimize rendering for large datasets
      fieldNames={{
        children: 'children',
        title: 'name',
        key: 'id'
      }}
      titleRender={(nodeData) => (
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-medium">{nodeData.name}</span>
          {nodeData.count && (
            <span className="text-xs text-gray-500">({nodeData.count})</span>
          )}
        </div>
      )}
      blockNode={false}
    />
  )
}
```

## 🎛️ Advanced Features

### Drag and Drop Tree

```typescript
function DragDropTree() {
  const [treeData, setTreeData] = useState(initialTreeData)

  const onDrop = (info) => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }
        if (data[i].children) {
          loop(data[i].children, key, callback)
        }
      }
    }

    const data = [...treeData]
    let dragObj
    
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || []
        item.children.unshift(dragObj)
      })
    } else if (
      (info.node.children || []).length > 0 && 
      info.node.expanded &&
      dropPosition === 1
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        item.children.unshift(dragObj)
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    setTreeData(data)
  }

  const allowDrop = ({ dropNode, dropPosition }) => {
    // Custom drop validation
    return dropNode.type !== 'file' // Can't drop into files
  }

  return (
    <TreeView
      treeData={treeData}
      draggable={true}
      blockNode={true}
      onDrop={onDrop}
      allowDrop={allowDrop}
      titleRender={(nodeData) => (
        <div className="flex items-center space-x-2 py-1">
          <span className="text-lg">
            {nodeData.type === 'folder' ? '📁' : '📄'}
          </span>
          <span className="font-medium">{nodeData.title}</span>
          <span className="text-xs text-gray-500">
            {nodeData.type === 'folder' ? 'Folder' : 'File'}
          </span>
        </div>
      )}
      showLine={true}
      showIcon={false}
      className="border rounded-lg p-4"
    />
  )
}
```

### Context Menu Tree

```typescript
function ContextMenuTree() {
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)

  const handleRightClick = (info) => {
    setSelectedNode(info.node)
    setContextMenu({
      x: info.event.pageX,
      y: info.event.pageY,
      node: info.node
    })
  }

  const handleContextMenuAction = (action) => {
    if (selectedNode) {
      switch (action) {
        case 'rename':
          console.log('Rename:', selectedNode.title)
          break
        case 'delete':
          console.log('Delete:', selectedNode.key)
          break
        case 'copy':
          console.log('Copy:', selectedNode.key)
          break
        case 'paste':
          console.log('Paste to:', selectedNode.key)
          break
        case 'newFolder':
          console.log('New folder in:', selectedNode.key)
          break
      }
    }
    setContextMenu(null)
  }

  return (
    <div className="relative">
      <TreeView
        treeData={treeData}
        onRightClick={handleRightClick}
        onSelect={(keys, info) => setSelectedNode(info.selectedNodes[0])}
        className="border rounded-lg p-4"
      />

      {contextMenu && (
        <div
          className="fixed z-50 bg-white border rounded-lg shadow-lg py-2 min-w-[150px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onBlur={() => setContextMenu(null)}
        >
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
            onClick={() => handleContextMenuAction('newFolder')}
          >
            📁 New Folder
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
            onClick={() => handleContextMenuAction('rename')}
          >
            ✏️ Rename
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
            onClick={() => handleContextMenuAction('copy')}
          >
            📋 Copy
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
            onClick={() => handleContextMenuAction('paste')}
          >
            📄 Paste
          </button>
          <div className="border-t my-1"></div>
          <button
            className="w-full px-4 py-2 text-left hover:bg-red-100 text-sm text-red-600"
            onClick={() => handleContextMenuAction('delete')}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  )
}
```

## ♿ Dostępność (Accessibility)

### ARIA Implementation

```typescript
function AccessibleTreeView() {
  return (
    <TreeView
      treeData={treeData}
      
      // ARIA attributes
      role="tree"
      aria-label="File system navigation"
      aria-multiselectable={true}
      
      // Node accessibility
      itemRole="treeitem"
      itemAriaLabel={(node) => `${node.type}: ${node.title}`}
      itemAriaExpanded={(node, expanded) => 
        node.children ? expanded : undefined
      }
      itemAriaSelected={(node, selected) => selected}
      itemAriaLevel={(node, level) => level}
      itemAriaSetSize={(node, siblings) => siblings.length}
      itemAriaPosInSet={(node, index) => index + 1}
      
      // Keyboard navigation
      onKeyDown={(e, node) => {
        switch (e.key) {
          case 'Enter':
            e.preventDefault()
            // Handle selection
            break
          case ' ':
            e.preventDefault()
            // Handle checkbox toggle
            break
          case 'ArrowRight':
            // Expand node or move to first child
            break
          case 'ArrowLeft':
            // Collapse node or move to parent
            break
          case 'ArrowDown':
            // Move to next visible node
            break
          case 'ArrowUp':
            // Move to previous visible node
            break
          case 'Home':
            // Move to first node
            break
          case 'End':
            // Move to last node
            break
        }
      }}
      
      // Focus management
      autoFocus={true}
      tabIndex={0}
      focusable={true}
      
      // Screen reader announcements
      onExpand={(expandedKeys, info) => {
        const message = `${info.node.title} expanded`
        announceToScreenReader(message)
      }}
      onSelect={(selectedKeys, info) => {
        const message = `${info.selectedNodes.length} items selected`
        announceToScreenReader(message)
      }}
    />
  )
}
```

### Keyboard Navigation

```typescript
function KeyboardTreeView() {
  const treeRef = useRef(null)
  const [focusedKey, setFocusedKey] = useState(null)

  const handleKeyboardNavigation = (e) => {
    const { key, ctrlKey, shiftKey } = e

    switch (key) {
      case 'f':
        if (ctrlKey) {
          e.preventDefault()
          // Focus search input
          document.getElementById('tree-search')?.focus()
        }
        break
        
      case 'a':
        if (ctrlKey) {
          e.preventDefault()
          // Select all visible nodes
          selectAllVisible()
        }
        break
        
      case 'Delete':
        if (selectedKeys.length > 0) {
          e.preventDefault()
          // Delete selected nodes
          deleteSelected()
        }
        break
        
      case 'F2':
        e.preventDefault()
        // Start rename mode
        startRename(focusedKey)
        break
    }
  }

  return (
    <div 
      onKeyDown={handleKeyboardNavigation}
      className="focus:outline-none"
      tabIndex={-1}
    >
      <input
        id="tree-search"
        type="text"
        placeholder="Search tree... (Ctrl+F)"
        className="mb-4 w-full px-3 py-2 border rounded-lg"
      />
      
      <TreeView
        ref={treeRef}
        treeData={treeData}
        focusedKey={focusedKey}
        onFocus={(key) => setFocusedKey(key)}
        
        // Enhanced keyboard support
        keyboard={{
          search: true,
          selectAll: true,
          multiSelect: true,
          rangeSelect: true
        }}
        
        // Visual focus indicators
        focusClassName="ring-2 ring-blue-500 bg-blue-50"
        selectedClassName="bg-blue-100 text-blue-900"
        
        // Reduced motion support
        animation={!window.matchMedia('(prefers-reduced-motion: reduce)').matches}
      />
      
      <div className="mt-4 text-sm text-gray-600">
        <div>Keyboard shortcuts:</div>
        <div>• Ctrl+F: Search</div>
        <div>• Ctrl+A: Select all</div>
        <div>• F2: Rename</div>
        <div>• Delete: Remove selected</div>
      </div>
    </div>
  )
}
```

## 🔌 Props API

### TreeViewProps

| Prop                  | Type                                         | Default | Description             |
| --------------------- | -------------------------------------------- | ------- | ----------------------- |
| `treeData`            | `TreeNode[]`                                 | `[]`    | Tree data source        |
| `selectedKeys`        | `string[]`                                   | `[]`    | Selected node keys      |
| `expandedKeys`        | `string[]`                                   | `[]`    | Expanded node keys      |
| `checkedKeys`         | `string[]`                                   | `[]`    | Checked node keys       |
| `onSelect`            | `(keys: string[], info: SelectInfo) => void` | -       | Select callback         |
| `onExpand`            | `(keys: string[]) => void`                   | -       | Expand callback         |
| `onCheck`             | `(keys: string[], info: CheckInfo) => void`  | -       | Check callback          |
| `checkable`           | `boolean`                                    | `false` | Show checkboxes         |
| `selectable`          | `boolean`                                    | `true`  | Allow selection         |
| `multiple`            | `boolean`                                    | `false` | Multiple selection      |
| `draggable`           | `boolean`                                    | `false` | Enable drag and drop    |
| `showLine`            | `boolean`                                    | `false` | Show connecting lines   |
| `showIcon`            | `boolean`                                    | `true`  | Show node icons         |
| `blockNode`           | `boolean`                                    | `false` | Full row selection      |
| `titleRender`         | `(node: TreeNode) => ReactNode`              | -       | Custom title render     |
| `loadData`            | `(node: TreeNode) => Promise<void>`          | -       | Async data loading      |
| `filterTreeNode`      | `(node: TreeNode) => boolean`                | -       | Filter function         |
| `searchValue`         | `string`                                     | -       | Search highlight value  |
| `virtual`             | `boolean`                                    | `false` | Virtual scrolling       |
| `height`              | `number`                                     | `256`   | Tree height for virtual |
| `itemHeight`          | `number`                                     | `28`    | Item height for virtual |
| `defaultExpandAll`    | `boolean`                                    | `false` | Expand all by default   |
| `defaultExpandParent` | `boolean`                                    | `true`  | Expand parent nodes     |
| `autoExpandParent`    | `boolean`                                    | `true`  | Auto expand parents     |
| `className`           | `string`                                     | -       | CSS class name          |
| `data-testid`         | `string`                                     | -       | Test identifier         |

### TreeNode

| Property          | Type         | Description        |
| ----------------- | ------------ | ------------------ |
| `key`             | `string`     | Unique node key    |
| `title`           | `ReactNode`  | Node title         |
| `children`        | `TreeNode[]` | Child nodes        |
| `disabled`        | `boolean`    | Whether disabled   |
| `disableCheckbox` | `boolean`    | Disable checkbox   |
| `selectable`      | `boolean`    | Whether selectable |
| `checkable`       | `boolean`    | Whether checkable  |
| `icon`            | `ReactNode`  | Node icon          |
| `isLeaf`          | `boolean`    | Is leaf node       |
| `[key: string]`   | `any`        | Custom properties  |

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { TreeView } from '../TreeView'

describe('TreeView', () => {
  const mockTreeData = [
    {
      key: '1',
      title: 'Parent 1',
      children: [
        { key: '1-1', title: 'Child 1-1' },
        { key: '1-2', title: 'Child 1-2' }
      ]
    },
    { key: '2', title: 'Parent 2' }
  ]

  const renderTreeView = (props = {}) => {
    const defaultProps = {
      treeData: mockTreeData,
      onSelect: jest.fn(),
      onExpand: jest.fn(),
      ...props
    }
    
    return render(<TreeView {...defaultProps} />)
  }

  test('renders tree structure correctly', () => {
    renderTreeView()
    
    expect(screen.getByText('Parent 1')).toBeInTheDocument()
    expect(screen.getByText('Parent 2')).toBeInTheDocument()
    // Children should be hidden by default
    expect(screen.queryByText('Child 1-1')).not.toBeInTheDocument()
  })

  test('expands and collapses nodes', async () => {
    const mockOnExpand = jest.fn()
    renderTreeView({ onExpand: mockOnExpand })
    
    const expandButton = screen.getByRole('button', { name: /expand/i })
    fireEvent.click(expandButton)
    
    expect(mockOnExpand).toHaveBeenCalledWith(['1'])
    
    await waitFor(() => {
      expect(screen.getByText('Child 1-1')).toBeVisible()
    })
  })

  test('selects nodes', () => {
    const mockOnSelect = jest.fn()
    renderTreeView({ onSelect: mockOnSelect })
    
    const node = screen.getByText('Parent 1')
    fireEvent.click(node)
    
    expect(mockOnSelect).toHaveBeenCalledWith(
      ['1'], 
      expect.objectContaining({
        selected: true,
        selectedNodes: expect.any(Array)
      })
    )
  })

  test('keyboard navigation works', () => {
    renderTreeView({ defaultExpandAll: true })
    
    const firstNode = screen.getByText('Parent 1')
    firstNode.focus()
    
    fireEvent.keyDown(firstNode, { key: 'ArrowDown' })
    expect(screen.getByText('Child 1-1')).toHaveFocus()
    
    fireEvent.keyDown(screen.getByText('Child 1-1'), { key: 'ArrowUp' })
    expect(firstNode).toHaveFocus()
  })

  test('search filtering works', async () => {
    renderTreeView({ 
      searchValue: 'Child 1-1',
      filterTreeNode: (node) => 
        node.title.toLowerCase().includes('child 1-1')
    })
    
    expect(screen.getByText('Child 1-1')).toBeInTheDocument()
    expect(screen.queryByText('Child 1-2')).not.toBeInTheDocument()
  })

  test('checkable functionality', () => {
    const mockOnCheck = jest.fn()
    renderTreeView({ 
      checkable: true,
      onCheck: mockOnCheck
    })
    
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    
    expect(mockOnCheck).toHaveBeenCalledWith(
      ['1'],
      expect.objectContaining({
        checked: true,
        halfCheckedKeys: expect.any(Array)
      })
    )
  })
})
```

### Integration Testing

```typescript
describe('TreeView Integration', () => {
  test('works with async data loading', async () => {
    const mockLoadData = jest.fn().mockResolvedValue([
      { key: '1-3', title: 'Loaded Child' }
    ])

    const TreeWithAsyncData = () => {
      const [treeData, setTreeData] = useState([
        { key: '1', title: 'Parent', isLeaf: false }
      ])

      const handleLoadData = async (node) => {
        const children = await mockLoadData(node)
        setTreeData(prev => 
          updateTreeChildren(prev, node.key, children)
        )
      }

      return (
        <TreeView
          treeData={treeData}
          loadData={handleLoadData}
        />
      )
    }

    render(<TreeWithAsyncData />)
    
    const expandButton = screen.getByRole('button', { name: /expand/i })
    fireEvent.click(expandButton)
    
    await waitFor(() => {
      expect(mockLoadData).toHaveBeenCalled()
      expect(screen.getByText('Loaded Child')).toBeInTheDocument()
    })
  })

  test('drag and drop functionality', async () => {
    const mockOnDrop = jest.fn()
    
    render(
      <TreeView
        treeData={mockTreeData}
        draggable={true}
        onDrop={mockOnDrop}
        defaultExpandAll={true}
      />
    )
    
    const dragNode = screen.getByText('Child 1-1')
    const dropNode = screen.getByText('Parent 2')
    
    fireEvent.dragStart(dragNode)
    fireEvent.dragOver(dropNode)
    fireEvent.drop(dropNode)
    
    expect(mockOnDrop).toHaveBeenCalledWith(
      expect.objectContaining({
        dragNode: expect.objectContaining({ key: '1-1' }),
        dropNode: expect.objectContaining({ key: '2' })
      })
    )
  })
})
```

## 📚 Najlepsze Praktyki

### 1. **Performance dla Dużych Drzew**
```typescript
// Użyj wirtualizacji dla >1000 węzłów
<TreeView
  virtual={true}
  height={400}
  itemHeight={32}
  treeData={largeTreeData}
/>

// Lazy loading dla głębokich struktur
<TreeView
  loadData={async (node) => {
    const children = await fetchChildren(node.key)
    return children
  }}
  treeData={treeData}
/>
```

### 2. **Search i Filtering**
```typescript
// Wydajne filtrowanie z indeksami
const searchIndex = useMemo(() => 
  createSearchIndex(treeData), [treeData]
)

const filteredData = useMemo(() => 
  searchTerm ? searchIndex.filter(searchTerm) : treeData,
  [searchTerm, searchIndex]
)
```

### 3. **Accessibility Best Practices**
```typescript
// Zawsze podawaj opisowe labele
<TreeView
  aria-label="File navigation tree"
  itemAriaLabel={(node) => 
    `${node.type}: ${node.title}, ${node.children?.length || 0} items`
  }
  announceChanges={true}
/>
```

TreeView component oferuje kompletne rozwiązanie do wyświetlania hierarchicznych danych z zaawansowanymi funkcjami interakcji, wyszukiwania i dostępności.
