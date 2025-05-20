import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { startTransition, useActionState, useEffect } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import deleteService from "@/actions/delete-service-action";

type DeleteServiceForm = {
    closeModal: () => void
}

export default function DeleteServiceForm({ closeModal }: DeleteServiceForm) {
    const searchParams = useSearchParams()
    const serviceId = searchParams.get('deleteServiceId')!

    if (!serviceId) {
        throw new Error("Missing budget ID or expense ID");
    }
    console.log("serviceId", serviceId)
    const deleteServiceWithId = deleteService.bind(null, +serviceId)
    const [state, dispatch] = useActionState(deleteServiceWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(!Number.isInteger(+serviceId)) {
            closeModal()
        }
    }, [serviceId])

    useEffect(() => {
        if(state.success){
            toast.success(state.success)
            closeModal()
        }
    }, [state, closeModal])

    const handleClick = () => {
        startTransition(() => {
            dispatch()
        })
    }

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-[#4B3F3F]"
            >
                Eliminar Gasto
            </DialogTitle>
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <p className="text-xl font-bold">Confirma para eliminar, {''}
                <span className="text-[#A3B18A]">el servicio</span>
            </p>
            <p className='text-gray-600 text-sm'>(Un servicio eliminado no se puede recuperar)</p>
            <div className="grid grid-cols-2 gap-5 mt-10">
                <button
                    className="bg-[#C08081] hover:bg-[#A65F60] text-white uppercase font-bold cursor-pointer transition-colors"
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