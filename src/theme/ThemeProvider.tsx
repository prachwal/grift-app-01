import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

const getStoredTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem('theme') as ThemeMode) || 'system';
    }
    return 'system';
};

export const ThemeProvider = ({ children }: { children: preact.ComponentChildren }) => {
    const [mode, setModeState] = useState<ThemeMode>(getStoredTheme);
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newMode);
        }
    };

    useEffect(() => {
        const applyTheme = (theme: ThemeMode) => {
            const root = document.documentElement;
            let actualTheme: 'light' | 'dark';

            if (theme === 'system') {
                actualTheme = getSystemTheme();
            } else {
                actualTheme = theme;
            }

            setResolvedTheme(actualTheme);

            // Remove both classes first
            root.classList.remove('light', 'dark');
            // Add the correct class
            root.classList.add(actualTheme);
        };

        applyTheme(mode);

        // Listen for system theme changes
        if (mode === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyTheme(mode);
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, setMode, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};