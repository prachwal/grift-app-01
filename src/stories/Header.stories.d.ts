import type { Meta, StoryObj } from '@storybook/preact';
import { Header } from '../layouts/Header.tsx';
declare const meta: Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const LoggedOut: Story;
export declare const LoggedIn: Story;
