'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Download, FileText, Calendar, Search, Filter, ChevronDown, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/lib/store'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

const mockPayrollData = [
  { id: '1', employee: 'Sarah Mitchell', department: 'HR', baseSalary: 95000, allowances: 2500, deductions: 2800, netSalary: 94700, status: 'paid', period: 'March 2026' },
  { id: '2', employee: 'James Chen', department: 'Engineering', baseSalary: 120000, allowances: 3000, deductions: 3500, netSalary: 119500, status: 'paid', period: 'March 2026' },
  { id: '3', employee: 'Emily Rodriguez', department: 'Design', baseSalary: 95000, allowances: 2500, deductions: 2800, netSalary: 94700, status: 'processed', period: 'March 2026' },
  { id: '4', employee: 'Michael Thompson', department: 'Engineering', baseSalary: 105000, allowances: 2800, deductions: 3200, netSalary: 105600, status: 'pending', period: 'March 2026' },
  { id: '5', employee: 'Lisa Wang', department: 'Marketing', baseSalary: 85000, allowances: 2200, deductions: 2400, netSalary: 84800, status: 'pending', period: 'March 2026' },
  { id: '6', employee: 'David Kumar', department: 'Finance', baseSalary: 75000, allowances: 2000, deductions: 2100, netSalary: 74900, status: 'pending', period: 'March 2026' },
]

const statusConfig = {
  paid: { label: 'Paid', color: 'text-success', bg: 'bg-success/10', icon: CheckCircle },
  processed: { label: 'Processed', color: 'text-info', bg: 'bg-info/10', icon: Clock },
  pending: { label: 'Pending', color: 'text-warning', bg: 'bg-warning/10', icon: Clock },
  draft: { label: 'Draft', color: 'text-text-muted', bg: 'bg-text-muted/10', icon: FileText },
}

export default function PayrollPage() {
  const { employees } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('March 2026')

  const totalPayroll = mockPayrollData.reduce((sum, p) => sum + p.netSalary, 0)
  const totalBase = mockPayrollData.reduce((sum, p) => sum + p.baseSalary, 0)
  const totalAllowances = mockPayrollData.reduce((sum, p) => sum + p.allowances, 0)
  const totalDeductions = mockPayrollData.reduce((sum, p) => sum + p.deductions, 0)

  return (
    <>
      <Header 
        title="Payroll" 
        subtitle="Manage employee salaries and generate payslips"
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
                  <DollarSign size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{formatCurrency(totalPayroll)}</h3>
              <p className="text-text-secondary text-sm">Total Payroll</p>
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
                  <DollarSign size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{formatCurrency(totalBase)}</h3>
              <p className="text-text-secondary text-sm">Base Salary</p>
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
                  <DollarSign size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{formatCurrency(totalAllowances)}</h3>
              <p className="text-text-secondary text-sm">Allowances</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-error/10 text-error">
                  <DollarSign size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-primary mb-1">{formatCurrency(totalDeductions)}</h3>
              <p className="text-text-secondary text-sm">Deductions</p>
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
            <Button variant="secondary">
              <Calendar size={20} className="mr-2" />
              {selectedPeriod}
              <ChevronDown size={16} className="ml-2" />
            </Button>
            <Button>
              <FileText size={20} className="mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Payroll Table */}
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
                    <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">Base Salary</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">Allowances</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">Deductions</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">Net Salary</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Status</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayrollData.map((payroll) => {
                    const status = statusConfig[payroll.status as keyof typeof statusConfig]
                    return (
                      <tr key={payroll.id} className="border-b border-border-glass hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <span className="text-text-primary font-medium">{payroll.employee}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-text-secondary">{payroll.department}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-text-primary font-mono">{formatCurrency(payroll.baseSalary)}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-success font-mono">+{formatCurrency(payroll.allowances)}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-error font-mono">-{formatCurrency(payroll.deductions)}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-text-primary font-bold font-mono">{formatCurrency(payroll.netSalary)}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium', status.bg, status.color)}>
                            <status.icon size={14} />
                            {status.label}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Button size="sm" variant="ghost">
                            <Download size={16} />
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