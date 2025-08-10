// Accordion.tsx - Migrated to preact-nebula-ui (using Collapse component)

// @ts-ignore - brak definicji typów w pakiecie
import { Collapse, CollapsePanel } from 'preact-nebula-ui';
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

export function Accordion({ children, className = '' }: AccordionProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            {children}
        </div>
    );
}

export function AccordionItem({
    title,
    children,
    defaultOpen = false,
    badge,
    badgeColor = 'gray',
    icon,
    className = ''
}: AccordionItemProps) {
    // Konstruuj header z naszymi dodatkami
    const header = (
        <div className="flex items-center gap-3 w-full">
            {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
            <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
            {badge && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(badgeColor)}`}>
                    {badge}
                </span>
            )}
        </div>
    );

    // Użyj pojedynczy Collapse dla każdego AccordionItem
    const activeKey = defaultOpen ? ['1'] : [];

    return (
        <Collapse
            defaultActiveKey={activeKey}
            className={className}
        >
            <CollapsePanel
                key="1"
                header={header}
            >
                {children}
            </CollapsePanel>
        </Collapse>
    );
}

// Helper function for badge colors
function getBadgeColor(badgeColor: 'blue' | 'green' | 'yellow' | 'red' | 'gray') {
    const badgeColors = {
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };
    return badgeColors[badgeColor];
}
