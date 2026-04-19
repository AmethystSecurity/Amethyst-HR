'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 mx-auto mb-4 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #9966CC 0%, #7B4BB3 100%)',
            boxShadow: '0 0 30px rgba(153, 102, 204, 0.5)',
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-text-secondary text-sm"
        >
          Loading dashboard...
        </motion.p>
      </div>
    </div>
  )
}