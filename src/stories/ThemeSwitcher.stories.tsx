import type { Meta, StoryObj } from '@storybook/preact';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { ThemeProvider } from '../theme/ThemeProvider';

/**
 * ThemeSwitcher component allows users to switch between light, dark, and system themes.
 * It uses a custom dropdown implementation for compatibility with Preact and automatically 
 * persists theme preference in localStorage.
 */
const meta = {
    title: 'Design System/ThemeSwitcher',
    component: ThemeSwitcher,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ThemeProvider>
                <div className="p-4 min-h-[200px]">
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
The ThemeSwitcher component provides a dropdown interface for changing the application theme.

Features:
- Light (☀️), Dark (🌙), and System (💻) theme options
- Visual emoji icons for each theme mode
- Persistent theme selection via localStorage
- Automatic system theme detection
- Smooth transitions and animations
- Full keyboard accessibility (Escape to close)
- Click outside to close dropdown
- Visual indicators for current selection
- Mobile-friendly backdrop overlay

The component integrates with the ThemeProvider to manage global theme state and applies
the appropriate CSS classes to the document element for Tailwind CSS dark mode.
        `,
            },
        },
    },
    argTypes: {},
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default theme switcher with system theme selected by default.
 * Click the button to see the dropdown with all theme options.
 */
export const Default: Story = {};

/**
 * Theme switcher in a light theme context.
 * The background and text colors adapt to the current theme.
 */
export const LightTheme: Story = {
    decorators: [
        (Story) => {
            // Initialize light theme
            if (typeof document !== 'undefined') {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }

            return (
                <ThemeProvider>
                    <div className="p-4 bg-white text-gray-900 rounded-lg border min-h-[200px]">
                        <h3 className="text-lg font-semibold mb-4">Light Theme Example</h3>
                        <Story />
                    </div>
                </ThemeProvider>
            );
        },
    ],
};

/**
 * Theme switcher in a dark theme context.
 * Notice how the button and dropdown adapt to the dark color scheme.
 */
export const DarkTheme: Story = {
    decorators: [
        (Story) => {
            // Initialize dark theme
            if (typeof document !== 'undefined') {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
            }

            return (
                <ThemeProvider>
                    <div className="p-4 bg-gray-900 text-gray-100 rounded-lg border border-gray-700 min-h-[200px]">
                        <h3 className="text-lg font-semibold mb-4">Dark Theme Example</h3>
                        <Story />
                    </div>
                </ThemeProvider>
            );
        },
    ],
};

/**
 * Interactive example with surrounding content to show theme switching effects.
 * Try switching between different themes to see how the entire interface changes.
 */
export const Interactive: Story = {
    render: () => (
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Theme Demo
                    </h3>
                    <ThemeSwitcher />
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    This interactive demo shows how the theme switcher affects the entire interface.
                    Try switching between different themes to see the smooth transitions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            🌟 Light Elements
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            These elements automatically adapt to the selected theme with smooth transitions.
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 transition-colors duration-300">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                            🎨 Colored Elements
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            Even colored elements have carefully designed dark mode variants.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Theme persistence enabled</span>
                        <span>✨ localStorage integration</span>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo showing theme switching with realistic UI components and smooth transitions.',
            },
        },
    },
};

/**
 * Multiple theme switchers showing different states simultaneously.
 * This demonstrates how multiple instances can coexist and sync their state.
 */
export const MultipleInstances: Story = {
    render: () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Header Theme Switcher:
                </span>
                <ThemeSwitcher />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sidebar Theme Switcher:
                </span>
                <ThemeSwitcher />
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Both switchers stay in sync automatically
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Multiple theme switcher instances that automatically stay synchronized through shared state.',
            },
        },
    },
};