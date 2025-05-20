"use client"
import { Dispatch, SetStateAction } from "react"

type Props = {
    setSelectStatus: Dispatch<SetStateAction<string>>
    value: string;
} 

export default function SearchStatusSelect({setSelectStatus} : Props) {
    return (
        <>
            
            <select 
                id="countries" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setSelectStatus(e.target.value)}
                defaultValue={'reservado'}
                >
                <option value="reservado">reservado</option>
                <option value="cancelado">cancelado</option>
                <option value="completado">completado</option>
            </select>
        </>
    )
}