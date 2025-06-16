import { DialogTitle } from "@headlessui/react"
import { useActionState, useEffect, useState } from "react"
import ServiceForm from "./ServiceForm"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { DraftServiceForm } from "@/src/schemas"
import editService from "@/actions/edit-service-action"
import { useSearchParams } from "next/navigation"


export default function EditServiceForm({closeModal} : {closeModal: () => void}) {

    const searchParams = useSearchParams()
    const serviceId = searchParams.get('editServiceId')
    const [service, setService] = useState<DraftServiceForm>()

     if(!serviceId) {
            throw new Error('Error al obtener el parametro serviceId')
        }
    
        const editServiceWithSerciveId = editService.bind(null, +serviceId )
        const [state, dispatch] = useActionState(editServiceWithSerciveId, {
            errors: [],
            success: ''
        })
    
        useEffect(() => {
            const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/services/${serviceId}`
            //console.log('URL: ',url)
            fetch(url)
                .then(res => res.json())
                .then(data => setService(data))
        }, [])

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
                Agregar servicio
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
                <ServiceForm service={service} />

                <input
                    type="submit"
                    className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    value='Guardar cambios'
                />
            </form>
        </>
    )
}