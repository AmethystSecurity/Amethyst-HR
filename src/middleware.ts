import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /hradmin route
  if (request.nextUrl.pathname.startsWith('/hradmin')) {
    // Check if user is admin
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true'
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/placeholder-dashboard', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/hradmin/:path*']
}