import type { Meta, StoryObj } from '@storybook/react';

import TaskList from '@/features/todo/components/ui/TaskList';

const meta = {
  title: 'features/todo/TaskList',
  component: TaskList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tasks: [
      {
        id: 5,
        createdAt: new Date('2025-02-01T00:36:01.286Z'),
        updatedAt: new Date('2025-02-01T02:24:35.112Z'),
        title: 'task4',
        description: 'task4',
        userId: 1,
      },
      {
        id: 3,
        createdAt: new Date('2024-12-16T09:39:12.325Z'),
        updatedAt: new Date('2025-01-17T10:40:29.826Z'),
        title: 'task3',
        description: 'task3',
        userId: 1,
      },
      {
        id: 1,
        createdAt: new Date('2024-12-12T10:47:51.482Z'),
        updatedAt: new Date('2024-12-12T10:47:51.482Z'),
        title: 'task1',
        description: 'task1',
        userId: 1,
      },
    ],
  },
};
