import { CardCalendar } from "@/app/components/finance/CardCalendar";
import CardFinance from "@/app/components/finance/CardFinance";
import ChartFinance from "@/app/components/finance/ChartFinance";


export default async function FinancePage() {
    
    /*const chartData = await getFinanceData()
    const removeChartData = {
        ...chartData, 
        chartData: []
    }*/
    //console.log(chartData)
   /**<CardFinance financeData={removeChartData} />
                    <ChartFinance chartData={chartData.chartData} /> */

    
    return (
        <>
            <div  className="grid grid-cols-[1fr] m-0 lg:grid-cols-[300px_1fr] gap-4 mt-10 relative items-start w-full">
                <div className="w-full">
                    <CardCalendar />
                </div>
                <div className="space-y-4">
                    <CardFinance />
                    <ChartFinance />
                </div>
            </div>
        </>
    )
}
