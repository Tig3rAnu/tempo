import { z } from 'zod';
const MAX_FILE_SIZE = 100000;
const ACCEPTED_IMAGE_TYPES = ['pdf'];

export const commonSchema = z.object({
  full_name: z
    .string()
    .nonempty({ message: 'Full name is required field' })
    .min(3, { message: 'Name must have at least 3 characters.' })
    .max(20, {
      message:
        'The maximum allowed value is 16. Please enter a value less than or equal to 20.',
    }),
  email: z
    .string()
    .nonempty({ message: 'Email is required field' })
    .email({ message: 'please enter a valid email' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required field' })
    .regex(
      /^(?=.*[0-9])(?=.*[@\-_#])[a-zA-Z0-9@\-_#]{10,}$/,
      'Password must contain at least one number and one special character (@, -, _, #)'
    )
    .min(10, {
      message:
        'Your password must contain at least 10 characters. Please try again.',
    })
    .max(16, {
      message:
        'The maximum allowed value is 16. Please enter a value less than or equal to 16.',
    }),
  user_name: z
    .string()
    .nonempty({ message: 'Username is required field' })
    .regex(
      /^(?=.*[0-9])(?=.*[@\-_])[a-zA-Z0-9@\-_]{8,}$/,
      'user name must contain at least one number and one special character (@, -, _,)'
    ),
  user_type: z.string().nonempty({ message: 'Please select a user type' }),
  mobile_prefix: z.string().nonempty({ message: 'Mobile Number is required' }),
  mobile_number: z.string().nonempty({ message: 'Mobile Number is required' }),
});

export const agentSchema = z
  .object({
    agent: z.object({
      company_name: z.string().nonempty({
        message: 'Company Name is required',
      }),
      gst_number: z
        .string()
        .nonempty({ message: 'GST number is required field' }),
      company_registration: z
        .string()
        .nonempty({ message: 'Company Registration is required' }),
    }),
  })
  .merge(commonSchema);

export const studentSchema = z
  .object({
    student: z.object({
      father_name: z.string().nonempty({ message: 'Father name is required' }),
      dob: z.date().refine((value) => value !== null, {
        message: 'Date of Birth is required',
      }),
      passport_number: z.string().optional(),
    }),
  })
  .merge(commonSchema);
