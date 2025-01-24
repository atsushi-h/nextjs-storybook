import { IconCircleDashed } from '@tabler/icons-react';

import { useQueryTasks } from '@/features/todo/hooks/useQueryTasks';
import TaskItem from '@/features/todo/components/TaskItem';

export default function TaskList() {
  const { data: tasks, status } = useQueryTasks();

  if (status === 'pending') return <p>Loding...</p>;

  return (
    <ul>
      {tasks?.map((task) => (
        <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} />
      ))}
    </ul>
  );
}
