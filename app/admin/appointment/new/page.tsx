import CreateCalendarFormEvent from "@/app/components/appointment/CreateCalendarFormEvent";
import Link from "next/link";

export default function CreateBudgetPage() {
    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className='font-black text-4xl text-[#4B3F3F] my-5'>
                        Nueva cita
                    </h1>
                    <p className="text-xl font-bold">Llena el formulario y crea una cita {''}
                        <span className="text-[#A3B18A]">Agenda</span>
                    </p>
                </div>
                <Link
                    href={'/admin'}
                    className='bg-[#C08081] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Volver
                </Link>
            </div>

            <div className='p-10 mt-10 shadow-lg border'>
                <CreateCalendarFormEvent />
            </div>
        </>
    )
}