import { z } from 'zod'
export const countrieSchema = z.object({
  //   id: z.string(),
  name: z.string(),
  code: z.string(),
})

export type Countries = z.infer<typeof countrieSchema>
