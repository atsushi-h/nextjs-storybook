import { z } from 'zod';

export const signUpFormSchema = z.object({
  email: z.string().min(1, { message: 'No email provided' }).email({ message: 'Invalid email' }),
  password: z.string().min(5, { message: 'Password should be min 5 chars' }),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
