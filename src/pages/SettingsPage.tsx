import { SectionHeading, ShowcaseCard, ColorPalette } from '../components/ui';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Button } from '../components/Button';
import { useAppSettings } from '../hooks/useAppSettings';
import { designTokens } from '../design-system/tokens';

export const SettingsPage: React.FC = () => {
    const { settings, setFontSize } = useAppSettings();
    const currentFontSize = settings.value.fontSize;

    // Extract colors for display
    const primaryColors = Object.entries(designTokens.colors.primary).reduce((acc, [key, value]) => {
        acc[`primary-${key}`] = value;
        return acc;
    }, {} as Record<string, string>);

    const neutralColors = Object.entries(designTokens.colors.neutral).reduce((acc, [key, value]) => {
        acc[`neutral-${key}`] = value;
        return acc;
    }, {} as Record<string, string>);

    const semanticColors = {
        'success-500': designTokens.colors.semantic.success[500],
        'success-600': designTokens.colors.semantic.success[600],
        'warning-500': designTokens.colors.semantic.warning[500],
        'warning-600': designTokens.colors.semantic.warning[600],
        'error-500': designTokens.colors.semantic.error[500],
        'error-600': designTokens.colors.semantic.error[600],
        'info-500': designTokens.colors.semantic.info[500],
        'info-600': designTokens.colors.semantic.info[600],
    };

    const fontSizeOptions = [
        { value: 'small' as const, label: 'Small (14px)' },
        { value: 'medium' as const, label: 'Medium (16px)' },
        { value: 'large' as const, label: 'Large (18px)' },
        { value: 'xl' as const, label: 'Extra Large (20px)' }
    ];

    return (
        <article className="max-w-none text-gray-700 dark:text-gray-300 text-base leading-relaxed transition-colors duration-300">
            <SectionHeading level={1} centered>Settings</SectionHeading>

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Theme Settings */}
                <ShowcaseCard title="Theme Settings">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Color Theme
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                Switch between light and dark mode. The theme preference will be saved locally.
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Theme:
                                </span>
                                <ThemeSwitcher />
                            </div>
                        </div>
                    </div>
                </ShowcaseCard>

                {/* Font Size Settings */}
                <ShowcaseCard title="Typography Settings">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Font Size
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                Adjust the base font size for better readability. This affects the entire application.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {fontSizeOptions.map(option => (
                                    <Button
                                        key={option.value}
                                        variant={currentFontSize === option.value ? 'primary' : 'outline'}
                                        size="sm"
                                        label={option.label}
                                        onClick={() => setFontSize(option.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Font Size Preview */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                            <h5 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Preview Text
                            </h5>
                            <div className="space-y-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                    This is how normal text will appear with your selected font size.
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Small text like captions and helper text.
                                </p>
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Larger headings and important text.
                                </p>
                            </div>
                        </div>
                    </div>
                </ShowcaseCard>

                {/* Color Tokens Preview */}
                <ShowcaseCard title="Design Tokens - Color Palette">
                    <div className="space-y-8">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Click on any color swatch to copy its hex value to the clipboard.
                        </p>

                        <ColorPalette
                            title="Primary Colors"
                            colors={primaryColors}
                        >
                            Main brand colors used for buttons, links, and key UI elements.
                        </ColorPalette>

                        <ColorPalette
                            title="Neutral Colors"
                            colors={neutralColors}
                        >
                            Grayscale colors for text, backgrounds, borders, and other neutral elements.
                        </ColorPalette>

                        <ColorPalette
                            title="Semantic Colors"
                            colors={semanticColors}
                        >
                            Status and feedback colors for success, warning, error, and info states.
                        </ColorPalette>
                    </div>
                </ShowcaseCard>

                {/* Typography Tokens */}
                <ShowcaseCard title="Design Tokens - Typography">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                Font Families
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-900 dark:text-gray-100" style={{ fontFamily: designTokens.typography.fontFamily.sans.join(', ') }}>
                                        Sans Serif - The quick brown fox jumps over the lazy dog
                                    </span>
                                    <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                                        Inter, system-ui
                                    </code>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-900 dark:text-gray-100" style={{ fontFamily: designTokens.typography.fontFamily.mono.join(', ') }}>
                                        Monospace - console.log('Hello World');
                                    </span>
                                    <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                                        JetBrains Mono
                                    </code>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                Font Sizes
                            </h4>
                            <div className="space-y-3">
                                {Object.entries(designTokens.typography.fontSize).map(([name, [size]]) => (
                                    <div key={name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span
                                            className="text-gray-900 dark:text-gray-100"
                                            style={{ fontSize: size }}
                                        >
                                            {name} - Sample text
                                        </span>
                                        <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                                            {size}
                                        </code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ShowcaseCard>
            </div>
        </article>
    );
};
