"use server"

import getToken from "@/src/auth/token"
import { Appointment, DraftAppointmentSchema, DraftServiceSchema, ErrorResponseSchema, Service, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export default async function editService(serviceId: Service['id'] , prevState: ActionStateType, formData: FormData) {
    
    const serviceData = {
        name: formData.get('name'),
        description: formData.get('description'),
        duration_minutes: Number(formData.get('duration_minutes')),
        price: Number(formData.get('price'))
    }
    //console.log(appointmentData)
    const update = DraftServiceSchema.safeParse(serviceData)
    if(!update.success) {
        return {
            errors: update.error.issues.map(error => error.message),
            success: ''
        }
    }
    const token = await getToken()
    const req = await fetch(`${process.env.API_URL}/services/${serviceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: update.data.name,
            description: update.data.description,
            duration_minutes: update.data.duration_minutes,
            price: update.data.price,
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