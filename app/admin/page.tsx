import { getCalendar } from "@/src/services/calendars";
import Calendar from "../components/appointment/Calendar";
import ModalContainer from "../components/ui/ModalContainer";
import AddCalendarButton from "../components/appointment/AddCalendarButton";
import DeleteAppointmentModal from "../components/appointment/DeleteAppointmentModal";

export default async function Admin() {

    const calendars = await getCalendar()

    return (
        <>
            <div className="flex-row">
                <div className="flex justify-end items-end my-5">
                    <AddCalendarButton />
                </div>
                <div className="">
                    <Calendar
                        calendars={calendars}
                    />
                </div>
                <DeleteAppointmentModal />
            </div>
        </>
    )
}