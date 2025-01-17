import { FormEvent } from 'react';
import { TextInput, Button, Center } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';

import { useTaskStore } from '@/store/task';
import { useMutateTask } from '@/hooks/useMutateTask';

export default function TaskForm() {
  const { editedTask } = useTaskStore();
  const update = useTaskStore((state) => state.updateEditedTask);
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.id === 0) {
      createTaskMutation.mutate({
        title: editedTask.title,
        description: editedTask.description,
      });
    } else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        mt="md"
        placeholder="title"
        value={editedTask.title || ''}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <TextInput
        mt="md"
        placeholder="description"
        value={editedTask.description || ''}
        onChange={(e) => update({ ...editedTask, description: e.target.value })}
      />
      <Center mt="lg">
        <Button
          disabled={editedTask.title === ''}
          leftSection={<IconDatabase size={14} />}
          color="cyan"
          type="submit"
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </Button>
      </Center>
    </form>
  );
}
