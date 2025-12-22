'use client'

import { motion } from 'framer-motion'

interface MorphingShapeProps {
  className?: string
  color?: string
  duration?: number
}

export default function MorphingShape({
  className = '',
  color = '#FF8C00',
  duration = 10
}: MorphingShapeProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        filter: 'blur(40px)',
      }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '50% 60% 30% 60% / 30% 60% 70% 40%',
          '60% 40% 60% 40% / 70% 30% 50% 60%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 0.9, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/**
 * Multiple morphing shapes for background
 */
export function MorphingShapesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <MorphingShape
        className="w-96 h-96 -top-20 -left-20"
        color="#FF8C00"
        duration={12}
      />
      <MorphingShape
        className="w-80 h-80 top-1/2 -right-20"
        color="#FFA500"
        duration={15}
      />
      <MorphingShape
        className="w-72 h-72 -bottom-20 left-1/3"
        color="#FF6B00"
        duration={18}
      />
    </div>
  )
}
