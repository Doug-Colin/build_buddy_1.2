
import {z} from 'zod'

export const loginSchema = z.object ({
    email: z.string().email(), 
    name: z.string().min(3).max(255),
    password: z.string().min(6).max(100),
})

