import { signal } from '@preact/signals';

type FontSize = 'small' | 'medium' | 'large' | 'xl';

export interface AppSettings {
    fontSize: FontSize;
}

// Global settings signal
export const settingsSignal = signal<AppSettings>({
    fontSize: 'medium'
});

// Settings actions
export const useAppSettings = () => {
    const setFontSize = (size: FontSize) => {
        settingsSignal.value = { ...settingsSignal.value, fontSize: size };

        // Apply font size to document root
        const fontSizeMap = {
            small: '14px',
            medium: '16px',
            large: '18px',
            xl: '20px'
        };

        document.documentElement.style.fontSize = fontSizeMap[size];
    };

    return {
        settings: settingsSignal,
        setFontSize
    };
};
