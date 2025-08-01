---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# Opis projektu

Projekt frontendowy oparty o Preact, Vite oraz TypeScript. Wykorzystuje nowoczesną architekturę z separacją warstw prezentacji (komponenty), stron (pages/layouts) oraz logiki biznesowej (services, hooks). Zarządzanie stanem realizowane jest z @preact/signals. System design tokens zapewnia spójność motywu i wsparcie dla dark mode. Testy jednostkowe i integracyjne realizowane są z użyciem Vitest i @testing-library/preact. Storybook służy do dokumentacji i prezentacji komponentów.

## Używane technologie i wersje

### Core Dependencies
- **Preact:** ^10.26.9 - Lightweight React alternative
- **@preact/signals:** ^1.3.2 - Reactive state management
- **react-router-dom:** ^7.7.1 - Client-side routing

### Build & Development Tools  
- **Vite:** ^7.0.4 - Build tool and dev server
- **@preact/preset-vite:** ^2.10.2 - Preact integration for Vite
- **TypeScript:** ~5.8.3 - Static type checking

### Styling & Design
- **Tailwind CSS:** ^3.4.17 - Utility-first CSS framework
- **PostCSS:** ^8.5.6 + autoprefixer ^10.4.21 - CSS processing

### Testing Framework
- **Vitest:** ^3.2.4 - Unit testing framework
- **@testing-library/preact:** ^3.2.4 - Component testing utilities
- **@testing-library/jest-dom:** ^6.4.2 - Custom Jest matchers
- **@testing-library/user-event:** ^14.5.2 - User interaction simulation
- **jsdom:** ^24.0.0 - DOM implementation for testing
- **@vitest/ui:** ^3.2.4 - Visual test interface

### Documentation & Storybook
- **Storybook:** ^9.0.17 - Component documentation
- **@storybook/preact-vite:** ^9.0.17 - Preact integration
- **@storybook/addon-docs:** ^9.0.17 - Documentation addon
- **@storybook/addon-a11y:** ^9.1.0 - Accessibility testing
- **@storybook/addon-vitest:** ^9.1.0 - Unit test integration
- **@chromatic-com/storybook:** ^4.1.0 - Visual testing

## Postęp prac

- ✅ Skonfigurowano TypeScript z podziałem na app/node oraz ścisłymi regułami lintowania
- ✅ Wdrożono Vite z presetem Preact oraz aliasami dla kompatybilności z React  
- ✅ Utworzono system design tokens (`src/design-system/tokens.ts`) z obsługą CSS variables i dark mode
- ✅ Zaimplementowano ThemeProvider oraz ThemeSwitcher z pełną obsługą motywów i dostępnością
- ✅ Stworzono modularne komponenty (Button, Header, Page) wraz z dokumentacją w Storybook
- ✅ Dodano testy jednostkowe dla kluczowych komponentów i ThemeProvider
- ✅ Skonfigurowano setup testów (`src/test/setup.ts`) oraz integrację z Vitest
- ✅ Wdrożono globalne style z Tailwind CSS oraz custom properties
- ✅ Zmigrowano z Redux na @preact/signals dla zarządzania stanem
- ✅ Uporządkowano strukturę katalogów zgodnie z najlepszymi praktykami
- ✅ Rozdzielono komponenty UI od stron aplikacji
- ✅ Utworzono dedykowane katalogi dla hooks, services, utils, layouts

## Architektura i struktura katalogów

```
src/
├── assets/           # Statyczne zasoby (obrazy, ikony)
├── components/       # Komponenty UI wielokrotnego użytku (.tsx)
│   └── __tests__/    # Testy komponentów
├── design-system/    # Tokeny designu, system kolorów, typografii
├── hooks/            # Custom hooks (.ts) - logika stanu i efektów
├── layouts/          # Komponenty layoutów (MainLayout, AuthLayout)
├── pages/            # Strony aplikacji (Home, About, Dashboard)
├── services/         # Logika biznesowa (.ts) - API, operacje
├── stories/          # Pliki .stories.tsx dla Storybook
├── styles/           # Globalne style, zmienne CSS
├── test/             # Konfiguracja i utilities testów
├── theme/            # ThemeProvider, zarządzanie motywami
├── utils/            # Funkcje pomocnicze (.ts) - pure functions
└── main.tsx          # Punkt wejścia aplikacji
```

Projekt jest gotowy do dalszego rozwoju: rozbudowy komponentów, integracji z API, rozszerzania testów oraz dokumentacji.

## Wytyczne testowania

- **Uruchamianie testów**: Używaj `npm run test:run` aby uniknąć oczekiwania na 'q' i zakończyć testy automatycznie
- **Testy jednostkowe**: Każdy plik .ts powinien mieć odpowiadający plik .test.ts z testami
- **Testy komponentów**: Używaj @testing-library/preact do testowania komponentów .tsx
- **Pokrycie kodu**: Sprawdzaj wszystkie ścieżki kodu, edge cases i obsługę błędów