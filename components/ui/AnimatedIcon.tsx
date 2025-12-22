'use client'

import { motion } from 'framer-motion'

interface AnimatedIconProps {
  type: 'camera' | 'heart' | 'star' | 'sparkle' | 'flash'
  className?: string
  animate?: boolean
}

export default function AnimatedIcon({
  type,
  className = '',
  animate = true
}: AnimatedIconProps) {
  const icons = {
    camera: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" strokeWidth={2} />
      </svg>
    ),
    heart: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    star: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    sparkle: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
        <path d="M19 3L20.5 7.5L25 9L20.5 10.5L19 15L17.5 10.5L13 9L17.5 7.5L19 3Z" opacity="0.6" />
      </svg>
    ),
    flash: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
  }

  const animations = {
    camera: {
      rotate: [0, -5, 5, -5, 0],
      scale: [1, 1.1, 1],
    },
    heart: {
      scale: [1, 1.2, 1],
    },
    star: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    },
    sparkle: {
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
    },
    flash: {
      opacity: [1, 0.5, 1],
      scale: [1, 1.15, 1],
    },
  }

  if (!animate) {
    return icons[type]
  }

  return (
    <motion.div
      animate={animations[type]}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {icons[type]}
    </motion.div>
  )
}

/**
 * Floating animated icons for decoration
 */
export function FloatingIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute top-20 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <AnimatedIcon type="camera" className="w-8 h-8 text-orange-500/20" animate={false} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <AnimatedIcon type="star" className="w-6 h-6 text-yellow-500/20" animate={false} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-1/4"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <AnimatedIcon type="sparkle" className="w-10 h-10 text-orange-400/20" animate={false} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-1/3"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      >
        <AnimatedIcon type="heart" className="w-7 h-7 text-red-500/20" animate={false} />
      </motion.div>
    </div>
  )
}
