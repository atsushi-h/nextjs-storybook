import { useRouter } from 'next/navigation';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Task } from '@prisma/client';

import axios from '@/lib/axios';
import { useTaskStore } from '@/features/todo/store/task';
import { EditedTask } from '@/features/todo/types';

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const reset = useTaskStore((state) => state.resetEditedTask);

  const createTaskMutation = useMutation({
    mutationFn: async (task: Omit<EditedTask, 'id'>) => {
      const res = await axios.post<EditedTask>('/todo', task);
      return res.data;
    },
    onSuccess: (res) => {
      const previousTodos = queryClient.getQueryData<Task[]>(['tasks']);
      if (previousTodos) {
        queryClient.setQueryData(['tasks'], [res, ...previousTodos]);
      }
      reset();
    },
    onError: (err: any) => {
      reset();
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/');
      }
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (task: EditedTask) => {
      const res = await axios.patch<EditedTask>(`/todo/${task.id}`, task);
      return res.data;
    },
    onSuccess: (res) => {
      const previousTodos = queryClient.getQueryData<Task[]>(['tasks']);
      if (previousTodos) {
        queryClient.setQueryData(
          ['tasks'],
          previousTodos.map((task) => (task.id === res.id ? res : task)),
        );
      }
      reset();
    },
    onError: (err: any) => {
      reset();
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/');
      }
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/todo/${id}`);
    },
    onSuccess: (_, variables) => {
      const previousTodos = queryClient.getQueryData<Task[]>(['tasks']);
      if (previousTodos) {
        queryClient.setQueryData(
          ['tasks'],
          previousTodos.filter((task) => task.id !== variables),
        );
      }
      reset();
    },
    onError: (err: any) => {
      reset();
      if (err.response.status === 401 || err.response.status === 403) {
        router.push('/');
      }
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
