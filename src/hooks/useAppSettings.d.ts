type FontSize = 'small' | 'medium' | 'large' | 'xl';
export interface AppSettings {
    fontSize: FontSize;
}
export declare const settingsSignal: import("@preact/signals-core").Signal<AppSettings>;
export declare const useAppSettings: () => {
    settings: import("@preact/signals-core").Signal<AppSettings>;
    setFontSize: (size: FontSize) => void;
};
export {};
