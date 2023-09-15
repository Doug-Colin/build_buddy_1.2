import { z } from 'zod'

export const taskSchema = z.object({
  projectName: z.string().min(3).max(100),
  client: z.string().min(3).max(150).optional(),
  label: z.union([
    z.literal('General'),
    z.literal('Sourcing'),
    z.literal('Fabrication'),
    z.literal('Finishing'),
    z.literal('Shipping'),
    z.literal('Repair'),
    z.literal('Administrative'),
    z.literal('Maintenance'),
  ]),
  taskName: z.string().min(3).max(100),
  taskDescription: z.string().min(3).max(300),
  status: z.union([
    z.literal('To Do'),
    z.literal('In Progress'),
    z.literal('Done'),
    z.literal('Paused'),
    z.literal('Canceled'),
  ]),
  priority: z.union([
    z.literal('Low'),
    z.literal('Medium'),
    z.literal('High'),
    z.literal('Urgent'),
  ]),
})
