import type { ComponentChildren } from 'preact';
export interface LinkCardProps {
    href: string;
    icon: ComponentChildren;
    children: ComponentChildren;
    external?: boolean;
}
export declare const LinkCard: React.FC<LinkCardProps>;
