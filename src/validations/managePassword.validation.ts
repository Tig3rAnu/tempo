import { z } from 'zod';

export const managePasswordSchema = z.object({
  oldPassword: z.string().min(2, {
    message: 'Old Password',
  }),
  new_password: z.string().min(2, {
    message: 'Password',
  }),
  confirmPassword: z.string().min(2, {
    message: 'Confirm Password',
  }),
});

export const userInfoSchema = z.object({
  full_name: z.string().min(1, {
    message: 'This is a required field',
  }),
  email: z.string().min(1, {
    message: 'This is a required field',
  }),
  mobile: z.string().min(1, {
    message: 'This is a required field',
  }),
  mobile_prefix: z.string().min(1, {
    message: 'This is a required field',
  }),
});
