"use client";

import { useActionState, useEffect, useRef } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import createAppointment from "@/actions/create-appointment-action";

export default function CalendarFormEvent({ closeModal }: { closeModal: () => void }) {

    const ref = useRef<HTMLFormElement>(null)
    const [state, dispatch] = useActionState(createAppointment, {
        errors: [],
        success: ''
    })

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
                    <option value="1">Corte de Cabello</option>
                    <option value="2">Manicure</option>
                    <option value="3">Masaje</option>
                    {/* Puedes reemplazar estas opciones dinámicamente si lo deseas */}
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