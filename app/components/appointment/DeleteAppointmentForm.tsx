import { DialogTitle } from "@headlessui/react";
import ErrorMessage from "../ui/ErrorMessage";
import { startTransition, useActionState, useEffect } from "react";
import deleteAppointment from "@/actions/delete-appointment-action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";


export default function DeleteAppointmentForm() {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const deleteAppointmentId = searchParams.get('deleteAppointmentId')

    // SIEMPRE define los hooks
    const deleteAppointmentWithId = deleteAppointmentId
        ? deleteAppointment.bind(null, +deleteAppointmentId)
        : async () => ({ errors: ['No ID'], success: '' });

    const [state, dispatch] = useActionState(deleteAppointmentWithId, {
        errors: [],
        success: '',
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.push('/admin')
        }
    }, [state, router])

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString())
        Array.from(hideModal.entries()).forEach(([key]) => {
            hideModal.delete(key)
        });
        router.replace(`${pathname}?${hideModal}`)
    }

    const handleClick = () => {
        startTransition(() => {
            dispatch()
        })
    }

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-[#4B3F3F] my-5"
            >
                Eliminar cita
            </DialogTitle>
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <p className="text-xl font-bold">Confirma para eliminar , {''}
                <span className="text-[#A3B18A]">la cita</span>
            </p>
            <p className='text-gray-600 text-sm'>(La cita no se podrá recuperar)</p>
            <div className="grid grid-cols-2 gap-5 mt-10">
                <button
                    className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    onClick={closeModal}
                >Cancelar</button>
                <button
                    type='button'
                    className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
                    onClick={() => handleClick()}
                >Eliminar</button>
            </div>
        </>
    )
}