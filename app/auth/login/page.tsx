import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/app/components/auth/LoginForm";

export const metadata : Metadata = {
    title: "Slotify - Iniciar Sesión", 
    description: "Inicia sesión para agendar tus citas",
};

export default function LoginPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-[#4B3F3F]">Iniciar Sesión</h1>
            <p className="text-3xl font-bold">Agenda tus <span className="text-[#A3B18A]">Citas</span></p>

            <LoginForm/>
            
            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    href="/auth/register"
                    className="text-center"
                >
                    ¿No tienes una cuenta? <span className="text-[#A65F60]">Crea una cuenta</span>
                </Link>

                <Link 
                    href="/auth/forgot-password"
                    className="text-center"
                >
                    ¿Olvidaste tu contraseña? <span className="text-[#A65F60]"> Reestablecer</span>
                </Link>
            </nav>
        </>
    );
}