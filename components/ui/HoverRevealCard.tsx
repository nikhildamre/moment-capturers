'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface HoverRevealCardProps {
  children: React.ReactNode
  revealContent?: React.ReactNode
  className?: string
}

export default function HoverRevealCard({
  children,
  revealContent,
  className = ''
}: HoverRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      
      {revealContent && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/95 to-yellow-500/95 flex items-center justify-center p-6"
          initial={{ opacity: 0, y: '100%' }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {revealContent}
        </motion.div>
      )}
    </motion.div>
  )
}

/**
 * Card with border glow effect on hover
 */
export function GlowCard({
  children,
  className = '',
  glowColor = '#FF8C00'
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0"
        style={{
          background: `linear-gradient(45deg, ${glowColor}, transparent)`,
          filter: 'blur(10px)',
        }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative bg-white rounded-xl">
        {children}
      </div>
    </motion.div>
  )
}
