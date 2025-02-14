'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

import axios from '@/lib/axios';
import { authFormSchema, AuthFormType } from '@/features/auth/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
    } catch (e: any) {
      console.error(e);
      toast({
        title: 'Server Error',
        description: e.response.data.message,
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
          <p className="mt-1 cursor-pointer" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
          </p>
        </form>
      </Form>
    </>
  );
}
