import { DialogTitle } from "@headlessui/react";
import CustomerForm from "./CustomerForm";



export function AddCustomerForm({ closeModal }: { closeModal: () => void }) {
    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-[#C08081] my-5"
            >
                Crear cliente
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-[#A3B18A]">servicio</span>
            </p>
            
            <form
                className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white p-2 w-auto"
                noValidate
            >
                <CustomerForm />

                <input
                    type="submit"
                    className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors my-4"
                    value='Registrar servicio'
                />
            </form>
        </>
    )
}