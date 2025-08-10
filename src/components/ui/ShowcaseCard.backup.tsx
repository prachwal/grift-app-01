// ShowcaseCard.tsx - BACKUP PRZED MIGRACJĄ DO preact-nebula-ui

import type { ComponentChildren } from 'preact';

export interface ShowcaseCardProps {
    title: string;
    children: ComponentChildren;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ title, children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
            </h3>
            {children}
        </div>
    );
};
