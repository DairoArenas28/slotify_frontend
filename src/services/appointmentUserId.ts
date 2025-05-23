import { cache } from "react"
import { notFound } from "next/navigation"
import getToken from "../auth/token"
import { AppointmentSchema } from "../schemas"

export const getAppointmentUserId = cache(async () => {
    const token = await getToken()
    const url = `${process.env.API_URL}/appointment`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['all-appointmentUserId']
        }
    })

    const json = await req.json()
    if (!req.ok) {
        notFound()
    }

    const appointment = AppointmentSchema.parse(json)
    const cleaned = {
        ...appointment,
        date: appointment.date?.split('T')[0]
    };
    return cleaned
})