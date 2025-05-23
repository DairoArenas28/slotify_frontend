"use server"

import getToken from "@/src/auth/token"
import { Appointment, DraftAppointmentSchema, ErrorResponseSchema, Service, SuccessSchema } from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"

type AppointmentIdAndServiceIdType = {
    appointmentId: Appointment['id']
    serviceId: Service['id']
}

type ActionStateType = {
    errors: string[],
    success: string
}

export default async function editAppointment({appointmentId, serviceId} : AppointmentIdAndServiceIdType, prevState: ActionStateType, formData: FormData) {
    
    const appointmentData = {
        date: formData.get('date'),
        start_time: formData.get('start_time'),
        serviceId: formData.get('serviceId'),
    }
    //console.log(appointmentData)
    const appointment = DraftAppointmentSchema.safeParse(appointmentData)
    if(!appointment.success) {
        return {
            errors: appointment.error.issues.map(error => error.message),
            success: ''
        }
    }
    const token = await getToken()
    const req = await fetch(`${process.env.API_URL}/appointment/${appointmentId}/service/${serviceId}`, {
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
    
    const success = SuccessSchema.parse(json)

    revalidateTag('all-calendars')

    return {
        errors: [],
        success
    }
}