import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '@/components/ui/loading';

const meta = {
  title: 'components/ui/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
