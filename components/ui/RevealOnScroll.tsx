'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion'
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation'
import { fadeInUp, slideInLeft, slideInRight, scaleIn, fadeIn } from '@/lib/animations'

interface RevealOnScrollProps {
  children: React.ReactNode
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'custom'
  customVariants?: Variants
  delay?: number
  threshold?: number
  once?: boolean
  className?: string
}

export default function RevealOnScroll({
  children,
  animation = 'fade',
  customVariants,
  delay = 0,
  threshold = 0.2,
  once = true,
  className = ''
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion()
  const { ref, isInView } = useInViewAnimation({ threshold, once })

  // Select animation variant
  const getVariants = (): Variants => {
    if (customVariants) return customVariants

    switch (animation) {
      case 'slideUp':
        return fadeInUp
      case 'slideLeft':
        return slideInLeft
      case 'slideRight':
        return slideInRight
      case 'scale':
        return scaleIn
      case 'fade':
      default:
        return fadeIn
    }
  }

  const variants = getVariants()

  // Apply delay if specified
  const variantsWithDelay: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay: shouldReduceMotion ? 0 : delay
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={shouldReduceMotion ? fadeIn : variantsWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Wrapper for staggered children animations
 */
interface RevealStaggerProps {
  children: React.ReactNode
  staggerDelay?: number
  threshold?: number
  once?: boolean
  className?: string
}

export function RevealStagger({
  children,
  staggerDelay = 0.1,
  threshold = 0.2,
  once = true,
  className = ''
}: RevealStaggerProps) {
  const shouldReduceMotion = useReducedMotion()
  const { ref, isInView } = useInViewAnimation({ threshold, once })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Individual item for use within RevealStagger
 */
interface RevealStaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function RevealStaggerItem({
  children,
  className = ''
}: RevealStaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
