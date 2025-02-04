import React from 'react';
import type { Preview } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { makeQueryClient } from '../src/app/provider';
import '../src/app/globals.css';

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
};

export default preview;
