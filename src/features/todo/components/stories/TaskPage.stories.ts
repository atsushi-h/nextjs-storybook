import type { Meta, StoryObj } from '@storybook/react';

import TaskPage from '@/features/todo/components/ui/TaskPage';

const meta = {
  title: 'features/todo/TaskPage',
  component: TaskPage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TaskPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
