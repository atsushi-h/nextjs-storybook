'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@mantine/core';

export default function Dachboard() {
  const router = useRouter();
  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/');
  };

  return (
    <>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
