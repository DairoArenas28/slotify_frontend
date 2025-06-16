import { cache } from "react"
import { notFound } from "next/navigation"
import getToken from "@/src/auth/token"
import { CalendarsAPIResponseSchema } from "@/src/schemas"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { searchStatus: string} }) {

    const { searchStatus } = await params
    //console.log(params)

    const token = await getToken()
    const url = `${process.env.API_URL}/appointment/calendar/${searchStatus}`
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
    console.log(calendar)
    const calendarWithStringIds = calendar.map(item => ({
        ...item,
        id: String(item.id),
    }));

    return NextResponse.json(calendarWithStringIds);
}