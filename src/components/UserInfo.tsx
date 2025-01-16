import { Loader } from '@mantine/core';

import { useQueryUser } from '@/hooks/useQueryUser';

export default function UserInfo() {
  const { data: user, status } = useQueryUser();
  if (status === 'pending') return <Loader />;
  return <p>{user?.email}</p>;
}
