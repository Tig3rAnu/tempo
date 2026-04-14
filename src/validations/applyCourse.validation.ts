import { z } from 'zod';

export const applyCourseSchema = z.object({
  full_name: z.string().min(1, { message: 'This field is required.' }),
  father_name: z.string().min(1, { message: 'This field is required.' }),
  mother_name: z.string().min(1, { message: 'This field is required.' }),
  email: z.string().min(1, { message: 'This field is required.' }).email(),
  mobile_prefix: z.string().optional(),
  mobile_number: z
    .string()
    .min(10, { message: 'minimum 10 digits are allowed' })
    .max(10, { message: 'maximum 10 digits are allowed' }),
  citizen: z.string().optional(),
  passport_number: z.string().optional(),
  city: z.string().min(1, { message: 'This field is required.' }),
  state: z.string().min(1, { message: 'This field is required.' }),
  zipcode: z.string().min(1, { message: 'This field is required.' }),
  apply_for_masters: z.boolean().optional(),
  schooling: z.object({
    secondary_education_board: z
      .string()
      .min(1, { message: 'This field is required' }),
    secondary_grades: z.string().min(1, { message: 'This field is required' }),
    higher_secondary_education_board: z
      .string()
      .min(1, { message: 'This field is required' }),
    higher_grades: z.string().min(1, { message: 'This field is required' }),
    stream: z.string().min(1, { message: 'This field is required' }),
  }),
  images: z.object({ url: z.string() }).array(),
});

const bachelorEducation = z.object({
  bachelorEducation: z.object({
    university_name: z.string().optional(),
    degree: z.string().optional(),
    grades: z.string().optional(),
  }),
});

const addCustomValidation = applyCourseSchema.merge(bachelorEducation);
export const formSchema = addCustomValidation.superRefine((data, ctx) => {
  if (data.apply_for_masters && data?.bachelorEducation?.degree === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'This field is required',
      path: ['bachelorEducation.degree'],
    });
  }
  if (
    data.apply_for_masters &&
    data?.bachelorEducation?.university_name === ''
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'This field is required',
      path: ['bachelorEducation.university_name'],
    });
  }
  if (data.apply_for_masters && data?.bachelorEducation?.grades === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'This field is required',
      path: ['bachelorEducation.grades'],
    });
  }
});

export const languageCourseFormSchema = z.object({
  full_name: z.string().min(1, { message: 'This field is required.' }),
  father_name: z.string().min(1, { message: 'This field is required.' }),
  mother_name: z.string().min(1, { message: 'This field is required.' }),
  email: z.string().min(1, { message: 'This field is required.' }).email(),
  mobile_prefix: z.string().optional(),
  mobile_number: z
    .string()
    .min(10, { message: 'minimum 10 digits are allowed' })
    .max(10, { message: 'maximum 10 digits are allowed' }),
  citizen: z.string().optional(),
  passport_number: z.string().optional(),
  city: z.string().min(1, { message: 'This field is required.' }),
  state: z.string().min(1, { message: 'This field is required.' }),
  zipcode: z.string().min(1, { message: 'This field is required.' }),
});
