// FeatureGrid.tsx - Migrated to preact-nebula-ui

// @ts-ignore - brak definicji typów w pakiecie
import { Grid } from 'preact-nebula-ui';
import type { ComponentChildren } from 'preact';

export interface FeatureGridProps {
    children: ComponentChildren;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ children }) => {
    return (
        <Grid
            cols={{ base: 1, md: 2, lg: 3 }}
            gap="6"
        >
            {children}
        </Grid>
    );
};
