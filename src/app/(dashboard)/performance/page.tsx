'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Star, Target, MessageSquare, Search, Filter, ChevronDown, Award } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/lib/store'
import { cn, getInitials } from '@/lib/utils'

const mockPerformanceData = [
  { id: '1', employee: 'Sarah Mitchell', department: 'HR', role: 'HR Director', selfRating: 4.5, managerRating: 4.8, kpiScore: 92, trend: 'up' },
  { id: '2', employee: 'James Chen', department: 'Engineering', role: 'Senior Developer', selfRating: 4.2, managerRating: 4.5, kpiScore: 88, trend: 'up' },
  { id: '3', employee: 'Emily Rodriguez', department: 'Design', role: 'Lead Designer', selfRating: 4.8, managerRating: 4.9, kpiScore: 95, trend: 'up' },
  { id: '4', employee: 'Michael Thompson', department: 'Engineering', role: 'DevOps Engineer', selfRating: 3.8, managerRating: 4.0, kpiScore: 78, trend: 'stable' },
  { id: '5', employee: 'Lisa Wang', department: 'Marketing', role: 'Marketing Manager', selfRating: 4.0, managerRating: 4.2, kpiScore: 82, trend: 'up' },
  { id: '6', employee: 'David Kumar', department: 'Finance', role: 'Financial Analyst', selfRating: 4.3, managerRating: 4.4, kpiScore: 86, trend: 'up' },
  { id: '7', employee: 'Amanda Foster', department: 'Engineering', role: 'Frontend Developer', selfRating: 4.1, managerRating: 4.3, kpiScore: 84, trend: 'up' },
  { id: '8', employee: 'Robert Johnson', department: 'Design', role: 'UX Researcher', selfRating: 3.5, managerRating: 3.8, kpiScore: 72, trend: 'down' },
]

const ratingColors = {
  excellent: { bg: 'bg-success/10', text: 'text-success' },
  good: { bg: 'bg-amethyst/10', text: 'text-amethyst' },
  average: { bg: 'bg-warning/10', text: 'text-warning' },
  poor: { bg: 'bg-error/10', text: 'text-error' },
}

const getRatingCategory = (rating: number) => {
  if (rating >= 4.5) return { label: 'Excellent', ...ratingColors.excellent }
  if (rating >= 4.0) return { label: 'Good', ...ratingColors.good }
  if (rating >= 3.0) return { label: 'Average', ...ratingColors.average }
  return { label: 'Poor', ...ratingColors.poor }
}

export default function PerformancePage() {
  const { employees } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')

  const avgRating = mockPerformanceData.reduce((sum, p) => sum + p.managerRating, 0) / mockPerformanceData.length
  const topPerformer = mockPerformanceData.reduce((top, p) => p.kpiScore > top.kpiScore ? p : top, mockPerformanceData[0])
  const needsImprovement = mockPerformanceData.filter(p => p.kpiScore < 75).length

  return (
    <>
      <Header 
        title="Performance" 
        subtitle="Track employee performance and KPIs"
      />
      
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-amethyst/10 text-amethyst">
                  <TrendingUp size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{avgRating.toFixed(1)}</h3>
              <p className="text-text-secondary text-sm">Average Rating</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <Award size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{topPerformer.employee.split(' ')[0]}</h3>
              <p className="text-text-secondary text-sm">Top Performer</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-info/10 text-info">
                  <Target size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">85%</h3>
              <p className="text-text-secondary text-sm">Avg. KPI Score</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-warning/10 text-warning">
                  <MessageSquare size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{needsImprovement}</h3>
              <p className="text-text-secondary text-sm">Need Attention</p>
            </Card>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amethyst/50 transition-all"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-12 px-4 rounded-xl bg-white/5 border border-border-glass text-text-primary focus:outline-none focus:border-amethyst/50 transition-all cursor-pointer"
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>

            <Button>
              <Filter size={20} className="mr-2" />
              Start Review
            </Button>
          </div>
        </div>

        {/* Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-glass">
                    <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Employee</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Department</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Self Rating</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Manager Rating</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">KPI Score</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Trend</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPerformanceData.map((employee) => {
                    const selfCategory = getRatingCategory(employee.selfRating)
                    const managerCategory = getRatingCategory(employee.managerRating)
                    return (
                      <tr key={employee.id} className="border-b border-border-glass hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl gradient-amethyst flex items-center justify-center">
                              <span className="text-sm font-semibold text-white">
                                {getInitials(employee.employee.split(' ')[0], employee.employee.split(' ')[1])}
                              </span>
                            </div>
                            <div>
                              <span className="text-text-primary font-medium block">{employee.employee}</span>
                              <span className="text-text-muted text-sm">{employee.role}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-text-secondary">{employee.department}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={cn('px-3 py-1 rounded-full text-xs font-medium', selfCategory.bg, selfCategory.text)}>
                              {employee.selfRating.toFixed(1)}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < Math.floor(employee.selfRating) ? 'text-warning fill-warning' : 'text-text-muted'} 
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={cn('px-3 py-1 rounded-full text-xs font-medium', managerCategory.bg, managerCategory.text)}>
                              {employee.managerRating.toFixed(1)}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < Math.floor(employee.managerRating) ? 'text-warning fill-warning' : 'text-text-muted'} 
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-16 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  'h-full rounded-full transition-all',
                                  employee.kpiScore >= 90 ? 'bg-success' :
                                  employee.kpiScore >= 75 ? 'bg-amethyst' :
                                  employee.kpiScore >= 60 ? 'bg-warning' : 'bg-error'
                                )}
                                style={{ width: `${employee.kpiScore}%` }}
                              />
                            </div>
                            <span className="ml-2 text-text-primary font-medium">{employee.kpiScore}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {employee.trend === 'up' && <TrendingUp size={20} className="inline text-success" />}
                          {employee.trend === 'down' && <TrendingUp size={20} className="inline text-error rotate-180" />}
                          {employee.trend === 'stable' && <span className="text-text-muted">—</span>}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Button size="sm" variant="ghost">
                            <MessageSquare size={16} />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  )
}