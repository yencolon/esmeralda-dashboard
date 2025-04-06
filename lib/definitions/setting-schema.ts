import { z } from "zod";

export const settingSchema = z.object({
    dollarValue: z.string().min(1, { message: 'El valor del dólar es requerido' }),
    mobileNumber: z.string().min(1, { message: 'El número de teléfono es requerido' }),
});

