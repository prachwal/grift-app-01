import type { Meta, StoryObj } from '@storybook/preact';
import { fn } from 'storybook/test';

import { Button } from './Button.tsx';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
  args: { onClick: fn() },
  parameters: {
    docs: {
      description: {
        component: `
Button component with consistent design tokens and multiple variants.

Features:
- Multiple variants (primary, secondary, outline, ghost)
- Three sizes (sm, md, lg)
- Dark mode support
- Loading state with spinner
- Disabled state
- Full width option
- Focus management and accessibility
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Button',
  },
};

// States
export const Loading: Story = {
  args: {
    variant: 'primary',
    label: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    label: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="primary" label="Primary" onClick={fn()} />
        <Button variant="secondary" label="Secondary" onClick={fn()} />
        <Button variant="outline" label="Outline" onClick={fn()} />
        <Button variant="ghost" label="Ghost" onClick={fn()} />
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary" size="sm" label="Small" onClick={fn()} />
        <Button variant="primary" size="md" label="Medium" onClick={fn()} />
        <Button variant="primary" size="lg" label="Large" onClick={fn()} />
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary" label="Loading" loading onClick={fn()} />
        <Button variant="secondary" label="Disabled" disabled onClick={fn()} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all button variants, sizes, and states.',
      },
    },
  },
};
