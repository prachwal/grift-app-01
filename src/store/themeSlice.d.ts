type ThemeMode = 'light' | 'dark' | 'system';
interface ThemeState {
    mode: ThemeMode;
}
export declare const setTheme: import("@reduxjs/toolkit").ActionCreatorWithPayload<ThemeMode, "theme/setTheme">;
declare const _default: import("redux").Reducer<ThemeState>;
export default _default;
