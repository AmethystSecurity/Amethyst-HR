'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

/**
 * Route Protection Hook
 * 
 * Protects routes based on user role:
 * - /hradmin routes: Only admin/hr roles can access
 * - /employee routes: Only employee/manager roles can access
 * 
 * @param allowedRoles - Array of roles that can access this route
 */

interface UseRouteProtectionOptions {
  allowedRoles: ('admin' | 'hr' | 'manager' | 'employee')[]
  redirectTo?: string
}

export function useRouteProtection({ 
  allowedRoles, 
  redirectTo = '/login' 
}: UseRouteProtectionOptions) {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      router.push(redirectTo)
      return
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(user.role)) {
      // Role not allowed - redirect to appropriate dashboard
      if (user.role === 'admin' || user.role === 'hr') {
        router.push('/hradmin')
      } else {
        router.push('/employee')
      }
    }
  }, [user, isAuthenticated, isLoading, router, pathname, allowedRoles, redirectTo])

  return { user, isAuthenticated, isLoading }
}

/**
 * Example usage in a dashboard layout:
 * 
 * 'use client'
 * import { useRouteProtection } from '@/lib/routeProtection'
 * 
 * export default function DashboardLayout({ children }) {
 *   // Protect HR Admin routes
 *   useRouteProtection({ 
 *     allowedRoles: ['admin', 'hr', 'manager'],
 *     redirectTo: '/employee'
 *   })
 * 
 *   return <>{children}</>
 * }
 */

/**
 * Check if user has specific role
 */
export function hasRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    'admin': 4,
    'hr': 3,
    'manager': 2,
    'employee': 1
  }
  
  return (roleHierarchy[userRole as keyof typeof roleHierarchy] || 0) >= 
         (roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0)
}

/**
 * Get dashboard URL based on role
 */
export function getDashboardByRole(role: string): string {
  switch (role) {
    case 'admin':
    case 'hr':
    case 'manager':
      return '/hradmin'
    case 'employee':
    default:
      return '/employee'
  }
}