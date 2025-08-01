import { NextRequest, NextResponse } from "next/server";
import getToken from "./src/auth/token";
import { parseJwt } from "./src/utils/jwt";

const protectedRoutes = [
    {path: "/admin/finance", roles: ['admin']},
    {path: "/admin/service", roles: ['admin']},
]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = await getToken()

    //const token = request.cookies.get('SLOTIFY_TOKEN')?.value

    // Si no hay token, redirige al login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const payload = parseJwt(token)

    const matchedRoute = protectedRoutes.find(route => pathname.startsWith(route.path))
    if(matchedRoute && !matchedRoute.roles.includes(payload.role)){
        
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}



export const config = {
  matcher: ['/admin/:path*']//, '/user/:path*']
}