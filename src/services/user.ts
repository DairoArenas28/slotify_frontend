import { cache } from "react"
import { notFound } from "next/navigation"
import getToken from "../auth/token"
import { UserListSchema } from "../schemas"

export const getUser = cache(async () => {
    const token = await getToken()
    const url = `${process.env.API_URL}/user`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['all-user']
        }
    })

    const json = await req.json()
    if (!req.ok) {
        notFound()
    }

    const user = UserListSchema.parse(json)

    return user
})