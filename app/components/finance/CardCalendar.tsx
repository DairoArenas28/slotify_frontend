"use client"
import { useFinanceStore } from '@/src/store/useFinanceStore';
import { formatLocalDate } from '@/src/utils';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';



type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CardCalendar() {

    const { finance, date, setDate, type, setType, loadFinanceData } = useFinanceStore()

    const [activo, setActivo] = useState<'day' | 'month'>('day');

    useEffect(() => {
        setDate(date)
        loadFinanceData()
        //console.log(finance)
    }, [date])

    /**
    *   view="year"         // 👈 Muestra vista de meses
        minDetail="year"    // 👈 Evita cambiar a vista de días
        maxDetail="year"    // 👈 No permite ir más allá de meses
        showNavigation={true} // muestra flechas de año
        <input type="month" />
        bg-slate-800
     */
    console.log(activo)
    return (
        <>

            <div className='bg-white w-full max-w-6xl mx-auto p-4 rounded-2xl shadow-md border border-gray-200'>
                <div className='flex justify-end mb-2'>
                    <button
                        aria-pressed={activo === 'day'}
                        onClick={() => setActivo('day')}
                        className={`rounded-md rounded-r-none 
                        ${activo === 'day'
                            ? 'bg-[#A65F60] text-white'
                            : 'bg-[#FDF6F0] text-[#A65F60] hover:bg-[#a65f6041]'} 
                            py-2 px-4 text-sm border border-[#A65F60]
                            transition-all shadow-md `}
                        type="button"
                    >
                        Día
                    </button>

                    <button
                        aria-pressed={activo === 'month'}
                        onClick={() => setActivo('month')}
                        className={`rounded-md rounded-l-none 
                            ${activo === 'month'
                            ? 'bg-[#A65F60] text-white'
                            : 'bg-[#FDF6F0] text-[#A65F60] hover:bg-[#a65f6041]'} 
                            py-2 px-4 text-sm border border-[#A65F60]
                            transition-all shadow-md `}
                        type="button"
                    >
                        Mes
                    </button>

                </div>
                <input
                    type={`${activo === 'day' ? "date" : "month"}`}
                    defaultValue={formatLocalDate(date)}
                    name=""
                    id=""
                    className='lg:hidden w-full'
                    onChange={(e) => {
                        const value = e.target.value;           // valor como "2025-07-30"
                        const dateObj = new Date(value + 'T00:00:00');     // convierte a objeto Date

                        console.log("fecha móvil", dateObj);

                        if (!isNaN(dateObj.getTime())) {
                            setDate(dateObj);                     // actualiza estado con la fecha
                        }
                    }}

                />
                <div className='hidden lg:block'>
                    <Calendar
                        className="w-full"
                        value={date}
                        onChange={(newDate) => {
                            console.log("fecha compu", newDate)
                            if (newDate instanceof Date && !isNaN(newDate.getTime())) {
                                setDate(newDate); // ✅ actualiza el estado en el store
                            }
                        }}
                        view={`${activo === "day" ? "month": "year"}`}         // 👈 Muestra vista de meses
                        minDetail={`${activo === "day" ? "month": "year"}`}     // 👈 Evita cambiar a vista de días
                        maxDetail={`${activo === "day" ? "month": "year"}`}     // 👈 No permite ir más allá de meses

                    />
                </div>

            </div>
        </>
    )
}