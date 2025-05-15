"use server"
import getToken from "@/src/auth/token"
import { AppointmentFormSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function createAppointment(prevState: ActionStateType, formData: FormData) {
    //console.log(formData)
    const appointmentData = {
        date: formData.get('date'),
        start_time: formData.get('start_time'),
        serviceId: formData.get('serviceId')
    }
    
    const register = AppointmentFormSchema.safeParse(appointmentData)

    if (!register.success) {
        const errors = register.error.errors.map(error => error.message)
        return {
            errors,
            success: prevState.success
        }
    }
    const token = await getToken()

    const url = `${process.env.API_URL}/appointment/${+register.data.serviceId}`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            date: register.data.date,
            start_time: register.data.start_time,
            serviceId: +register.data.serviceId
        })
    })

    const json = await req.json()

    if (req.status === 409) {
        const { error } = ErrorResponseSchema.parse(json)

        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}