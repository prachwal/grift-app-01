// LinkCard.tsx - Migrated to preact-nebula-ui (with type workaround)

// @ts-ignore - brak definicji typów w pakiecie
import { Card, CardBody } from 'preact-nebula-ui';
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
        <a href={href} {...linkProps} className="block">
            <Card className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <CardBody className="px-6 py-3">
                    <div className="inline-flex items-center text-gray-700 dark:text-gray-300">
                        <Icon className="mr-2">
                            {icon}
                        </Icon>
                        {children}
                    </div>
                </CardBody>
            </Card>
        </a>
    );
};
