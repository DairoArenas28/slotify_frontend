import Link from "next/link";
import ToastNotification from "../components/ui/ToastNotification";
import { verifySession } from "@/src/auth/dal";
import AdminMenu from "../components/admin/AdminMenu";
import BrandTitle from "../components/ui/BrandTitle";
//import { useUser } from "@/src/store/useUser";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = await verifySession()

    //const { setUser } = useUser()

    return (
        <>
            <header className='bg-[#FDF6F0] py-5'>
                <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='md:w-96'>
                        <Link href={'/admin'}>
                            <BrandTitle />
                        </Link>
                    </div>
                    <AdminMenu user={user} />
                </div>
            </header>
            <section className='max-w-5xl mx-auto mt-10 p-3'>
                {children}
            </section>
            <ToastNotification />

            <footer className='py-5'>
                <p className='text-center'>
                    Todos los Derechos Reservados {new Date().getFullYear()}
                </p>
            </footer>
        </>
    );
}