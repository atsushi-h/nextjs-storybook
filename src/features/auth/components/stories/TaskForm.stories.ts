import type { Meta, StoryObj } from '@storybook/react';

import AuthForm from '@/features/auth/components/ui/AuthForm';

const meta = {
  title: 'features/auth/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
