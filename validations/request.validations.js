import {z} from 'zod';

export const signupPostRequestSchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.email(),
    password: z.string().min(6 )
});