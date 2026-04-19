import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (session?.user?.email) {
    const email = session.user.email

    // If admin email, go to hradmin
    if (email === 'hradmin@gmail.com') {
      const response = NextResponse.redirect(new URL('/hradmin', request.url))
      response.cookies.set('isAdmin', 'true', { path: '/' })
      return response
    }

    // Otherwise go to placeholder-dashboard
    return NextResponse.redirect(new URL('/placeholder-dashboard', request.url))
  }

  // No session, go to login
  return NextResponse.redirect(new URL('/login', request.url))
}