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
export declare const HeroSection: React.FC<HeroSectionProps>;
