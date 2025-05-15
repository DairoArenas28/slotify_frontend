"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

type CalendarEvent = {
    title: string
    start: string
    end: string
};

type Props = {
    calendars: CalendarEvent[]
};

export  default function Calendar({ calendars }: Props) {

    const handleDateClick = (arg: { date: Date; dateStr: string }) => {
        alert(`Has hecho clic en: ${arg.dateStr}`);
        // Aquí puedes abrir un modal, agregar un evento, etc.
    };

    return (
        <FullCalendar
            height={800}
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
            dateClick={handleDateClick}
            eventColor='red'
            
        />
    )
}