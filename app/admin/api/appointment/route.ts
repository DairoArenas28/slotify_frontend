import getToken from "@/src/auth/token"
import { AppointmentListSchema } from "@/src/schemas"
import { notFound } from "next/navigation"


export async function GET() {
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

    return Response.json(appointment)
}