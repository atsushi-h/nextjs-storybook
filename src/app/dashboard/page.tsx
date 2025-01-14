'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

import axios from '@/lib/axios';

export default function Dachboard() {
  const router = useRouter();
  const logout = async () => {
    await axios.post('/auth/logout');
    router.push('/');
  };

  return (
    <>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
