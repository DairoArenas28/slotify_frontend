"use server"

import getToken from "@/src/auth/token"
import { Customer, CustomerSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { getLocalDateFromForm } from "@/src/utils"

type ActionStateType = {
    errors: string[],
    success: string
}

export default async function editCustomer(customerId: Customer['id'], prevState: ActionStateType, formData: FormData) {

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
    //console.log(appointmentData)
    const update = CustomerSchema.safeParse(customerData)
    if (!update.success) {
        return {
            errors: update.error.issues.map(error => error.message),
            success: ''
        }
    }
    const token = await getToken()
    const req = await fetch(`${process.env.API_URL}/customer/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            first_name: update.data.first_name,
            last_name: update.data.last_name,
            email: update.data.email,
            phone: update.data.phone,
            document_type: update.data.document_type,
            document_number: update.data.document_number,
            address: update.data.address,
            country: update.data.country,
            birth_date: update.data.birth_date
        })
    })

    const json = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    //revalidateTag('/all-budgets')
    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}