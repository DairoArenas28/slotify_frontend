// app/admin/CalendarPanel.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchStatusSelect from "./SearchStatusSelect";
import AddCalendarButton from "./AddCalendarButton";
import Calendar from "./Calendar";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import { DraftCalendarList } from "@/src/schemas";

type Props = {
    initialStatus: string;
};

export default function CalendarPanel({ initialStatus }: Props) {
    const [searchStatus, setSearchStatus] = useState(initialStatus);
    const [calendars, setCalendars] = useState<DraftCalendarList[]>([]);
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

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment/calendar/${searchStatus}`
        fetch(url)
            .then(res => res.json())
            .then(data => setCalendars(data))
    }, [searchStatus])

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
                <Calendar calendars={calendars} />
                <DeleteAppointmentModal />
            </div>
        </>
    );
}
