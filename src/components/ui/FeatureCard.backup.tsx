// FeatureCard.tsx - BACKUP PRZED MIGRACJĄ DO preact-nebula-ui

import type { ComponentChildren } from 'preact';
import { Icon } from './Icon';

export interface FeatureCardProps {
    icon: ComponentChildren;
    iconBgColor: 'primary' | 'success' | 'warning' | 'error';
    title: string;
    description: string;
}

const iconBgClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
    success: 'bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400',
    warning: 'bg-warning-100 dark:bg-warning-900 text-warning-600 dark:text-warning-400',
    error: 'bg-error-100 dark:bg-error-900 text-error-600 dark:text-error-400'
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    iconBgColor,
    title,
    description
}) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300" data-testid="feature-card">
            <div className={`w-12 h-12 ${iconBgClasses[iconBgColor]} rounded-lg flex items-center justify-center mb-4`}>
                <Icon size="lg">
                    {icon}
                </Icon>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
};
