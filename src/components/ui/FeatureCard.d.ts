import type { ComponentChildren } from 'preact';
export interface FeatureCardProps {
    icon: ComponentChildren;
    iconBgColor: 'primary' | 'success' | 'warning' | 'error';
    title: string;
    description: string;
}
export declare const FeatureCard: React.FC<FeatureCardProps>;
