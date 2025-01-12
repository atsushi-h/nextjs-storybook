'use client';

import { useEffect } from 'react';

import axios from 'axios';

export default function GlobalClientComponent() {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`,
      );
      axios.defaults.headers.common['csrf-token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return null;
}
