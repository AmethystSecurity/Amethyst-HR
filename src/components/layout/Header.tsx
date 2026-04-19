'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { getInitials } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user, logout } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const userFirstName = user?.email?.split('@')[0] || 'User'
  const userInitials = getInitials(userFirstName, '')
  const userRole = user?.role === 'admin' ? 'Administrator' : user?.role === 'hr' ? 'HR Manager' : user?.role === 'manager' ? 'Manager' : 'Employee'

  return (
    <header className="h-20 px-8 flex items-center justify-between border-b border-border-glass bg-bg-primary/50 backdrop-blur-xl sticky top-0 z-40">
      {/* Left section */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold font-heading text-text-primary"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-10 pl-11 pr-4 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amethyst/50 focus:ring-1 focus:ring-amethyst/20 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-3 rounded-xl hover:bg-white/5 transition-colors">
          <Bell size={20} className="text-text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amethyst rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 pr-4 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl gradient-amethyst flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {userInitials}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-text-primary">
                {userFirstName}
              </p>
              <p className="text-xs text-text-muted">{userRole}</p>
            </div>
          </button>

          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl glass border border-border-glass shadow-xl"
            >
              <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">
                <User className="inline-block w-4 h-4 mr-2" />
                Profile
              </button>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-colors"
              >
                <LogOut className="inline-block w-4 h-4 mr-2" />
                Sign Out
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}