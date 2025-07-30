"use client"
import { useFinanceStore } from '@/src/store/useFinanceStore';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';



type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CardCalendar() {

    const { finance, date, setDate, loadFinanceData } = useFinanceStore()

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
     */

    return (
        <div className='bg-white w-full max-w-6xl mx-auto p-6 rounded-2xl shadow-md border border-gray-200'>
            <Calendar 
                className="w-full" 
                value={date}
                onChange={(newDate) => {
                    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
                        setDate(newDate); // ✅ actualiza el estado en el store
                    }
                }}
                
            />
        </div>
    )
}