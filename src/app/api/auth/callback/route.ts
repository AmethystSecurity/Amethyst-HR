import { getServerSession } from 'next-auth'
import { authOptions } from '../[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (session?.user?.email) {
    const email = session.user.email
    
    // If admin email, go to hradmin
    if (email === 'hradmin@gmail.com') {
      document.cookie = 'isAdmin=true; path=/'
      return NextResponse.redirect(new URL('/hradmin', request.url))
    }
    
    // Otherwise go to placeholder-dashboard
    return NextResponse.redirect(new URL('/placeholder-dashboard', request.url))
  }
  
  // No session, go to login
  return NextResponse.redirect(new URL('/login', request.url))
}