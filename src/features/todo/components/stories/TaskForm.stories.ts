import type { Meta, StoryObj } from '@storybook/react';

import TaskForm from '@/features/todo/components/ui/TaskForm';

const meta = {
  title: 'features/todo/TaskForm',
  component: TaskForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
