# ConfigProvider Documentation

The ConfigProvider component is a global configuration provider for theme management, internationalization, and component defaults across your entire application.

## Features

- **Theme Management**: Global theme configuration and dark mode support
- **Internationalization**: Locale management for multi-language support
- **Component Defaults**: Set default props for all components
- **Context Provider**: Uses React context for efficient prop drilling avoidance

## Basic Usage

```tsx
import { ConfigProvider } from '@nebula-ui/components'

function App() {
  return (
    <ConfigProvider
      theme={{
        primaryColor: '#1890ff',
        borderRadius: 6
      }}
      locale="en-US"
    >
      <YourApplication />
    </ConfigProvider>
  )
}
```

## Theme Configuration

```tsx
const theme = {
  primaryColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#f5222d',
  borderRadius: 6,
  fontSize: 14
}

<ConfigProvider theme={theme}>
  <App />
</ConfigProvider>
```

## Props

| Prop                | Type                | Default   | Description                     |
| ------------------- | ------------------- | --------- | ------------------------------- |
| `theme`             | `ThemeConfig`       | -         | Theme configuration object      |
| `locale`            | `string`            | `'en-US'` | Locale for internationalization |
| `componentDefaults` | `ComponentDefaults` | -         | Default props for components    |
| `children`          | `ReactNode`         | -         | Child components                |

## Best Practices

- Place ConfigProvider at the root of your application
- Use theme tokens consistently across components
- Leverage context for global state management
- Test theme changes across all components
