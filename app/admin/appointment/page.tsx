import AddCalendarButton from "@/app/components/appointment/AddCalendarButton";
import CardAppointment from "@/app/components/appointment/CardAppointment";


export default function AppointmentPage() {

    return (
        <>
            <div className="flex-row">
                <div className="flex justify-end items-end my-5">
                    <AddCalendarButton/>
                </div>
                <div>
                    <CardAppointment />
                </div>
            </div>
        </>
    )
}