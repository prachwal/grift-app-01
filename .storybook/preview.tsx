import type { Preview } from '@storybook/preact';
import '../src/index.css'; // Import Tailwind CSS
import { ThemeProvider } from '../src/theme/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        {Story()}
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;