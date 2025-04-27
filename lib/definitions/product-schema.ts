import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, { message: 'El nombre tiene que tener mas de 3 caracteres' }).trim(),
  description: z.string().min(10, { message: 'Descripción tiene que tener al menos 10 caracteres' }).trim(),
  price: z.string().min(1, { message: '' }).trim(),
  priceOffer: z.string().min(1, { message: '' }).trim(),
  quantityInStock: z.number().int().positive({ message: 'La cantidad en stock debe ser un número positivo' }),
  unitId: z.number().int().positive({ message: 'Seleccione una unidad' }),
  categoryId: z.number().int().positive({ message: 'Seleccione una categoría' }),
  subCategoryId: z.number().int().positive({ message: 'Seleccione una subcategoría' }),
  tags: z.array(z.number()).nonempty({ message: 'Seleccione al menos una etiqueta' }),
  enabled: z.boolean(),
  pathImage: z.string().optional(),
  imageBase64: z.string().optional(),
  preProductId: z.number().int().optional(),
}).refine(data => parseFloat(data.priceOffer) < parseFloat(data.price), {
  message: 'El precio de oferta debe ser menor al precio normal',
  path: ['priceOffer'],
}).refine(data => data.imageBase64 != undefined || data.pathImage != undefined, {
  message: 'Seleccione una imagen',
  path: ['imageBase64'],
});