import createService from "@/actions/create-service-action"
import { DialogTitle } from "@headlessui/react"
import { useActionState, useEffect } from "react"
import ServiceForm from "./ServiceForm"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"


export default function AddServiceForm({closeModal} : {closeModal: () => void}) {

   const [state, dispatch] = useActionState(createService, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success){
            toast.success(state.success)
            closeModal()
        }
    }, [state, closeModal])

    return (
        <>
         <DialogTitle
                as="h3"
                className="font-black text-4xl text-[#C08081] my-5"
            >
                Editar servicio
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-[#A3B18A]">servicio</span>
            </p>
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <form
                className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white p-10 my-10"
                noValidate
                action={dispatch}
            >
                <ServiceForm  />

                <input
                    type="submit"
                    className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    value='Registrar servicio'
                />
            </form>
        </>
    )
}