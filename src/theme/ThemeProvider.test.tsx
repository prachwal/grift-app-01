import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock matchMedia
const matchMediaMock = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}));
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
});

// Test component that uses the theme context
const TestComponent = () => {
    const { mode, setMode, resolvedTheme } = useTheme();

    return (
        <div>
            <span data-testid="current-mode">{mode}</span>
            <span data-testid="resolved-theme">{resolvedTheme}</span>
            <button data-testid="set-light" onClick={() => setMode('light')}>Light</button>
            <button data-testid="set-dark" onClick={() => setMode('dark')}>Dark</button>
            <button data-testid="set-system" onClick={() => setMode('system')}>System</button>
        </div>
    );
};

describe('ThemeProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock.getItem.mockReturnValue(null);
        matchMediaMock.mockReturnValue({
            matches: false,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        });
        document.documentElement.className = '';
    });

    it('should provide default theme context', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('current-mode')).toHaveTextContent('system');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });

    it('should load theme from localStorage', () => {
        localStorageMock.getItem.mockReturnValue('dark');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('current-mode')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });

    it('should change theme mode', async () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByTestId('set-dark'));

        await waitFor(() => {
            expect(screen.getByTestId('current-mode')).toHaveTextContent('dark');
            expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
        });

        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should apply CSS classes to document element', async () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByTestId('set-dark'));

        await waitFor(() => {
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(document.documentElement.classList.contains('light')).toBe(false);
        });

        fireEvent.click(screen.getByTestId('set-light'));

        await waitFor(() => {
            expect(document.documentElement.classList.contains('light')).toBe(true);
            expect(document.documentElement.classList.contains('dark')).toBe(false);
        });
    });

    it('should handle system theme', async () => {
        matchMediaMock.mockReturnValue({
            matches: true, // Dark system theme
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        });

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('current-mode')).toHaveTextContent('system');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should listen for system theme changes', () => {
        const mockMediaQuery = {
            matches: false,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        };
        matchMediaMock.mockReturnValue(mockMediaQuery);

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should throw error when used outside provider', () => {
        // Suppress console.error for this test
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useTheme must be used within a ThemeProvider');

        consoleSpy.mockRestore();
    });
});
