import { useState } from 'preact/hooks';
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
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const badgeColors = {
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };

    return (
        <div className={`border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-t-lg"
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${title}`}
            >
                <div className="flex items-center gap-3">
                    {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
                    <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
                    {badge && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColors[badgeColor]}`}>
                            {badge}
                        </span>
                    )}
                </div>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        } text-gray-500 dark:text-gray-400`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                id={`accordion-content-${title}`}
                className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
}
