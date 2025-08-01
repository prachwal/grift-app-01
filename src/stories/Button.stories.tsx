import type { Meta, StoryObj } from '@storybook/preact';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
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

// Variant Stories
export const Primary: Story = {
  render: () => (
    <Button
      variant="primary"
      label="Primary Button"
      onClick={() => console.log('Primary clicked')}
    />
  ),
};

export const Secondary: Story = {
  render: () => (
    <Button
      variant="secondary"
      label="Secondary Button"
      onClick={() => console.log('Secondary clicked')}
    />
  ),
};

export const Outline: Story = {
  render: () => (
    <Button
      variant="outline"
      label="Outline Button"
      onClick={() => console.log('Outline clicked')}
    />
  ),
};

export const Ghost: Story = {
  render: () => (
    <Button
      variant="ghost"
      label="Ghost Button"
      onClick={() => console.log('Ghost clicked')}
    />
  ),
};

// Size Stories
export const Small: Story = {
  render: () => (
    <Button
      variant="primary"
      size="sm"
      label="Small Button"
      onClick={() => console.log('Small clicked')}
    />
  ),
};

export const Medium: Story = {
  render: () => (
    <Button
      variant="primary"
      size="md"
      label="Medium Button"
      onClick={() => console.log('Medium clicked')}
    />
  ),
};

export const Large: Story = {
  render: () => (
    <Button
      variant="primary"
      size="lg"
      label="Large Button"
      onClick={() => console.log('Large clicked')}
    />
  ),
};

// State Stories
export const Disabled: Story = {
  render: () => (
    <Button
      variant="primary"
      disabled={true}
      label="Disabled Button"
      onClick={() => console.log('Disabled clicked')}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <Button
      variant="primary"
      loading={true}
      label="Loading Button"
      onClick={() => console.log('Loading clicked')}
    />
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Button
      variant="primary"
      fullWidth={true}
      label="Full Width Button"
      onClick={() => console.log('Full width clicked')}
    />
  ),
  parameters: {
    layout: 'padded',
  },
};

// Showcase Stories
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" label="Primary" onClick={() => { }} />
      <Button variant="secondary" label="Secondary" onClick={() => { }} />
      <Button variant="outline" label="Outline" onClick={() => { }} />
      <Button variant="ghost" label="Ghost" onClick={() => { }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="sm" label="Small" onClick={() => { }} />
      <Button variant="primary" size="md" label="Medium" onClick={() => { }} />
      <Button variant="primary" size="lg" label="Large" onClick={() => { }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" label="Normal" onClick={() => { }} />
      <Button variant="primary" disabled label="Disabled" onClick={() => { }} />
      <Button variant="primary" loading label="Loading" onClick={() => { }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button in different states: normal, disabled, and loading.',
      },
    },
  },
};
