import type { ComponentChildren } from 'preact';
export interface ColorSwatchProps {
    name: string;
    color: string;
    value: string;
}
export declare const ColorSwatch: React.FC<ColorSwatchProps>;
export interface ColorPaletteProps {
    title: string;
    colors: Record<string, string>;
    children?: ComponentChildren;
}
export declare const ColorPalette: React.FC<ColorPaletteProps>;
