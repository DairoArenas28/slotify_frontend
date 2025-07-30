import { create } from "zustand";
import { Finance } from "../schemas";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

interface FinanceStore {
    finance: Finance | null; 
    date: Date
    type: string
    setDate: (date: Date) => void
    setType: (type: string) => void
    loadFinanceData: () => Promise<void>;
}

export const useFinanceStore = create<FinanceStore>( (set, get) => ({
    finance: null,
    date: new Date(),
    type: "day",
    setDate: (date) => set({ date }),
    setType: (type) => set({type}),
    loadFinanceData: async () => {
        const dateCalendar = get().date.toISOString(); // Asegúrate que el date es válido en la URL
        const typeCalendar = get().type;
        const date = new Date(dateCalendar)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/api/finance/${typeCalendar}/${formattedDate}`, {
            cache: 'no-cache'
        });

        if (!res.ok) {
            console.log(res)
            console.error("Error al obtener datos financieros");
            return;
        }

        const data: Finance = await res.json(); // ✅ casteas al tipo correcto

        set({ finance: data });
    },
}))