"use client"
import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ValidateTokenProps = {
    setIsValidToken: Dispatch<SetStateAction<boolean>>
    token: string
    setToken: Dispatch<SetStateAction<string>>
}

export default function ValidateTokenForm({setIsValidToken, token, setToken}: ValidateTokenProps) {

    const [isComplete, setIsComplete] = useState(false);

    const validateTokenInput = validateToken.bind(null, token)
    const [state, dispatch] = useActionState(validateTokenInput, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(isComplete){
            startTransition(() => {
                dispatch()
            })
        }
    }, [isComplete, dispatch])

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach( error => {
                toast.error(error)
            })
        }

        if(state.success){
            toast.success(state.success)
            setIsValidToken(true)
        }
    }, [state, setIsValidToken])
    
    const handleChange = (token: string) => {
        setToken(token);
        setIsComplete(false)
    }

    const handleComplete = () => {
        setIsComplete(true)

    }

    return (
        <div className="flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
            </PinInput>
        </div>
    )
}