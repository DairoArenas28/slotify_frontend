import getToken from "@/src/auth/token";
import { CustomerSchema } from "@/src/schemas";


export async function GET(request: Request) {
    const token = await getToken()

    const url = `${process.env.API_URL}/customer`
    const req = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    if(!req.ok) {
        return Response.json(json.error, {status: 403})
    }

    return Response.json(json)
}