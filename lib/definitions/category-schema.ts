import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).trim(),
  description: z.string().optional(),
  enabled: z.boolean(),
  pathImage: z.string().optional(),
  imageBase64: z.string().optional(),
})