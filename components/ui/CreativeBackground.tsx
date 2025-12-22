'use client'

import { motion } from 'framer-motion'

export default function CreativeBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-graphite via-[#1a1a1a] to-graphite" />
      
      {/* Large animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 140, 0, 0.25) 0%, rgba(255, 140, 0, 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 197, 15, 0.2) 0%, rgba(255, 165, 0, 0.08) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 180, 50, 0.15) 0%, rgba(255, 140, 0, 0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 140, 0, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 140, 0, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Animated light rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 140, 0, 0.03) 50%, transparent 70%)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        }}
      />
    </div>
  )
}
