'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type AuthFormType, authFormSchema } from '@/features/auth/schema';
import { useToast } from '@/hooks/use-toast';
import axios from '@/lib/axios';

type Props = {
  onSubmit?: (values: AuthFormType) => void;
};

export default function AuthForm({ onSubmit }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(false);

  const form = useForm<AuthFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authFormSchema),
  });

  const defaultOnSubmit = async (values: AuthFormType) => {
    try {
      if (isRegister) {
        await axios.post('/auth/signup', {
          email: values.email,
          password: values.password,
        });
      }
      await axios.post('/auth/login', {
        email: values.email,
        password: values.password,
      });
      form.reset();
      router.push('/dashboard');
    } catch (e: unknown) {
      console.error(e);

      let errorMessage = 'An unexpected error occurred';

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      if (typeof e === 'object' && e !== null && 'response' in e) {
        const axiosError = e as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }

      toast({
        title: 'Server Error',
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <ShieldCheckIcon className="h-16 w-16 text-blue-500 mx-auto" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit || defaultOnSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email*</FormLabel>
                <FormControl>
                  <Input id="email" placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password*</FormLabel>
                <FormControl>
                  <Input id="password" type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isRegister ? 'Register' : 'Login'}</Button>
          <button
            type="button"
            className="mt-1 cursor-pointer bg-transparent border-none p-0"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
          </button>
        </form>
      </Form>
    </>
  );
}
