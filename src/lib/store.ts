'use client'

import { create } from 'zustand'
import { 
  User, 
  Employee, 
  Department, 
  Attendance, 
  LeaveRequest, 
  PayrollRecord,
  DashboardStats,
  LeaveBalance 
} from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role?: 'admin' | 'hr' | 'manager' | 'employee') => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

interface AppState {
  // Dashboard
  dashboardStats: DashboardStats | null
  setDashboardStats: (stats: DashboardStats) => void
  
  // Employees
  employees: Employee[]
  selectedEmployee: Employee | null
  setEmployees: (employees: Employee[]) => void
  setSelectedEmployee: (employee: Employee | null) => void
  addEmployee: (employee: Employee) => void
  updateEmployee: (employee: Employee) => void
  deleteEmployee: (id: string) => void
  
  // Departments
  departments: Department[]
  setDepartments: (departments: Department[]) => void
  
  // Attendance
  attendance: Attendance[]
  todayAttendance: Attendance | null
  setAttendance: (attendance: Attendance[]) => void
  setTodayAttendance: (attendance: Attendance | null) => void
  clockIn: () => Promise<void>
  clockOut: () => Promise<void>
  
  // Leave
  leaveRequests: LeaveRequest[]
  leaveBalance: LeaveBalance | null
  setLeaveRequests: (requests: LeaveRequest[]) => void
  setLeaveBalance: (balance: LeaveBalance) => void
  addLeaveRequest: (request: LeaveRequest) => void
  updateLeaveRequest: (request: LeaveRequest) => void
  
  // Payroll
  payrollRecords: PayrollRecord[]
  setPayrollRecords: (records: PayrollRecord[]) => void
  processPayroll: () => Promise<void>
  
  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

// Mock data for demo
const mockDepartments: Department[] = [
  { id: '1', name: 'Engineering', description: 'Software development team', employeeCount: 25, createdAt: '2024-01-01' },
  { id: '2', name: 'Design', description: 'UI/UX design team', employeeCount: 12, createdAt: '2024-01-01' },
  { id: '3', name: 'Marketing', description: 'Marketing and communications', employeeCount: 15, createdAt: '2024-01-01' },
  { id: '4', name: 'Human Resources', description: 'HR and people operations', employeeCount: 8, createdAt: '2024-01-01' },
  { id: '5', name: 'Finance', description: 'Financial planning and accounting', employeeCount: 10, createdAt: '2024-01-01' },
]

const mockEmployees: Employee[] = [
  { id: '1', userId: '1', firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah.m@amethyst.com', phone: '+1 555-0101', departmentId: '4', departmentName: 'Human Resources', role: 'HR Director', startDate: '2022-03-15', salary: 95000, status: 'active', createdAt: '2022-03-15', updatedAt: '2024-01-01' },
  { id: '2', userId: '2', firstName: 'James', lastName: 'Chen', email: 'james.c@amethyst.com', phone: '+1 555-0102', departmentId: '1', departmentName: 'Engineering', role: 'Senior Developer', startDate: '2021-06-20', salary: 120000, status: 'active', createdAt: '2021-06-20', updatedAt: '2024-01-01' },
  { id: '3', userId: '3', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@amethyst.com', phone: '+1 555-0103', departmentId: '2', departmentName: 'Design', role: 'Lead Designer', startDate: '2022-01-10', salary: 95000, status: 'active', createdAt: '2022-01-10', updatedAt: '2024-01-01' },
  { id: '4', userId: '4', firstName: 'Michael', lastName: 'Thompson', email: 'michael.t@amethyst.com', phone: '+1 555-0104', departmentId: '1', departmentName: 'Engineering', role: 'DevOps Engineer', startDate: '2023-02-01', salary: 105000, status: 'active', createdAt: '2023-02-01', updatedAt: '2024-01-01' },
  { id: '5', userId: '5', firstName: 'Lisa', lastName: 'Wang', email: 'lisa.w@amethyst.com', phone: '+1 555-0105', departmentId: '3', departmentName: 'Marketing', role: 'Marketing Manager', startDate: '2022-08-15', salary: 85000, status: 'active', createdAt: '2022-08-15', updatedAt: '2024-01-01' },
  { id: '6', userId: '6', firstName: 'David', lastName: 'Kumar', email: 'david.k@amethyst.com', phone: '+1 555-0106', departmentId: '5', departmentName: 'Finance', role: 'Financial Analyst', startDate: '2023-04-10', salary: 75000, status: 'active', createdAt: '2023-04-10', updatedAt: '2024-01-01' },
  { id: '7', userId: '7', firstName: 'Amanda', lastName: 'Foster', email: 'amanda.f@amethyst.com', phone: '+1 555-0107', departmentId: '1', departmentName: 'Engineering', role: 'Frontend Developer', startDate: '2023-07-01', salary: 90000, status: 'active', createdAt: '2023-07-01', updatedAt: '2024-01-01' },
  { id: '8', userId: '8', firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@amethyst.com', phone: '+1 555-0108', departmentId: '2', departmentName: 'Design', role: 'UX Researcher', startDate: '2023-09-15', salary: 80000, status: 'active', createdAt: '2023-09-15', updatedAt: '2024-01-01' },
]

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: async (email: string, password: string, role?: 'admin' | 'hr' | 'manager' | 'employee') => {
    // Determine role based on email OR use provided role
    let userRole: 'admin' | 'hr' | 'manager' | 'employee' = 'employee'
    
    // Use provided role if available, otherwise auto-detect
    if (role) {
      userRole = role
    } else if (email.includes('admin') || email.includes('hradmin')) {
      userRole = 'admin'
    } else if (email.includes('hr') || email.includes('hr@')) {
      userRole = 'hr'
    } else if (email.includes('manager')) {
      userRole = 'manager'
    }
    
    set({
      user: {
        id: '1',
        email,
        role: userRole,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      isAuthenticated: true,
      isLoading: false
    })
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
  
  checkAuth: async () => {
    // Check for stored session
    await new Promise(resolve => setTimeout(resolve, 500))
    set({ isLoading: false })
  }
}))

export const useAppStore = create<AppState>((set, get) => ({
  // Dashboard
  dashboardStats: null,
  setDashboardStats: (stats) => set({ dashboardStats: stats }),
  
  // Employees
  employees: mockEmployees,
  selectedEmployee: null,
  setEmployees: (employees) => set({ employees }),
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  addEmployee: (employee) => set((state) => ({ 
    employees: [...state.employees, employee] 
  })),
  updateEmployee: (employee) => set((state) => ({
    employees: state.employees.map(e => e.id === employee.id ? employee : e)
  })),
  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter(e => e.id !== id)
  })),
  
  // Departments
  departments: mockDepartments,
  setDepartments: (departments) => set({ departments }),
  
  // Attendance
  attendance: [],
  todayAttendance: null,
  setAttendance: (attendance) => set({ attendance }),
  setTodayAttendance: (attendance) => set({ todayAttendance: attendance }),
  clockIn: async () => {
    // Simulate clock in
    await new Promise(resolve => setTimeout(resolve, 500))
    const now = new Date().toISOString()
    set({
      todayAttendance: {
        id: '1',
        employeeId: '1',
        employeeName: 'Sarah Mitchell',
        date: now.split('T')[0],
        clockIn: now,
        status: 'present',
        createdAt: now
      }
    })
  },
  clockOut: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const state = get()
    if (state.todayAttendance) {
      const now = new Date().toISOString()
      set({
        todayAttendance: {
          ...state.todayAttendance,
          clockOut: now,
          status: 'present'
        }
      })
    }
  },
  
  // Leave
  leaveRequests: [],
  leaveBalance: {
    employeeId: '1',
    annual: { total: 20, used: 5, remaining: 15 },
    sick: { total: 10, used: 2, remaining: 8 },
    personal: { total: 5, used: 1, remaining: 4 }
  },
  setLeaveRequests: (requests) => set({ leaveRequests: requests }),
  setLeaveBalance: (balance) => set({ leaveBalance: balance }),
  addLeaveRequest: (request) => set((state) => ({
    leaveRequests: [...state.leaveRequests, request]
  })),
  updateLeaveRequest: (request) => set((state) => ({
    leaveRequests: state.leaveRequests.map(r => r.id === request.id ? request : r)
  })),
  
  // Payroll
  payrollRecords: [],
  setPayrollRecords: (records) => set({ payrollRecords: records }),
  processPayroll: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    // Process payroll logic
  },
  
  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open })
}))