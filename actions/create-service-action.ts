"use server"
import getToken from "@/src/auth/token"
import { DraftServiceSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function createService(prevState: ActionStateType, formData: FormData) {
    //console.log(formData)
    const serviceData = {
        name: formData.get('name'),
        description: formData.get('description'),
        duration_minutes: Number(formData.get('duration_minutes')),
        price: Number(formData.get('price'))
    }
    
    const register = DraftServiceSchema.safeParse(serviceData)

    if (!register.success) {
        const errors = register.error.errors.map(error => error.message)
        return {
            errors,
            success: prevState.success
        }
    }
    const token = await getToken()

    const url = `${process.env.API_URL}/services`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: register.data.name,
            description: register.data.description,
            duration_minutes: register.data.duration_minutes,
            price: register.data.price,
        })
    })

    const json = await req.json()

    if (req.status === 409) {
        const { error } = ErrorResponseSchema.parse(json)

        return {
            errors: [error],
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}