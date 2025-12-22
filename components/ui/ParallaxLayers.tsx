'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxLayer({ children, speed = 0.5, className = '' }: ParallaxLayerProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export function ParallaxDepth({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div 
      ref={ref} 
      style={{ scale, opacity }} 
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Parallax3D({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10])
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100])

  return (
    <motion.div 
      ref={ref}
      style={{ 
        rotateX, 
        rotateY, 
        z,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }} 
      className={className}
    >
      {children}
    </motion.div>
  )
}
