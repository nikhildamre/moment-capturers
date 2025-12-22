/**
 * Custom hook for creating parallax effects
 * Provides smooth parallax motion based on scroll position
 */

import { useTransform, useScroll, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

interface UseParallaxOptions {
  /**
   * Speed of parallax effect
   * 0.5 = moves at half speed (slower than scroll)
   * 1 = moves at same speed as scroll
   * 2 = moves at double speed (faster than scroll)
   * @default 0.5
   */
  speed?: number
  
  /**
   * Direction of parallax movement
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal'
  
  /**
   * Target element to track (if not provided, uses window scroll)
   */
  target?: RefObject<HTMLElement>
  
  /**
   * Range of scroll to apply parallax effect
   * [start, end] in pixels
   * @default [0, 1000]
   */
  scrollRange?: [number, number]
}

interface ParallaxReturn {
  /**
   * Motion value for transform (use with motion.div style prop)
   */
  transform: MotionValue<string>
  
  /**
   * Motion value for x position (horizontal parallax)
   */
  x?: MotionValue<string>
  
  /**
   * Motion value for y position (vertical parallax)
   */
  y?: MotionValue<string>
}

/**
 * Hook to create parallax effect on scroll
 * 
 * @example
 * ```tsx
 * const { y } = useParallax({ speed: 0.5 })
 * 
 * return (
 *   <motion.div style={{ y }}>
 *     Parallax background
 *   </motion.div>
 * )
 * ```
 */
export function useParallax(options: UseParallaxOptions = {}): ParallaxReturn {
  const {
    speed = 0.5,
    direction = 'vertical',
    target,
    scrollRange = [0, 1000]
  } = options

  const { scrollY, scrollX } = useScroll({
    target,
    offset: ['start start', 'end end']
  })

  const scrollValue = direction === 'vertical' ? scrollY : scrollX
  const [start, end] = scrollRange
  
  // Calculate parallax offset based on speed
  const outputRange = [
    '0%',
    `${(end - start) * (speed - 1) / 10}%`
  ]

  const transform = useTransform(
    scrollValue,
    scrollRange,
    outputRange
  )

  if (direction === 'vertical') {
    return { transform, y: transform }
  } else {
    return { transform, x: transform }
  }
}

/**
 * Hook for slow parallax effect (moves at 30% of scroll speed)
 */
export function useSlowParallax(target?: RefObject<HTMLElement>) {
  return useParallax({ speed: 0.3, target })
}

/**
 * Hook for medium parallax effect (moves at 50% of scroll speed)
 */
export function useMediumParallax(target?: RefObject<HTMLElement>) {
  return useParallax({ speed: 0.5, target })
}

/**
 * Hook for fast parallax effect (moves at 70% of scroll speed)
 */
export function useFastParallax(target?: RefObject<HTMLElement>) {
  return useParallax({ speed: 0.7, target })
}

/**
 * Hook for reverse parallax effect (moves opposite to scroll direction)
 */
export function useReverseParallax(target?: RefObject<HTMLElement>) {
  return useParallax({ speed: -0.3, target })
}

/**
 * Hook for horizontal parallax effect
 */
export function useHorizontalParallax(speed: number = 0.5, target?: RefObject<HTMLElement>) {
  return useParallax({ speed, direction: 'horizontal', target })
}

/**
 * Hook for multi-layer parallax (returns multiple speeds for layered effect)
 * 
 * @example
 * ```tsx
 * const [slow, medium, fast] = useMultiLayerParallax()
 * 
 * return (
 *   <>
 *     <motion.div style={{ y: slow }}>Background layer</motion.div>
 *     <motion.div style={{ y: medium }}>Middle layer</motion.div>
 *     <motion.div style={{ y: fast }}>Foreground layer</motion.div>
 *   </>
 * )
 * ```
 */
export function useMultiLayerParallax(
  target?: RefObject<HTMLElement>
): [MotionValue<string>, MotionValue<string>, MotionValue<string>] {
  const slow = useParallax({ speed: 0.3, target })
  const medium = useParallax({ speed: 0.5, target })
  const fast = useParallax({ speed: 0.7, target })

  return [slow.y!, medium.y!, fast.y!]
}
