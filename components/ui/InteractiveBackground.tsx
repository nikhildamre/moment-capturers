'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface InteractiveBackgroundProps {
  className?: string
  intensity?: number
}

export default function InteractiveBackground({ 
  className = '', 
  intensity = 0.3 
}: InteractiveBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set((e.clientX - centerX) * intensity)
      mouseY.set((e.clientY - centerY) * intensity)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, intensity])

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient Orbs */}
      <motion.div
        style={{ x, y }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accentYellow/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ 
          x: useSpring(useMotionValue(0).set(-x.get()), springConfig), 
          y: useSpring(useMotionValue(0).set(-y.get()), springConfig) 
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-floralWhite/5 rounded-full blur-3xl"
      />
      
      {/* Grid Pattern */}
      <motion.div
        style={{ x: useSpring(mouseX, { ...springConfig, damping: 30 }), y: useSpring(mouseY, { ...springConfig, damping: 30 }) }}
        className="absolute inset-0 opacity-5"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 197, 15, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 197, 15, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>
    </div>
  )
}

/**
 * Mesh gradient background with mouse interaction
 */
export function MeshGradientBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-graphite via-graphiteDark to-graphite" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accentYellow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-floralWhite/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-accentYellow/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}

/**
 * Dot pattern background
 */
export function DotPatternBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div 
        className="w-full h-full opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 197, 15, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  )
}
