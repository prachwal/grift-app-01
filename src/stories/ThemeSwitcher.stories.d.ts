import type { StoryObj } from '@storybook/preact';
/**
 * ThemeSwitcher component allows users to switch between light, dark, and system themes.
 * It uses a custom dropdown implementation for compatibility with Preact and automatically
 * persists theme preference in localStorage.
 */
declare const meta: {
    title: string;
    component: () => import("preact").JSX.Element;
    tags: string[];
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/preact").PreactRenderer, () => import("preact").JSX.Element>) => import("preact").JSX.Element)[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * Default theme switcher with system theme selected by default.
 * Click the button to see the dropdown with all theme options.
 */
export declare const Default: Story;
/**
 * Theme switcher in a light theme context.
 * The background and text colors adapt to the current theme.
 */
export declare const LightTheme: Story;
/**
 * Theme switcher in a dark theme context.
 * Notice how the button and dropdown adapt to the dark color scheme.
 */
export declare const DarkTheme: Story;
/**
 * Interactive example with surrounding content to show theme switching effects.
 * Try switching between different themes to see how the entire interface changes.
 */
export declare const Interactive: Story;
/**
 * Multiple theme switchers showing different states simultaneously.
 * This demonstrates how multiple instances can coexist and sync their state.
 */
export declare const MultipleInstances: Story;
