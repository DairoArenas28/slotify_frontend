"use client";

import { register } from "@/actions/create-account-action";
import { useActionState, useEffect, useRef } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import { RegisterFormContent } from "./RegisterFormContent";

export default function RegisterForm() {

    const ref = useRef<HTMLFormElement>(null)
    const [state, dispatch] = useActionState(register, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.success) {
            ref.current?.reset()
        }
    }, [state])

    return (
        <form
            ref={ref}
            className="mt-14 space-y-5"
            noValidate
            action={dispatch}
        >
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}

            {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
            <RegisterFormContent />
            <input
                type="submit"
                value="Registrarme"
                className="bg-[#C08081] hover:bg-[#A65F60] w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block"
            />
        </form>
    );
};