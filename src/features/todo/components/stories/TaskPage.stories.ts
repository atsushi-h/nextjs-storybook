import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import TaskPage from '@/features/todo/components/ui/TaskPage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const meta = {
  title: 'features/todo/TaskPage',
  component: TaskPage,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        http.get(`${API_URL}/user`, () => {
          return HttpResponse.json({
            id: 1,
            createdAt: '2024-12-07T01:39:56.484Z',
            updatedAt: '2024-12-09T11:11:55.268Z',
            email: 'user1@test.com',
            nickName: 'test1',
          });
        }),
        http.get(`${API_URL}/todo`, () => {
          return HttpResponse.json([
            {
              id: 5,
              createdAt: '2025-02-01T00:36:01.286Z',
              updatedAt: '2025-02-01T02:24:35.112Z',
              title: 'task4',
              description: 'task4',
              userId: 1,
            },
            {
              id: 3,
              createdAt: '2024-12-16T09:39:12.325Z',
              updatedAt: '2025-01-17T10:40:29.826Z',
              title: 'task3',
              description: 'task3',
              userId: 1,
            },
            {
              id: 1,
              createdAt: '2024-12-12T10:47:51.482Z',
              updatedAt: '2024-12-12T10:47:51.482Z',
              title: 'task1',
              description: 'task1',
              userId: 1,
            },
          ]);
        }),
      ],
    },
  },
} satisfies Meta<typeof TaskPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
