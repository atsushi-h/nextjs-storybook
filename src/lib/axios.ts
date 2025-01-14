import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const setCsrfToken = (csrfToken: string) => {
  instance.defaults.headers.common['csrf-token'] = csrfToken;
};

export default instance;
