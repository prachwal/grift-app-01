import type { Meta, StoryObj } from '@storybook/preact';
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
- Integrated ThemeSwitcher
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  render: () => (
    <Header
      onLogin={() => { }}
      onLogout={() => { }}
      onCreateAccount={() => { }}
      user={null}
    />
  ),
};

export const LoggedIn: Story = {
  render: () => (
    <Header
      onLogin={() => { }}
      onLogout={() => { }}
      onCreateAccount={() => { }}
      user={{ name: 'Jane Doe' }}
    />
  ),
};
