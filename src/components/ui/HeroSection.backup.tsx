// HeroSection.tsx - BACKUP PRZED MIGRACJĄ DO preact-nebula-ui

import { Button } from '../Button';

export interface HeroSectionProps {
    title: string;
    subtitle?: string;
    description: string;
    primaryButton?: {
        label: string;
        onClick: () => void;
    };
    secondaryButton?: {
        label: string;
        onClick: () => void;
    };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    description,
    primaryButton,
    secondaryButton
}) => {
    return (
        <section className="mb-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    {title}
                    {subtitle && (
                        <span className="block text-primary-600 dark:text-primary-400 mt-2">
                            {subtitle}
                        </span>
                    )}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    {description}
                </p>
                {(primaryButton || secondaryButton) && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {primaryButton && (
                            <Button
                                variant="primary"
                                size="lg"
                                label={primaryButton.label}
                                onClick={primaryButton.onClick}
                            />
                        )}
                        {secondaryButton && (
                            <Button
                                variant="outline"
                                size="lg"
                                label={secondaryButton.label}
                                onClick={secondaryButton.onClick}
                            />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
