"use client"

import createAppointment from "@/actions/create-appointment-action"
import { useActionState, useEffect } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import CalendarFormEvent from "./CalendarFormEvent"

export default function CreateBudgetForm() {

    const router = useRouter()
    const [state, dispatch] = useActionState(createAppointment, {
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
            {state.errors.map( error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            
            <CalendarFormEvent />

            <input
                type="submit"
                value="Agendar Cita"
                className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block"
            />
        </form>
    )
}