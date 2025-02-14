import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';

import { useTaskStore } from '@/features/todo/store/task';
import { useMutateTask } from '@/features/todo/hooks/useMutateTask';
import { todoFormSchema, TodoFormType } from '@/features/todo/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  tasks?: Task[];
  onSubmit?: (values: TodoFormType) => void;
};

export default function TaskForm({ tasks, onSubmit }: Props) {
  const { editTaskId } = useTaskStore();
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const form = useForm<TodoFormType>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: zodResolver(todoFormSchema),
  });

  const defaultOnSubmit = async (values: TodoFormType) => {
    if (editTaskId === 0) {
      createTaskMutation.mutate(
        {
          title: values.title,
          description: values.description,
        },
        {
          onSuccess: () => form.reset(),
          onError: (error: any) => {
            console.error('Error: createTaskMutation', error);
          },
        },
      );
    } else {
      updateTaskMutation.mutate(
        {
          id: editTaskId,
          title: values.title,
          description: values.description,
        },
        {
          onSuccess: () => form.reset(),
          onError: (error: any) => {
            console.error('Error: updateTaskMutation', error);
          },
        },
      );
    }
  };

  useEffect(() => {
    const editTask = tasks?.find((task) => task.id === editTaskId);
    if (editTask) {
      form.setValue('title', editTask.title, { shouldValidate: true });
      form.setValue('description', editTask.description || '', { shouldValidate: true });
    }
  }, [editTaskId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit || defaultOnSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Title*</FormLabel>
              <FormControl>
                <Input id="title" placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Input id="description" placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          {editTaskId === 0 ? 'Create' : 'Update'}
        </Button>
      </form>
    </Form>
  );
}
