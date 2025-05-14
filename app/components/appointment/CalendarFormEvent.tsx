"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import createAppointment from "@/actions/create-appointment-action";
import { DraftServiceList } from "@/src/schemas";

export default function CalendarFormEvent({ closeModal }: { closeModal: () => void }) {

    const [service, setService] = useState<DraftServiceList>([])

    const ref = useRef<HTMLFormElement>(null)
    const [state, dispatch] = useActionState(createAppointment, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/services`
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])

    useEffect(() => {
        if (state.success) {
            ref.current?.reset()
            closeModal()
        }
    }, [state])

    return (
        <form
            ref={ref}
            className="mt-14 space-y-5"
            noValidate
            action={dispatch}
        >
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

            <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="date">Fecha</label>
                <input
                    id="date"
                    type="date"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="date"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="start_time">Hora de inicio</label>
                <input
                    id="start_time"
                    type="time"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="start_time"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="end_time">Hora de fin</label>
                <input
                    id="end_time"
                    type="time"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="end_time"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="serviceId">Servicio</label>
                <select
                    id="serviceId"
                    name="serviceId"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                >
                    <option value="">Selecciona un servicio</option>
                    {service?.map((s: { id: number; name: string }) => (
                        <option className="text-gray-800 bg-white font-medium" key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            <input
                type="submit"
                value="Agendar Cita"
                className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block"
            />
        </form>
    );
};