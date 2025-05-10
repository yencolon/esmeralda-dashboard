import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAdminToken, isExpiredToken } from "./lib/jwt"
import { deleteSession } from './lib/session'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard/']
const publicRoutes = ['/login', '/landing']

export default async function middleware(req: NextRequest) {

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)


  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('accessToken')?.value

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute) {
    if (!cookie) return NextResponse.redirect(new URL('/login', req.nextUrl))
    if (isExpiredToken(cookie) || !isAdminToken(cookie)) {
      deleteSession()
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    cookie &&
    !req.nextUrl.pathname.startsWith('/dashboard')
    && !req.nextUrl.pathname.startsWith('/landing')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }


  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}