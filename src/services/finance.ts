import getToken from "../auth/token"
import { FinanceDataSchema } from "../schemas";


export const getFinanceData = async () => {
    const token = await getToken()

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${year}-${month}`;

    const url = `${process.env.API_URL}/admin/finance?type=month&date=${formattedDate}`

    const req = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    const chartData = FinanceDataSchema.parse(json)

    return chartData
}