# Amethyst HR Management System - Technical Specification

## 1. Project Overview

**Project Name**: Amethyst HR  
**Project Type**: Enterprise HR Management System (Full-Stack Web Application)  
**Core Functionality**: Comprehensive HR platform with employee management, attendance tracking, payroll processing, leave management, and performance tracking  
**Target Users**: HR Administrators, Team Managers, Employees

---

## 2. UI/UX Specification

### 2.1 Layout Structure

**Page Sections**:
- **Login Page**: Full-screen centered card with animated background
- **Dashboard Layout**: Fixed sidebar (280px) + main content area with header
- **Content Area**: Scrollable with max-width 1400px, centered

**Grid System**:
- 12-column grid
- Card grid: CSS Grid with `repeat(auto-fill, minmax(320px, 1fr))`
- Gaps: 24px between cards, 16px internal padding

**Responsive Breakpoints**:
- Mobile: < 768px (sidebar collapses to hamburger menu)
- Tablet: 768px - 1024px (compact sidebar)
- Desktop: > 1024px (full sidebar)

### 2.2 Visual Design

**Color Palette**:
```css
--color-bg-primary: #0a0a0f;        /* Deep charcoal black */
--color-bg-secondary: #12121a;      /* Slightly lighter charcoal */
--color-bg-card: rgba(18, 18, 26, 0.85); /* Glass card background */
--color-bg-glass: rgba(255, 255, 255, 0.03); /* Pure glass */

--color-primary: #9966CC;           /* Amethyst purple */
--color-primary-light: #b388eb;     /* Light amethyst */
--color-primary-dark: #7b4bb3;      /* Dark amethyst */
--color-primary-glow: #bf5af2;      /* Neon glow purple */
--color-accent: #c084fc;            /* Violet accent */

--color-text-primary: #f5f5f7;      /* Primary white */
--color-text-secondary: #a1a1aa;   /* Muted gray */
--color-text-muted: #71717a;        /* Very muted */

--color-success: #22c55e;           /* Green */
--color-warning: #f59e0b;           /* Amber */
--color-error: #ef4444;             /* Red */
--color-info: #3b82f6;             /* Blue */

--border-glass: rgba(255, 255, 255, 0.08);
--border-glow: rgba(153, 102, 204, 0.5);
```

**Typography**:
- **Font Family**: 
  - Headings: "Sora", sans-serif (Google Fonts)
  - Body: "DM Sans", sans-serif (Google Fonts)
  - Monospace: "JetBrains Mono", monospace (for data)
- **Font Sizes**:
  - H1: 48px / 56px line-height / font-weight: 700
  - H2: 36px / 44px line-height / font-weight: 600
  - H3: 24px / 32px line-height / font-weight: 600
  - H4: 20px / 28px line-height / font-weight: 500
  - Body: 16px / 24px line-height / font-weight: 400
  - Small: 14px / 20px line-height / font-weight: 400
  - Caption: 12px / 16px line-height / font-weight: 400

**Spacing System**:
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px

**Visual Effects**:
- **Glassmorphism**: backdrop-filter: blur(20px), background: rgba(18, 18, 26, 0.85)
- **Neon Glow**: box-shadow: 0 0 20px rgba(153, 102, 204, 0.5), 0 0 40px rgba(153, 102, 204, 0.3)
- **Border Glow**: border: 1px solid rgba(153, 102, 204, 0.5)
- **Text Glow**: text-shadow: 0 0 10px rgba(153, 102, 204, 0.5)

### 2.3 Components

**Login Card**:
- Width: 420px max
- Background: Glassmorphism with subtle purple gradient border
- Border-radius: 24px
- Padding: 48px
- Box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(153, 102, 204, 0.1)

**Input Fields**:
- Height: 52px
- Background: rgba(255, 255, 255, 0.03)
- Border: 1px solid rgba(255, 255, 255, 0.08)
- Border-radius: 12px
- Focus: border-color: #9966CC, box-shadow: 0 0 20px rgba(153, 102, 204, 0.3)
- Icon: 20px, positioned left with 16px padding

**Buttons**:
- Primary: Gradient from #9966CC to #7b4bb3, height 52px, border-radius 12px
- Secondary: Transparent with border, height 48px
- Hover: brightness(1.1), scale(1.02), box-shadow glow
- Active: scale(0.98)
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

**Cards**:
- Background: rgba(18, 18, 26, 0.85) with glassmorphism
- Border: 1px solid rgba(255, 255, 255, 0.08)
- Border-radius: 16px
- Padding: 24px
- Hover: border-color: rgba(153, 102, 204, 0.3), transform: translateY(-2px)

**Sidebar**:
- Width: 280px (desktop), 80px (collapsed)
- Background: rgba(10, 10, 15, 0.95) with blur
- Border-right: 1px solid rgba(255, 255, 255, 0.05)

**Data Tables**:
- Header: rgba(255, 255, 255, 0.03) background
- Row hover: rgba(153, 102, 204, 0.05) background
- Border-radius: 12px for container

---

## 3. Functionality Specification

### 3.1 Authentication

**Login Page**:
- Animated logo: zoom-in from 0.8 to 1.0 over 0.8s with ease-out
- Logo glow pulse: infinite animation 2s cycle
- Form validation with inline error messages
- "Remember Me" checkbox
- "Forgot Password" link
- SSO buttons: Google, Microsoft
- Loading state with spinner
- Redirect to dashboard on success

**JWT Authentication**:
- Access token: 15 minutes expiry
- Refresh token: 7 days expiry
- Secure HTTP-only cookies
- Token refresh on API calls

### 3.2 Dashboard

**Overview Cards** (4 cards in row):
1. Total Employees - count with trend indicator
2. Present Today - attendance count with percentage
3. Leave Requests - pending count
4. Monthly Payroll - total amount

**Charts**:
1. Monthly Attendance - Area chart (last 6 months)
2. Department Distribution - Donut chart
3. Salary Distribution - Bar chart

**Quick Actions Panel**:
- Add Employee
- Process Payroll
- Approve Leave
- Generate Report

### 3.3 Employee Management

**Employee List**:
- Searchable table with filters
- Columns: Photo, Name, Email, Department, Role, Status, Actions
- Pagination: 10, 25, 50 per page
- Bulk actions: Export, Delete

**Employee Profile**:
- Header with photo, name, role
- Tabs: Personal Info, Documents, Attendance, Performance
- Edit mode with form validation

**Add/Edit Employee**:
- Multi-step form:
  1. Basic Info (name, email, phone)
  2. Employment Details (department, role, manager, start date)
  3. Salary & Benefits
  4. Documents Upload

### 3.4 Attendance System

**Clock In/Out**:
- Large digital clock display
- One-click clock in/out button
- Today's attendance summary
- Location check (optional GPS)

**Calendar View**:
- Monthly calendar with attendance markers
- Color coding: Present (green), Absent (red), Late (yellow), Leave (blue)
- Click to view day details

**Analytics**:
- Attendance rate by department
- Late arrivals report
- Absence trends
- Monthly/weekly summaries

### 3.5 Payroll Management

**Salary Structure**:
- Base salary configuration
- Allowances & deductions
- Tax calculations
- Benefits management

**Payroll Processing**:
- Select month/period
- Auto-calculate for all employees
- Review and approve
- Process payment

**Payslip Generation**:
- PDF export with company letterhead
- Email payslip to employees
- Historical payslip archive

### 3.6 Leave Management

**Leave Types**:
- Annual, Sick, Personal, Maternity/Paternity, Unpaid

**Apply Leave**:
- Date range picker
- Leave type selection
- Reason textarea
- Attachment upload (medical certificate)

**Approval Workflow**:
- Manager receives notification
- Approve/Reject with comments
- Status tracking: Pending → Approved/Rejected

**Leave Balance**:
- Visual balance display
- Used/Remaining/Accrued
- History of leave requests

### 3.7 Performance Tracking

**KPI Dashboard**:
- Individual KPIs per employee
- Team performance metrics
- Goal completion rates

**Performance Reviews**:
- Review cycles (quarterly/annual)
- Self-assessment + Manager assessment
- Rating system (1-5 stars)
- Feedback comments

**Reports**:
- Performance trends
- Top performers
- Areas for improvement

---

## 4. Technical Architecture

### 4.1 Frontend Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom configuration
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

### 4.2 Backend Stack (API Structure)

- **Runtime**: Node.js
- **Framework**: Next.js API Routes (or Express)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **File Storage**: Local (development) / S3 (production)
- **PDF Generation**: @react-pdf/renderer

### 4.3 Database Schema

```
Users
- id, email, password_hash, role, created_at, updated_at

Employees
- id, user_id, first_name, last_name, phone, photo_url
- department_id, role, manager_id, start_date, salary
- status, created_at, updated_at

Departments
- id, name, description, manager_id, created_at

Attendance
- id, employee_id, date, clock_in, clock_out
- status, late_minutes, created_at

LeaveRequests
- id, employee_id, leave_type, start_date, end_date
- reason, status, approved_by, approved_at, created_at

Payroll
- id, employee_id, period_start, period_end
- base_salary, allowances, deductions, net_salary
- status, processed_at, created_at

PerformanceReviews
- id, employee_id, review_cycle, self_rating
- manager_rating, feedback, created_at
```

---

## 5. Animations Specification

### 5.1 Login Page Animations

**Logo Animation**:
```css
@keyframes logoZoomIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
animation: logoZoomIn 0.8s ease-out forwards;

@keyframes glowPulse {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(153, 102, 204, 0.5)); }
  50% { filter: drop-shadow(0 0 40px rgba(153, 102, 204, 0.8)); }
}
animation: glowPulse 2s ease-in-out infinite;
```

**Background Particles**:
- 50 floating particles
- Random positions, sizes (2-6px), and opacities (0.1-0.4)
- Slow drift animation (20-40s duration)
- CSS gradient or canvas-based

### 5.2 Page Transitions

```css
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
animation: fadeSlideIn 0.5s ease-out;
```

### 5.3 Micro-interactions

- **Button Hover**: scale(1.02), box-shadow increase
- **Input Focus**: border glow animation, icon color change
- **Card Hover**: translateY(-4px), border glow
- **Sidebar Item**: background slide from left

---

## 6. Acceptance Criteria

### 6.1 Visual Checkpoints

- [ ] Dark theme applied consistently across all pages
- [ ] Amethyst purple (#9966CC) used as primary color
- [ ] Glassmorphism effect visible on cards and login
- [ ] Neon glow effects on interactive elements
- [ ] Logo animates on login page load
- [ ] Smooth transitions on all interactions
- [ ] Responsive layout works on mobile/tablet/desktop

### 6.2 Functional Checkpoints

- [ ] Login form validates and shows errors
- [ ] Login redirects to dashboard on success
- [ ] Dashboard displays overview cards with data
- [ ] Charts render with sample data
- [ ] Navigation works between all modules
- [ ] Employee list displays with pagination
- [ ] Leave request form submits correctly
- [ ] PDF payslip generates

### 6.3 Performance Checkpoints

- [ ] Page load under 3 seconds
- [ ] Animations run at 60fps
- [ ] No layout shifts during load
- [ ] Images optimized

---

## 7. File Structure

```
amethyst/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── employees/
│   │   │   ├── attendance/
│   │   │   ├── payroll/
│   │   │   ├── leave/
│   │   │   └── performance/
│   │   ├── api/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── features/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── store.ts
│   ├── hooks/
│   └── types/
├── public/
├── prisma/
├── tailwind.config.ts
├── next.config.js
└── package.json
```
