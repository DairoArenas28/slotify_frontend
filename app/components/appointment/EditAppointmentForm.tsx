
"use client"

import { useActionState, useEffect } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import AppointmentForm from "./AppointmentForm"
import { Appointment } from "@/src/schemas"
import editAppointment from "@/actions/edit-appointment-action"

export default function EditAppointmentForm({appointment}: {appointment: Appointment}) {

    const router = useRouter()
    const editApointmentWithId = editAppointment.bind(null, {
        appointmentId: appointment.id,
        serviceId: appointment.serviceId
    })
    const [state, dispatch] = useActionState(editApointmentWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success) {
            toast.success(state.success)
            router.push('/admin')
        }
    }, [state, router])

    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}

            <AppointmentForm
                appointment={appointment}
            />

            <input
                type="submit"
                className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                value='Guardar Cambios'
            />
        </form>
    )
}