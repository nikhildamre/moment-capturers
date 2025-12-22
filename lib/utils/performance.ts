/**
 * Performance utilities for optimizing animations and interactions
 */

/**
 * Debounce function to limit how often a function can be called
 * Useful for scroll and resize handlers
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 * 
 * @example
 * ```tsx
 * const handleScroll = debounce(() => {
 *   console.log('Scrolled!')
 * }, 100)
 * 
 * window.addEventListener('scroll', handleScroll)
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to ensure a function is called at most once per interval
 * Useful for scroll handlers that need consistent updates
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 * 
 * @example
 * ```tsx
 * const handleScroll = throttle(() => {
 *   console.log('Scrolled!')
 * }, 16) // ~60fps
 * 
 * window.addEventListener('scroll', handleScroll)
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Request animation frame wrapper for smooth animations
 * Ensures animations run at 60fps
 * 
 * @param callback - Function to call on each frame
 * @returns Function to cancel the animation
 * 
 * @example
 * ```tsx
 * const cancel = rafThrottle(() => {
 *   // Animation logic
 * })
 * 
 * // Later: cancel()
 * ```
 */
export function rafThrottle(callback: () => void): () => void {
  let rafId: number | null = null

  const throttled = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        callback()
        rafId = null
      })
    }
  }

  const cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  throttled()
  return cancel
}

/**
 * Monitor frame rate and detect performance issues
 * 
 * @param callback - Called with current FPS
 * @param interval - How often to check FPS (ms)
 * @returns Function to stop monitoring
 * 
 * @example
 * ```tsx
 * const stopMonitoring = monitorFrameRate((fps) => {
 *   if (fps < 30) {
 *     console.warn('Low FPS detected:', fps)
 *   }
 * }, 1000)
 * ```
 */
export function monitorFrameRate(
  callback: (fps: number) => void,
  interval: number = 1000
): () => void {
  let frames = 0
  let lastTime = performance.now()
  let rafId: number

  const countFrame = () => {
    frames++
    const currentTime = performance.now()
    
    if (currentTime >= lastTime + interval) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime))
      callback(fps)
      frames = 0
      lastTime = currentTime
    }
    
    rafId = requestAnimationFrame(countFrame)
  }

  rafId = requestAnimationFrame(countFrame)

  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
  }
}

/**
 * Check if user prefers reduced motion
 * 
 * @returns true if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get animation duration based on user preferences
 * Returns minimal duration if user prefers reduced motion
 * 
 * @param normalDuration - Normal animation duration in ms
 * @param reducedDuration - Reduced animation duration in ms (default: 0)
 * @returns Appropriate duration based on user preference
 */
export function getAnimationDuration(
  normalDuration: number,
  reducedDuration: number = 0
): number {
  return prefersReducedMotion() ? reducedDuration : normalDuration
}

/**
 * Lazy load a component with optional preloading
 * 
 * @param importFunc - Dynamic import function
 * @returns Object with Component and preload function
 * 
 * @example
 * ```tsx
 * const { Component: Lightbox, preload } = lazyLoad(
 *   () => import('./Lightbox')
 * )
 * 
 * // Preload on hover
 * <button onMouseEnter={preload}>
 *   Open Lightbox
 * </button>
 * ```
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  let componentPromise: Promise<{ default: T }> | null = null

  const preload = () => {
    if (!componentPromise) {
      componentPromise = importFunc()
    }
    return componentPromise
  }

  const Component = React.lazy(() => {
    if (componentPromise) {
      return componentPromise
    }
    return preload()
  })

  return { Component, preload }
}

/**
 * Check if device is low-end based on hardware concurrency
 * 
 * @returns true if device is considered low-end
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  
  // Check CPU cores
  const cores = navigator.hardwareConcurrency || 4
  if (cores < 4) return true
  
  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true
  
  return false
}

/**
 * Optimize animation based on device capabilities
 * Returns simplified animation config for low-end devices
 * 
 * @param normalConfig - Normal animation configuration
 * @param simplifiedConfig - Simplified configuration for low-end devices
 * @returns Appropriate configuration based on device
 */
export function optimizeAnimation<T>(
  normalConfig: T,
  simplifiedConfig: T
): T {
  return isLowEndDevice() ? simplifiedConfig : normalConfig
}

/**
 * Progressive image loading utility
 * Returns object with placeholder and full image URLs
 * 
 * @param imageUrl - Full resolution image URL
 * @param placeholderUrl - Low resolution placeholder URL
 * @returns Object with loading states and URLs
 */
export interface ProgressiveImageState {
  placeholder: string
  full: string
  isLoaded: boolean
}

export function createProgressiveImage(
  imageUrl: string,
  placeholderUrl?: string
): ProgressiveImageState {
  return {
    placeholder: placeholderUrl || imageUrl,
    full: imageUrl,
    isLoaded: false
  }
}

/**
 * Preload an image
 * 
 * @param src - Image source URL
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Batch preload multiple images
 * 
 * @param sources - Array of image URLs
 * @returns Promise that resolves when all images are loaded
 */
export async function preloadImages(sources: string[]): Promise<void> {
  await Promise.all(sources.map(preloadImage))
}

/**
 * Check if element is in viewport
 * 
 * @param element - DOM element to check
 * @param threshold - Percentage of element that must be visible (0-1)
 * @returns true if element is in viewport
 */
export function isInViewport(
  element: HTMLElement,
  threshold: number = 0
): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const vertInView = rect.top <= windowHeight && rect.top + rect.height * threshold >= 0
  const horInView = rect.left <= windowWidth && rect.left + rect.width * threshold >= 0

  return vertInView && horInView
}

// React import for lazyLoad function
import React from 'react'
