# Table Component Documentation

## Overview
The Table component provides a comprehensive data table solution with sorting, filtering, pagination, and responsive design. Built for displaying structured data with professional styling and interactive features.

## Features
- **Responsive Design** - Adaptive layout for all screen sizes
- **Sortable Columns** - Click headers to sort data ascending/descending
- **Row Selection** - Single or multiple row selection with checkboxes
- **Pagination** - Built-in pagination with customizable page sizes
- **Hover Effects** - Interactive row highlighting
- **Striped Rows** - Alternating row colors for better readability
- **Empty State** - Graceful handling of empty data sets
- **Loading State** - Loading indicator during data fetch
- **Custom Cell Rendering** - Support for custom cell content and formatting
- **Accessibility** - Full ARIA support and keyboard navigation

## Basic Usage

```tsx
import { Table } from '@/nebula/components/Table'

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor' }
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: false }
]

export function BasicTableExample() {
  return (
    <Table
      data={data}
      columns={columns}
      keyExtractor={(item) => item.id}
    />
  )
}
```

## Advanced Features

### Row Selection
Enable single or multiple row selection:

```tsx
export function SelectableTableExample() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  return (
    <Table
      data={data}
      columns={columns}
      selectable="multiple"
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      keyExtractor={(item) => item.id}
    />
  )
}
```

### Custom Cell Rendering
Customize how cells are displayed:

```tsx
const customColumns = [
  {
    key: 'name',
    label: 'User',
    render: (value, row) => (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
          {value.charAt(0)}
        </div>
        <span className="font-medium">{value}</span>
      </div>
    )
  },
  {
    key: 'role',
    label: 'Role',
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'Admin' ? 'bg-red-100 text-red-800' :
        value === 'Editor' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {value}
      </span>
    )
  }
]
```

### Pagination
Add pagination for large datasets:

```tsx
export function PaginatedTableExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <Table
      data={data}
      columns={columns}
      pagination={{
        currentPage,
        pageSize,
        totalItems: data.length,
        onPageChange: setCurrentPage,
        onPageSizeChange: setPageSize
      }}
      keyExtractor={(item) => item.id}
    />
  )
}
```

## Props API

| Prop                | Type                                   | Default               | Description                                   |
| ------------------- | -------------------------------------- | --------------------- | --------------------------------------------- |
| `data`              | `T[]`                                  | `[]`                  | Array of data objects to display              |
| `columns`           | `Column<T>[]`                          | `[]`                  | Column configuration array                    |
| `keyExtractor`      | `(item: T) => string \| number`        | -                     | Function to extract unique key from data item |
| `selectable`        | `'none' \| 'single' \| 'multiple'`     | `'none'`              | Row selection mode                            |
| `selectedRows`      | `(string \| number)[]`                 | `[]`                  | Array of selected row keys                    |
| `onSelectionChange` | `(keys: (string \| number)[]) => void` | -                     | Callback when selection changes               |
| `pagination`        | `PaginationConfig`                     | -                     | Pagination configuration                      |
| `loading`           | `boolean`                              | `false`               | Show loading state                            |
| `emptyText`         | `string`                               | `'No data available'` | Text to show when data is empty               |
| `striped`           | `boolean`                              | `true`                | Enable alternating row colors                 |
| `hoverable`         | `boolean`                              | `true`                | Enable hover effects on rows                  |
| `size`              | `'sm' \| 'md' \| 'lg'`                 | `'md'`                | Table size variant                            |
| `className`         | `string`                               | -                     | Additional CSS classes                        |

### Column Configuration

| Prop       | Type                                                     | Description                    |
| ---------- | -------------------------------------------------------- | ------------------------------ |
| `key`      | `string`                                                 | Data property key              |
| `label`    | `string`                                                 | Column header text             |
| `sortable` | `boolean`                                                | Enable sorting for this column |
| `width`    | `string`                                                 | Column width (CSS value)       |
| `align`    | `'left' \| 'center' \| 'right'`                          | Text alignment                 |
| `render`   | `(value: any, row: T, index: number) => React.ReactNode` | Custom cell renderer           |

### Pagination Configuration

| Prop               | Type                     | Description                     |
| ------------------ | ------------------------ | ------------------------------- |
| `currentPage`      | `number`                 | Current page number (1-indexed) |
| `pageSize`         | `number`                 | Number of items per page        |
| `totalItems`       | `number`                 | Total number of items           |
| `onPageChange`     | `(page: number) => void` | Page change callback            |
| `onPageSizeChange` | `(size: number) => void` | Page size change callback       |
| `showSizeChanger`  | `boolean`                | Show page size selector         |
| `pageSizeOptions`  | `number[]`               | Available page sizes            |

## Size Variants

### Small Table
```tsx
<Table data={data} columns={columns} size="sm" />
```

### Medium Table (default)
```tsx
<Table data={data} columns={columns} size="md" />
```

### Large Table
```tsx
<Table data={data} columns={columns} size="lg" />
```

## Styling

The Table component uses Tailwind CSS classes and can be customized:

```css
.nebula-table {
  @apply w-full border-collapse border-spacing-0;
}

.nebula-table-header {
  @apply bg-gray-50 dark:bg-gray-800;
}

.nebula-table-cell {
  @apply px-6 py-4 text-sm text-gray-900 dark:text-gray-100;
}

.nebula-table-row:hover {
  @apply bg-gray-50 dark:bg-gray-800;
}
```

## Accessibility

The Table component includes comprehensive accessibility features:

- **ARIA Labels** - Proper labeling for screen readers
- **Keyboard Navigation** - Full keyboard support for sorting and selection
- **Focus Management** - Visible focus indicators
- **Screen Reader Support** - Descriptive text for actions and states
- **Role Attributes** - Semantic HTML with proper ARIA roles

### Keyboard Shortcuts
- `Tab` / `Shift + Tab` - Navigate between interactive elements
- `Enter` / `Space` - Toggle row selection or sort column
- `Arrow Keys` - Navigate between table cells
- `Ctrl/Cmd + A` - Select all rows (in multiple selection mode)

## Examples

### Complete Data Table
```tsx
import { useState } from 'preact/hooks'
import { Table } from '@/nebula/components/Table'

export function UserManagementTable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Active' }
  ])

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, user) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-medium">{value.charAt(0)}</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
          </div>
        </div>
      )
    },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'Admin' ? 'bg-red-100 text-red-800' :
          value === 'Editor' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">User Management</h2>
      <Table
        data={users}
        columns={columns}
        keyExtractor={(user) => user.id}
        selectable="multiple"
        striped
        hoverable
      />
    </div>
  )
}
```

## Best Practices

1. **Performance** - Use `keyExtractor` for efficient rendering of large datasets
2. **Responsive Design** - Consider horizontal scrolling for tables with many columns
3. **Loading States** - Always show loading indicators during data fetch
4. **Empty States** - Provide meaningful empty state messages
5. **Accessibility** - Test with screen readers and keyboard navigation
6. **Column Width** - Set appropriate widths for better layout control
7. **Data Formatting** - Use custom renderers for complex data display
8. **Error Handling** - Handle data loading errors gracefully

The Table component provides a robust foundation for displaying structured data with professional styling and comprehensive functionality suitable for any modern web application.
