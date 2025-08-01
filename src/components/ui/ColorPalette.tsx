import type { ComponentChildren } from 'preact';

export interface ColorSwatchProps {
    name: string;
    color: string;
    value: string;
}export const ColorSwatch: React.FC<ColorSwatchProps> = ({
    name,
    color,
    value
}) => {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    return (
        <div
            className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-colors"
            onClick={copyToClipboard}
            title={`Click to copy ${value}`}
            data-testid="color-swatch"
        >
            <div
                className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-600 flex-shrink-0"
                style={{ backgroundColor: color }}
                data-testid="color-box"
            />
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {value}
                </div>
            </div>
        </div>
    );
};

export interface ColorPaletteProps {
    title: string;
    colors: Record<string, string>;
    children?: ComponentChildren;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
    title,
    colors,
    children
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h3>
            {children && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {children}
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(colors).map(([name, value]) => (
                    <ColorSwatch
                        key={name}
                        name={name}
                        color={value}
                        value={value}
                    />
                ))}
            </div>
        </div>
    );
};
