"use client"
import { formatCurrent, formatHumanDate } from "@/src/utils"
import { DraftAppointment } from "@/src/schemas"
import useSWR from "swr";
import { fetcher } from "@/src/utils/fetcher";
import Pagination from "../ui/Pagination";
import { usePathname, useSearchParams } from "next/navigation";

type UrlParamsType = {
    page: string
}

export default function CardAppointment() {

    const pathname = usePathname(); // solo la ruta, sin parámetros
    console.log(pathname)
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1');

    //const appointmentUser = await getAppointmentUserId()
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment?limit=10&page=${page}`;
    const { data: appointmentUser, error, isLoading } = useSWR<DraftAppointment>(url, fetcher);

    return (
        <>
            <div className="">
                <ul role="list" className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white">
                    {appointmentUser?.data && appointmentUser.data.map((appointment) => (
                        <li key={appointment.id} className="flex justify-between items-center p-6 hover:bg-gray-50 transition duration-200">
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
                                <div className="grid grid-cols-3 lg:flex lg:flex-col space-y-2">
                                    <p className="text-2xl font-bold text-[#A65F60]">
                                        {appointment.service.name}
                                    </p>
                                    <p className="text-lg font-semibold text-[#A3B18A]">
                                        {formatHumanDate(appointment.date, "-", "full", "YMD")}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {appointment.start_time}
                                        - {appointment.end_time}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatCurrent(+appointment.service.price)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {appointment.service.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong>{appointment.status?.toUpperCase()}</strong>
                                    </p>

                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">

                            </div>
                        </li>
                    ))}
                    {appointmentUser && (
                        <Pagination
                            page={appointmentUser.page}
                            totalPages={appointmentUser.totalPages}
                            baseUrl={pathname}
                        />
                    )}
                </ul>
            </div>
        </>
    )
}