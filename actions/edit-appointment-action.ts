"use server"

import getToken from "@/src/auth/token"
import { Appointment, DraftAppointmentSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export default async function editAppointment(appointmentId: Appointment['id'] , prevState: ActionStateType, formData: FormData) {
    
    const appointmentData = {
        date: formData.get('date'),
        start_time: formData.get('start_time'),
        serviceId: Number(formData.get('serviceId'))
    }
    console.log(appointmentData)
    const appointment = DraftAppointmentSchema.safeParse(appointmentData)
    if(!appointment.success) {
        return {
            errors: appointment.error.issues.map(error => error.message),
            success: ''
        }
    }
    const token = await getToken()
    const req = await fetch(`${process.env.API_URL}/appointment/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            date: appointment.data.date,
            start_time: appointment.data.start_time,
            serviceId: +appointment.data.serviceId
        })
    })

    const json = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    //revalidateTag('/all-budgets')
    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}