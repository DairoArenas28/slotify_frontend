"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { EventApi, EventClickArg } from '@fullcalendar/core/index.js';
import { useRouter } from 'next/navigation';
import { EventContentArg } from '@fullcalendar/core';
import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';

type CalendarEvent = {
    id: string
    title: string
    start: string
    end: string
};

type Props = {
    calendars: CalendarEvent[]
};

export default function Calendar({ calendars }: Props) {

    const router = useRouter()
    //console.log(calendars)
    const handleDateClick = (arg: { date: Date; dateStr: string }) => {
        alert(`Has hecho clic en: ${arg.dateStr}`);
        // Aquí puedes abrir un modal, agregar un evento, etc.
    };

    const handleEventClick = (info: EventClickArg) => {
        // Evita que al hacer clic en el botón de eliminar se abra el modal de edición
        if ((info.jsEvent.target as HTMLElement).closest('button')) return;

        router.push(`/admin/appointment/edit/${info.event.id}`);
    };

    const handleDelete = (id: string) => {
        router.push(`?deleteAppointmentShow=true&deleteAppointmentId=${id}`)
    };

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
                    events={calendars}
                    eventClick={handleEventClick}
                    //dateClick={handleDateClick}
                    eventColor='red'
                    // Dentro de tu componente de calendario:
                    eventContent={(arg: EventContentArg) => {
                        const [name, service, price] = arg.event.title.split('\n');
                        const id = arg.event.id;

                        return (
                            <div className="relative">
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
                                <p>{arg.timeText}</p>
                                <b>{name}</b><br />
                                <span>{service}</span><br />
                                <span>{price}</span>
                            </div>
                        );
                    }}
                    eventDidMount={(info) => {
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