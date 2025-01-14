import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { User } from '@prisma/client';

import axios from '@/lib/axios';

export const useQueryUser = () => {
  const router = useRouter();
  const getUser = async () => {
    try {
      const { data } = await axios.get<Omit<User, 'hashedPassword'>>('/user');
      return data;
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push('/');
      }
      throw err;
    }
  };
  return useQuery<Omit<User, 'hashedPassword'>, Error>({
    queryKey: ['user'],
    queryFn: getUser,
  });
};
