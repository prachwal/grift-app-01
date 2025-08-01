import type { ComponentChildren } from 'preact';
export interface SectionHeadingProps {
    level?: 1 | 2 | 3;
    className?: string;
    centered?: boolean;
    children: ComponentChildren;
}
export declare const SectionHeading: React.FC<SectionHeadingProps>;
