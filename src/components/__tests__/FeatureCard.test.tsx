import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import { FeatureCard } from '../ui/FeatureCard';

describe('FeatureCard', () => {
    const mockIcon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />;

    it('renders feature card with title and description', () => {
        render(
            <FeatureCard
                icon={mockIcon}
                iconBgColor="primary"
                title="Test Feature"
                description="This is a test feature description"
            />
        );

        expect(screen.getByText('Test Feature')).toBeInTheDocument();
        expect(screen.getByText('This is a test feature description')).toBeInTheDocument();
    });

    it('applies correct icon background color classes', () => {
        const { rerender } = render(
            <FeatureCard
                icon={mockIcon}
                iconBgColor="primary"
                title="Test"
                description="Test desc"
            />
        );

        let iconContainer = screen.getByText('Test').closest('div')?.querySelector('div');
        expect(iconContainer).toHaveClass('bg-primary-100', 'dark:bg-primary-900');

        rerender(
            <FeatureCard
                icon={mockIcon}
                iconBgColor="success"
                title="Test"
                description="Test desc"
            />
        );

        iconContainer = screen.getByText('Test').closest('div')?.querySelector('div');
        expect(iconContainer).toHaveClass('bg-success-100', 'dark:bg-success-900');
    });

    it('renders icon within icon container', () => {
        render(
            <FeatureCard
                icon={mockIcon}
                iconBgColor="warning"
                title="Icon Test"
                description="Testing icon rendering"
            />
        );

        const iconContainer = screen.getByText('Icon Test').closest('div')?.querySelector('div');
        const svgIcon = iconContainer?.querySelector('svg');

        expect(svgIcon).toBeInTheDocument();
        expect(svgIcon?.querySelector('path')).toBeInTheDocument();
    });

    it('has proper structure and styling classes', () => {
        render(
            <FeatureCard
                icon={mockIcon}
                iconBgColor="error"
                title="Styling Test"
                description="Testing CSS classes"
            />
        );

        const card = screen.getByTestId('feature-card');
        expect(card).toHaveClass('bg-gray-50', 'dark:bg-gray-700', 'rounded-lg', 'p-6'); const title = screen.getByText('Styling Test');
        expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-900', 'dark:text-gray-100');

        const description = screen.getByText('Testing CSS classes');
        expect(description).toHaveClass('text-gray-600', 'dark:text-gray-400');
    });
});
