import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'amethyst-secret-key-change-in-production',
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      return true
    },
    async jwt({ token, user, account }: { token: any; user: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user?.email) {
        token.email = user.email
        token.id = user.id
        token.name = user.name

        // Determine role and department from email for demo
        const email = (user.email || '').toLowerCase()

        // Role assignment based on email patterns
        if (email.includes('admin') || email.includes('hradmin')) {
          token.role = 'admin'
          token.department = 'Administration'
        } else if (email.includes('hr') || email.includes('hr@')) {
          token.role = 'hr'
          token.department = 'Human Resources'
        } else if (email.includes('manager')) {
          token.role = 'manager'
          token.department = 'Management'
        } else {
          token.role = 'employee'

          // Assign department based on email prefix
          if (email.startsWith('james') || email.startsWith('michael') || email.startsWith('david') || email.startsWith('amanda')) {
            token.department = 'Engineering'
          } else if (email.startsWith('emily') || email.startsWith('robert')) {
            token.department = 'Design'
          } else if (email.startsWith('lisa')) {
            token.department = 'Marketing'
          } else if (email.startsWith('sarah')) {
            token.department = 'Human Resources'
          } else {
            token.department = 'General'
          }
        }
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        // Extend session user with custom fields from token
        const user = session.user as any
        user.email = token.email as string
        user.id = token.id as string
        user.name = token.name as string
        user.role = token.role as string
        user.department = token.department as string
      }
      return session
    },
  },
}

// Apply custom callback URL logic
authOptions.pages = {
  signIn: '/login',
  error: '/login',
}
