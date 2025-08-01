import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import { SectionHeading } from '../ui/SectionHeading';

describe('SectionHeading', () => {
    it('renders with default props', () => {
        render(<SectionHeading>Test Heading</SectionHeading>);

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Test Heading');
    });

    it('renders h1 when level is 1', () => {
        render(<SectionHeading level={1}>H1 Heading</SectionHeading>);

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('H1 Heading');
    });

    it('renders h3 when level is 3', () => {
        render(<SectionHeading level={3}>H3 Heading</SectionHeading>);

        const heading = screen.getByRole('heading', { level: 3 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('H3 Heading');
    });

    it('applies centered class when centered prop is true', () => {
        render(<SectionHeading centered>Centered Heading</SectionHeading>);

        const heading = screen.getByRole('heading');
        expect(heading).toHaveClass('text-center');
    });

    it('applies custom className', () => {
        render(<SectionHeading className="custom-class">Custom Heading</SectionHeading>);

        const heading = screen.getByRole('heading');
        expect(heading).toHaveClass('custom-class');
    });

    it('applies correct size classes for each level', () => {
        const { rerender } = render(<SectionHeading level={1}>Level 1</SectionHeading>);
        let heading = screen.getByRole('heading');
        expect(heading).toHaveClass('text-4xl', 'md:text-5xl');

        rerender(<SectionHeading level={2}>Level 2</SectionHeading>);
        heading = screen.getByRole('heading');
        expect(heading).toHaveClass('text-3xl');

        rerender(<SectionHeading level={3}>Level 3</SectionHeading>);
        heading = screen.getByRole('heading');
        expect(heading).toHaveClass('text-2xl');
    });
});
