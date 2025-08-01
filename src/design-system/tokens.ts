// Design tokens for consistent theming across the application
export const designTokens = {
    // Colors
    colors: {
        // Primary brand colors
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9', // Main primary
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
        },

        // Neutral grays
        neutral: {
            0: '#ffffff',
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712',
        },

        // Semantic colors
        semantic: {
            success: {
                50: '#f0fdf4',
                500: '#22c55e',
                600: '#16a34a',
                700: '#15803d',
            },
            warning: {
                50: '#fffbeb',
                500: '#f59e0b',
                600: '#d97706',
                700: '#b45309',
            },
            error: {
                50: '#fef2f2',
                500: '#ef4444',
                600: '#dc2626',
                700: '#b91c1c',
            },
            info: {
                50: '#f0f9ff',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
            },
        },
    },

    // Typography
    typography: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'Monaco', 'monospace'],
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.25rem' }],
            base: ['1rem', { lineHeight: '1.5rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },

    // Spacing
    spacing: {
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
    },

    // Border radius
    borderRadius: {
        none: '0px',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
    },

    // Shadows
    boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },

    // Z-index layers
    zIndex: {
        dropdown: 10,
        sticky: 20,
        fixed: 30,
        modalBackdrop: 40,
        modal: 50,
        popover: 60,
        tooltip: 70,
    },

    // Animation durations
    transitionDuration: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
    },

    // Component-specific tokens
    components: {
        button: {
            height: {
                sm: '2rem',
                md: '2.5rem',
                lg: '3rem',
            },
            padding: {
                sm: '0.5rem 0.75rem',
                md: '0.625rem 1rem',
                lg: '0.75rem 1.25rem',
            },
        },
        input: {
            height: {
                sm: '2rem',
                md: '2.5rem',
                lg: '3rem',
            },
        },
    },
} as const;

// CSS Custom Properties for runtime theming
export const cssVariables = {
    '--color-primary': designTokens.colors.primary[500],
    '--color-primary-hover': designTokens.colors.primary[600],
    '--color-primary-active': designTokens.colors.primary[700],

    '--color-bg-primary': designTokens.colors.neutral[0],
    '--color-bg-secondary': designTokens.colors.neutral[50],
    '--color-bg-tertiary': designTokens.colors.neutral[100],

    '--color-text-primary': designTokens.colors.neutral[900],
    '--color-text-secondary': designTokens.colors.neutral[700],
    '--color-text-tertiary': designTokens.colors.neutral[500],

    '--color-border-primary': designTokens.colors.neutral[200],
    '--color-border-secondary': designTokens.colors.neutral[300],

    '--shadow-sm': designTokens.boxShadow.sm,
    '--shadow-md': designTokens.boxShadow.md,
    '--shadow-lg': designTokens.boxShadow.lg,

    '--border-radius-sm': designTokens.borderRadius.sm,
    '--border-radius-md': designTokens.borderRadius.md,
    '--border-radius-lg': designTokens.borderRadius.lg,

    '--transition-fast': `${designTokens.transitionDuration[150]} ease-in-out`,
    '--transition-normal': `${designTokens.transitionDuration[200]} ease-in-out`,
    '--transition-slow': `${designTokens.transitionDuration[300]} ease-in-out`,
} as const;

// Dark mode variants
export const darkModeVariables = {
    '--color-bg-primary': designTokens.colors.neutral[900],
    '--color-bg-secondary': designTokens.colors.neutral[800],
    '--color-bg-tertiary': designTokens.colors.neutral[700],

    '--color-text-primary': designTokens.colors.neutral[50],
    '--color-text-secondary': designTokens.colors.neutral[300],
    '--color-text-tertiary': designTokens.colors.neutral[400],

    '--color-border-primary': designTokens.colors.neutral[700],
    '--color-border-secondary': designTokens.colors.neutral[600],
} as const;
