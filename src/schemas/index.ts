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
    email: z.string().email(),
    role: z.string()
})

export const ServiceSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    duration_minutes: z.number(),
    price: z.string()
})

export const CalendarAPIResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    start: z.string(),
    end: z.string(),
    status: z.string()
})

export const AppointmentSchema = z.object({
    id: z.number({ message: "Id obligatorio" }),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Formato inválido",
    }),
    start_time: z.string(),
    end_time: z.string(),
    serviceId: z.number().min(1, { message: "Servicio es requerido" }),
    status: z.string().optional(),
    service: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        duration_minutes: z.number(),
        price: z.string()
    }),
});

export const DraftAppointmentSchema = z.object({
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Formato inválido",
    }),
    start_time: z.string(),
    serviceId: z.string().min(1, { message: "Servicio es requerido" }),
    status: z.string().optional() 
})

export const DraftServiceSchema = z.object({
    name: z.string(),
    description: z.string(),
    duration_minutes: z.number(),
    price: z.number()
})

export const ChartDataSchema = z.array(
  z.object({
    label: z.string(), // o usa .regex(/^\d+$/) si esperas solo números
    amount: z.number(),
  })
);

export const FinanceDataSchema = z.object({
  totalEarnings: z.number(),
  completedAppointments: z.number().int(),
  topService: z.object({
    name: z.string(),
    count: z.number().int(),
  }).optional(),
  chartData: ChartDataSchema, // <-- Aquí está la corrección
});

export type User = z.infer<typeof UserSchema>
export type Finance = z.infer<typeof FinanceDataSchema>
export type Service = z.infer<typeof ServiceSchema>
export type Appointment = z.infer<typeof AppointmentSchema>

export const AppointmentFormSchema = AppointmentSchema.omit({ id: true });

export type ValidateAppointmentForm = z.infer<typeof AppointmentFormSchema>;

export const CalendarsAPIResponseSchema = z.array(CalendarAPIResponseSchema)
export const ServicesAPIResponseSchema = z.array(ServiceSchema)

export const CalendarListSchema = z.array(CalendarAPIResponseSchema)
export const AppointmentListSchema = z.array(AppointmentSchema);

export const FinanceDataWithoutChartSchema = FinanceDataSchema.omit({ chartData: true });
export type FinanceDataWithoutChart = z.infer<typeof FinanceDataWithoutChartSchema>;

export const ServiceListSchema = z.array(ServiceSchema);
export type DraftServiceList = z.infer<typeof ServiceListSchema>;
export type DraftServiceForm = z.infer<typeof ServiceSchema>;
export type ChartDataListSchema = z.infer<typeof ChartDataSchema>
export type DraftCalendarList = z.infer<typeof CalendarAPIResponseSchema>;