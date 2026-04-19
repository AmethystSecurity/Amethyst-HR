'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, 
  Globe, 
  Code, 
  Lock, 
  Eye, 
  Server, 
  Cloud, 
  Smartphone,
  Database,
  Wifi,
  Cpu,
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const allServices = [
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital infrastructure from evolving threats.',
      features: [
        'Penetration Testing',
        'Vulnerability Assessment',
        'Security Audits',
        'Incident Response',
        'Threat Monitoring',
        'Compliance Management'
      ],
      price: 'Starting from $2,500'
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      features: [
        'Custom Website Development',
        'E-commerce Solutions',
        'Web Applications',
        'Progressive Web Apps',
        'API Development',
        'CMS Integration'
      ],
      price: 'Starting from $1,500'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services for modern businesses.',
      features: [
        'Cloud Migration',
        'AWS/Azure/GCP Services',
        'Infrastructure as Code',
        'Cloud Security',
        'DevOps Consulting',
        '24/7 Monitoring'
      ],
      price: 'Starting from $3,000'
    },
    {
      icon: Server,
      title: 'IT Consulting',
      description: 'Strategic IT guidance and infrastructure optimization for business growth.',
      features: [
        'IT Strategy Planning',
        'System Architecture',
        'Technology Roadmap',
        'Vendor Management',
        'IT Staffing',
        'Process Optimization'
      ],
      price: 'Starting from $500/hour'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'iOS Development',
        'Android Development',
        'React Native',
        'Flutter Apps',
        'App Store Optimization',
        'Maintenance & Support'
      ],
      price: 'Starting from $3,000'
    },
    {
      icon: Database,
      title: 'Data Solutions',
      description: 'Data engineering, analytics, and business intelligence solutions.',
      features: [
        'Database Design',
        'Data Migration',
        'Business Intelligence',
        'Data Analytics',
        'Machine Learning',
        'Data Visualization'
      ],
      price: 'Starting from $2,000'
    },
    {
      icon: Wifi,
      title: 'Network Security',
      description: 'Secure network infrastructure and connectivity solutions.',
      features: [
        'Network Architecture',
        'VPN Setup',
        'Firewall Configuration',
        'Network Monitoring',
        'Zero Trust Implementation',
        'Remote Access Security'
      ],
      price: 'Starting from $1,800'
    },
    {
      icon: Cpu,
      title: 'Software Development',
      description: 'Custom software solutions tailored to your business requirements.',
      features: [
        'Custom Software',
        'Desktop Applications',
        'Automation Tools',
        'Integration Services',
        'Legacy Modernization',
        'Quality Assurance'
      ],
      price: 'Starting from $5,000'
    }
  ]

  const processSteps = [
    { step: '01', title: 'Discovery', description: 'We analyze your requirements and develop a comprehensive strategy.' },
    { step: '02', title: 'Design', description: 'Our team creates detailed specifications and visual designs.' },
    { step: '03', title: 'Development', description: 'We build your solution using cutting-edge technologies.' },
    { step: '04', title: 'Testing', description: 'Rigorous quality assurance ensures flawless performance.' },
    { step: '05', title: 'Deployment', description: 'Smooth implementation with comprehensive documentation.' },
    { step: '06', title: 'Support', description: 'Ongoing maintenance and support to ensure continued success.' }
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-amethyst flex items-center justify-center">
              <span className="text-xl font-bold text-white font-heading">A</span>
            </div>
            <span className="text-xl font-bold text-white font-heading">Amethyst</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
            <Link href="#process" className="text-gray-300 hover:text-white transition-colors">Process</Link>
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Portal</Link>
            <Link 
              href="/login" 
              className="px-5 py-2.5 rounded-xl gradient-amethyst text-white font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </nav>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-bg-secondary border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          >
            <Link href="#services" className="text-gray-300 hover:text-white py-2">Services</Link>
            <Link href="#process" className="text-gray-300 hover:text-white py-2">Process</Link>
            <Link href="/" className="text-gray-300 hover:text-white py-2">Home</Link>
            <Link href="/login" className="text-gray-300 hover:text-white py-2">Portal</Link>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-radial" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(153, 102, 204, ${Math.random() * 0.3 + 0.1})`,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive technology solutions tailored to protect and grow your business
            </p>
          </motion.div>

          {/* Services Grid */}
          <div id="services" className="grid md:grid-cols-2 gap-6">
            {allServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-8 rounded-2xl group"
                style={{
                  background: 'rgba(20, 20, 35, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                whileHover={{ 
                  borderColor: 'rgba(153, 102, 204, 0.4)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-amethyst/20 group-hover:bg-amethyst/30 transition-colors">
                    <service.icon className="w-10 h-10 text-amethyst" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.slice(0, 6).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amethyst flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-amethyst font-medium">{service.price}</span>
                  <Link 
                    href="/login" 
                    className="inline-flex items-center gap-2 text-white hover:text-amethyst transition-colors"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A systematic approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: 'rgba(20, 20, 35, 0.6)',
                  border: '1px solid rgba(153, 102, 204, 0.2)',
                }}
              >
                <div className="text-4xl font-bold text-amethyst mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-12 rounded-3xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(153, 102, 204, 0.2) 0%, rgba(123, 75, 179, 0.2) 100%)',
              border: '1px solid rgba(153, 102, 204, 0.3)',
            }}
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-amethyst/20 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white font-heading mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
                Contact us today for a free consultation and quote.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-amethyst text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Request Consultation
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-amethyst flex items-center justify-center">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="text-white font-medium">Amethyst Security</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Amethyst Security. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}