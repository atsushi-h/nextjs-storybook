'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import axios from '@/lib/axios';
import UserInfo from '@/features/todo/components/UserInfo';
import TaskForm from '@/features/todo/components/TaskForm';
import TaskList from '@/features/todo/components/TaskList';

export default function Dachboard() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.removeQueries({ queryKey: ['tasks'] });
    await axios.post('/auth/logout');
    router.push('/');
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
      <UserInfo />
      <TaskForm />
      <TaskList />
    </>
  );
}
