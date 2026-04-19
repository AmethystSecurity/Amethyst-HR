'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Menu,
  X,
  MessageSquare,
  Headphones,
  MessageCircle
} from 'lucide-react'

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API
    setSubmitted(true)
  }

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'contact@amethyst.security', description: 'Send us an email anytime' },
    { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567', description: 'Mon-Fri from 9am to 6pm' },
    { icon: MapPin, title: 'Office', value: '123 Tech Street, Silicon Valley, CA', description: 'Visit our headquarters' },
    { icon: Clock, title: 'Hours', value: '24/7 Emergency Support', description: 'We\'re here when you need us' }
  ]

  const services = [
    'Cybersecurity',
    'Web Development',
    'Cloud Solutions',
    'IT Consulting',
    'Mobile Development',
    'Data Solutions',
    'Network Security',
    'Other'
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
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-white font-medium">Contact</Link>
            <Link 
              href="/login" 
              className="px-5 py-2.5 rounded-xl gradient-amethyst text-white font-medium hover:opacity-90 transition-opacity"
            >
              Portal
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
            <Link href="/about" className="text-gray-300 hover:text-white py-2">About</Link>
            <Link href="/contact" className="text-white py-2">Contact</Link>
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
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have a question or need a quote? We'd love to hear from you. 
              Our team is ready to help with any inquiry.
            </p>
          </motion.div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(20, 20, 35, 0.6)',
                  border: '1px solid rgba(153, 102, 204, 0.2)',
                }}
                whileHover={{ 
                  borderColor: 'rgba(153, 102, 204, 0.4)',
                  transform: 'translateY(-4px)'
                }}
              >
                <div className="p-3 rounded-xl bg-amethyst/20 inline-flex mb-4">
                  <info.icon className="w-6 h-6 text-amethyst" />
                </div>
                <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                <p className="text-amethyst mb-1">{info.value}</p>
                <p className="text-sm text-gray-400">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div 
                className="p-8 rounded-3xl"
                style={{
                  background: 'rgba(20, 20, 35, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(153, 102, 204, 0.2)',
                }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-xl gradient-amethyst text-white font-medium"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amethyst/50 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amethyst/50 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Company</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amethyst/50 transition-colors"
                          placeholder="Your company (optional)"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Service</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amethyst/50 transition-colors"
                        >
                          <option value="" className="bg-bg-secondary">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service} className="bg-bg-secondary">
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-amethyst/50 transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl gradient-amethyst text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Contact */}
              <div 
                className="p-8 rounded-3xl"
                style={{
                  background: 'rgba(20, 20, 35, 0.8)',
                  border: '1px solid rgba(153, 102, 204, 0.2)',
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Quick Contact</h3>
                
                <div className="space-y-4">
                  <motion.a
                    href="mailto:contact@amethyst.security"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="p-3 rounded-xl bg-amethyst/20">
                      <Mail className="w-5 h-5 text-amethyst" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email Us</p>
                      <p className="text-sm text-gray-400">contact@amethyst.security</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="p-3 rounded-xl bg-amethyst/20">
                      <Phone className="w-5 h-5 text-amethyst" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Call Us</p>
                      <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </motion.a>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 cursor-pointer"
                  >
                    <div className="p-3 rounded-xl bg-amethyst/20">
                      <MessageCircle className="w-5 h-5 text-amethyst" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Live Chat</p>
                      <p className="text-sm text-gray-400">Available 24/7</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Support Info */}
              <div 
                className="p-8 rounded-3xl"
                style={{
                  background: 'rgba(20, 20, 35, 0.8)',
                  border: '1px solid rgba(153, 102, 204, 0.2)',
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Support</h3>
                <p className="text-gray-400 mb-4">
                  Need technical support? Our dedicated team is available around the clock.
                </p>
                <Link 
                  href="/login"
                  className="inline-flex items-center gap-2 text-amethyst hover:text-amethyst-light transition-colors"
                >
                  Access Support Portal <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-12 rounded-3xl text-center"
            style={{
              background: 'rgba(20, 20, 35, 0.6)',
              border: '1px solid rgba(153, 102, 204, 0.2)',
            }}
          >
            <MapPin className="w-12 h-12 text-amethyst mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Visit Our Office</h3>
            <p className="text-gray-400 mb-4">
              123 Tech Street, Silicon Valley, CA 94025
            </p>
            <p className="text-sm text-gray-500">
              Schedule an appointment before visiting
            </p>
          </div>
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