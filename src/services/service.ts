import { cache } from "react"
import { notFound } from "next/navigation"
import getToken from "../auth/token"
import { ServiceListSchema } from "../schemas"

export const getService = cache(async () => {
    const token = await getToken()
    const url = `${process.env.API_URL}/services`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['all-service']
        }
    })

    const json = await req.json()
    if (!req.ok) {
        notFound()
    }

    const service = ServiceListSchema.parse(json)

    return service
})