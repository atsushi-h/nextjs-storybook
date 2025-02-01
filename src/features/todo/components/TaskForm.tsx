import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

export default function TaskForm() {
  const { editTaskId } = useTaskStore();
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const form = useForm<TodoFormType>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: zodResolver(todoFormSchema),
  });

  const onSubmit = async (values: TodoFormType) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
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
