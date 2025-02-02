'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

import axios from '@/lib/axios';
import { authFormSchema, AuthUpFormType } from '@/features/auth/schema';
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

export default function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(false);

  const form = useForm<AuthUpFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = async (values: AuthUpFormType) => {
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
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
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
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
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
