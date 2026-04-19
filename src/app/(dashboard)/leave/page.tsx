'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Plus, Search, Clock, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/lib/store'
import { formatDate, cn } from '@/lib/utils'

const mockLeaveRequests = [
  { id: '1', employee: 'James Chen', leaveType: 'annual', startDate: '2026-03-28', endDate: '2026-04-02', totalDays: 4, reason: 'Family vacation', status: 'pending', createdAt: '2026-03-20' },
  { id: '2', employee: 'Emily Rodriguez', leaveType: 'sick', startDate: '2026-03-25', endDate: '2026-03-26', totalDays: 2, reason: 'Medical appointment', status: 'approved', approvedBy: 'Sarah Mitchell', createdAt: '2026-03-24' },
  { id: '3', employee: 'Michael Thompson', leaveType: 'personal', startDate: '2026-03-30', endDate: '2026-03-30', totalDays: 1, reason: 'Personal matter', status: 'pending', createdAt: '2026-03-22' },
  { id: '4', employee: 'Lisa Wang', leaveType: 'annual', startDate: '2026-04-10', endDate: '2026-04-15', totalDays: 4, reason: 'Wedding anniversary', status: 'rejected', rejectReason: 'Team deadline conflict', createdAt: '2026-03-18' },
  { id: '5', employee: 'David Kumar', leaveType: 'sick', startDate: '2026-03-22', endDate: '2026-03-23', totalDays: 2, reason: 'Flu', status: 'approved', approvedBy: 'Sarah Mitchell', createdAt: '2026-03-21' },
]

const leaveTypes = {
  annual: { label: 'Annual Leave', color: 'text-amethyst', bg: 'bg-amethyst/10' },
  sick: { label: 'Sick Leave', color: 'text-error', bg: 'bg-error/10' },
  personal: { label: 'Personal Leave', color: 'text-info', bg: 'bg-info/10' },
  maternity: { label: 'Maternity Leave', color: 'text-warning', bg: 'bg-warning/10' },
  paternity: { label: 'Paternity Leave', color: 'text-success', bg: 'bg-success/10' },
  unpaid: { label: 'Unpaid Leave', color: 'text-text-muted', bg: 'bg-text-muted/10' },
}

const statusConfig = {
  pending: { label: 'Pending', color: 'text-warning', bg: 'bg-warning/10', icon: Clock },
  approved: { label: 'Approved', color: 'text-success', bg: 'bg-success/10', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'text-error', bg: 'bg-error/10', icon: XCircle },
  cancelled: { label: 'Cancelled', color: 'text-text-muted', bg: 'bg-text-muted/10', icon: AlertCircle },
}

export default function LeavePage() {
  const { leaveBalance } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  return (
    <>
      <Header 
        title="Leave Management" 
        subtitle="Manage leave requests and track balances"
      />
      
      <div className="p-8">
        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-amethyst/10 -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-text-secondary text-sm mb-4">Annual Leave</h3>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-text-primary mb-1">
                    {leaveBalance?.annual.remaining || 15}
                  </div>
                  <div className="text-text-muted text-sm">days remaining</div>
                </div>
                <div className="text-right">
                  <div className="text-text-secondary text-sm">Used: {leaveBalance?.annual.used || 5}</div>
                  <div className="text-text-muted text-sm">Total: {leaveBalance?.annual.total || 20}</div>
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amethyst rounded-full transition-all"
                  style={{ width: `${((leaveBalance?.annual.used || 5) / (leaveBalance?.annual.total || 20)) * 100}%` }}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-error/10 -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-text-secondary text-sm mb-4">Sick Leave</h3>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-text-primary mb-1">
                    {leaveBalance?.sick.remaining || 8}
                  </div>
                  <div className="text-text-muted text-sm">days remaining</div>
                </div>
                <div className="text-right">
                  <div className="text-text-secondary text-sm">Used: {leaveBalance?.sick.used || 2}</div>
                  <div className="text-text-muted text-sm">Total: {leaveBalance?.sick.total || 10}</div>
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-error rounded-full transition-all"
                  style={{ width: `${((leaveBalance?.sick.used || 2) / (leaveBalance?.sick.total || 10)) * 100}%` }}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-info/10 -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-text-secondary text-sm mb-4">Personal Leave</h3>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-text-primary mb-1">
                    {leaveBalance?.personal.remaining || 4}
                  </div>
                  <div className="text-text-muted text-sm">days remaining</div>
                </div>
                <div className="text-right">
                  <div className="text-text-secondary text-sm">Used: {leaveBalance?.personal.used || 1}</div>
                  <div className="text-text-muted text-sm">Total: {leaveBalance?.personal.total || 5}</div>
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-info rounded-full transition-all"
                  style={{ width: `${((leaveBalance?.personal.used || 1) / (leaveBalance?.personal.total || 5)) * 100}%` }}
                />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search leave requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amethyst/50 transition-all"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-12 px-4 rounded-xl bg-white/5 border border-border-glass text-text-primary focus:outline-none focus:border-amethyst/50 transition-all cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <Button>
              <Plus size={20} className="mr-2" />
              Request Leave
            </Button>
          </div>
        </div>

        {/* Leave Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-glass">
                    <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Employee</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Type</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Duration</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Days</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">Reason</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Status</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaveRequests.map((request) => {
                    const leaveType = leaveTypes[request.leaveType as keyof typeof leaveTypes]
                    const status = statusConfig[request.status as keyof typeof statusConfig]
                    return (
                      <tr key={request.id} className="border-b border-border-glass hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <span className="text-text-primary font-medium">{request.employee}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={cn('inline-flex px-3 py-1 rounded-full text-xs font-medium', leaveType.bg, leaveType.color)}>
                            {leaveType.label}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-text-primary text-sm">
                            {formatDate(request.startDate)} - {formatDate(request.endDate)}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-text-primary font-medium">{request.totalDays}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-text-secondary text-sm truncate max-w-[200px] block">
                            {request.reason}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium', status.bg, status.color)}>
                            <status.icon size={14} />
                            {status.label}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {request.status === 'pending' && (
                            <div className="flex justify-center gap-2">
                              <Button size="sm" variant="ghost" className="text-success hover:text-success">
                                <CheckCircle size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-error hover:text-error">
                                <XCircle size={16} />
                              </Button>
                            </div>
                          )}
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