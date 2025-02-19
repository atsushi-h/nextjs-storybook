import type { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import axios from '@/lib/axios';

export const useQueryUser = () => {
  const router = useRouter();
  const getUser = async () => {
    try {
      const { data } = await axios.get<Omit<User, 'hashedPassword'>>('/user');
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
  return useQuery<Omit<User, 'hashedPassword'>, Error>({
    queryKey: ['user'],
    queryFn: getUser,
  });
};
