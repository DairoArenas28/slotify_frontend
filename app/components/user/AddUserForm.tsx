import { useActionState, useEffect } from "react";
import { RegisterFormContent } from "../auth/RegisterFormContent";
import createUser from "@/actions/user/create-user-action";
import { toast } from "react-toastify";


export function AddUserForm({ closeModal }: { closeModal: () => void }) {
    
    const [state, dispatch] = useActionState(createUser, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.success){
            toast.success(state.success)
            closeModal()
        }
    },[state, closeModal])

    return (
        <form action={dispatch} className="mt-14 space-y-5">
            <RegisterFormContent />
            <input
                type="submit"
                value="Agregar"
                className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block"
            />
        </form>
    )
}