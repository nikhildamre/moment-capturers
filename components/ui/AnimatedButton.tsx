'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useRef, MouseEvent } from 'react'

interface RippleEffect {
  x: number
  y: number
  id: number
}

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel
}: AnimatedButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const [ripples, setRipples] = useState<RippleEffect[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Create ripple effect
    if (!shouldReduceMotion && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { x, y, id: Date.now() }
      
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }

    onClick?.()
  }

  // Variant styles
  const variantStyles = {
    primary: 'bg-accentYellow text-graphite hover:bg-yellowLight shadow-md hover:shadow-colored',
    secondary: 'bg-graphite text-floralWhite hover:bg-graphiteLight shadow-md',
    outline: 'border-2 border-accentYellow text-accentYellow hover:bg-accentYellow hover:text-graphite',
    ghost: 'text-graphite hover:bg-graphite/10'
  }

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const baseStyles = 'relative overflow-hidden rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accentYellow focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.svg
            className="w-5 h-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}
        {children}
      </span>

      {/* Magnetic hover effect (subtle glow) */}
      {!shouldReduceMotion && (
        <motion.span
          className="absolute inset-0 rounded-full bg-white opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}
