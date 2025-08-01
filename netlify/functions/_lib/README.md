# Command Handler - Reusable API Function Layer

Warstwa abstrakcji dla funkcji Netlify, która upraszcza tworzenie API endpoints z walidacją i obsługą błędów.

## Funkcjonalności

- 🔍 **Automatyczna walidacja** parametrów z użyciem Zod
- 🚨 **Standaryzowana obsługa błędów** z kodami HTTP i komunikatami
- 📝 **Automatyczna dokumentacja** schema dla każdej komendy
- 🔄 **Parsowanie parametrów URL** z konwersją typów (boolean, array)
- 🛡️ **Type safety** dzięki TypeScript
- 🎯 **Reużywalność** - jeden handler dla wielu komend
- 📊 **CORS headers** automatycznie dodawane

## Jak używać

### 1. Tworzenie komend

```typescript
import { z } from 'zod';
import { createCommand } from '../_lib/commandHandler';

// Prosta komenda
const helloCommand = createCommand(
  z.object({
    name: z.string().min(1).max(64).optional().default('World'),
  }),
  async (params) => ({
    message: `Hello ${params.name}!`,
    timestamp: new Date().toISOString(),
  })
);

// Komenda z walidacją enum
const statusCommand = createCommand(
  z.object({
    component: z.enum(['api', 'database', 'cache']).optional().default('api'),
    detailed: z.boolean().optional().default(false),
  }),
  async (params) => {
    // Twoja logika biznesowa tutaj
    return {
      component: params.component,
      status: 'operational',
      detailed: params.detailed,
    };
  }
);
```

### 2. Rejestracja komend

```typescript
import { createCommandProcessor, type CommandRegistry } from '../_lib/commandHandler';

const commandRegistry: CommandRegistry = {
  hello: helloCommand,
  status: statusCommand,
  // Dodaj więcej komend...
};

const processor = createCommandProcessor(commandRegistry);
```

### 3. Eksport handlera

```typescript
export default async (request: Request, context: Context): Promise<Response> => {
  return processor.handle(request, context);
};
```

## Przykłady użycia

### URL Parameters
```
/.netlify/functions/hello?cmd=hello&name=World
/.netlify/functions/hello?cmd=status&component=api&detailed=true
```

### Automatyczne parsowanie typów
- `detailed=true` → `boolean: true`
- `include=system,runtime,memory` → `array: ['system', 'runtime', 'memory']`
- `count=42` → `string: "42"` (Zod konwertuje zgodnie ze schema)

## Struktura odpowiedzi

### Sukces
```json
{
  "success": true,
  "data": {
    "message": "Hello World!",
    "timestamp": "2025-01-01T12:00:00.000Z"
  },
  "meta": {
    "timestamp": "2025-01-01T12:00:00.000Z",
    "requestId": "abc123"
  }
}
```

### Błąd walidacji
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "status": 422,
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "name",
        "message": "String must contain at least 1 character(s)",
        "code": "too_small"
      }
    ]
  }
}
```

### Nieznana komenda
```json
{
  "success": false,
  "error": {
    "message": "Unknown command: xyz. Available commands: hello, status",
    "status": 400,
    "code": "UNKNOWN_COMMAND"
  }
}
```

## Zaawansowane funkcje

### Custom validation
```typescript
const userCommand = createCommand(
  z.object({
    email: z.string().email(),
    age: z.number().min(18).max(120),
    tags: z.array(z.string()).max(10).optional(),
  }),
  async (params) => {
    // Dodatkowa walidacja biznesowa
    if (params.email.endsWith('@banned.com')) {
      throw new Error('Email domain not allowed');
    }
    
    return { user: params };
  }
);
```

### Dokumentacja schema
```typescript
const processor = createCommandProcessor(commandRegistry);
const commandsInfo = processor.getCommandsInfo();
console.log(commandsInfo);
// Wyświetla wszystkie dostępne komendy z ich schema
```

## Pliki w projekcie

- `commandHandler.ts` - Główna warstwa abstrakcji
- `hello.mts` - Przykład refaktoryzacji istniejącej funkcji
- `example.mts` - Przykład tworzenia nowej funkcji od zera

## Korzyści

1. **DRY (Don't Repeat Yourself)** - eliminuje powtarzający się kod walidacji i obsługi błędów
2. **Spójność** - wszystkie API endpoints mają jednakową strukturę odpowiedzi
3. **Type Safety** - TypeScript zapewnia bezpieczeństwo typów
4. **Łatwość testowania** - każda komenda to pure function
5. **Automatyczna dokumentacja** - schema są self-documenting
6. **Skalowalnośc** - łatwo dodawać nowe komendy i endpoints
