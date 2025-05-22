import getToken from "@/src/auth/token"
import { cache } from "react"

export const getAvailableHours = cache( async (date: string) => {
    //await verifySession()

    const token = await getToken()
    const url = `${process.env.API_URL}/appointment/available-hours/${date}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    if(!req.ok) {
        return Response.json(json.error, {status: 403})
    }

    return Response.json(json)
})