

import { getService } from "@/src/services/service"
import ServiceMenu from "./ServiceMenu"
import { formatCurrent } from "@/src/utils"

export default async function CardService() {

    const services = await getService()

    return (
        <>
            <div className="">
                <ul role="list" className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white">
                    {services.map((service) => (
                    <li key={service.id} className="flex justify-between items-center p-6 hover:bg-gray-50 transition duration-200">
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col space-y-2">
                                <p className="text-2xl font-bold text-[#A65F60]">
                                    {service.name}
                                </p>
                                <p className="text-lg font-semibold text-[#A3B18A]">{formatCurrent(+service.price)}</p>
                                <p className="text-sm text-gray-500">Duracion: {service.duration_minutes} minutos</p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">
                            < ServiceMenu
                                serviceId={service.id}
                            />
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    )
}