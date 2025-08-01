import type { Meta, StoryObj } from '@storybook/preact';
import { fn } from 'storybook/test';

import { Header } from './Header.tsx';

const meta: Meta<typeof Header> = {
  title: 'Design System/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Header component with sticky positioning and semi-transparent backdrop.

Features:
- Sticky positioning with backdrop blur
- Semi-transparent background
- Brand logo and navigation
- User authentication states
- Dark mode support
- Responsive design
- Smooth transitions
        `,
      },
    },
  },
  argTypes: {
    onLogin: { action: 'onLogin' },
    onLogout: { action: 'onLogout' },
    onCreateAccount: { action: 'onCreateAccount' },
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    user: null,
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

// Demo with content below to show sticky behavior
export const WithScrollableContent: Story = {
  render: (args) => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header {...args} />
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Scroll to see the sticky header effect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The header remains fixed at the top with a semi-transparent backdrop blur effect.
            </p>
          </section>

          {Array.from({ length: 20 }, (_, i) => (
            <section key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Section {i + 1}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                This is content section {i + 1}. The header should remain visible and semi-transparent
                as you scroll through this content. The backdrop blur effect creates a modern
                glass-morphism appearance.
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  ),
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the sticky header behavior with scrollable content underneath.',
      },
    },
  },
};
