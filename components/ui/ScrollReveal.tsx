'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  delay?: number
  duration?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const variants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
    fade: { opacity: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : variants[direction]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered scroll reveal for lists
 */
interface ScrollRevealListProps {
  children: React.ReactNode[]
  direction?: 'up' | 'down' | 'left' | 'right'
  staggerDelay?: number
  className?: string
}

export function ScrollRevealList({
  children,
  direction = 'up',
  staggerDelay = 0.1,
  className = ''
}: ScrollRevealListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          direction={direction}
          delay={index * staggerDelay}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}
