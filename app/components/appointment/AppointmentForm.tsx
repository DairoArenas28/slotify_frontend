"use client";

import { useEffect, useRef, useState } from "react";
import { Appointment, DraftCustomerList, DraftServiceList } from "@/src/schemas";
import { getAvailableHours } from "@/src/services/available-hours";
import { formatHour, getDateToday } from "@/src/utils";
import useSWR from "swr";
import { fetcher } from "@/src/utils/fetcher";
type TimeArraySchema = string[];
import Select from 'react-select';
import CustomSelect from "../ui/CustomSelect";
import { stateType } from "@/src/utils/dataStatic";

export default function AppointmentForm({ appointment }: { appointment?: Appointment }) {

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState(appointment?.serviceId || "");
    const [status, setStatus] = useState(appointment?.status || "");
    const [selectedHour, setSelectedHour] = useState(formatHour(appointment?.start_time!) || '');

    const ref = useRef<HTMLFormElement>(null)

    const { date } = getDateToday()

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

    const { data: services, error: errorService, isLoading: isLoadingService } = useSWR<DraftServiceList>(
        `${process.env.NEXT_PUBLIC_URL}/admin/api/services`,
        fetcher
    )

    useEffect(() => {
        if (errorService) {
            console.error('Error cargando los servicios disponibles:', errorService);
        }
    }, [errorService]);

    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/customer`
    const { data: customers, error: errorCustomer, isLoading: isLoadingCustomer } = useSWR<DraftCustomerList[]>(url, fetcher)

    const customerOptions = (customers ?? [])
        .filter((customer) => customer.id !== undefined)
        .map((customer) => ({
            value: customer.id!,
            label: `${customer.document_number} - ${customer.first_name} ${customer.last_name}`,
        }));

    const availableHoursOptions = (availableHours ?? []).map((availableHour) => ({
        value: availableHour,
        label: availableHour,
    }));

    const serviceOptions = (services ?? []).map((service) => ({
        value: service.id,
        label: service.name,
    }));

    const defaultServiceOption = serviceOptions.find(
        (option) => option.value === selectedService
    );

    const defaultStateOption = stateType.find(
        (option) => option.value === status
    );

    const defaultAvailableHourOption = (availableHoursOptions ?? []).find(
        (option) => option.value === selectedHour
    );

    console.log("useState",selectedHour)
    console.log("useState",availableHoursOptions)
    console.log("Hour",defaultAvailableHourOption)

    return (
        <>
            {customerOptions.length > 0 && (
                <CustomSelect
                    label="Cliente"
                    name="customerId"
                    options={customerOptions}
                    placeholder="Selecciona un cliente"
                    onChange={(selected) => console.log(selected)}
                />
            )}
            <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl" htmlFor="date">Fecha</label>
                <input
                    id="date"
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 text-[#9ca3af] p-3 rounded-lg"
                    name="date"
                    min={date}
                    defaultValue={appointment?.date}
                />
            </div>
            {availableHoursOptions.length > 0 && (
                <CustomSelect
                    label=""
                    name="start_time"
                    inputId="start_time"
                    options={availableHoursOptions}
                    placeholder="Selecciona una hora"
                    defaultValue={defaultAvailableHourOption}
                    onChange={(selected) => setSelectedHour(String(selected))}
                />
            )}
            {serviceOptions.length > 0 && (
                <CustomSelect
                    label="Servicio"
                    name="serviceId"
                    options={serviceOptions}
                    placeholder="Selecciona un servicio"
                    defaultValue={defaultServiceOption}
                    onChange={(seleted) => setSelectedService(Number(seleted))}
                />
            )}
            {appointment ? (
                <CustomSelect
                    label="Estado"
                    name="status"
                    options={stateType}
                    placeholder="Selecciona un servicio"
                    defaultValue={defaultStateOption}
                    onChange={(seleted) => setStatus(String(seleted))}
                />
            ) : (<></>)}
        </>
    );
};