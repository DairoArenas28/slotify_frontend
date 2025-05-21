import CardFinance from "@/app/components/finance/CardFinance";
import ChartFinance from "@/app/components/finance/ChartFinance";


export default function FinancePage() {
    return (
        <>
            <div  className="flex-row gap-3">
                <div className="flex-1">
                    <CardFinance/>
                </div>
                <div className="flex-1 mt-5">
                    <ChartFinance />
                </div>
                
            </div>
        </>
    )
}
