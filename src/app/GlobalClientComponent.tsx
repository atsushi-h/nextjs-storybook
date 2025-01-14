'use client';

import { useEffect } from 'react';

import axios, { setCsrfToken } from '@/lib/axios';

export default function GlobalClientComponent() {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/auth/csrf');
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  return null;
}
