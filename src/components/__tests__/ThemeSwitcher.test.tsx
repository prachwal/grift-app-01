import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ThemeProvider } from '../../theme/ThemeProvider';

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

const renderWithThemeProvider = (component: preact.ComponentChildren) => {
    return render(
        <ThemeProvider>
            {component}
        </ThemeProvider>
    );
};

describe('ThemeSwitcher', () => {
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

    it('should render theme switcher button', () => {
        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('💻'); // System theme emoji
    });

    it('should show dropdown when clicked', async () => {
        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Light')).toBeInTheDocument();
            expect(screen.getByText('Dark')).toBeInTheDocument();
            expect(screen.getByText('System')).toBeInTheDocument();
        });
    });

    it('should change theme when option is selected', async () => {
        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Light')).toBeInTheDocument();
        });

        const lightOption = screen.getByText('Light');
        fireEvent.click(lightOption);

        await waitFor(() => {
            expect(screen.getByRole('button')).toHaveTextContent('☀️'); // Light theme emoji
        });

        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    it('should show correct icon for each theme', async () => {
        localStorageMock.getItem.mockReturnValue('light');

        renderWithThemeProvider(<ThemeSwitcher />);

        // Should show sun icon for light theme
        expect(screen.getByRole('button')).toHaveTextContent('☀️');
    });

    it('should mark current theme as selected in dropdown', async () => {
        localStorageMock.getItem.mockReturnValue('dark');

        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            const darkOption = screen.getByText('Dark').closest('button');
            expect(darkOption).toHaveClass('font-semibold');
            expect(screen.getByText('✓')).toBeInTheDocument();
        });
    });

    it('should have proper accessibility attributes', () => {
        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-haspopup', 'menu');
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update accessibility state when opened', async () => {
        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(button).toHaveAttribute('aria-expanded', 'true');
        });
    });

    it('should close dropdown when clicking outside', async () => {
        renderWithThemeProvider(
            <div>
                <ThemeSwitcher />
                <div data-testid="outside">Outside</div>
            </div>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Light')).toBeInTheDocument();
        });

        // Click outside
        fireEvent.mouseDown(screen.getByTestId('outside'));

        await waitFor(() => {
            expect(screen.queryByText('Light')).not.toBeInTheDocument();
        });
    });

    it('should close dropdown when escape key is pressed', async () => {
        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Light')).toBeInTheDocument();
        });

        // Press escape
        fireEvent.keyDown(document, { key: 'Escape' });

        await waitFor(() => {
            expect(screen.queryByText('Light')).not.toBeInTheDocument();
        });
    });

    it('should apply correct styles for different themes', async () => {
        localStorageMock.getItem.mockReturnValue('dark');

        renderWithThemeProvider(<ThemeSwitcher />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-transparent');
        expect(button).toHaveClass('dark:text-gray-300');
    });
});