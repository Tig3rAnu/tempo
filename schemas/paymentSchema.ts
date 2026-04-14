import { z } from 'zod'
export const paymentSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.string(),
  status: z.string(),
  date: z.string(),
})

export type Payment = z.infer<typeof paymentSchema>
