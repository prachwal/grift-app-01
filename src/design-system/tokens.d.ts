export declare const designTokens: {
    readonly colors: {
        readonly primary: {
            readonly 50: "#f0f9ff";
            readonly 100: "#e0f2fe";
            readonly 200: "#bae6fd";
            readonly 300: "#7dd3fc";
            readonly 400: "#38bdf8";
            readonly 500: "#0ea5e9";
            readonly 600: "#0284c7";
            readonly 700: "#0369a1";
            readonly 800: "#075985";
            readonly 900: "#0c4a6e";
        };
        readonly neutral: {
            readonly 0: "#ffffff";
            readonly 50: "#f9fafb";
            readonly 100: "#f3f4f6";
            readonly 200: "#e5e7eb";
            readonly 300: "#d1d5db";
            readonly 400: "#9ca3af";
            readonly 500: "#6b7280";
            readonly 600: "#4b5563";
            readonly 700: "#374151";
            readonly 800: "#1f2937";
            readonly 900: "#111827";
            readonly 950: "#030712";
        };
        readonly semantic: {
            readonly success: {
                readonly 50: "#f0fdf4";
                readonly 500: "#22c55e";
                readonly 600: "#16a34a";
                readonly 700: "#15803d";
            };
            readonly warning: {
                readonly 50: "#fffbeb";
                readonly 500: "#f59e0b";
                readonly 600: "#d97706";
                readonly 700: "#b45309";
            };
            readonly error: {
                readonly 50: "#fef2f2";
                readonly 500: "#ef4444";
                readonly 600: "#dc2626";
                readonly 700: "#b91c1c";
            };
            readonly info: {
                readonly 50: "#f0f9ff";
                readonly 500: "#3b82f6";
                readonly 600: "#2563eb";
                readonly 700: "#1d4ed8";
            };
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: readonly ["Inter", "system-ui", "sans-serif"];
            readonly mono: readonly ["JetBrains Mono", "Monaco", "monospace"];
        };
        readonly fontSize: {
            readonly xs: readonly ["0.75rem", {
                readonly lineHeight: "1rem";
            }];
            readonly sm: readonly ["0.875rem", {
                readonly lineHeight: "1.25rem";
            }];
            readonly base: readonly ["1rem", {
                readonly lineHeight: "1.5rem";
            }];
            readonly lg: readonly ["1.125rem", {
                readonly lineHeight: "1.75rem";
            }];
            readonly xl: readonly ["1.25rem", {
                readonly lineHeight: "1.75rem";
            }];
            readonly '2xl': readonly ["1.5rem", {
                readonly lineHeight: "2rem";
            }];
            readonly '3xl': readonly ["1.875rem", {
                readonly lineHeight: "2.25rem";
            }];
            readonly '4xl': readonly ["2.25rem", {
                readonly lineHeight: "2.5rem";
            }];
        };
        readonly fontWeight: {
            readonly normal: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
        };
    };
    readonly spacing: {
        readonly 0: "0px";
        readonly 1: "0.25rem";
        readonly 2: "0.5rem";
        readonly 3: "0.75rem";
        readonly 4: "1rem";
        readonly 5: "1.25rem";
        readonly 6: "1.5rem";
        readonly 8: "2rem";
        readonly 10: "2.5rem";
        readonly 12: "3rem";
        readonly 16: "4rem";
        readonly 20: "5rem";
        readonly 24: "6rem";
        readonly 32: "8rem";
    };
    readonly borderRadius: {
        readonly none: "0px";
        readonly sm: "0.125rem";
        readonly base: "0.25rem";
        readonly md: "0.375rem";
        readonly lg: "0.5rem";
        readonly xl: "0.75rem";
        readonly '2xl': "1rem";
        readonly full: "9999px";
    };
    readonly boxShadow: {
        readonly sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
        readonly base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
        readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
        readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
        readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    };
    readonly zIndex: {
        readonly dropdown: 10;
        readonly sticky: 20;
        readonly fixed: 30;
        readonly modalBackdrop: 40;
        readonly modal: 50;
        readonly popover: 60;
        readonly tooltip: 70;
    };
    readonly transitionDuration: {
        readonly 75: "75ms";
        readonly 100: "100ms";
        readonly 150: "150ms";
        readonly 200: "200ms";
        readonly 300: "300ms";
        readonly 500: "500ms";
    };
    readonly components: {
        readonly button: {
            readonly height: {
                readonly sm: "2rem";
                readonly md: "2.5rem";
                readonly lg: "3rem";
            };
            readonly padding: {
                readonly sm: "0.5rem 0.75rem";
                readonly md: "0.625rem 1rem";
                readonly lg: "0.75rem 1.25rem";
            };
        };
        readonly input: {
            readonly height: {
                readonly sm: "2rem";
                readonly md: "2.5rem";
                readonly lg: "3rem";
            };
        };
    };
};
export declare const cssVariables: {
    readonly '--color-primary': "#0ea5e9";
    readonly '--color-primary-hover': "#0284c7";
    readonly '--color-primary-active': "#0369a1";
    readonly '--color-bg-primary': "#ffffff";
    readonly '--color-bg-secondary': "#f9fafb";
    readonly '--color-bg-tertiary': "#f3f4f6";
    readonly '--color-text-primary': "#111827";
    readonly '--color-text-secondary': "#374151";
    readonly '--color-text-tertiary': "#6b7280";
    readonly '--color-border-primary': "#e5e7eb";
    readonly '--color-border-secondary': "#d1d5db";
    readonly '--shadow-sm': "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    readonly '--shadow-md': "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    readonly '--shadow-lg': "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
    readonly '--border-radius-sm': "0.125rem";
    readonly '--border-radius-md': "0.375rem";
    readonly '--border-radius-lg': "0.5rem";
    readonly '--transition-fast': "150ms ease-in-out";
    readonly '--transition-normal': "200ms ease-in-out";
    readonly '--transition-slow': "300ms ease-in-out";
};
export declare const darkModeVariables: {
    readonly '--color-bg-primary': "#111827";
    readonly '--color-bg-secondary': "#1f2937";
    readonly '--color-bg-tertiary': "#374151";
    readonly '--color-text-primary': "#f9fafb";
    readonly '--color-text-secondary': "#d1d5db";
    readonly '--color-text-tertiary': "#9ca3af";
    readonly '--color-border-primary': "#374151";
    readonly '--color-border-secondary': "#4b5563";
};
