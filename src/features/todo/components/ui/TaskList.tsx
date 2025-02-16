import TaskItem from '@/features/todo/components/ui/TaskItem';
import { Task } from '@prisma/client';

type Props = {
  tasks: Task[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} />
      ))}
    </ul>
  );
}
