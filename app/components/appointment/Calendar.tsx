"use client"
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { useRouter } from 'next/navigation';
import { EventContentArg } from '@fullcalendar/core';
import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';
import { DraftCalendarList } from '@/src/schemas';
import { useUser } from '@/src/store/useUser';
import AuthRole from '../auth/AuthRole';



type Props = {
    calendars: DraftCalendarList[];
};

interface TippyElement extends HTMLElement {
    _tippy?: {
        destroy: () => void;
    };
}

export default function Calendar({ calendars }: Props) {

    const { user } = useUser()

    console.log("User hook", user)

    const router = useRouter()
    //console.log(calendars)
    const handleDateClick = (arg: { date: Date; dateStr: string }) => {
        alert(`Has hecho clic en: ${arg.dateStr}`);
        // Aquí puedes abrir un modal, agregar un evento, etc.
    };

    const handleEventClick = (info: EventClickArg) => {
        // Evita que al hacer clic en el botón de eliminar se abra el modal de edición
        if ((info.jsEvent.target as HTMLElement).closest('button')) return;
        if(user.role === "admin"){
            router.push(`/admin/appointment/edit/${info.event.id}`);
        }
        
    };

    const handleDelete = (id: string) => {
        router.push(`?deleteAppointmentShow=true&deleteAppointmentId=${id}`)
    };

    const formattedCalendars = calendars.map((cal) => {
        let color = 'gray'; // Color por defecto

        if (cal.status === 'reservado') {
            color = '#E6677C';
        } else if (cal.status === 'completado') {
            color = '#4F93CE';
        }

        return {
            ...cal,
            id: String(cal.id),
            color,
        };
    });
    //console.log(formattedCalendars)
    return (
        <div className="w-full h-screen overflow-auto md:overflow-visible">
            <div className="min-w-[900px] min-h-[600px] md:min-w-full md:min-h-full">
                <FullCalendar
                    height="auto"
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView='timeGridWeek'
                    weekends={true}
                    locale='es'
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay'
                    }}
                    slotMinTime='6:00'
                    slotMaxTime='22:00'
                    events={formattedCalendars}
                    eventClick={handleEventClick}
                    //dateClick={handleDateClick}
                    // Dentro de tu componente de calendario:
                    eventContent={(arg: EventContentArg) => {
                        const [name, service, price] = arg.event.title.split('\n');
                        const id = arg.event.id;

                        return (
                            <div className="relative">
                                <AuthRole user={user}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // 🛑 Detiene el clic para que no dispare el handler de edición
                                            handleDelete(id);
                                        }}
                                        className="absolute top-0 right-0 text-white font-bold cursor-pointer mx-2 "
                                        aria-label="Eliminar cita"
                                    >
                                        X
                                    </button>
                                </AuthRole>
                                <p>{arg.timeText}</p>
                                <b>{name}</b><br />
                                <span>{service}</span><br />
                                <span>{price}</span>
                            </div>
                        );
                    }}
                    eventDidMount={(info) => {
                        const el = info.el as TippyElement;
                        if (el._tippy) {
                            el._tippy.destroy();
                        }
                        //console.log(info)
                        const [name, service, price] = info.event.title.split('\n');
                        tippy(info.el, {
                            content: `
                        ${name}<br>
                        ${service}<br>
                        $${price}<br>
                        ${info.event.start?.toLocaleTimeString()} - ${info.event.end?.toLocaleTimeString()}
                    `,
                            allowHTML: true,
                            placement: 'top',
                        });
                    }}

                />
            </div>
        </div >
    )
}