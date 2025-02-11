import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor, fn } from '@storybook/test';

import AuthForm from '@/features/auth/components/ui/AuthForm';

const meta = {
  title: 'features/auth/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText('example@gmail.com');
    const passwordInput = canvas.getByPlaceholderText('password');
    const submitButton = canvas.getByRole('button', { name: /Register|Login/i });

    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();
    await expect(submitButton).toBeInTheDocument();

    // 入力
    await userEvent.type(emailInput, 'example@gmail.com');
    await userEvent.type(passwordInput, 'password');

    // submitボタンをクリック
    await userEvent.click(submitButton);

    // submitイベントの発火を確認
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};
