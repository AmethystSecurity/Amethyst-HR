'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, CalendarCheck, DollarSign, TrendingUp, TrendingDown, ArrowRight, Plus, FileText, CheckCircle } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { useAppStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

const attendanceData = [
  { month: 'Jan', present: 92, absent: 8 },
  { month: 'Feb', present: 88, absent: 12 },
  { month: 'Mar', present: 95, absent: 5 },
  { month: 'Apr', present: 90, absent: 10 },
  { month: 'May', present: 94, absent: 6 },
  { month: 'Jun', present: 96, absent: 4 },
]

const departmentData = [
  { name: 'Engineering', value: 25, color: '#9966CC' },
  { name: 'Design', value: 12, color: '#b388eb' },
  { name: 'Marketing', value: 15, color: '#c084fc' },
  { name: 'HR', value: 8, color: '#7b4bb3' },
  { name: 'Finance', value: 10, color: '#9333ea' },
]

const salaryData = [
  { range: '<50k', count: 5 },
  { range: '50-80k', count: 15 },
  { range: '80-100k', count: 20 },
  { range: '100-120k', count: 18 },
  { range: '>120k', count: 12 },
]

const statCards = [
  { 
    title: 'Total Employees', 
    value: '70', 
    trend: '+12%', 
    trendUp: true,
    icon: Users,
    color: 'text-amethyst'
  },
  { 
    title: 'Present Today', 
    value: '65', 
    trend: '+8%', 
    trendUp: true,
    icon: Clock,
    color: 'text-success'
  },
  { 
    title: 'Leave Requests', 
    value: '5', 
    trend: '-2', 
    trendUp: false,
    icon: CalendarCheck,
    color: 'text-warning'
  },
  { 
    title: 'Monthly Payroll', 
    value: '$285,000', 
    trend: '+5%', 
    trendUp: true,
    icon: DollarSign,
    color: 'text-info'
  },
]

const quickActions = [
  { label: 'Add Employee', icon: Plus, href: '/employees' },
  { label: 'Process Payroll', icon: DollarSign, href: '/payroll' },
  { label: 'Approve Leave', icon: CheckCircle, href: '/leave' },
  { label: 'Generate Report', icon: FileText, href: '/dashboard' },
]

export default function DashboardPage() {
  const { dashboardStats, setDashboardStats } = useAppStore()

  useEffect(() => {
    // Set mock dashboard stats
    setDashboardStats({
      totalEmployees: 70,
      employeesTrend: 12,
      presentToday: 65,
      presentTrend: 8,
      pendingLeave: 5,
      leaveTrend: -2,
      monthlyPayroll: 285000,
      payrollTrend: 5,
    })
  }, [setDashboardStats])

  return (
    <>
      <Header title="Dashboard" subtitle="Welcome back! Here's what's happening today." />
      
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-success' : 'text-error'}`}>
                    {stat.trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-text-primary mb-1">{stat.value}</h3>
                <p className="text-text-secondary text-sm">{stat.title}</p>
                
                {/* Decorative glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-amethyst/10 blur-3xl" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-96">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Monthly Attendance</h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9966CC" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#9966CC" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(18, 18, 26, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="present" 
                    stroke="#9966CC" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPresent)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Department Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-96">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Department Distribution</h3>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(18, 18, 26, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: dept.color }} />
                    <span className="text-xs text-text-secondary">{dept.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Salary Distribution & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Salary Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="h-80">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Salary Distribution</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="range" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(18, 18, 26, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#9966CC" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="h-80">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amethyst/10 text-amethyst group-hover:bg-amethyst/20 transition-colors">
                        <action.icon size={20} />
                      </div>
                      <span className="text-text-primary font-medium">{action.label}</span>
                    </div>
                    <ArrowRight size={18} className="text-text-muted group-hover:text-amethyst transition-colors" />
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}