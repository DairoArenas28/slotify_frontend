"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import createAppointment from "@/actions/create-appointment-action";
import { DraftServiceList } from "@/src/schemas";
import { toast } from "react-toastify";

type TimeArraySchema = string[];

export default function CalendarFormEvent({ closeModal }: { closeModal: () => void }) {

    const [service, setService] = useState<DraftServiceList>([])
    const [availableHours, setAvailableHours] = useState<TimeArraySchema>([])
    const [selectedDate, setSelectedDate] = useState('');

    const ref = useRef<HTMLFormElement>(null)
    const [state, dispatch] = useActionState(createAppointment, {
        errors: [],
        success: ''
    })
    console.log(selectedDate)

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment/available-hours/${selectedDate}`
        fetch(url)
            .then(res => res.json())
            .then(data => setAvailableHours(data))

    }, [selectedDate])

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/services`
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])

    useEffect(() => {
        if (state.success) {
            ref.current?.reset()
            toast.success(state.success)
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

            <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="date">Fecha</label>
                <input
                    id="date"
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="date"
                />
            </div>

            <select
                id="start_time"
                name="start_time"
                className="w-full border border-gray-300 p-3 rounded-lg"
            >
                <option value="">Selecciona una hora</option>
                {availableHours?.map((hours) => (
                    <option className="text-gray-800 bg-white font-medium" key={hours} value={hours}>
                        {hours}
                    </option>
                ))}
            </select>

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