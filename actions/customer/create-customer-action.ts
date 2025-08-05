"use server"
import getToken from "@/src/auth/token"
import { CustomerSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { getLocalDateFromForm } from "@/src/utils"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function createCustomer(prevState: ActionStateType, formData: FormData) {
    console.log(formData.get('birth_date'))
    const customerData = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        document_type: Number(formData.get('document_type')),
        document_number: formData.get('document_number'),
        address: formData.get('address'),
        country: formData.get('country'),
        birth_date: getLocalDateFromForm(formData, 'birth_date')
    }

    console.log(customerData)

    const register = CustomerSchema.safeParse(customerData)

    if (!register.success) {
        const errors = register.error.errors.map(error => error.message)
        return {
            errors,
            success: prevState.success
        }
    }
    const token = await getToken()

    const url = `${process.env.API_URL}/customer`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            first_name: register.data.first_name,
            last_name: register.data.last_name,
            email: register.data.email,
            phone: register.data.phone,
            document_type: register.data.document_type,
            document_number: register.data.document_number,
            address: register.data.address,
            country: register.data.country,
            birth_date: register.data.birth_date
        })
    })

    const json = await req.json()

    if (req.status === 500) {
        const { error } = ErrorResponseSchema.parse(json)

        return {
            errors: [error],
            success: ''
        }
    }

    if (!req.ok) {
        console.log("Respuesta con error:", req.status, json);
        const { error } = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
            success: ''
        };
    }

    const success = SuccessSchema.parse(json)

    revalidatePath('/admin/customer')

    return {
        errors: [],
        success
    }
}