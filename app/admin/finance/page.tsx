import CardFinance from "@/app/components/finance/CardFinance";
import ChartFinance from "@/app/components/finance/ChartFinance";
import { getFinanceData } from "@/src/services/finance";


export default async function FinancePage() {
    const chartData = await getFinanceData()
    const removeChartData = {
        ...chartData, 
        chartData: []
    }
    //console.log(removeChartData)
    return (
        <>
            <div  className="flex-row gap-3">
                <div className="flex-1">
                    <CardFinance financeData={removeChartData}/>
                </div>
                <div className="flex-1 mt-5">
                    <ChartFinance chartData={chartData.chartData} />
                </div>
                
            </div>
        </>
    )
}
