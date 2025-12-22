'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  yOffset?: number
  xOffset?: number
}

export default function FloatingElement({
  children,
  className = '',
  duration = 3,
  delay = 0,
  yOffset = 20,
  xOffset = 0
}: FloatingElementProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
        x: [0, xOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Rotating element animation
 */
export function RotatingElement({
  children,
  className = '',
  duration = 20,
  reverse = false
}: {
  children: React.ReactNode
  className?: string
  duration?: number
  reverse?: boolean
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        rotate: reverse ? -360 : 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Pulsing element animation
 */
export function PulsingElement({
  children,
  className = '',
  scale = 1.05,
  duration = 2
}: {
  children: React.ReactNode
  className?: string
  scale?: number
  duration?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
