'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  CalendarDays,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Briefcase,
  TrendingUp,
  Users,
  Mail,
  Bell,
  Calendar,
  ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/lib/store'

// User Profile type from localStorage
interface UserProfile {
  id: string
  email: string
  username: string
  fullName?: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: string
  position?: string
  department?: string
  employeeId?: string
  avatar?: string
  address?: string
  joinedDate?: string
  annualLeave?: number
  sickLeave?: number
  personalLeave?: number
  workFromHome?: number
  isActive?: boolean
}

// Weekly attendance mock data
const weeklyAttendance = [
  { day: 'Mon', status: 'present', time: '09:00 AM' },
  { day: 'Tue', status: 'present', time: '08:55 AM' },
  { day: 'Wed', status: 'present', time: '09:05 AM' },
  { day: 'Thu', status: 'late', time: '09:30 AM' },
  { day: 'Fri', status: 'present', time: '08:50 AM' },
]

// Upcoming holidays mock data
const upcomingHolidays = [
  { date: 'Apr 1', name: 'April Fools Day', type: 'optional' },
  { date: 'Apr 20', name: 'Easter Sunday', type: 'public' },
  { date: 'May 12', name: "Mother's Day", type: 'optional' },
  { date: 'May 26', name: 'Memorial Day', type: 'public' },
]

// Quick actions
const quickActions = [
  { label: 'Apply Leave', icon: CalendarDays, color: '#9966CC', href: '/employee/leave' },
  { label: 'View Profile', icon: FileText, color: '#ec4899', href: '/employee/profile' },
  { label: 'Messages', icon: Mail, color: '#06b6d4', href: '/employee/messages' },
  { label: 'Performance', icon: TrendingUp, color: '#10b981', href: '/employee/performance' },
]

export default function EmployeeDashboard() {
  const { user, logout } = useAuthStore()
  const [clockedIn, setClockedIn] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('--:--:--')
  const [isClient, setIsClient] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  // Load user profile from localStorage on mount
  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userProfile')
      if (stored) {
        try {
          const profile = JSON.parse(stored) as UserProfile
          setUserProfile(profile)
        } catch (e) {
          console.error('Failed to parse user profile:', e)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!isClient) return
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)
    return () => clearInterval(timer)
  }, [isClient])

  // Get user info from profile or auth store
  const userEmail = userProfile?.email || user?.email || ''
  const firstName = userProfile?.firstName || userEmail.split('@')[0] || 'User'
  const fullName = userProfile?.fullName || firstName
  const initials = getInitials(fullName || 'User')
  const userRole = userProfile?.role || user?.role || 'employee'
  const employeeId = userProfile?.employeeId || 'EMP-001'
  const userDepartment = userProfile?.department || 'General'
  const position = userProfile?.position || 'Employee'

  // Leave balance from user profile
  const leaveData = userProfile ? [
    { type: 'Annual Leave', total: 15, used: Math.max(0, 15 - (userProfile.annualLeave ?? 15)), color: '#9966CC' },
    { type: 'Sick Leave', total: 10, used: Math.max(0, 10 - (userProfile.sickLeave ?? 8)), color: '#ec4899' },
    { type: 'Personal Leave', total: 5, used: Math.max(0, 5 - (userProfile.personalLeave ?? 4)), color: '#8b5cf6' },
    { type: 'Work From Home', total: 12, used: Math.max(0, 12 - (userProfile.workFromHome ?? 8)), color: '#06b6d4' },
  ] : [
    { type: 'Annual Leave', total: 15, used: 5, color: '#9966CC' },
    { type: 'Sick Leave', total: 10, used: 2, color: '#ec4899' },
    { type: 'Personal Leave', total: 5, used: 1, color: '#8b5cf6' },
    { type: 'Work From Home', total: 12, used: 4, color: '#06b6d4' },
  ]

  const getWorkedHours = () => {
    if (!clockedIn) return '0h 0m'
    // Calculate based on work start at 9:00 AM
    const now = new Date()
    const workStart = new Date()
    workStart.setHours(9, 0, 0, 0)
    const diff = now.getTime() - workStart.getTime()
    const hours = Math.floor(Math.max(0, diff) / (1000 * 60 * 60))
    const mins = Math.floor((Math.max(0, diff) % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${mins}m`
  }

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator'
      case 'hr': return 'HR Manager'
      case 'manager': return 'Manager'
      default: return 'Employee'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {firstName}!
          </h1>
           <p className="text-gray-400 mt-1">
             Here&apos;s your attendance overview for today
           </p>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Time & Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-gray-400 text-sm">Current Time</p>
                <p className="text-2xl font-bold text-white font-mono mt-1">
                  {isClient ? currentTime : '--:--:--'}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {isClient 
                    ? new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                    : '--/--/----'
                  }
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${clockedIn ? 'bg-emerald-500/20' : 'bg-[#9966CC]/20'}`}>
                <Clock className={clockedIn ? 'text-emerald-400' : 'text-[#9966CC]'} size={24} />
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#9966CC]/10 blur-2xl" />
          </Card>
        </motion.div>

        {/* Worked Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-gray-400 text-sm">Worked Today</p>
                <p className="text-2xl font-bold text-white mt-1">{getWorkedHours()}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {clockedIn ? 'Currently clocked in' : 'Not started'}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="text-emerald-400" size={24} />
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-500/10 blur-2xl" />
          </Card>
        </motion.div>

        {/* Pending Leave Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-gray-400 text-sm">Pending Requests</p>
                <p className="text-2xl font-bold text-white mt-1">2</p>
                <p className="text-gray-500 text-xs mt-1">Awaiting approval</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <AlertCircle className="text-amber-400" size={24} />
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-amber-500/10 blur-2xl" />
          </Card>
        </motion.div>

        {/* Unread Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-gray-400 text-sm">Messages</p>
                <p className="text-2xl font-bold text-white mt-1">3</p>
                <p className="text-gray-500 text-xs mt-1">Unread messages</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Mail className="text-cyan-400" size={24} />
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-cyan-500/10 blur-2xl" />
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: `${action.color}20` }}
                    >
                      <action.icon size={24} style={{ color: action.color }} />
                    </div>
                    <p className="text-white text-sm font-medium group-hover:text-[#9966CC] transition-colors">
                      {action.label}
                    </p>
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Weekly Attendance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">This Week&apos;s Attendance</h3>
                <button className="text-[#9966CC] text-sm hover:text-[#7b4bb3] transition-colors flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {weeklyAttendance.map((day) => (
                  <div 
                    key={day.day}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        p-2 rounded-lg
                        ${day.status === 'present' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                        ${day.status === 'late' ? 'bg-amber-500/10 text-amber-400' : ''}
                        ${day.status === 'absent' ? 'bg-red-500/10 text-red-400' : ''}
                      `}>
                        {day.status === 'present' && <CheckCircle size={20} />}
                        {day.status === 'late' && <Clock size={20} />}
                        {day.status === 'absent' && <XCircle size={20} />}
                      </div>
                      <div>
                        <p className="text-white font-medium">{day.day}</p>
                        <p className="text-gray-500 text-sm capitalize">{day.status}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 font-mono">{day.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Leave Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Leave Balance</h3>
              <div className="space-y-4">
                {leaveData.map((leave) => {
                  const remaining = leave.total - leave.used
                  const percentage = (remaining / leave.total) * 100
                  
                  return (
                    <div key={leave.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{leave.type}</span>
                        <span className="text-white">{remaining}/{leave.total} days</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          className="h-full rounded-full"
                          style={{ background: leave.color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <button className="w-full mt-6 py-3 rounded-xl bg-[#9966CC]/10 text-[#9966CC] hover:bg-[#9966CC]/20 transition-colors text-sm font-medium">
                Request Leave
              </button>
            </Card>
          </motion.div>

          {/* Upcoming Holidays */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Holidays</h3>
              <div className="space-y-3">
                {upcomingHolidays.map((holiday, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        px-3 py-1 rounded-lg text-xs font-medium
                        ${holiday.type === 'public' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#9966CC]/10 text-[#9966CC]'}
                      `}>
                        {holiday.type}
                      </div>
                      <span className="text-white">{holiday.name}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{holiday.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* My Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">My Information</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Employee ID */}
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Employee ID</p>
              <p className="text-white font-medium">{employeeId}</p>
            </div>
            
            {/* Department */}
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Department</p>
              <p className="text-white font-medium">{userDepartment}</p>
            </div>
            
            {/* Position */}
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Position</p>
              <p className="text-white font-medium">{position}</p>
            </div>
            
            {/* Role */}
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Role</p>
              <p className="text-white font-medium">{getRoleDisplay(userRole)}</p>
            </div>
            
            {/* Email */}
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-white font-medium truncate">{userEmail}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

// Helper function to generate initials
function getInitials(name: string): string {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}