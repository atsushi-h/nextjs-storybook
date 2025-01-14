'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { Anchor, TextInput, Button, Group, Stack, PasswordInput, Alert } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import axios from '@/lib/axios';
import { signUpFormSchema } from '@/validate/auth';
import { AuthForm } from '@/types';

export default function Home() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [serverError, setServerError] = useState('');

  const form = useForm<AuthForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(signUpFormSchema),
  });

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post('/auth/signup', {
          email: form.values.email,
          password: form.values.password,
        });
      }
      await axios.post('/auth/login', {
        email: form.values.email,
        password: form.values.password,
      });
      form.reset();
      router.push('/dashboard');
    } catch (e: any) {
      console.error(e);
      setServerError(e.response.data.message);
    }
  };

  return (
    <Stack align="center">
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      {serverError && (
        <Alert
          my="md"
          variant="filled"
          icon={<ExclamationCircleIcon />}
          title="Authorization Error"
          color="red"
          radius="md"
        >
          {serverError}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt="md"
          id="email"
          label="Email*"
          placeholder="example@gmail.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          id="password"
          placeholder="password"
          label="Password*"
          description="Must be min 5 char"
          {...form.getInputProps('password')}
        />
        <Group mt="xl">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister);
              setServerError('');
            }}
          >
            {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
          </Anchor>
          <Button leftSection={<IconDatabase size={14} />} color="cyan" type="submit">
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
