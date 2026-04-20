'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  FileText,
  CheckCircle,
  Award,
  BarChart3,
  Zap,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react'

// Amethyst Intro Animation - Elegant brand reveal
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'idle' | 'drawing' | 'complete' | 'transition'>('idle')

  useEffect(() => {
    setStage('drawing')
    const drawTimer = setTimeout(() => setStage('complete'), 800)
    const pauseTimer = setTimeout(() => setStage('transition'), 1800)
    const finishTimer = setTimeout(() => onComplete(), 2800)
    return () => { clearTimeout(drawTimer); clearTimeout(pauseTimer); clearTimeout(finishTimer) }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'transition' ? 0 : 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#0a0a0f' }}
    >
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(153, 102, 204, 0.08) 0%, transparent 60%)',
      }} />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-8xl font-bold text-white font-heading mb-4"
          style={{
            background: 'linear-gradient(135deg, #9966CC 0%, #DDA0DD 50%, #9966CC 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(153, 102, 204, 0.6))'
          }}
        >
          A
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl text-gray-400 text-center max-w-md"
        >
          Amethyst Security
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-sm text-gray-500 mt-2"
        >
          Secured in Light. Powered by Amethyst.
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0a0a0f] text-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border-glass">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-amethyst flex items-center justify-center">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <span className="text-xl font-bold text-gradient font-heading">Amethyst HR</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="px-6 py-2 rounded-xl gradient-amethyst text-white font-medium hover:opacity-90 transition-opacity">
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
                  Next-Gen HR Management
                  <span className="text-gradient block">Built for the Future</span>
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-lg">
                  Streamline your entire HR workflow — from attendance and leave management to payroll and performance tracking — all in one elegant, secure platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-amethyst text-white font-semibold hover:opacity-90 transition-all hover:scale-105">
                    Access Dashboard
                    <ArrowRight size={20} />
                  </Link>
                  <a href="#features" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
                    Explore Features
                  </a>
                </div>
              </motion.div>

              {/* Feature Preview Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl glass border border-border-glass"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amethyst/20 flex items-center justify-center mb-4">
                        <Users className="text-amethyst" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Employee Management</h3>
                      <p className="text-sm text-gray-400">Complete employee profiles with roles, departments, and contact info.</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl glass border border-border-glass"
                    >
                      <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center mb-4">
                        <Clock className="text-success" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Attendance Tracking</h3>
                      <p className="text-sm text-gray-400">Clock in/out with real-time attendance calendar and analytics.</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl glass border border-border-glass"
                    >
                      <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center mb-4">
                        <Calendar className="text-warning" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Leave Management</h3>
                      <p className="text-sm text-gray-400">Request, approve, and track leave balances automatically.</p>
                    </motion.div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl glass border border-border-glass"
                    >
                      <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center mb-4">
                        <DollarSign className="text-info" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Payroll Processing</h3>
                      <p className="text-sm text-gray-400">Automated salary calculations with PDF payslip generation.</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl glass border border-border-glass"
                    >
                      <div className="w-12 h-12 rounded-xl bg-error/20 flex items-center justify-center mb-4">
                        <TrendingUp className="text-error" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Performance Reviews</h3>
                      <p className="text-sm text-gray-400">KPI dashboards, rating systems, and feedback cycles.</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl glass border border-border-glass"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald/20 flex items-center justify-center mb-4">
                        <BarChart3 className="text-emerald" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                      <p className="text-sm text-gray-400">Visualize workforce trends with interactive charts.</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-heading mb-4">
                Powerful Features, <span className="text-gradient">Elegantly Designed</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Every feature built with precision. Every interaction crafted for delight.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Secure Authentication',
                  description: 'NextAuth.js with Google OAuth support. Sessions encrypted with NEXTAUTH_SECRET. Role-based access control for admin, HR, manager, and employee.',
                  color: 'text-amethyst',
                  bg: 'bg-amethyst/10'
                },
                {
                  icon: Users,
                  title: 'Employee Profiles',
                  description: 'Comprehensive profiles with personal info, role, department, position, employee ID, join date, and avatar support.',
                  color: 'text-success',
                  bg: 'bg-success/10'
                },
                {
                  icon: Clock,
                  title: 'Attendance System',
                  description: 'Clock in/out with one click. View daily, weekly, monthly attendance calendars with present/absent/late status.',
                  color: 'text-info',
                  bg: 'bg-info/10'
                },
                {
                  icon: Calendar,
                  title: 'Leave Management',
                  description: 'Apply for leave, track balances (annual, sick, personal, WFH), approval workflows, and holiday calendar.',
                  color: 'text-warning',
                  bg: 'bg-warning/10'
                },
                {
                  icon: DollarSign,
                  title: 'Payroll Engine',
                  description: 'Configure salaries, process payroll, generate PDF payslips, and track payment status (paid, pending, processed).',
                  color: 'text-emerald',
                  bg: 'bg-emerald/10'
                },
                {
                  icon: TrendingUp,
                  title: 'Performance Tracking',
                  description: 'Self and manager ratings, KPI scores, performance categories (Excellent/Good/Average/Poor), and trend analysis.',
                  color: 'text-error',
                  bg: 'bg-error/10'
                },
                {
                  icon: FileText,
                  title: 'User Management',
                  description: 'Admin can view all users, manage roles, and monitor account status across the organization.',
                  color: 'text-purple-400',
                  bg: 'bg-purple-400/10'
                },
                {
                  icon: BarChart3,
                  title: 'Dashboard Analytics',
                  description: 'Admin dashboard with total employees, present today, leave requests, payroll stats, department distribution, and salary bands.',
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-400/10'
                },
                {
                  icon: Zap,
                  title: 'Interactive UI',
                  description: 'Glassmorphism design, smooth Framer Motion animations, neon glow effects, and fully responsive layout optimized for desktop.',
                  color: 'text-amber-400',
                  bg: 'bg-amber-400/10'
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-6 rounded-2xl glass border border-border-glass hover:glow-border transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                    <feature.icon className={feature.color} size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Interactive Lamp Login Experience */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-heading mb-4">
                The <span className="text-gradient">Amethyst Lamp</span> Experience
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                More than just a login — an interactive journey. Toggle the lamp to illuminate your entry into the system.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full gradient-amethyst flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Land on the Login Page</h4>
                      <p className="text-gray-400">You're greeted with a dark, atmospheric scene — the Amethyst lamp sits dimly in the corner.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full gradient-amethyst flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Toggle the Lamp</h4>
                      <p className="text-gray-400">Click the lamp itself or pull the chain. The light glows brighter, casting a warm purple radiance across the room.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full gradient-amethyst flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Login Form Appears</h4>
                      <p className="text-gray-400">As the lamp brightens, the login card fades in smoothly — ready for your credentials.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full gradient-amethyst flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Enter Credentials</h4>
                      <p className="text-gray-400">Use <code className="bg-white/10 px-2 py-1 rounded text-amethyst">hradmin@gmail.com</code> and <code className="bg-white/10 px-2 py-1 rounded text-amethyst">hradmin@2026</code> to access the admin dashboard.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Visual representation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="p-8 rounded-2xl glass border border-border-glass">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl gradient-amethyst flex items-center justify-center shadow-glow mb-4">
                      <Eye className="text-white" size={32} />
                    </div>
                    <h4 className="text-lg font-semibold">Interactive Toggle</h4>
                    <p className="text-gray-400 text-sm mt-2">
                      The lamp responds to your click — click it again to dim and hide the form.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <EyeOff className="text-gray-500" size={18} />
                        <span className="text-sm font-medium">Lamp OFF — Form Hidden</span>
                      </div>
                      <p className="text-xs text-gray-500">The room is dark. Click the lamp or chain to turn it on.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amethyst/10 border border-amethyst/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Eye className="text-amethyst" size={18} />
                        <span className="text-sm font-medium">Lamp ON — Form Visible</span>
                      </div>
                      <p className="text-xs text-gray-400">The room is illuminated. The login card fades in with smooth animation.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Demo Video Walkthrough */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-heading mb-4">
                <span className="text-gradient">Demo Walkthrough</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Watch the full navigation flow — from login to dashboard, attendance, leave, payroll, and performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden glass border border-border-glass shadow-2xl"
            >
              <video
                controls
                autoPlay={false}
                className="w-full aspect-video"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect fill='%230a0a0f' width='1920' height='1080'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239966CC' font-family='system-ui' font-size='48'%3ELoading demo...%3C/text%3E%3C/svg%3E"
              >
                <source src="/amethyst-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm">
                Amethyst HR Demo
              </div>
            </motion.div>
          </div>
        </section>

        {/* Admin Dashboard Preview */}
        <section className="py-20 px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-heading mb-4">
                Full-Featured <span className="text-gradient">Admin Dashboard</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Once logged in, unlock a comprehensive suite of HR management tools.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Employee Management',
                  description: 'View all employees, add new staff, edit profiles, and manage roles (admin, HR, manager, employee).',
                  stat: '70+ Employees'
                },
                {
                  icon: Clock,
                  title: 'Attendance Overview',
                  description: 'See who\'s present today, view monthly attendance calendars, and track late/absent trends.',
                  stat: '65 Present Today'
                },
                {
                  icon: Calendar,
                  title: 'Leave Requests',
                  description: 'Approve or reject leave applications. View leave balances per employee. Automated accruals.',
                  stat: '5 Pending'
                },
                {
                  icon: DollarSign,
                  title: 'Payroll Center',
                  description: 'Process monthly payroll, view salary breakdowns (base, allowances, deductions), generate payslips.',
                  stat: '$285,000/Month'
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl glass border border-border-glass hover:glow-border transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amethyst/20 flex items-center justify-center mb-4">
                    <card.icon className="text-amethyst" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{card.description}</p>
                  <div className="text-2xl font-bold text-gradient">{card.stat}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Employee Portal */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-heading mb-4">
                Employee <span className="text-gradient">Self-Service Portal</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Employees get their own dashboard to clock in/out, view attendance, apply for leave, and check performance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Clock,
                  title: 'Clock In/Out',
                  description: 'One-tap attendance tracking with real-time status. View weekly attendance summary and daily hours.',
                },
                {
                  icon: Calendar,
                  title: 'Leave Application',
                  description: 'Submit leave requests directly from your dashboard. Track approval status and remaining balances.',
                },
                {
                  icon: TrendingUp,
                  title: 'Performance View',
                  description: 'See your performance ratings, KPI scores, and feedback from managers. Track improvement over time.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl glass border border-border-glass"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald/20 flex items-center justify-center mb-4">
                    <feature.icon className="text-emerald" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-heading mb-4">
                Built with <span className="text-gradient">Modern Tech</span>
              </h2>
              <p className="text-xl text-gray-400">
                Next.js 14, TypeScript, TailwindCSS, MongoDB, NextAuth.js, Framer Motion, Recharts, and more.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8">
              {['Next.js', 'TypeScript', 'TailwindCSS', 'MongoDB', 'NextAuth', 'Zustand', 'Framer Motion', 'Recharts'].map((tech) => (
                <div key={tech} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl gradient-amethyst p-12 text-center"
            >
              <div className="absolute inset-0 opacity-30" style={{
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              }} />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold font-heading mb-4 text-white">
                  Ready to Transform Your HR?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Experience the future of HR management. Sign in with your admin credentials to explore all features.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-amethyst font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                >
                  Access Admin Dashboard
                  <ArrowRight size={24} />
                </Link>
                <p className="text-sm text-white/60 mt-6">
                  Demo credentials: <code className="bg-white/20 px-2 py-1 rounded">hradmin@gmail.com</code> / <code className="bg-white/20 px-2 py-1 rounded">hradmin@2026</code>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border-glass">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-amethyst flex items-center justify-center">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <span className="text-xl font-bold text-gradient font-heading">Amethyst HR</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 Amethyst Security. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Best viewed on <span className="text-amethyst">laptop/desktop</span> for the full experience.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
