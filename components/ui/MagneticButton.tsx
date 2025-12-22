'use client'

import { useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 150, damping: 15 })
  const y = useSpring(0, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className={`relative ${className}`}
    >
      {children}
      
      {/* Magnetic field indicator */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accentYellow/30"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  )
}
