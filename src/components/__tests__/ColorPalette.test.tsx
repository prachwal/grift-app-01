import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ColorSwatch, ColorPalette } from '../ui/ColorPalette';

// Mock clipboard API
const mockWriteText = vi.fn();
Object.assign(navigator, {
    clipboard: {
        writeText: mockWriteText,
    },
});

describe('ColorSwatch', () => {
    beforeEach(() => {
        mockWriteText.mockClear();
    });

    it('renders color swatch with name and value', () => {
        render(
            <ColorSwatch
                name="Primary Blue"
                color="#0ea5e9"
                value="#0ea5e9"
            />
        );

        expect(screen.getByText('Primary Blue')).toBeInTheDocument();
        expect(screen.getByText('#0ea5e9')).toBeInTheDocument();
    });

    it('displays color as background color', () => {
        render(
            <ColorSwatch
                name="Red"
                color="#ef4444"
                value="#ef4444"
            />
        );

        const colorBox = screen.getByTestId('color-box');
        expect(colorBox).toHaveStyle({ backgroundColor: '#ef4444' });
    }); it('copies color value to clipboard when clicked', async () => {
        render(
            <ColorSwatch
                name="Green"
                color="#22c55e"
                value="#22c55e"
            />
        );

        const swatch = screen.getByTestId('color-swatch');
        fireEvent.click(swatch); await waitFor(() => {
            expect(mockWriteText).toHaveBeenCalledWith('#22c55e');
        });
    });

    it('handles clipboard errors gracefully', async () => {
        mockWriteText.mockRejectedValueOnce(new Error('Clipboard not available'));
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <ColorSwatch
                name="Error Color"
                color="#000000"
                value="#000000"
            />
        );

        const swatch = screen.getByTestId('color-swatch');
        fireEvent.click(swatch); await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Failed to copy to clipboard:', expect.any(Error));
        });

        consoleSpy.mockRestore();
    });

    it('has proper styling classes', () => {
        render(
            <ColorSwatch
                name="Style Test"
                color="#ffffff"
                value="#ffffff"
            />
        );

        const swatch = screen.getByTestId('color-swatch');
        expect(swatch).toHaveClass('flex', 'items-center', 'gap-3', 'p-3', 'rounded-lg');
        expect(swatch).toHaveClass('hover:border-gray-300', 'cursor-pointer', 'transition-colors');
    });
});

describe('ColorPalette', () => {
    const mockColors = {
        'blue-500': '#3b82f6',
        'red-500': '#ef4444',
        'green-500': '#22c55e'
    };

    it('renders palette title', () => {
        render(
            <ColorPalette
                title="Test Palette"
                colors={mockColors}
            />
        );

        expect(screen.getByText('Test Palette')).toBeInTheDocument();
    });

    it('renders all color swatches', () => {
        render(
            <ColorPalette
                title="All Colors"
                colors={mockColors}
            />
        );

        expect(screen.getByText('blue-500')).toBeInTheDocument();
        expect(screen.getByText('red-500')).toBeInTheDocument();
        expect(screen.getByText('green-500')).toBeInTheDocument();
    });

    it('renders children description when provided', () => {
        render(
            <ColorPalette
                title="Palette with Description"
                colors={mockColors}
            >
                <p>This is a description of the color palette.</p>
            </ColorPalette>
        );

        expect(screen.getByText('This is a description of the color palette.')).toBeInTheDocument();
    });

    it('renders empty palette when no colors provided', () => {
        render(
            <ColorPalette
                title="Empty Palette"
                colors={{}}
            />
        );

        expect(screen.getByText('Empty Palette')).toBeInTheDocument();
        const grid = screen.getByText('Empty Palette').parentElement?.querySelector('.grid');
        expect(grid?.children).toHaveLength(0);
    });

    it('has proper grid layout classes', () => {
        render(
            <ColorPalette
                title="Grid Test"
                colors={mockColors}
            />
        );

        const grid = screen.getByText('Grid Test').parentElement?.querySelector('.grid');
        expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-3');
    });
});
