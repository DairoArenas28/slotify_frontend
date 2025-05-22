// app/admin/CalendarPanel.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchStatusSelect from "./SearchStatusSelect";
import AddCalendarButton from "./AddCalendarButton";
import Calendar from "./Calendar";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import { DraftCalendarList } from "@/src/schemas";
import useSWR from "swr";
import { fetcher } from "@/src/utils/fetcher";
import SkeletonLoader from "../ui/SkeletonLoader";

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

    return (
        <>
            <div className="flex flex-row justify-end gap-3 my-3">
                <div className="w-48">
                    <SearchStatusSelect setSelectStatus={setSearchStatus} value={initialStatus} />
                </div>
                <div className="">
                    <AddCalendarButton />
                </div>
            </div>

            <div className="flex flex-col">
                {isLoading ? (
                    <SkeletonLoader />
                    ) : (
                    <Calendar calendars={calendars ?? []} />
                )}
                <DeleteAppointmentModal />
            </div>
        </>
    );
}
