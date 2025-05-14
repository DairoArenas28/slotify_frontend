import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: "El Email es obligatorio" }).email({ message: "El Email no es válido" }),
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    password_confirmation: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"]
})

export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
    password: z.string()
        .min(1, { message: 'El Password no puede ir vacio' })
})

export const ForgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
})

export const TokenSchema = z.string({ message: "Token no válido" })
    .min(6, { message: "Token no válido" })
    .max(6, { message: "Token no válido" })

export const ResetPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const SuccessSchema = z.string().min(1, { message: "Válor no válido" })

export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export const ServiceSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    duration_minutes: z.number(),
    price: z.string()
})

export const CalendarAPIResponseSchema = z.object({
    title: z.string(),
    start: z.string(),
    end: z.string(),
})

export const AppointmentSchema = z.object({
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Formato inválido",
    }),
    start_time: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Formato inválido",
    }),
    end_time: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Formato inválido",
    }),
    serviceId: z.string().min(1, { message: "Servicio es requerido" }),
});

export type User = z.infer<typeof UserSchema>
export const CalendarsAPIResponseSchema = z.array(CalendarAPIResponseSchema)
export const ServicesAPIResponseSchema = z.array(ServiceSchema)

export const ServiceListSchema = z.array(ServiceSchema);
export type DraftServiceList = z.infer<typeof ServiceListSchema>;