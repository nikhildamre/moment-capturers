'use client'

import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-600/15 to-red-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-tl from-yellow-500/20 to-orange-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 0],
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke="url(#gradient2)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C00" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA500" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
