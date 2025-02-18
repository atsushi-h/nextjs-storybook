'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import TaskForm from '@/features/todo/components/ui/TaskForm';
import TaskList from '@/features/todo/components/ui/TaskList';
import UserInfo from '@/features/todo/components/ui/UserInfo';
import { useQueryTasks } from '@/features/todo/hooks/useQueryTasks';
import axios from '@/lib/axios';

export default function TaskPage() {
  const { data: tasks, status } = useQueryTasks();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.removeQueries({ queryKey: ['tasks'] });
    await axios.post('/auth/logout');
    router.push('/');
  };

  if (status === 'pending') return <Loading />;

  return (
    <>
      <Button onClick={logout}>Logout</Button>
      <UserInfo />
      <TaskForm tasks={tasks} />
      <div className="mt-10">{tasks && tasks.length && <TaskList tasks={tasks} />}</div>
    </>
  );
}
