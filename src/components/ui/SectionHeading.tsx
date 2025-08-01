import type { ComponentChildren } from 'preact';

export interface SectionHeadingProps {
    level?: 1 | 2 | 3;
    className?: string;
    centered?: boolean;
    children: ComponentChildren;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    level = 2,
    className = '',
    centered = false,
    children
}) => {
    const baseClasses = 'font-bold text-gray-900 dark:text-gray-100 mb-8';
    const levelClasses = {
        1: 'text-4xl md:text-5xl mb-6 leading-tight',
        2: 'text-3xl',
        3: 'text-2xl'
    };
    const centerClass = centered ? 'text-center' : '';

    const combinedClasses = `${baseClasses} ${levelClasses[level]} ${centerClass} ${className}`;

    if (level === 1) {
        return <h1 className={combinedClasses}>{children}</h1>;
    } else if (level === 2) {
        return <h2 className={combinedClasses}>{children}</h2>;
    } else {
        return <h3 className={combinedClasses}>{children}</h3>;
    }
};
