'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@mantine/core';

import axios from '@/lib/axios';
import UserInfo from '@/components/UserInfo';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

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
      <Button onClick={logout}>Logout</Button>
      <UserInfo />
      <TaskForm />
      <TaskList />
    </>
  );
}
