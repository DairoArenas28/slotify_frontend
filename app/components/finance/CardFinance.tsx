import { FinanceDataWithoutChart } from "@/src/schemas";
import { formatCurrent } from "@/src/utils";

type TypeProps = {
    financeData: FinanceDataWithoutChart
}

export default function CardFinance({financeData}: TypeProps) {
    console.log("Desde FInanzas card ", financeData)
    return (
        <div className="bg-white w-full mt-5 max-w-6xl mx-auto p-6 rounded-2xl shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
                {/* Izquierda */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-600">Ganancias totales</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrent(financeData.totalEarnings)}</p>
                </div>

                {/* Centro */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">Citas realizadas</p>
                    <p className="text-2xl font-semibold text-gray-800">{financeData.completedAppointments}</p>
                </div>

                {/* Derecha */}
                <div className="text-right">
                    <p className="text-sm text-gray-600">Top servicio</p>
                    <p className="text-base font-medium text-gray-900">{financeData.topService.name}</p>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    );
}
