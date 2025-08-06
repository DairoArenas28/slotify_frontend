"use client"
import UserMenu from "./UserMenu";
import { usePathname, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { DraftUser } from "@/src/schemas";
import { fetcher } from "@/src/utils/fetcher";
import Pagination from "../ui/Pagination";


export function CardUser() {

    const pathname = usePathname(); // solo la ruta, sin parámetros
    
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1');

    //const appointmentUser = await getAppointmentUserId()
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/user/?limit=10&page=${page}`;
    const { data: users, error, isLoading } = useSWR<DraftUser>(url, fetcher);

    return (
        <>
            <ul className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white">
                {users && users.data.map((user) => (
                    <li key={user.id} className="flex justify-between items-center p-6 hover:bg-gray-50 transition duration-200">
                        <div className="flex flex-col items-start gap-4">
                            <p className="text-2xl font-bold text-[#A65F60]">
                                {user.name}
                            </p>
                            <p className="text-lg font-semibold text-[#A3B18A]">
                                {user.email}
                            </p>
                            <p className="text-sm text-gray-500">
                                {user.role === "admin" ? "Administrador" : "Cliente"}
                            </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">
                            < UserMenu
                                userId={user.id}
                            />
                        </div>
                    </li>
                ))}
                {users && (
                    <Pagination
                        page={users.page}
                        totalPages={users.totalPages}
                        baseUrl={pathname}
                    />
                )}
            </ul>
        </>
    )
}