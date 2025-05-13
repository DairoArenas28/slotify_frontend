import { cache } from "react"
import { notFound } from "next/navigation"
import getToken from "../auth/token"
import { CalendarsAPIResponseSchema } from "../schemas"

export const getCalendar = cache(async () => {
    const token = await getToken()
    const url = `${process.env.API_URL}/appointment/calendar`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['all-calendars']
        }
    })

    const json = await req.json()
    if (!req.ok) {
        notFound()
    }

    const calendar = CalendarsAPIResponseSchema.parse(json)
    return calendar
})