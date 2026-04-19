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
  Users,
  Award,
  Target,
  Heart,
  Lightbulb,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const timeline = [
    { year: '2016', title: 'Founded', description: 'Amethyst Security was founded with a vision to make the internet safer.' },
    { year: '2018', title: 'First Major Client', description: 'Secured partnership with a Fortune 500 company for cybersecurity services.' },
    { year: '2020', title: 'Expansion', description: 'Expanded services to include comprehensive web development solutions.' },
    { year: '2022', title: 'Global Reach', description: 'Served clients across 30+ countries with 200+ successful projects.' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as a leading cybersecurity and web development company.' }
  ]

  const values = [
    { icon: Shield, title: 'Security First', description: 'We prioritize security in everything we do, ensuring your digital assets are always protected.' },
    { icon: Heart, title: 'Client Focus', description: 'Your success is our success. We tailor solutions to meet your unique business needs.' },
    { icon: Lightbulb, title: 'Innovation', description: 'We stay ahead of the curve, adopting cutting-edge technologies and methodologies.' },
    { icon: Target, title: 'Excellence', description: 'We deliver nothing less than exceptional results in every project we undertake.' }
  ]

  const team = [
    { name: 'Alex Thompson', role: 'CEO & Founder', image: 'AT' },
    { name: 'Sarah Mitchell', role: 'CTO', image: 'SM' },
    { name: 'James Chen', role: 'Head of Security', image: 'JC' },
    { name: 'Emily Rodriguez', role: 'Head of Development', image: 'ER' },
    { name: 'Michael Park', role: 'Lead Architect', image: 'MP' },
    { name: 'Lisa Wang', role: 'Head of Operations', image: 'LW' }
  ]

  const stats = [
    { value: '8+', label: 'Years of Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '50+', label: 'Team Members' },
    { value: '30+', label: 'Countries Served' }
  ]

  const certifications = [
    'ISO 27001 Certified',
    'CISSP Partners',
    'AWS Advanced Partner',
    'Microsoft Gold Partner',
    'Google Cloud Partner',
    'PCI DSS Compliant'
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
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
            <Link href="/about" className="text-white font-medium">About</Link>
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
            <Link href="/" className="text-gray-300 hover:text-white py-2">Home</Link>
            <Link href="/services" className="text-gray-300 hover:text-white py-2">Services</Link>
            <Link href="/about" className="text-white py-2">About</Link>
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white font-heading mb-6">
                About <span className="text-gradient">Amethyst</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-lg">
                We are a premier cybersecurity and web development company dedicated to 
                protecting digital assets and creating exceptional web experiences.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Founded in 2016, Amethyst Security has grown from a small security consultancy 
                to a global technology partner, serving clients across 30+ countries.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/contact" 
                  className="px-6 py-3 rounded-xl gradient-amethyst text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/services" 
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div 
                className="p-8 rounded-3xl"
                style={{
                  background: 'rgba(20, 20, 35, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(153, 102, 204, 0.2)',
                }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="text-center p-6 rounded-xl"
                      style={{ background: 'rgba(153, 102, 204, 0.1)' }}
                    >
                      <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-dashed border-amethyst/30"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white font-heading mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                To provide world-class cybersecurity solutions and innovative web development 
                services that empower businesses to thrive in the digital age.
              </p>
              <p className="text-lg text-gray-400">
                We believe that security and functionality should never be compromised. 
                Our mission is to deliver solutions that protect, empower, and transform 
                businesses worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white font-heading mb-6">
                Our <span className="text-gradient">Vision</span>
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                To become the global leader in integrated cybersecurity and web development solutions.
              </p>
              <p className="text-lg text-gray-400">
                We envision a world where every business, regardless of size, has access to 
                enterprise-grade security and cutting-edge web technologies. At Amethyst, 
                 we&apos;re making this vision a reality, one client at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(20, 20, 35, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                whileHover={{ 
                  borderColor: 'rgba(153, 102, 204, 0.3)',
                  transform: 'translateY(-4px)'
                }}
              >
                <div className="p-4 rounded-xl bg-amethyst/20 inline-flex mb-6">
                  <value.icon className="w-8 h-8 text-amethyst" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From a small startup to a global technology partner
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amethyst via-purple-500 to-amethyst opacity-30 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 md:text-right">
                    <div className="p-6 rounded-2xl" style={{ background: 'rgba(20, 20, 35, 0.6)' }}>
                      <div className="text-3xl font-bold text-amethyst mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 rounded-full gradient-amethyst shadow-glow" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                The talented people behind Amethyst&apos;s success
              </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(20, 20, 35, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                whileHover={{ 
                  borderColor: 'rgba(153, 102, 204, 0.3)',
                }}
              >
                <div className="w-20 h-20 rounded-full gradient-amethyst flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.image}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-amethyst">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
              Certifications & <span className="text-gradient">Partners</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Industry-recognized standards and partnerships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: 'rgba(20, 20, 35, 0.6)',
                  border: '1px solid rgba(153, 102, 204, 0.2)',
                }}
              >
                <Award className="w-6 h-6 text-amethyst" />
                <span className="text-white font-medium">{cert}</span>
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
                Join Our Journey
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
                Let&apos;s work together to secure and elevate your business.
              </p>
              <Link 
                href="/login" 
                className="inline-flex px-8 py-4 rounded-xl gradient-amethyst text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started
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