import Link from "next/link";
import Logo from "../components/ui/Logo";
import ToastNotification from "../components/ui/ToastNotification";
import BrandTitle from "../components/ui/BrandTitle";
import BrandLogo from "../components/ui/BrandLogo";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="lg:grid lg:grid-cols-2 lg:min-h-screen ">
                <div className="flex justify-center bg-[#FDF6F0] lg:bg-[url('/grafico.svg')] lg:[background-size:30rem] bg-no-repeat bg-left-bottom">
                    <div className="w-96 py-10 lg:py-20">
                        {/* Logo y nombre en escritorio */}
                        <Link href="/" className="hidden md:flex items-center gap-2">
                            <Logo />
                        </Link>

                        {/* Solo nombre en móvil */}
                        <Link href="/" className="flex md:hidden items-center justify-center">
                            <BrandTitle />
                        </Link>
                    </div>
                </div>
                <div className="p-10 lg:py-28">
                    <div className="max-w-3xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>

            <ToastNotification />
        </>
    );
}