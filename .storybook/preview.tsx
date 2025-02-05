import React from 'react';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { QueryClientProvider } from '@tanstack/react-query';

import { makeQueryClient } from '../src/app/provider';
import '../src/app/globals.css';

// Initialize MSW
initialize();

const queryClient = makeQueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
