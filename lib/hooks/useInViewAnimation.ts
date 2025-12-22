/**
 * Custom hook for scroll-triggered animations
 * Uses Intersection Observer for performance
 */

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseInViewAnimationOptions {
  /**
   * Trigger animation only once when element enters viewport
   * @default true
   */
  once?: boolean
  
  /**
   * Margin around the viewport for triggering animation
   * Negative values trigger before element is visible
   * Positive values trigger after element is partially visible
   * @default "-20% 0px"
   */
  margin?: string
  
  /**
   * Amount of element that must be visible (0-1)
   * @default 0.2
   */
  threshold?: number
}

/**
 * Hook to trigger animations when element enters viewport
 * 
 * @example
 * ```tsx
 * const { ref, isInView } = useInViewAnimation({ threshold: 0.3 })
 * 
 * return (
 *   <motion.div
 *     ref={ref}
 *     initial="hidden"
 *     animate={isInView ? "visible" : "hidden"}
 *     variants={fadeInUp}
 *   >
 *     Content
 *   </motion.div>
 * )
 * ```
 */
export function useInViewAnimation(options: UseInViewAnimationOptions = {}) {
  const {
    once = true,
    margin = '-20% 0px',
    threshold = 0.2
  } = options

  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    margin,
    amount: threshold
  })

  return { ref, isInView }
}

/**
 * Hook for elements that should animate immediately when any part enters viewport
 */
export function useInViewAnimationImmediate() {
  return useInViewAnimation({
    once: true,
    margin: '0px',
    threshold: 0
  })
}

/**
 * Hook for elements that should animate when mostly visible
 */
export function useInViewAnimationMostly() {
  return useInViewAnimation({
    once: true,
    margin: '0px',
    threshold: 0.5
  })
}

/**
 * Hook for repeating animations (triggers every time element enters/exits)
 */
export function useInViewAnimationRepeating(threshold: number = 0.2) {
  return useInViewAnimation({
    once: false,
    margin: '-20% 0px',
    threshold
  })
}
