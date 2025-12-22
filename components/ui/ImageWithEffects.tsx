'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface ImageWithEffectsProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  effect?: 'zoom' | 'tilt' | 'parallax' | 'none'
  overlay?: 'gradient' | 'color' | 'none'
  overlayColor?: string
  borderStyle?: 'rounded' | 'organic' | 'none'
  priority?: boolean
  sizes?: string
  className?: string
  onLoad?: () => void
  onClick?: () => void
}

export default function ImageWithEffects({
  src,
  alt,
  width,
  height,
  fill = false,
  effect = 'zoom',
  overlay = 'gradient',
  overlayColor = 'rgba(0,0,0,0.4)',
  borderStyle = 'rounded',
  priority = false,
  sizes,
  className = '',
  onLoad,
  onClick
}: ImageWithEffectsProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // Border styles
  const borderStyles = {
    rounded: 'rounded-xl overflow-hidden',
    organic: 'rounded-[2rem_1rem_2rem_1rem] overflow-hidden',
    none: 'overflow-hidden'
  }

  // Overlay styles
  const overlayStyles = {
    gradient: 'bg-gradient-to-t from-black/60 via-transparent to-transparent',
    color: '',
    none: ''
  }

  // Effect variants
  const getEffectProps = () => {
    if (shouldReduceMotion || effect === 'none') {
      return {}
    }

    switch (effect) {
      case 'zoom':
        return {
          whileHover: { scale: 1.05 },
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
      case 'tilt':
        return {
          whileHover: { 
            rotateX: 5, 
            rotateY: 5,
            scale: 1.02
          },
          transition: { duration: 0.3 },
          style: { transformStyle: 'preserve-3d' as const }
        }
      default:
        return {}
    }
  }

  const effectProps = getEffectProps()

  return (
    <motion.div
      className={`relative ${borderStyles[borderStyle]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Image container with effect */}
      <motion.div
        className="relative w-full h-full"
        {...effectProps}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            onLoad={handleLoad}
            className={`object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            onLoad={handleLoad}
            className={`w-full h-auto transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-graphite/10 animate-pulse" />
        )}

        {/* Overlay */}
        {overlay !== 'none' && (
          <motion.div
            className={`absolute inset-0 ${overlayStyles[overlay]}`}
            style={overlay === 'color' ? { backgroundColor: overlayColor } : {}}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Hover glow effect */}
      {!shouldReduceMotion && effect !== 'none' && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered 
              ? '0 0 30px rgba(255, 197, 15, 0.3)' 
              : '0 0 0px rgba(255, 197, 15, 0)'
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

/**
 * Progressive image with blur-up effect
 */
interface ProgressiveImageProps {
  src: string
  placeholderSrc?: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className = '',
  priority = false
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Blur placeholder */}
      {placeholderSrc && !isLoaded && (
        <Image
          src={placeholderSrc}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className="absolute inset-0 blur-lg scale-110"
          priority
        />
      )}

      {/* Main image */}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}

/**
 * Image with floating animation
 */
interface FloatingImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  floatDistance?: number
  duration?: number
  className?: string
}

export function FloatingImage({
  src,
  alt,
  width,
  height,
  fill = false,
  floatDistance = 10,
  duration = 3,
  className = ''
}: FloatingImageProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      animate={shouldReduceMotion ? {} : {
        y: [0, -floatDistance, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {fill ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      )}
    </motion.div>
  )
}
