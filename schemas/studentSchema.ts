import { z } from 'zod'
export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  agent_id: z.string(),
  university: z.string(),
  course: z.string(),
  country: z.string(),
  applicationStatus: z.string(),
  date: z.string(),
})

export type Students = z.infer<typeof studentSchema>
