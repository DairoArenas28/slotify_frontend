import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"

export async function GET(request: Request, { params }: { params: { id: string} }) {

    const { id } = params
    //await verifySession()

    const token = await getToken()
    const url = `${process.env.API_URL}/appointment/id/${id}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    if(!req.ok) {
        return Response.json(json.error, {status: 403})
    }

    return Response.json(json)
}