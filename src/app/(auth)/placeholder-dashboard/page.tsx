'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { HardHat, Home, LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function PlaceholderDashboard() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    // Clear auth state and redirect to login
    logout()
    document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  // Get user initials from email
  const getInitials = (email: string) => {
    if (!email) return 'U'
    const parts = email.split('@')[0].split('.')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return email.substring(0, 2).toUpperCase()
  }

  // Get display name from email
  const getDisplayName = (email: string) => {
    if (!email) return 'User'
    return email.split('@')[0]
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-bg-primary">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-radial" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(153, 102, 204, ${Math.random() * 0.4 + 0.1})`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Top Left - Back to Home & Sign Out Buttons */}
      <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <Home size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Sign Out</span>
        </motion.button>
      </div>

      {/* Top Right - User Info Tab */}
      <div className="absolute top-6 right-6 z-20">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 pr-4 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl gradient-amethyst flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {user?.email ? getInitials(user.email) : 'U'}
              </span>
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-white">
                {user?.email ? getDisplayName(user.email) : 'User'}
              </p>
              <p className="text-xs text-gray-400">Employee</p>
            </div>
          </button>

          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl"
              style={{
                background: 'rgba(20, 20, 35, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(153, 102, 204, 0.2)',
              }}
            >
              <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                <User size={16} />
                Profile
              </button>
              <button 
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-amethyst/20 border border-amethyst/30 mb-8"
        >
          <HardHat className="w-16 h-16 text-amethyst" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-gradient font-heading mb-4"
        >
          Portal Under Construction
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-text-secondary text-lg max-w-md mx-auto"
        >
          We&apos;re building something amazing for you. Stay tuned for the full Amethyst experience — where cutting-edge cybersecurity meets innovative web development.
        </motion.p>

        {/* Decorative glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-12 w-64 h-1 mx-auto rounded-full bg-gradient-to-r from-transparent via-amethyst to-transparent"
        />
      </motion.div>
    </div>
  )
}