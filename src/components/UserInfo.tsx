import { useQueryUser } from '../hooks/useQueryUser';
import { Loader } from '@mantine/core';

export const UserInfo = () => {
  const { data: user, status } = useQueryUser();
  if (status === 'pending') return <Loader />;
  return <p>{user?.email}</p>;
};
