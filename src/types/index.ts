// User types
export type UserRole = 'admin' | 'hr' | 'manager' | 'employee'

export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

// Employee types
export type EmployeeStatus = 'active' | 'inactive' | 'on_leave' | 'terminated'

export interface Employee {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  photoUrl?: string
  departmentId: string
  departmentName: string
  role: string
  managerId?: string
  managerName?: string
  startDate: string
  salary: number
  status: EmployeeStatus
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  name: string
  description: string
  managerId?: string
  managerName?: string
  employeeCount: number
  createdAt: string
}

// Attendance types
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'on_leave' | 'half_day'

export interface Attendance {
  id: string
  employeeId: string
  employeeName: string
  date: string
  clockIn?: string
  clockOut?: string
  status: AttendanceStatus
  lateMinutes?: number
  notes?: string
  createdAt: string
}

// Leave types
export type LeaveType = 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid'
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  totalDays: number
  reason: string
  status: LeaveStatus
  approvedBy?: string
  approvedAt?: string
  rejectReason?: string
  createdAt: string
}

export interface LeaveBalance {
  employeeId: string
  annual: { total: number; used: number; remaining: number }
  sick: { total: number; used: number; remaining: number }
  personal: { total: number; used: number; remaining: number }
}

// Payroll types
export type PayrollStatus = 'draft' | 'processing' | 'processed' | 'paid'

export interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  periodStart: string
  periodEnd: string
  baseSalary: number
  allowances: number
  deductions: number
  grossSalary: number
  tax: number
  netSalary: number
  status: PayrollStatus
  processedAt?: string
  createdAt: string
}

// Performance types
export interface PerformanceReview {
  id: string
  employeeId: string
  employeeName: string
  reviewCycle: string
  selfRating: number
  selfComment?: string
  managerRating: number
  managerComment?: string
  status: 'draft' | 'submitted' | 'completed'
  createdAt: string
}

export interface KPI {
  id: string
  employeeId: string
  name: string
  target: number
  actual: number
  progress: number
  period: string
}

// Dashboard stats
export interface DashboardStats {
  totalEmployees: number
  employeesTrend: number
  presentToday: number
  presentTrend: number
  pendingLeave: number
  leaveTrend: number
  monthlyPayroll: number
  payrollTrend: number
}

// Chart data types
export interface ChartDataPoint {
  name: string
  value: number
  color?: string
}

export interface TimeSeriesData {
  date: string
  value: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface EmployeeFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  departmentId: string
  role: string
  managerId?: string
  startDate: string
  salary: number
}

export interface LeaveFormData {
  leaveType: LeaveType
  startDate: string
  endDate: string
  reason: string
}