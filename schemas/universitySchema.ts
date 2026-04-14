import { z } from 'zod'
export const universitySchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  admissionFee: z.string(),
  createdAt: z.string(),
})

export type Universitty = z.infer<typeof universitySchema>
