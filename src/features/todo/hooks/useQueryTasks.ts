import type { Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import axios from '@/lib/axios';

export const useQueryTasks = () => {
  const router = useRouter();

  const getTasks = async () => {
    try {
      const { data } = await axios.get<Task[]>('/todo');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error && 'response' in err && err.response) {
        const response = err.response as { status?: number };
        if (response.status === 401 || response.status === 403) {
          router.push('/');
        }
      }
      throw err;
    }
  };

  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
};
