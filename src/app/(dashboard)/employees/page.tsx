'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Filter, Mail, Phone, MoreVertical, Edit, Trash2, Eye } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/lib/store'
import { getInitials, cn } from '@/lib/utils'
import type { Employee, EmployeeStatus } from '@/types'

const statusColors: Record<EmployeeStatus, string> = {
  active: 'bg-success/20 text-success',
  inactive: 'bg-text-muted/20 text-text-muted',
  on_leave: 'bg-warning/20 text-warning',
  terminated: 'bg-error/20 text-error',
}

export default function EmployeesPage() {
  const { employees, departments, deleteEmployee } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = !selectedDepartment || emp.departmentId === selectedDepartment
    const matchesStatus = !selectedStatus || emp.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <>
      <Header 
        title="Employees" 
        subtitle={`${employees.length} total employees`}
      />
      
      <div className="p-8">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
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

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-12 px-4 rounded-xl bg-white/5 border border-border-glass text-text-primary focus:outline-none focus:border-amethyst/50 transition-all cursor-pointer"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-12 px-4 rounded-xl bg-white/5 border border-border-glass text-text-primary focus:outline-none focus:border-amethyst/50 transition-all cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>

            <Button onClick={() => setShowAddModal(true)}>
              <Plus size={20} className="mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="relative group">
                {/* Menu */}
                <button className="absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/5 transition-all">
                  <MoreVertical size={18} className="text-text-muted" />
                </button>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 rounded-2xl gradient-amethyst flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-white">
                      {getInitials(employee.firstName, employee.lastName)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-sm text-text-secondary">{employee.role}</p>
                </div>

                {/* Department Badge */}
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-text-secondary">
                    {employee.departmentName}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Mail size={14} className="text-text-muted" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Phone size={14} className="text-text-muted" />
                    <span>{employee.phone}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-4 border-t border-border-glass">
                  <span className={cn('px-3 py-1 rounded-full text-xs font-medium', statusColors[employee.status])}>
                    {employee.status.replace('_', ' ').charAt(0).toUpperCase() + employee.status.slice(2).replace('_', ' ')}
                  </span>
                  <span className="text-xs text-text-muted">
                    Since {new Date(employee.startDate).getFullYear()}
                  </span>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-bg-card/90 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button size="sm" variant="secondary">
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No employees found</h3>
            <p className="text-text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </>
  )
}