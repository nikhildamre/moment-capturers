/**
 * Custom hook for tracking scroll progress
 * Useful for scroll indicators and scroll-based animations
 */

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

interface UseScrollProgressOptions {
  /**
   * Target element to track scroll progress
   * If not provided, tracks window scroll
   */
  target?: RefObject<HTMLElement>
  
  /**
   * Offset from top of viewport
   * @default 0
   */
  offset?: [string, string]
}

interface ScrollProgressReturn {
  /**
   * Scroll progress as a value between 0 and 1
   */
  scrollYProgress: MotionValue<number>
  
  /**
   * Scroll position in pixels
   */
  scrollY: MotionValue<number>
}

/**
 * Hook to track scroll progress of the page or a specific element
 * 
 * @example
 * ```tsx
 * const { scrollYProgress } = useScrollProgress()
 * 
 * return (
 *   <motion.div
 *     style={{
 *       scaleX: scrollYProgress,
 *       transformOrigin: "left"
 *     }}
 *     className="fixed top-0 left-0 right-0 h-1 bg-yellow-400"
 *   />
 * )
 * ```
 */
export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): ScrollProgressReturn {
  const { target, offset = ['start start', 'end end'] } = options

  const { scrollYProgress, scrollY } = useScroll({
    target,
    offset: offset as any
  })

  return { scrollYProgress, scrollY }
}

/**
 * Hook to create parallax effect based on scroll
 * Returns a transformed value for parallax motion
 * 
 * @param speed - Parallax speed multiplier (0.5 = half speed, 2 = double speed)
 * 
 * @example
 * ```tsx
 * const y = useParallaxScroll(0.5)
 * 
 * return (
 *   <motion.div style={{ y }}>
 *     Parallax content
 *   </motion.div>
 * )
 * ```
 */
export function useParallaxScroll(speed: number = 0.5): MotionValue<string> {
  const { scrollY } = useScrollProgress()
  
  // Transform scroll position to parallax offset
  const y = useTransform(
    scrollY,
    [0, 1000],
    ['0%', `${speed * 100}%`]
  )

  return y
}

/**
 * Hook to fade out element as user scrolls down
 * Useful for hero sections
 * 
 * @param fadeDistance - Distance in pixels over which to fade (default: 300)
 * 
 * @example
 * ```tsx
 * const opacity = useScrollFadeOut(400)
 * 
 * return (
 *   <motion.div style={{ opacity }}>
 *     Hero content
 *   </motion.div>
 * )
 * ```
 */
export function useScrollFadeOut(fadeDistance: number = 300): MotionValue<number> {
  const { scrollY } = useScrollProgress()
  
  const opacity = useTransform(
    scrollY,
    [0, fadeDistance],
    [1, 0]
  )

  return opacity
}

/**
 * Hook to scale element based on scroll
 * 
 * @param scaleRange - [minScale, maxScale] (default: [1, 0.8])
 * @param scrollRange - [startScroll, endScroll] in pixels (default: [0, 300])
 * 
 * @example
 * ```tsx
 * const scale = useScrollScale([1, 0.9], [0, 200])
 * 
 * return (
 *   <motion.div style={{ scale }}>
 *     Scaling content
 *   </motion.div>
 * )
 * ```
 */
export function useScrollScale(
  scaleRange: [number, number] = [1, 0.8],
  scrollRange: [number, number] = [0, 300]
): MotionValue<number> {
  const { scrollY } = useScrollProgress()
  
  const scale = useTransform(
    scrollY,
    scrollRange,
    scaleRange
  )

  return scale
}
