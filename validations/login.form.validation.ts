import { z } from 'zod'

export const loginSchema = z.object({
  tenant_id: z.string().min(1, { message: 'This field is required' }),
  email: z.string().min(1, { message: 'This field is required' }).email(),
  password: z.string().min(8, { message: 'This field is required' }),
})
