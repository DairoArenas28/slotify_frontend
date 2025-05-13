import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().min(1, {message: "El Email es obligatorio"}).email({message: "El Email no es válido"}),
    name: z.string().min(3, {message: "El nombre debe tener al menos 3 caracteres"}),
    password: z.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres"}),
    password_confirmation: z.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres"}),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden", 
    path: ["password_confirmation"]   
})

export const LoginSchema = z.object({
    email: z.string()
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
    password: z.string()
            .min(1, {message: 'El Password no puede ir vacio'})
})


export const SuccessSchema = z.string().min(1, {message: "Válor no válido"}) 

export const ErrorResponseSchema = z.object({
    error: z.string()
})