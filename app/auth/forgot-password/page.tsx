
import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
    title: "CashTrackr - Olvidaste tu contraseña?", 
    description: "Inicia sesión para controlar tus finanzas personales",
};

export default function ForgotPasswordPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-[#4B3F3F]">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">Aquí puedes <span className="text-[#A3B18A]">reestablecerla</span></p>

            
            <ForgotPasswordForm/>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    href="/auth/login"
                    className="text-center"
                >
                    ¿Ya tienes cuenta? <span className="text-[#A65F60]">Iniciar Sesión</span>
                </Link>

                <Link 
                    href="/auth/register"
                    className="text-center"
                >
                    ¿No tienes una cuenta? <span className="text-[#A65F60]">Crea una cuenta</span>
                </Link>
            </nav>
        </>
    );
}