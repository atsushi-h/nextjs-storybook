import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Task } from '@prisma/client';

import axios from '@/lib/axios';

export const useQueryTasks = () => {
  const router = useRouter();

  const getTasks = async () => {
    try {
      const { data } = await axios.get<Task[]>('/todo');
      return data;
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push('/');
      }
      throw err;
    }
  };

  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};
