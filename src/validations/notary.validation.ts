import { z } from 'zod';
export const notarySchema = z.object({
  full_name: z.string().min(1, { message: 'This is required field' }),
  email: z.string().min(1, { message: 'This is required field' }).email(),
  mobile_number: z
    .string()
    .min(10, { message: 'please enter a valid number' })
    .max(10, { message: 'please enter valid number' })
    .nonempty('This is required field'),
  images: z.object({ url: z.string() }).array(),
});
