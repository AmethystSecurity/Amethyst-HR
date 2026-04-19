'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, 
  Lock, 
  Zap, 
  Globe, 
  Users,
  Code,
  Brain,
  FileText,
  Presentation,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Search,
  AlertTriangle,
  GraduationCap,
  Webcam,
  Cpu,
  PenTool,
  BarChart3,
  Eye,
  Sun,
  Moon,
  Plus,
  Minus,
  Server,
  Cloud,
  Bug,
  FileCheck,
  Target,
  ShieldCheck
} from 'lucide-react'

// Amethyst Intro Animation - Clean & Elegant
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'idle' | 'drawing' | 'complete' | 'transition'>('idle')

  useEffect(() => {
    setStage('drawing')
    
    // Complete animation faster - text appears quickly
    const drawTimer = setTimeout(() => {
      setStage('complete')
    }, 800)
    
    // Hold longer before transition (slower disappear)
    const pauseTimer = setTimeout(() => {
      setStage('transition')
    }, 1800)
    
    // Slower fade out transition
    const finishTimer = setTimeout(() => {
      onComplete()
    }, 2800)

    return () => {
      clearTimeout(drawTimer)
      clearTimeout(pauseTimer)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: stage === 'transition' ? 0 : 1,
      }}
      transition={{ 
        duration: 1.5, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: '#0a0a0f'
      }}
    >
      {/* Subtle animated background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(153, 102, 204, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Main content - centered Amethyst text */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Amethyst text with glow */}
        <motion.h1
          initial={{ 
            opacity: 0,
            scale: 0.8,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: stage === 'complete' || stage === 'transition' ? 1 : 0,
            scale: stage === 'complete' || stage === 'transition' ? 1 : 0.8,
            filter: stage === 'complete' || stage === 'transition' ? 'blur(0px)' : 'blur(10px)'
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="text-6xl md:text-8xl font-bold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #9966CC 0%, #b388eb 50%, #9966CC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(153, 102, 204, 0.5)) drop-shadow(0 0 60px rgba(153, 102, 204, 0.25))',
            textShadow: '0 0 40px rgba(153, 102, 204, 0.5)'
          }}
        >
          Amethyst Security
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: stage === 'complete' || stage === 'transition' ? 0.6 : 0,
            y: stage === 'complete' || stage === 'transition' ? 0 : 10
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5
          }}
          className="text-sm tracking-[0.3em] uppercase text-purple-400/50 mt-4"
        >
          Pristine Security
        </motion.p>
      </div>

      {/* Ambient glow effects */}
      <motion.div
        animate={{ 
          opacity: stage === 'complete' || stage === 'transition' ? 0.4 : 0.2,
          scale: stage === 'complete' || stage === 'transition' ? 1.1 : 1
        }}
        transition={{ duration: 1 }}
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(153, 102, 204, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
      
      {/* Bottom gradient */}
      <motion.div
        animate={{ 
          opacity: stage === 'complete' || stage === 'transition' ? 0.3 : 0.1,
        }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 w-full h-32"
        style={{
          background: 'linear-gradient(to top, rgba(153, 102, 204, 0.1) 0%, transparent 100%)',
          filter: 'blur(10px)'
        }}
      />
    </motion.div>
  )
}

// Main Landing Page Component
function LandingPage({ darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen, openFaq, setOpenFaq }: {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
  openFaq: number | null
  setOpenFaq: (v: number | null) => void
}) {
  const features = [
    {
      icon: Search,
      title: 'Penetration Testing',
      description: 'Simulate real-world attacks to uncover vulnerabilities before hackers do.'
    },
    {
      icon: Shield,
      title: 'Security Audits & Reviews',
      description: 'In-depth analysis of systems, code, and infrastructure.'
    },
    {
      icon: GraduationCap,
      title: 'Cybersecurity Training',
      description: 'Educating teams to recognize and prevent threats.'
    },
    {
      icon: Webcam,
      title: 'Web Development',
      description: 'Modern, secure, and high-performance websites and applications.'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Custom AI solutions that evolve with modern threats.'
    },
    {
      icon: FileText,
      title: 'CV & Document Services',
      description: 'Professional CV writing, editing, and document refinement.'
    }
  ]

  const whyChooseUs = [
    {
      icon: Zap,
      title: 'Offensive Security Expertise',
      description: 'Real-world pentesting methodologies to find vulnerabilities.'
    },
    {
      icon: Lock,
      title: 'Security-First Development',
      description: 'Every product built with protection in mind from day one.'
    },
    {
      icon: Brain,
      title: 'AI-Driven Solutions',
      description: 'Smart systems that evolve with modern threats.'
    },
    {
      icon: GraduationCap,
      title: 'Trusted Knowledge',
      description: 'Teaching and empowering individuals and teams.'
    }
  ]

  const process = [
    { step: '01', title: 'Assess', description: 'Analyze systems, goals, and vulnerabilities' },
    { step: '02', title: 'Test', description: 'Perform penetration testing and security reviews' },
    { step: '03', title: 'Secure', description: 'Apply fixes and strengthen defenses' },
    { step: '04', title: 'Build', description: 'Develop secure apps, AI tools, or digital solutions' },
    { step: '05', title: 'Educate & Scale', description: 'Train users and expand securely' }
  ]

  const stats = [
    { value: '100+', label: 'Systems Secured' },
    { value: '500+', label: 'Vulnerabilities Found' },
    { value: '1K+', label: 'Users Trained' },
    { value: '24/7', label: 'Security Mindset' }
  ]

  const insights = [
    {
      title: 'The Future of Cybersecurity in AI Systems',
      category: 'Security',
      description: 'How artificial intelligence is reshaping the security landscape'
    },
    {
      title: 'Top 10 Web Security Vulnerabilities in 2026',
      category: 'Insights',
      description: 'Understanding and preventing the most dangerous threats'
    },
    {
      title: 'How to Protect Your Organization from Modern Attacks',
      category: 'Guide',
      description: 'Essential strategies for enterprise-level security'
    }
  ]

  const faqs = [
    {
      question: 'What services does Amethyst offer?',
      answer: 'We offer penetration testing, security audits, cybersecurity training, web development, AI solutions, and document services including CV writing and presentation design.'
    },
    {
      question: 'How long does a typical penetration test take?',
      answer: 'The duration varies based on scope. A basic web application test takes 1-2 weeks, while comprehensive enterprise assessments can take 4-6 weeks.'
    },
    {
      question: 'Do you offer ongoing security support?',
      answer: 'Yes, we provide continuous monitoring and support packages tailored to your organizational needs.'
    },
    {
      question: 'What industries do you serve?',
      answer: 'We serve clients across finance, healthcare, technology, government, and enterprise sectors.'
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-black' : 'bg-[#F5F0E8]'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${darkMode ? 'bg-black/80' : 'bg-[#F5F0E8]/80'} backdrop-blur-xl border-b ${darkMode ? 'border-white/10' : 'border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-stone-800'}`}>
              <span className={`text-xl font-bold transition-colors duration-500 ${darkMode ? 'text-white' : 'text-white'}`}>A</span>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-800'}`}>Amethyst</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className={`transition-colors duration-500 text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}>Services</Link>
            <Link href="#why-us" className={`transition-colors duration-500 text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}>Why Amethyst</Link>
            <Link href="#process" className={`transition-colors duration-500 text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}>Process</Link>
            <Link href="#insights" className={`transition-colors duration-500 text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}>Insights</Link>
            <Link href="/login" className={`transition-colors duration-500 text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}>Login</Link>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-white/10 text-purple-400 hover:bg-white/20' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link 
              href="/login" 
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-500 ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-stone-800 text-white hover:bg-stone-900'}`}
            >
              Get Secured
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-800'}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden border-t transition-colors duration-500 ${darkMode ? 'bg-black border-white/10' : 'bg-[#F5F0E8] border-stone-200'}`}
          >
            <div className="px-6 py-4 space-y-4">
              <Link href="#features" className={`block transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>Services</Link>
              <Link href="#why-us" className={`block transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>Why Amethyst</Link>
              <Link href="#process" className={`block transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>Process</Link>
              <Link href="#insights" className={`block transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>Insights</Link>
              <Link href="/login" className={`block transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>Login</Link>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center gap-2 p-2 rounded-lg w-full ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              <Link href="/login" className={`block w-full text-center px-5 py-2.5 rounded-lg font-medium transition-all duration-500 ${darkMode ? 'bg-purple-600 text-white' : 'bg-stone-800 text-white'}`}>
                Get Secured
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className={`absolute inset-0 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-black' : 'bg-gradient-to-br from-stone-100/50 via-transparent to-[#F5F0E8]'}`} />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(${darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
              linear-gradient(90deg, ${darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-6 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
                Your security is only as strong as your weakest vulnerability.
              </h1>
              <p className={`text-xl mb-8 max-w-lg transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                Amethyst delivers advanced cybersecurity, pentesting, and digital solutions. 
                From protecting systems to building intelligent applications, we secure and elevate your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/login"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all duration-500 hover:scale-105 ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-stone-800 text-white hover:bg-stone-900'}`}
                >
                  Get Secured
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link 
                  href="#features"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-lg border font-semibold transition-all ${darkMode ? 'border-white/20 text-white hover:bg-white/5' : 'border-stone-300 text-stone-800 hover:bg-stone-100'}`}
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Abstract Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className={`absolute inset-0 rounded-full blur-3xl transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-purple-600/30 to-blue-600/30' : 'bg-gradient-to-br from-stone-300/50 to-stone-400/30'}`} />
                
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                        className={`w-16 h-16 rounded-lg border transition-colors duration-500 ${
                          i === 4 
                            ? darkMode ? 'bg-purple-600/50' : 'bg-stone-600/40'
                            : darkMode ? 'bg-white/5 border-white/10' : 'bg-stone-200/50 border-stone-300/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute top-10 right-10 w-20 h-20 rounded-lg border transition-colors duration-500 ${darkMode ? 'bg-purple-600/20 border-purple-500/30' : 'bg-stone-300/40 border-stone-400/30'}`}
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className={`absolute bottom-10 left-10 w-16 h-16 rounded-lg border transition-colors duration-500 ${darkMode ? 'bg-blue-600/20 border-blue-500/30' : 'bg-stone-300/30 border-stone-400/20'}`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className={`py-20 border-t transition-colors duration-500 ${darkMode ? 'border-white/10' : 'border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'No Vulnerabilities', description: 'Proactively identify and eliminate security risks' },
              { title: 'One Secure Platform', description: 'Unified solutions for cybersecurity, development, and AI' },
              { title: 'Global Protection', description: 'Secure systems across cloud, web, and enterprise environments' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center md:text-left"
              >
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>{item.title}</h3>
                <p className={`transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-24 border-t transition-colors duration-500 ${darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-stone-200 bg-stone-100/50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>Services</h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
              Comprehensive cybersecurity and digital solutions for modern enterprises
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl border transition-all duration-500 group hover:bg-white/[0.02] ${darkMode ? 'border-white/10 hover:border-purple-500/30 bg-black/20' : 'border-stone-200 bg-white/50 hover:border-stone-400'}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-500 ${darkMode ? 'bg-purple-600/20 group-hover:bg-purple-600/30' : 'bg-stone-200 group-hover:bg-stone-300'}`}>
                  <feature.icon className={darkMode ? 'text-purple-400' : 'text-stone-700'} size={24} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>{feature.title}</h3>
                <p className={`text-sm transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className={`py-24 border-t transition-colors duration-500 ${darkMode ? 'border-white/10' : 'border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>Why Amethyst</h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
              Security-first approach with real-world expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-6 p-8 rounded-2xl border transition-all duration-500 ${darkMode ? 'border-white/10 hover:border-purple-500/30' : 'border-stone-200 hover:border-stone-400 bg-white/50'}`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${darkMode ? 'bg-purple-600/20' : 'bg-stone-200'}`}>
                  <item.icon className={darkMode ? 'text-purple-400' : 'text-stone-700'} size={28} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>{item.title}</h3>
                  <p className={`transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className={`py-24 border-t transition-colors duration-500 ${darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-stone-200 bg-stone-100/50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>How It Works</h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
              From assessment to education in five proven steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-500 ${darkMode ? 'bg-purple-600/20 border-purple-500/30' : 'bg-stone-200 border-stone-300'}`}>
                  <span className={`text-xl font-bold transition-colors duration-500 ${darkMode ? 'text-purple-400' : 'text-stone-700'}`}>{item.step}</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>{item.title}</h3>
                <p className={`text-sm transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-24 border-t transition-colors duration-500 ${darkMode ? 'border-white/10' : 'border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-5xl md:text-6xl font-bold mb-2 transition-colors duration-500 ${darkMode ? 'text-purple-400' : 'text-stone-800'}`}>{stat.value}</div>
                <div className={`transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className={`py-24 border-t transition-colors duration-500 ${darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-stone-200 bg-stone-100/50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>Insights</h2>
              <p className={`text-lg max-w-xl transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                Thought leadership on cybersecurity, AI, and digital security
              </p>
            </div>
            <Link href="#" className={`hidden md:flex items-center transition-colors duration-500 ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-stone-600 hover:text-stone-900'}`}>
              View all <ChevronRight size={20} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {insights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 cursor-pointer ${darkMode ? 'border-white/10 hover:border-purple-500/30 bg-black/20' : 'border-stone-200 hover:border-stone-400 bg-white/50'}`}
              >
                <span className={`text-sm font-medium transition-colors duration-500 ${darkMode ? 'text-purple-400' : 'text-stone-600'}`}>{item.category}</span>
                <h3 className={`text-xl font-semibold mt-2 mb-3 transition-colors duration-500 ${darkMode ? 'text-white group-hover:text-purple-300' : 'text-stone-900 group-hover:text-stone-700'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>{item.description}</p>
                <div className={`mt-4 flex items-center text-sm transition-colors duration-500 ${darkMode ? 'text-purple-400' : 'text-stone-600'}`}>
                  Read more <ArrowRight size={16} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-24 border-t transition-colors duration-500 ${darkMode ? 'border-white/10' : 'border-stone-200'}`}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>FAQ</h2>
            <p className={`text-lg transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
              Frequently asked questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border overflow-hidden transition-colors duration-500 ${darkMode ? 'border-white/10 bg-black/20' : 'border-stone-200 bg-white/50'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full p-6 flex items-center justify-between text-left transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className={`ml-4 p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-white/10' : 'bg-stone-200'}`}>
                    {openFaq === index ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className={`px-6 pb-6 transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 border-t transition-colors duration-500 ${darkMode ? 'border-white/10' : 'border-stone-200'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-12 rounded-3xl border transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20' : 'bg-gradient-to-br from-stone-200/50 to-stone-300/30 border-stone-300'}`}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              Ready to secure and elevate your digital presence?
            </h2>
            <p className={`text-lg mb-8 max-w-xl mx-auto transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
              From pentesting to AI development, Amethyst delivers complete digital protection and innovation.
            </p>
            <Link 
              href="/login"
              className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-500 hover:scale-105 ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-stone-800 text-white hover:bg-stone-900'}`}
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-16 transition-colors duration-500 ${darkMode ? 'border-white/10' : 'border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-stone-800'}`}>
                  <span className="text-xl font-bold text-white">A</span>
                </div>
                <span className={`text-xl font-bold transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>Amethyst</span>
              </div>
              <p className={`text-sm transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                Advanced cybersecurity, pentesting, and digital solutions.
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>Services</h4>
              <ul className={`space-y-2 text-sm transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Penetration Testing</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Security Audits</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>AI Solutions</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Training</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>Company</h4>
              <ul className={`space-y-2 text-sm transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>About</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Careers</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Blog</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-stone-900'}`}>Legal</h4>
              <ul className={`space-y-2 text-sm transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Privacy</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Terms</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Security</a></li>
                <li><a href="#" className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm transition-colors duration-500 ${darkMode ? 'border-white/10 text-gray-500' : 'border-stone-200 text-stone-500'}`}>
            <div>© 2026 Amethyst. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://x.com/Amethyst_Sec" target="_blank" rel="noopener noreferrer" className={`hover:underline transition-colors duration-500 ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>Twitter</a>
              <a href="https://www.linkedin.com/in/george-akande-205132308" target="_blank" rel="noopener noreferrer" className={`hover:underline transition-colors duration-500 ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>LinkedIn</a>
              <a href="https://github.com/AmethystSecurity" target="_blank" rel="noopener noreferrer" className={`hover:underline transition-colors duration-500 ${darkMode ? 'hover:text-white' : 'hover:text-stone-900'}`}>GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Main Page Component with Intro
export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      
      {!showIntro && (
        <LandingPage 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
        />
      )}
    </>
  )
}