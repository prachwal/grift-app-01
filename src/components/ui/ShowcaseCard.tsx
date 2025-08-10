// ShowcaseCard.tsx - Migrated to preact-nebula-ui

// @ts-ignore - brak definicji typów w pakiecie
import { Card, CardHeader, CardBody } from 'preact-nebula-ui';
import type { ComponentChildren } from 'preact';

export interface ShowcaseCardProps {
    title: string;
    children: ComponentChildren;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ title, children }) => {
    return (
        <Card className="transition-colors duration-300">
            <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
};
