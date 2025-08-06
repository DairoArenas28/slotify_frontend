import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"

export async function GET(request: Request, {params} : {params: {customerId: string}}) {
    const { customerId } = params
    await verifySession()

    const token = await getToken()
    const url = `${process.env.API_URL}/customer/${customerId}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    //console.log(req)
    //console.log('serviceId', serviceId)
    const json = await req.json()

    if(!req.ok) {
        return Response.json(json.error, {status: 403})
    }

    return Response.json(json)
}