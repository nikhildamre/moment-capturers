'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'wave' | 'zigzag' | 'dots' | 'gradient' | 'beam'
  className?: string
}

export default function SectionDivider({
  variant = 'gradient',
  className = ''
}: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className={`relative h-24 ${className}`}>
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
            fill="url(#gradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  if (variant === 'zigzag') {
    return (
      <div className={`relative h-16 ${className}`}>
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,30 L100,10 L200,30 L300,10 L400,30 L500,10 L600,30 L700,10 L800,30 L900,10 L1000,30 L1100,10 L1200,30"
            stroke="url(#zigzagGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`flex justify-center items-center gap-2 py-8 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'beam') {
    return (
      <div className={`relative h-1 ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>
    )
  }

  // Default: gradient
  return (
    <div className={`relative h-px ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

/**
 * Animated section separator with icon
 */
export function SectionSeparator({
  icon,
  className = ''
}: {
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center justify-center gap-4 py-12 ${className}`}>
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-500/50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      {icon && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {icon}
        </motion.div>
      )}
      <motion.div
        className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-500/50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}
