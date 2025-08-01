import type { ComponentChildren } from 'preact';
interface AccordionProps {
    children: ComponentChildren;
    className?: string;
}
interface AccordionItemProps {
    title: string;
    children: ComponentChildren;
    defaultOpen?: boolean;
    badge?: string;
    badgeColor?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
    icon?: ComponentChildren;
    className?: string;
}
export declare function Accordion({ children, className }: AccordionProps): import("preact").JSX.Element;
export declare function AccordionItem({ title, children, defaultOpen, badge, badgeColor, icon, className }: AccordionItemProps): import("preact").JSX.Element;
export {};
