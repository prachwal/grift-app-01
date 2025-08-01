import type { Meta, StoryObj } from '@storybook/preact';
import { HomePage } from '../pages/HomePage.tsx';
declare const meta: Meta<typeof HomePage>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const LoggedOut: Story;
export declare const LoggedIn: Story;
