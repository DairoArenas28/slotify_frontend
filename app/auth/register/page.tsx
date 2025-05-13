import type { Metadata } from "next";
import RegisterForm from "@/app/components/auth/RegisterForm";
import Link from "next/link";

export const metadata : Metadata = {
    title: "CashTrackr - Crear Cuenta", 
    description: "Crea una cuenta para controlar tus finanzas personales",
};

export default function RegisterPage() {

    // const { data: session } = useSession();
    // const router = useRouter();

    return (
        <>
            <h1 className="font-black text-6xl text-[#4B3F3F]">Crea una Cuenta</h1>
            <p className="text-3xl font-bold">Agenda tus <span className="text-[#A3B18A]">Citas</span></p>

            <RegisterForm/>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    href="/auth/login"
                    className="text-center"
                >
                    ¿Ya tienes cuenta? <span className="text-[#A65F60]">Iniciar Sesión</span>
                </Link>
            </nav>
        </>
    );
}