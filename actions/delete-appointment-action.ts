"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function deleteAppointment(
    deleteAppointmentId: number,
    prevState: ActionStateType
) {
    const token = await getToken()
    console.log(token)
    const url = `${process.env.API_URL}/appointment/${deleteAppointmentId}`
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
    //revalidatePath(`/admin/appointment`)
    return {
        errors: [],
        success
    }
}