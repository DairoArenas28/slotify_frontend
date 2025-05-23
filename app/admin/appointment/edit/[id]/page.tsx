import { Metadata } from "next"
import Link from "next/link"
import EditCalendarFormEvent from "@/app/components/appointment/EditAppointmentForm"
import { getAppointmentId } from "@/src/services/appointmentId"
//import { getBudget } from "@/src/services/budgets"




export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    //const budget = await getBudget(id)
    return {
        title: `Slotify `,
        description: `Edita el presupuesto `
    }
}

export default async function EditAppointmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const appointment = await getAppointmentId(id)

    const appointmentCleaned = {
        ...appointment,
        date: appointment.date?.split('T')[0]
    };

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className='font-black text-4xl text-purple-950 my-5'>
                        Editar Cita: {appointmentCleaned.date}
                    </h1>
                    <p className="text-xl font-bold">Llena el formulario para actualizar la {''}
                        <span className="text-[#A3B18A]">cita</span>
                    </p>
                </div>
                <Link
                    href={'/admin'}
                    className='bg-[#C08081] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Volver
                </Link>
            </div>
            <div className='p-10 mt-10  shadow-lg border '>
                <EditCalendarFormEvent
                    appointment={appointment}
                />
            </div>
        </>
    )
}