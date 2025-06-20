import { cache } from "react"
import { notFound } from "next/navigation"
import getToken from "../auth/token"
import { AppointmentListSchema } from "../schemas"

export const getAppointmentUserId = cache(async () => {
    const token = await getToken()
    const url = `${process.env.API_URL}/appointment/user`
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

    const appointment = AppointmentListSchema.parse(json)

    return appointment
})