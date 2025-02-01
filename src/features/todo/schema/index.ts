import { z } from 'zod';

export const todoFormSchema = z.object({
  title: z.string().min(1, { message: 'No title provided' }),
  description: z.string().optional(),
});

export type TodoFormType = z.infer<typeof todoFormSchema>;
