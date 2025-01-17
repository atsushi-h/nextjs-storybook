import { List } from '@mantine/core';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Task } from '@prisma/client';

import { useTaskStore } from '@/store/task';
import { useMutateTask } from '@/hooks/useMutateTask';

type Props = Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>;

export default function TaskItem({ id, title, description }: Props) {
  const update = useTaskStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();

  return (
    <List.Item>
      <div className="flex mr-10">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              title,
              description,
            });
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteTaskMutation.mutate(id);
          }}
        />
      </div>
      <span>{title}</span>
    </List.Item>
  );
}
