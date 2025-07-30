"use client"
import { formatCurrent, formatHumanDate } from "@/src/utils"
import { DraftAppointmentList } from "@/src/schemas"
import useSWR from "swr";
import { fetcher } from "@/src/utils/fetcher";



export default function CardAppointment() {

    //const appointmentUser = await getAppointmentUserId()
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment`;
    const { data: appointmentUser, error, isLoading } = useSWR<DraftAppointmentList>(url, fetcher);

    return (
        <>
            <div className="">
                <ul role="list" className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white">
                    {appointmentUser && appointmentUser.map((appointment) => (
                    <li key={appointment.id}  className="flex justify-between items-center p-6 hover:bg-gray-50 transition duration-200">
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col space-y-2">
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
                                    {appointment.service.description}   
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatCurrent(+appointment.service.price)}     
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">
                            
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    )
}