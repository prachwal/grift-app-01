// ConfigProvider integration for preact-nebula-ui
import { designTokens } from '../design-system/tokens';

// Helper function to extract rem value from typography array
const extractRemValue = (value: string | readonly [string, any]): number => {
    const remValue = Array.isArray(value) ? value[0] : value;
    return parseInt(remValue.replace('rem', '')) * 16;
};

// Mapowanie design tokens na format ConfigProvider
export const createNebulaThemeConfig = () => {
    return {
        // Primary colors mapping
        primaryColor: designTokens.colors.primary[500], // #0ea5e9

        // Semantic colors
        successColor: designTokens.colors.semantic.success[500], // #22c55e
        warningColor: designTokens.colors.semantic.warning[500], // #f59e0b  
        errorColor: designTokens.colors.semantic.error[500], // #ef4444

        // Border radius from tokens
        borderRadius: parseInt(designTokens.borderRadius.md.replace('rem', '')) * 16, // 0.375rem -> 6px

        // Typography
        fontSize: extractRemValue(designTokens.typography.fontSize.base), // 1rem -> 16px

        // Component specific tokens
        components: {
            button: {
                height: {
                    small: parseInt(designTokens.components.button.height.sm.replace('rem', '')) * 16, // 32px
                    medium: parseInt(designTokens.components.button.height.md.replace('rem', '')) * 16, // 40px  
                    large: parseInt(designTokens.components.button.height.lg.replace('rem', '')) * 16, // 48px
                },
                borderRadius: parseInt(designTokens.borderRadius.md.replace('rem', '')) * 16, // 6px
            },
            card: {
                borderRadius: parseInt(designTokens.borderRadius.lg.replace('rem', '')) * 16, // 8px
                shadow: designTokens.boxShadow.sm,
            },
            input: {
                height: {
                    small: parseInt(designTokens.components.input.height.sm.replace('rem', '')) * 16, // 32px
                    medium: parseInt(designTokens.components.input.height.md.replace('rem', '')) * 16, // 40px
                    large: parseInt(designTokens.components.input.height.lg.replace('rem', '')) * 16, // 48px
                },
                borderRadius: parseInt(designTokens.borderRadius.md.replace('rem', '')) * 16, // 6px
            }
        },

        // Dark mode colors (będą użyte gdy ThemeProvider ustawi dark mode)
        darkMode: {
            backgroundColor: designTokens.colors.neutral[900], // #111827
            textColor: designTokens.colors.neutral[100], // #f3f4f6
            borderColor: designTokens.colors.neutral[700], // #374151
        }
    };
};

// Default component props dla konsystentności
export const componentDefaults = {
    button: {
        size: 'medium' as const,
        variant: 'primary' as const,
    },
    card: {
        bordered: true,
        hoverable: true,
    },
    input: {
        size: 'medium' as const,
    },
    collapse: {
        bordered: true,
        ghost: false,
    }
};

export type NebulaThemeConfig = ReturnType<typeof createNebulaThemeConfig>;
