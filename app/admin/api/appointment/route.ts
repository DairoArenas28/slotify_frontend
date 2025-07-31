import getToken from "@/src/auth/token"
import { AppointmentAPIResponseSchema } from "@/src/schemas"
import { notFound } from "next/navigation"


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const token = await getToken()
    const url = `${process.env.API_URL}/appointment/user?limit=${limit}&page=${page}`
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

    const appointment = AppointmentAPIResponseSchema.parse(json)

    return Response.json(appointment)
}