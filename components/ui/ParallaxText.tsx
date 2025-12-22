'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxTextProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function ParallaxText({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxTextProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Horizontal parallax effect
 */
export function ParallaxHorizontal({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxTextProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const x = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100])
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
