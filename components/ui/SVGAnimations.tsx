'use client'

import { motion } from 'framer-motion'

export function AnimatedCamera({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <motion.path
        d="M20 30 L35 30 L40 20 L60 20 L65 30 L80 30 C85 30 90 35 90 40 L90 70 C90 75 85 80 80 80 L20 80 C15 80 10 75 10 70 L10 40 C10 35 15 30 20 30 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="50"
        cy="55"
        r="15"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.circle
        cx="75"
        cy="40"
        r="3"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 1.5, duration: 0.3 }}
      />
    </svg>
  )
}

export function AnimatedHeart({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <motion.path
        d="M50 85 C50 85, 20 60, 20 40 C20 25, 30 20, 40 25 C45 27.5, 50 35, 50 35 C50 35, 55 27.5, 60 25 C70 20, 80 25, 80 40 C80 60, 50 85, 50 85 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, fill: 'rgba(255,140,0,0)' }}
        animate={{ 
          pathLength: 1,
          fill: 'rgba(255,140,0,0.2)'
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M50 85 C50 85, 20 60, 20 40 C20 25, 30 20, 40 25 C45 27.5, 50 35, 50 35 C50 35, 55 27.5, 60 25 C70 20, 80 25, 80 40 C80 60, 50 85, 50 85 Z"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ transformOrigin: '50% 50%' }}
      />
    </svg>
  )
}

export function MorphingShape({ className = '' }: { className?: string }) {
  const shapes = [
    'M50 10 L90 90 L10 90 Z', // Triangle
    'M10 50 L50 10 L90 50 L50 90 Z', // Diamond
    'M10 10 L90 10 L90 90 L10 90 Z', // Square
    'M50 10 A40 40 0 1 1 49.9 10 Z', // Circle
  ]

  return (
    <svg className={className} viewBox="0 0 100 100">
      <motion.path
        d={shapes[0]}
        fill="currentColor"
        animate={{ d: shapes }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  )
}

export function LineDrawing({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none">
      <motion.path
        d="M20 100 Q60 20, 100 100 T180 100"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="20"
        cy="100"
        r="5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      />
      <motion.circle
        cx="180"
        cy="100"
        r="5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, duration: 0.3 }}
      />
    </svg>
  )
}
