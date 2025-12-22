'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface RippleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  rippleColor?: string
}

export default function RippleButton({
  children,
  onClick,
  className = '',
  rippleColor = 'rgba(255, 140, 0, 0.6)'
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = { x, y, id: Date.now() }
    setRipples([...ripples, newRipple])

    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 500,
            height: 500,
            opacity: 0,
            x: -250,
            y: -250,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </button>
  )
}
