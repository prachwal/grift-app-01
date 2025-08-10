// LinkCard.tsx - BACKUP PRZED MIGRACJĄ DO preact-nebula-ui

import type { ComponentChildren } from 'preact';
import { Icon } from './Icon';

export interface LinkCardProps {
    href: string;
    icon: ComponentChildren;
    children: ComponentChildren;
    external?: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({
    href,
    icon,
    children,
    external = false
}) => {
    const linkProps = external ? {
        target: "_blank",
        rel: "noopener noreferrer"
    } : {};

    return (
        <a
            href={href}
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            {...linkProps}
        >
            <Icon className="mr-2">
                {icon}
            </Icon>
            {children}
        </a>
    );
};
