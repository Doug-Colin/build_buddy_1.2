import { z } from 'zod'

export const registerSchema = z
  .object({
    //tell zod this will be a string and must be an email
    email: z.string().email(),
    name: z.string().min(3).max(255),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  //validation to ensure confirmation password matches first password
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
