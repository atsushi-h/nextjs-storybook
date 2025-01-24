import { useQueryUser } from '@/features/auth/hooks/useQueryUser';

export default function UserInfo() {
  const { data: user, status } = useQueryUser();
  if (status === 'pending') return <p>Loding...</p>;
  return <p>{user?.email}</p>;
}
