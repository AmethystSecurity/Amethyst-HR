'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SplashPage() {
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    // Start redirect animation after logo appears
    const timer = setTimeout(() => {
      setRedirecting(true)
      // Redirect to login after fade out
      setTimeout(() => {
        window.location.href = '/login'
      }, 800)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-radial" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(153, 102, 204, ${Math.random() * 0.5 + 0.2})`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Logo Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Amethyst Logo */}
        <motion.div
          className="flex items-center justify-center"
          animate={{
            filter: ['drop-shadow(0 0 20px rgba(153, 102, 204, 0.6))', 'drop-shadow(0 0 40px rgba(153, 102, 204, 1))', 'drop-shadow(0 0 20px rgba(153, 102, 204, 0.6))'],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-24 h-24 rounded-2xl gradient-amethyst flex items-center justify-center shadow-glow">
            <span className="text-5xl font-bold text-white font-heading">A</span>
          </div>
        </motion.div>

        {/* Amethyst Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 text-4xl font-bold text-gradient text-center font-heading"
        >
          Amethyst Security
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-2 text-base text-text-secondary text-center"
        >
          Secured in Light. Powered by Amethyst
        </motion.p>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-12"
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-amethyst"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-amethyst"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-amethyst"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Redirecting Overlay */}
      {redirecting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-bg-primary"
        />
      )}
    </div>
  )
}