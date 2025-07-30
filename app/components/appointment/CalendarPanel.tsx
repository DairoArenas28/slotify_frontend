// app/admin/CalendarPanel.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchStatusSelect from "./SearchStatusSelect";
import AddCalendarButton from "./AddCalendarButton";
import Calendar from "./Calendar";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import { DraftCalendarList } from "@/src/schemas";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/src/utils/fetcher";
import SkeletonLoader from "../ui/SkeletonLoader";
import CardAppointment from "./CardAppointment";

type Props = {
    initialStatus: string;
};

export default function CalendarPanel({ initialStatus }: Props) {
    const [searchStatus, setSearchStatus] = useState(initialStatus);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Cada vez que cambie el filtro, actualiza la URL
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchStatus) {
            params.set("status", searchStatus);
        } else {
            params.delete("status");
        }
        router.push(`?${params.toString()}`);
    }, [searchStatus]);

    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment/calendar/${searchStatus}`;
    const { data: calendars, error, isLoading } = useSWR<DraftCalendarList[]>(url, fetcher);

    //await mutate();
    //console.log(error)
    return (
        <div className="grid grid-cols-1 ">
            <div className="flex justify-end gap-3 my-3">
                <div className="hidden lg:w-48 lg:block">
                    <SearchStatusSelect setSelectStatus={setSearchStatus} value={initialStatus} />
                </div>
                <div className="w-full lg:w-auto">
                    <AddCalendarButton />
                </div>
            </div>

            <div className="hidden lg:block">
                <div className="flex flex-col">
                    {isLoading ? (
                        <SkeletonLoader />
                        ) : (
                        <Calendar calendars={calendars ?? []} />
                    )}
                    <DeleteAppointmentModal />
                </div>
            </div>

            <div className="lg:hidden">
                <CardAppointment />
            </div>
        </div>
    );
}
