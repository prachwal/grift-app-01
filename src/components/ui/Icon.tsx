import type { ComponentChildren } from 'preact';

export interface IconProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    children: ComponentChildren;
}

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
};

export const Icon: React.FC<IconProps> = ({
    className = '',
    size = 'md',
    children
}) => {
    return (
        <svg
            className={`${sizeClasses[size]} ${className}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            {children}
        </svg>
    );
};
