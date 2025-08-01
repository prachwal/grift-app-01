import type { FunctionalComponent } from 'preact';
export interface ButtonProps {
    /** Button variant */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    /** Button size */
    size?: 'sm' | 'md' | 'lg';
    /** Button label */
    label: string;
    /** Click handler */
    onClick: (event: Event) => void;
    /** Disabled state */
    disabled?: boolean;
    /** Full width */
    fullWidth?: boolean;
    /** Loading state */
    loading?: boolean;
}
export declare const Button: FunctionalComponent<ButtonProps>;
