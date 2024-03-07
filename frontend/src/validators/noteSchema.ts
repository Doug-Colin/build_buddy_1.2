import { z } from 'zod'

export const noteSchema = z.object({
  noteTitle: z.string().min(3).max(50),
  noteLabel: z.union([
    z.literal('Project'),
    z.literal('Task'),
    z.literal('Client'),
    z.literal('General'),
  ]),
  projectId: z.string().min(3).max(150).optional(),
  taskId: z.string().min(3).max(150).optional(),
  client: z.string().min(3).max(150).optional(),
})
