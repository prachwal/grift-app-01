import type { ComponentChildren } from 'preact';
export interface IconProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    children: ComponentChildren;
}
export declare const Icon: React.FC<IconProps>;
