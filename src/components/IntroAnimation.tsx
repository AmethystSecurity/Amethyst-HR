'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Hand-Written "A" Intro Animation
 * 
 * Features:
 * - Single large "A" letter as the centerpiece
 * - Edwardian Script ITC style (elegant cursive)
 * - Real hand-writing animation using SVG stroke
 * - Completed in under 1.5 seconds
 * - Purple neon glow effect
 * - Faint trailing effect
 */

interface IntroAnimationProps {
  onComplete?: () => void
}

export default function IntroAnimation({ onComplete = () => void 0 }: IntroAnimationProps) {
  const [stage, setStage] = useState<'idle' | 'drawing' | 'complete' | 'transition'>('idle')
  
  // Total duration: ~2.5s for complete animation
  useEffect(() => {
    setStage('drawing')
    
    // Complete drawing at ~1.2s
    const drawTimer = setTimeout(() => {
      setStage('complete')
    }, 1200)
    
    // Brief pause then transition
    const pauseTimer = setTimeout(() => {
      setStage('transition')
    }, 1600)
    
    // Full transition complete
    const finishTimer = setTimeout(() => {
      onComplete()
    }, 2000)

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
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)'
      }}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(153,102,204,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(153,102,204,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '110%',
              opacity: 0
            }}
            animate={{ 
              y: '-10%',
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 4 + Math.random() * 3, 
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'linear'
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle, #9966CC 0%, transparent 70%)',
              left: `${10 + Math.random() * 80}%`,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* Main content - centered "A" */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Glowing background effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: stage === 'drawing' || stage === 'complete' || stage === 'transition' ? 0.4 : 0,
            scale: stage === 'complete' || stage === 'transition' ? 1.3 : 1
          }}
          transition={{ duration: 0.6 }}
          className="absolute w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(153,102,204,0.3) 0%, transparent 60%)',
            filter: 'blur(40px)'
          }}
        />

        {/* The main "A" SVG - Hand written style */}
        <svg 
          viewBox="0 0 200 250" 
          className="w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[30rem]"
          style={{ 
            filter: 'drop-shadow(0 0 40px rgba(153, 102, 204, 0.6))'
          }}
        >
          <defs>
            {/* Gradient for the stroke */}
            <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b388eb" />
              <stop offset="50%" stopColor="#9966CC" />
              <stop offset="100%" stopColor="#7b4bb3" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="letterGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Hand-written style "A" - Multiple strokes for handwriting effect */}
          
          {/* Stroke 1: Left diagonal (bottom to top) - The main curve */}
          <motion.path
            d="M 30 220 Q 35 200 45 180 Q 60 140 80 90 Q 90 60 100 30"
            fill="none"
            stroke="url(#letterGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#letterGlow)"
            initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            animate={{ 
              strokeDashoffset: stage === 'drawing' || stage === 'complete' || stage === 'transition' ? 0 : 300
            }}
            transition={{ 
              duration: 0.7, 
              ease: 'easeOut'
            }}
          />

          {/* Stroke 2: Right diagonal (top to bottom) */}
          <motion.path
            d="M 100 30 Q 115 60 130 100 Q 150 160 170 220"
            fill="none"
            stroke="url(#letterGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#letterGlow)"
            initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            animate={{ 
              strokeDashoffset: stage === 'drawing' || stage === 'complete' || stage === 'transition' ? 0 : 300
            }}
            transition={{ 
              duration: 0.7, 
              delay: 0.4,
              ease: 'easeOut'
            }}
          />

          {/* Stroke 3: Crossbar (left to right with slight curve) */}
          <motion.path
            d="M 50 155 Q 75 165 100 160 Q 125 155 150 150"
            fill="none"
            stroke="url(#letterGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#letterGlow)"
            initial={{ strokeDasharray: 150, strokeDashoffset: 150 }}
            animate={{ 
              strokeDashoffset: stage === 'drawing' || stage === 'complete' || stage === 'transition' ? 0 : 150
            }}
            transition={{ 
              duration: 0.4, 
              delay: 0.8,
              ease: 'easeOut'
            }}
          />
          
          {/* Subtle decorative dot/flare at start */}
          <motion.circle
            cx="30"
            cy="220"
            r="3"
            fill="#9966CC"
            filter="url(#letterGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: stage === 'complete' || stage === 'transition' ? 1 : 0,
              scale: stage === 'complete' || stage === 'transition' ? 1 : 0
            }}
            transition={{ delay: 0.1, duration: 0.2 }}
          />
          
          {/* Subtle decorative dot/flare at end */}
          <motion.circle
            cx="170"
            cy="220"
            r="3"
            fill="#9966CC"
            filter="url(#letterGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: stage === 'complete' || stage === 'transition' ? 1 : 0,
              scale: stage === 'complete' || stage === 'transition' ? 1 : 0
            }}
            transition={{ delay: 1.0, duration: 0.2 }}
          />
        </svg>

        {/* Trailing glow effect - follows the writing motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: stage === 'drawing' ? 0.3 : 0,
          }}
          className="absolute w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 80%, rgba(153,102,204,0.15) 0%, transparent 50%)',
            filter: 'blur(20px)'
          }}
        />
        
        {/* Additional trailing effect */}
        <motion.div
          animate={{ 
            x: stage === 'drawing' ? 100 : 0,
            opacity: stage === 'drawing' ? 0.2 : 0
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-32 h-1 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #9966CC, transparent)',
            filter: 'blur(2px)',
            left: '20%',
            top: '45%'
          }}
        />
      </div>

      {/* Bottom ambient glow */}
      <motion.div
        animate={{ 
          opacity: stage === 'complete' || stage === 'transition' ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 w-full h-32"
        style={{
          background: 'linear-gradient(to top, rgba(153,102,204,0.1) 0%, transparent 100%)',
          filter: 'blur(10px)'
        }}
      />
    </motion.div>
  )
}