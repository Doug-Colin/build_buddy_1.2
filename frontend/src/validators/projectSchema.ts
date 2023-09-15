import { z } from 'zod'

const today = new Date()

export const projectSchema = z
  .object({
    projectName: z.string().min(3).max(100),
    client: z.string().min(3).max(150),
    dueDate: z.date().refine((date) => date > today, {
      message: 'Due date must be in the future',
    }),
    status: z
      .union([
        z.literal('In progress'),
        z.literal('Completed'),
        z.literal('Long-Term'),
      ])
      .optional(),
  })
  .refine(
    (data) => {
      if (data.status === 'In progress') {
        return data.dueDate !== undefined
      }
      return true
    },
    {
      path: ['dueDate'],
      message: "Due date is required when status is 'In progress'",
    },
  )
