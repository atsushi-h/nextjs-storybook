'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconDatabase } from '@tabler/icons-react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

import axios from '@/lib/axios';
import { authFormSchema, AuthUpFormType } from '@/features/auth/schema';

export default function AuthForm() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [serverError, setServerError] = useState('');

  // const form = useForm<AuthUpFormType>({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validate: zodResolver(authFormSchema),
  // });

  const handleSubmit = async () => {
    try {
      // if (isRegister) {
      //   await axios.post('/auth/signup', {
      //     email: form.values.email,
      //     password: form.values.password,
      //   });
      // }
      // await axios.post('/auth/login', {
      //   email: form.values.email,
      //   password: form.values.password,
      // });
      // form.reset();
      router.push('/dashboard');
    } catch (e: any) {
      console.error(e);
      setServerError(e.response.data.message);
    }
  };

  return (
    <>
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      {serverError && <p>{serverError}</p>}
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          // label="Email*"
          type="text"
          placeholder="example@gmail.com"
        />
        <input
          id="password"
          // label="Password*"
          type="password"
        />
        <div>
          <p
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister);
              setServerError('');
            }}
          >
            {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
          </p>
          <button color="cyan" type="submit">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
    </>
  );
}
