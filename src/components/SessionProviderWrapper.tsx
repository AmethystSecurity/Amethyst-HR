'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

interface SessionProviderProps {
  children: React.ReactNode
}

// This component wraps the SessionProvider for use in server components
export default function SessionProviderWrapper({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}