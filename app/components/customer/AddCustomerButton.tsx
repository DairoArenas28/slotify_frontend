"use client"

import { useRouter } from "next/navigation"

export default function AddCustomerButton() {

    const router = useRouter()

    return (
        <button
            type="button"
            className="bg-[#C08081] p-2 rounded-lg text-white font-bold w-full md:w-auto text-center cursor-pointer"
            onClick={() => router.push(`?addCustomer=true&showModal=true`)}
        >
            Agregar Cliente
        </button>
    )
}