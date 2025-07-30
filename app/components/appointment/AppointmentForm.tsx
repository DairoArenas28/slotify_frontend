"use client";

import { useEffect, useRef, useState } from "react";
import { Appointment, DraftServiceList } from "@/src/schemas";
import { getAvailableHours } from "@/src/services/available-hours";
import { formatHour, getDateToday } from "@/src/utils";
import useSWR from "swr";
import { fetcher } from "@/src/utils/fetcher";
type TimeArraySchema = string[];

export default function AppointmentForm({ appointment }: { appointment?: Appointment }) {

    //const [service, setService] = useState<DraftServiceList>([])
    //const [availableHours, setAvailableHours] = useState<TimeArraySchema>([])
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState(appointment?.serviceId || "");
    const [status, setStatus] = useState(appointment?.status || "");
    const [selectedHour, setSelectedHour] = useState(appointment?.start_time || '');
    
    //console.log(formatHour(selectedHour))
    //console.log(appointment?.date)
    const ref = useRef<HTMLFormElement>(null)

    const { date } = getDateToday()
    /*if (appointment?.date) {
        const availableHours = await getAvailableHours(appointment.date);
    }*/
    //console.log('Appointment form event', appointment)
    /*useEffect(() => {
        const loadAvailableHours = async () => {
            const dateToUse = appointment?.date || selectedDate;
            if (!dateToUse) return;

            const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment/available-hours/${dateToUse}`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                setAvailableHours([])
                setAvailableHours(data);
            } catch (error) {
                console.error('Error cargando las horas disponibles:', error);
            }
        };

        loadAvailableHours();
    }, [appointment, selectedDate]);*/
    //console.log(availableHours)

    const dateToUse = appointment?.date || selectedDate

    const { data: availableHours, error, isLoading } = useSWR<TimeArraySchema>(
        dateToUse ? `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment/available-hours/${dateToUse}` : null,
        fetcher
    )

    useEffect(() => {
        if (error) {
            console.error('Error cargando las horas disponibles:', error);
        }
    }, [error]);

    const { data: service, error: errorService, isLoading: isLoadingService } = useSWR<DraftServiceList>(
        `${process.env.NEXT_PUBLIC_URL}/admin/api/services`,
        fetcher
    )
    
    useEffect(() => {
        if (errorService) {
            console.error('Error cargando los servicios disponibles:', errorService);
        }
    }, [errorService]);

    /*useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/services`
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])*/

    return (
        <>
            <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="date">Fecha</label>
                <input
                    id="date"
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="date"
                    min={date}
                    defaultValue={appointment?.date}
                />
            </div>

            <select
                id="start_time"
                name="start_time"
                className="w-full border border-gray-300 p-3 rounded-lg"
                defaultValue={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
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
                    value={selectedService}
                    onChange={(e) => setSelectedService(Number(e.target.value))}
                >
                    <option value="">Selecciona un servicio</option>
                    {service?.map((s: { id: number; name: string }) => (
                        <option className="text-gray-800 bg-white font-medium" key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>
            { appointment ? (
                <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="serviceId">Estado</label>
                <select
                    id="status"
                    name="status"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Selecciona un estado</option>
                    <option value="disponible">Disponible</option>
                    <option value="reservado">Reservador</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="completado">Completado</option>
                </select>
            </div>
            ) : (<></>) }
        </>
    );
};