import { z } from 'zod'
export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  agent_id: z.string(),
  status: z.string(),
  date: z.string(),
})

export type Agents = z.infer<typeof agentSchema>
