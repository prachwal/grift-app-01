# JSON-Based Endpoint Definitions

## Overview

The API testing system now supports JSON-based endpoint definitions that are stored alongside the function files in the same directory structure.

## File Structure

```
netlify/functions/hello/
├── hello.mts          # Function implementation
├── hello.json         # Endpoint definitions (new)
└── ...

public/netlify/functions/hello/
└── hello.json         # Copy for development (auto-generated)
```

## JSON Format

Each function directory can contain a `.json` file with the same name as the function, containing:

### Collection Metadata
```json
{
  "collection": {
    "id": "hello-functions",
    "name": "Hello API Functions",
    "description": "Collection of hello service endpoints",
    "version": "1.0.0",
    "baseUrl": "/.netlify/functions"
  }
}
```

### Command Definitions
```json
{
  "commands": {
    "hello": {
      "name": "Hello Command",
      "description": "Simple greeting command with optional name parameter",
      "method": "GET",
      "path": "/hello",
      "parameters": {
        "cmd": {
          "type": "string",
          "required": true,
          "defaultValue": "hello",
          "description": "Command to execute"
        },
        "name": {
          "type": "string",
          "required": false,
          "defaultValue": "World",
          "description": "Name to greet",
          "min": 1,
          "max": 64
        }
      },
      "responses": [...],
      "testCases": [...],
      "tags": ["greeting", "basic"]
    }
  }
}
```

## Parameter Types

Supported parameter types:
- `string` - Text input
- `number` - Numeric input  
- `boolean` - Checkbox
- `array` - Comma-separated values
- `object` - JSON object (future)

### Parameter Properties
- `type`: Parameter data type
- `required`: Whether parameter is mandatory
- `defaultValue`: Default value to use
- `description`: Help text for users
- `min`/`max`: Validation constraints
- `enum`: List of allowed values (creates dropdown)
- `pattern`: Regex pattern for validation
- `example`: Example value to show

## Response Examples

Define expected responses for documentation:

```json
{
  "responses": [
    {
      "statusCode": 200,
      "description": "Successful greeting",
      "body": {
        "success": true,
        "data": {
          "message": "Hello World!",
          "timestamp": "2025-01-01T12:00:00.000Z"
        }
      }
    }
  ]
}
```

## Test Cases

Define automated test scenarios:

```json
{
  "testCases": [
    {
      "name": "Default greeting",
      "parameters": {
        "cmd": "hello"
      },
      "expectedStatus": 200,
      "description": "Should return default greeting",
      "expectedBodyContains": ["Hello World!"]
    }
  ]
}
```

## Development Workflow

### 1. Create JSON Definition
Create `{function-name}.json` in the same directory as your function:

```bash
netlify/functions/hello/hello.json
```

### 2. Copy to Public Folder
For development, copy JSON files to public folder:

```bash
npm run copy-json
```

Or automatically with development server:

```bash
npm run dev:full
```

### 3. The API Testing Interface
The interface will automatically load definitions from:
1. JSON files in `/public/netlify/functions/`
2. Static collections in `src/data/`
3. Live endpoint discovery (fallback)

## Benefits

### ✅ Advantages
- **Declarative**: Endpoints defined in JSON, separate from code
- **Version Control**: JSON files tracked alongside function code
- **Non-intrusive**: Doesn't affect function implementation
- **Rich Metadata**: Support for parameters, responses, test cases
- **Type Safety**: Full TypeScript support maintained

### 📁 File Organization
```
netlify/functions/
├── hello/
│   ├── hello.mts      # Function logic
│   └── hello.json     # API definition
├── auth/
│   ├── auth.mts       # Function logic  
│   └── auth.json      # API definition
└── data/
    ├── data.mts       # Function logic
    └── data.json      # API definition
```

## Migration

Existing functions can gradually adopt JSON definitions:
1. Create `.json` file alongside existing `.mts` file
2. Define commands, parameters, and test cases
3. The testing interface will prefer JSON definitions over auto-discovery

## Future Enhancements

- **Schema Validation**: Validate JSON against TypeScript schemas
- **Auto-Generation**: Generate JSON from function code annotations
- **Multi-Function**: Support multiple functions per JSON file
- **Environment Configs**: Different configs for dev/staging/prod
