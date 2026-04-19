'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/lib/store'
import { cn, formatTime } from '@/lib/utils'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const mockAttendanceData = [
  { day: '1', present: 65, absent: 5, late: 2 },
  { day: '2', present: 68, absent: 2, late: 2 },
  { day: '3', present: 70, absent: 0, late: 2 },
  { day: '4', present: 66, absent: 4, late: 3 },
  { day: '5', present: 72, absent: 0, late: 1 },
  { day: '6', present: 69, absent: 2, late: 2 },
  { day: '7', present: 71, absent: 1, late: 1 },
  { day: '8', present: 68, absent: 3, late: 2 },
  { day: '9', present: 70, absent: 1, late: 2 },
  { day: '10', present: 73, absent: 0, late: 0 },
  { day: '11', present: 67, absent: 5, late: 1 },
  { day: '12', present: 69, absent: 2, late: 2 },
  { day: '13', present: 70, absent: 2, late: 1 },
  { day: '14', present: 71, absent: 1, late: 1 },
]

export default function AttendancePage() {
  const { todayAttendance, clockIn, clockOut, employees } = useAppStore()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const handleClockIn = async () => {
    setIsLoading(true)
    await clockIn()
    setIsLoading(false)
  }

  const handleClockOut = async () => {
    setIsLoading(true)
    await clockOut()
    setIsLoading(false)
  }

  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: '', empty: true })
    }
    
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayData = mockAttendanceData.find(d => parseInt(d.day) === i)
      days.push({
        day: i,
        present: dayData?.present || 0,
        absent: dayData?.absent || 0,
        late: dayData?.late || 0,
      })
    }
    
    return days
  }

  const stats = [
    { label: 'Present', value: '68', color: 'text-success', bg: 'bg-success/10' },
    { label: 'Absent', value: '2', color: 'text-error', bg: 'bg-error/10' },
    { label: 'Late', value: '3', color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'On Leave', value: '5', color: 'text-info', bg: 'bg-info/10' },
  ]

  return (
    <>
      <Header 
        title="Attendance" 
        subtitle="Track and manage employee attendance"
      />
      
      <div className="p-8">
        {/* Clock In/Out Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Clock Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="text-center py-10">
              <div className="mb-6">
                <div className="text-5xl font-bold text-text-primary font-mono mb-2">
                  {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <p className="text-text-secondary">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {todayAttendance?.clockIn ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                    <div className="flex items-center justify-center gap-2 text-success">
                      <CheckCircle size={20} />
                      <span className="font-medium">Clocked In at {formatTime(todayAttendance.clockIn)}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleClockOut} 
                    isLoading={isLoading}
                    className="w-full"
                  >
                    <Clock size={20} className="mr-2" />
                    Clock Out
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleClockIn} 
                  isLoading={isLoading}
                  className="w-full"
                >
                  <Clock size={20} className="mr-2" />
                  Clock In
                </Button>
              )}
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Today&apos;s Overview</h3>
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={cn('text-3xl font-bold mb-1', stat.color)}>{stat.value}</div>
                    <div className={cn('px-3 py-1 rounded-full text-xs', stat.bg, stat.color)}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border-glass">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Total Employees</span>
                  <span className="text-text-primary font-medium">78</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Calendar and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ChevronLeft size={20} className="text-text-secondary" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight size={20} className="text-text-secondary" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs text-text-muted py-2">
                    {day}
                  </div>
                ))}
                {getMonthDays().map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      'aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative',
                      day.empty ? '' : 'hover:bg-white/5 cursor-pointer transition-colors'
                    )}
                  >
                    {day.day && (
                      <>
                        <span className="text-text-primary">{day.day}</span>
                        {(day.present ?? 0) > 0 && (
                          <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-success" />
                        )}
                        {(day.late ?? 0) > 0 && (
                          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-warning" />
                        )}
                        {(day.absent ?? 0) > 0 && (
                          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-error" />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs text-text-secondary">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs text-text-secondary">Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error" />
                  <span className="text-xs text-text-secondary">Absent</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Weekly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockAttendanceData}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(18, 18, 26, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="present" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPresent)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}