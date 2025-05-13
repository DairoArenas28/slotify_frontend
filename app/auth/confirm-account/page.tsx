import ConfirmAccountForm from "@/app/components/auth/ConfirmAccountForm";


export default function ConfirmAccountPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-[#4B3F3F]">Confirma tu cuenta</h1>
            <p className="text-3xl font-bold">Ingresa el código que recibiste
                <span className="text-[#A3B18A]">
                    por email
                </span>
            </p>

            <ConfirmAccountForm/>
        </>
    )
}