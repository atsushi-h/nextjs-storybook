import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().min(1, { message: 'No email provided' }).email({ message: 'Invalid email' }),
  password: z.string().min(5, { message: 'Password should be min 5 chars' }),
});

export type AuthFormType = z.infer<typeof authFormSchema>;
