import getToken from "@/src/auth/token"
import { FinanceDataSchema } from "@/src/schemas"
import { useFinanceStore } from "@/src/store/useFinanceStore"


export async function GET(request: Request, {params} : {params: {type: string,date: string}}) {
    const token = await getToken()

    const { type, date } = params
    console.log("fetch", type)
    const url = `${process.env.API_URL}/admin/finance?type=${type}&date=${date}`

    const req = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    const chartData = FinanceDataSchema.parse(json)

    return Response.json(chartData)
}