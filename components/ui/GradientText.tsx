'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface GradientTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  gradient?: 'default' | 'warm' | 'cool' | 'sunset' | 'custom'
  customGradient?: string
  animated?: boolean
  className?: string
}

export default function GradientText({
  children,
  as: Component = 'span',
  gradient = 'default',
  customGradient,
  animated = false,
  className = ''
}: GradientTextProps) {
  const shouldReduceMotion = useReducedMotion()

  // Predefined gradients with better contrast
  const gradients = {
    default: 'linear-gradient(90deg, #FFA500 0%, #FF8C00 100%)',
    warm: 'linear-gradient(90deg, #FF8C00 0%, #FF6B00 50%, #FFA500 100%)',
    cool: 'linear-gradient(90deg, #FFB84D 0%, #FF9500 100%)',
    sunset: 'linear-gradient(135deg, #FF8C00 0%, #FF6B6B 50%, #FFA500 100%)',
    custom: customGradient || 'linear-gradient(90deg, #FF8C00 0%, #FFA500 100%)'
  }

  const gradientStyle = gradients[gradient]

  const baseStyles = `
    bg-clip-text text-transparent
    ${animated && !shouldReduceMotion ? 'gradient-text-animated' : ''}
  `

  const style = {
    backgroundImage: gradientStyle,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    ...(animated && !shouldReduceMotion && {
      backgroundSize: '200% auto',
    })
  }

  if (animated && !shouldReduceMotion) {
    return (
      <motion.div
        className={`inline-block ${className}`}
        style={style}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Component className={baseStyles}>
          {children}
        </Component>
      </motion.div>
    )
  }

  return (
    <Component 
      className={`${baseStyles} ${className}`}
      style={style}
    >
      {children}
    </Component>
  )
}

/**
 * Outlined text component for decorative purposes
 */
interface OutlinedTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  strokeColor?: 'graphite' | 'white' | 'yellow'
  strokeWidth?: number
  className?: string
}

export function OutlinedText({
  children,
  as: Component = 'span',
  strokeColor = 'graphite',
  strokeWidth = 2,
  className = ''
}: OutlinedTextProps) {
  const colors = {
    graphite: '#2B2B2B',
    white: '#FFFFFF',
    yellow: '#FFC50F'
  }

  const style = {
    WebkitTextStroke: `${strokeWidth}px ${colors[strokeColor]}`,
    WebkitTextFillColor: 'transparent',
    textStroke: `${strokeWidth}px ${colors[strokeColor]}`,
    textFillColor: 'transparent'
  }

  return (
    <Component 
      className={className}
      style={style}
    >
      {children}
    </Component>
  )
}

/**
 * Text with animated underline
 */
interface AnimatedUnderlineTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'a'
  underlineColor?: string
  className?: string
}

export function AnimatedUnderlineText({
  children,
  as: Component = 'span',
  underlineColor = '#FFC50F',
  className = ''
}: AnimatedUnderlineTextProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Component className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
        style={{ backgroundColor: underlineColor }}
        initial={{ scaleX: 0 }}
        whileHover={shouldReduceMotion ? {} : { scaleX: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </Component>
  )
}
