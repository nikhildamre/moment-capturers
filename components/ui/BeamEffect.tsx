'use client'

import { motion } from 'framer-motion'

interface BeamEffectProps {
  className?: string
  color?: string
  duration?: number
}

export default function BeamEffect({
  className = '',
  color = '#FF8C00',
  duration = 2
}: BeamEffectProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

/**
 * Animated border beam
 */
export function BorderBeam({
  children,
  className = '',
  color = '#FF8C00',
  duration = 3
}: {
  children: React.ReactNode
  className?: string
  color?: string
  duration?: number
}) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '2px',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
