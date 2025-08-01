import type { ComponentChildren } from 'preact';

export interface FeatureGridProps {
    children: ComponentChildren;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    );
};
