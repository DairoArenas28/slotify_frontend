import { getAppointmentUserId } from "@/src/services/appointmentUserId"



export default async function CardAppointment() {

    const appointmentUser = await getAppointmentUserId()

    return (
        <>
            <div className="">
                <ul role="list" className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white">
                    {/*{appointmentUser.map((appointment) => (*/}
                    <li  className="flex justify-between items-center p-6 hover:bg-gray-50 transition duration-200">
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col space-y-2">
                                <p className="text-2xl font-bold text-[#A65F60]">
                                    
                                </p>
                                <p className="text-lg font-semibold text-[#A3B18A]"></p>
                                <p className="text-sm text-gray-500">Duracion:  minutos</p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">
                            Menu
                        </div>
                    </li>
                    {/*))}*/}
                </ul>
            </div>
        </>
    )
}