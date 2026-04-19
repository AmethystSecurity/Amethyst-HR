'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
    }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Loading Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center"
        style={{
          background: 'rgba(20, 20, 35, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(153, 102, 204, 0.2)',
          borderRadius: '24px',
          padding: '48px 64px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(153, 102, 204, 0.15)',
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(153, 102, 204, 0.5)',
              '0 0 40px rgba(153, 102, 204, 0.8)',
              '0 0 20px rgba(153, 102, 204, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 mx-auto mb-6 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #9966CC 0%, #7B4BB3 100%)',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #9966CC 0%, #DDA0DD 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Preparing Your Workspace
        </motion.h2>

        <p className="text-gray-400 mb-6">Securing your connection and loading your portal...</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #9966CC 0%, #bf5af2 100%)',
            }}
          />
        </div>

        <p className="text-gray-500 text-sm mt-3">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </motion.div>
    </div>
  )
}