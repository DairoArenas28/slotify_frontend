"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, Service, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function deleteService(
    serviceId: Service['id'],
    prevState: ActionStateType
) {
    const token = await getToken()
    //console.log(token)
    const url = `${process.env.API_URL}/services/${serviceId}`
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    const json = await req.json()

    if(!req.ok){
        const {error} = ErrorResponseSchema.parse(json)
        return{
            errors: [error], 
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)
    revalidatePath(`/admin/services`)
    return {
        errors: [],
        success
    }
}