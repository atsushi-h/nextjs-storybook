import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import TaskForm from '@/features/todo/components/ui/TaskForm';

const meta = {
  title: 'features/todo/TaskForm',
  component: TaskForm,
  parameters: {
    layout: 'centered',
  },
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof TaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const titleInput = canvas.getByPlaceholderText('title');
    const descriptionInput = canvas.getByPlaceholderText('description');
    const submitButton = canvas.getByRole('button', { name: /Create|Update/i });

    await expect(titleInput).toBeInTheDocument();
    await expect(descriptionInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();

    // 入力
    await userEvent.type(titleInput, 'Test Title');
    await userEvent.type(descriptionInput, 'Test Description');

    // submitボタンをクリック
    await userEvent.click(submitButton);

    // submitイベントの発火を確認
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};
