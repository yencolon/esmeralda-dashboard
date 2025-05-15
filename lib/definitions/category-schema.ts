import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(3, { message: 'El nombre tiene que tener al menos 3 caracteres' }).trim(),
  description: z.string().optional(),
  enabled: z.boolean(),
  pathImage: z.string().optional(),
  imageBase64: z.string().optional(),
}).refine(data => data.imageBase64 != undefined || data.pathImage != undefined, {
  message: 'Seleccione una imagen',
  path: ['imageBase64'],
});