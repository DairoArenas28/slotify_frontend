"use client"
import { DraftCustomer } from "@/src/schemas"
import { fetcher } from "@/src/utils/fetcher"
import { useState } from "react"
import useSWR, { mutate } from "swr"
import Pagination from "../ui/Pagination"
import { usePathname, useSearchParams } from "next/navigation"

export function CardCustomer() {
    
    const [refreshing, setRefreshing] = useState(false)

    const pathname = usePathname(); // solo la ruta, sin parámetros

    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1');

    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/customer/getPaginationAll?limit=10&page=${page}`
    const { data: customers, error, isLoading } = useSWR<DraftCustomer>(url, fetcher)
    
    const handleRefresh = async () => {
        setRefreshing(true)
        await mutate(url)
        setRefreshing(false)
    }
    return (
        <>
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="px-4 py-2 bg-[#A3B18A] text-white rounded hover:bg-[#76937b] transition"
                >
                    {refreshing ? "Actualizando..." : "🔁 Refrescar"}
                </button>
            </div>
            <ul role="list" className="divide-y divide-gray-200 rounded-lg border border-gray-300 shadow-xl bg-white">
                {customers && customers.data.map((customer) => (
                    <li key={customer.id} className="flex justify-between items-center p-6 hover:bg-gray-50 transition duration-200">
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col space-y-2">
                                <p className="text-2xl font-bold text-[#A65F60]">
                                    {customer.first_name}
                                </p>
                                <p className="text-lg font-semibold text-[#A3B18A]"></p>
                                <p className="text-sm text-gray-500"></p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-6">

                        </div>
                    </li>
                ))}
                {customers && (
                    <Pagination
                        page={customers.page}
                        totalPages={customers.totalPages}
                        baseUrl={pathname}
                    />
                )}
            </ul>
        </>
    )
}