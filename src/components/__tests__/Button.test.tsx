import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Button } from '../../stories/Button';

describe('Button', () => {
    it('renders with label', () => {
        render(
            <Button
                label="Test Button"
                onClick={() => { }}
            />
        );

        expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('applies primary variant styling', () => {
        render(
            <Button
                variant="primary"
                label="Primary Button"
                onClick={() => { }}
            />
        );

        const button = screen.getByText('Primary Button');
        expect(button).toHaveClass('bg-primary-500');
    });

    it('applies secondary variant styling by default', () => {
        render(
            <Button
                label="Secondary Button"
                onClick={() => { }}
            />
        );

        const button = screen.getByText('Secondary Button');
        expect(button).toHaveClass('bg-gray-100');
    });

    it('applies outline variant styling', () => {
        render(
            <Button
                variant="outline"
                label="Outline Button"
                onClick={() => { }}
            />
        );

        const button = screen.getByText('Outline Button');
        expect(button).toHaveClass('bg-transparent', 'border');
    });

    it('applies correct size classes', () => {
        const { rerender } = render(
            <Button
                size="sm"
                label="Small Button"
                onClick={() => { }}
            />
        );

        let button = screen.getByText('Small Button');
        expect(button).toHaveClass('h-8', 'px-3', 'py-1.5');

        rerender(
            <Button
                size="lg"
                label="Large Button"
                onClick={() => { }}
            />
        );

        button = screen.getByText('Large Button');
        expect(button).toHaveClass('h-12', 'px-6', 'py-3');
    });

    it('handles click events', () => {
        const handleClick = vi.fn();
        render(
            <Button
                label="Click Me"
                onClick={handleClick}
            />
        );

        const button = screen.getByText('Click Me');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        const handleClick = vi.fn();
        render(
            <Button
                label="Disabled Button"
                onClick={handleClick}
                disabled
            />
        );

        const button = screen.getByText('Disabled Button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');

        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows loading state with spinner', () => {
        render(
            <Button
                label="Loading Button"
                onClick={() => { }}
                loading
            />
        );

        const button = screen.getByText('Loading Button');
        expect(button).toBeDisabled();

        // Check for spinner SVG
        const spinner = button.querySelector('svg');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('animate-spin');
    });

    it('applies full width when specified', () => {
        render(
            <Button
                label="Full Width Button"
                onClick={() => { }}
                fullWidth
            />
        );

        const button = screen.getByText('Full Width Button');
        expect(button).toHaveClass('w-full');
    });

    it('has proper accessibility attributes', () => {
        render(
            <Button
                label="Accessible Button"
                onClick={() => { }}
            />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
});
