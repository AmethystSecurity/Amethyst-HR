'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Menu, 
  ChevronLeft,
  LogOut,
  UserCog
} from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/store'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  
  // Check if we're on employee routes - they have their own sidebar
  const isEmployeeRoute = pathname?.startsWith('/employee')

  // Don't show global sidebar for employee pages
  if (isEmployeeRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]">
        <div className="pt-20">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main 
        className="transition-all duration-300"
        style={{ 
          marginLeft: sidebarCollapsed ? '80px' : '280px',
          minHeight: '100vh'
        }}
      >
        <div className="pt-20 p-6">
          {children}
        </div>
      </main>
    </div>
  )
}