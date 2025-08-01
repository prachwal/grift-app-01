export type ThemeMode = 'light' | 'dark' | 'system';
interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    resolvedTheme: 'light' | 'dark';
}
export declare const ThemeProvider: ({ children }: {
    children: preact.ComponentChildren;
}) => import("preact").JSX.Element;
export declare const useTheme: () => ThemeContextType;
export {};
