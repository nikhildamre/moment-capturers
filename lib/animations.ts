/**
 * Reusable animation variants for Framer Motion
 * These variants provide consistent animations across the application
 */

import { Variants } from 'framer-motion'

// Easing functions for natural motion
export const easings = {
  easeOut: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeInOut: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
  spring: { stiffness: 100, damping: 15 },
}

// Duration presets
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
}

/**
 * Fade in from bottom with upward motion
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: durations.slow, 
      ease: easings.easeOut 
    }
  }
}

/**
 * Fade in from left with horizontal motion
 */
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: durations.slow, 
      ease: easings.easeOut 
    }
  }
}

/**
 * Fade in from right with horizontal motion
 */
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: durations.slow, 
      ease: easings.easeOut 
    }
  }
}

/**
 * Scale in with fade
 */
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
}

/**
 * Simple fade in
 */
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: { 
      duration: durations.normal 
    }
  }
}

/**
 * Container for staggered children animations
 */
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

/**
 * Fast stagger for quick reveals
 */
export const fastStaggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

/**
 * Slow stagger for dramatic reveals
 */
export const slowStaggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

/**
 * Hover scale effect
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: durations.fast }
}

/**
 * Hover lift effect (scale + shadow)
 */
export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: { duration: durations.fast }
}

/**
 * Tap/click effect
 */
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 }
}

/**
 * Rotate in animation
 */
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.easeOut
    }
  }
}

/**
 * Blur in animation
 */
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: durations.normal
    }
  }
}

/**
 * Utility to create custom fade in with direction
 */
export const createFadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 60
): Variants => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const value = direction === 'down' || direction === 'right' ? distance : -distance

  return {
    hidden: {
      opacity: 0,
      [axis]: value
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: durations.slow,
        ease: easings.easeOut
      }
    }
  }
}

/**
 * Utility to create stagger container with custom timing
 */
export const createStaggerContainer = (
  staggerDelay: number = 0.1,
  initialDelay: number = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay
    }
  }
})
