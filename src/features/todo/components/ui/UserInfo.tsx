import { Loading } from '@/components/ui/loading';
import { useQueryUser } from '@/features/auth/hooks/useQueryUser';

export default function UserInfo() {
  const { data: user, status } = useQueryUser();
  if (status === 'pending') return <Loading />;
  return <p>{user?.email}</p>;
}
