'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function KineticText({ 
  text, 
  className = '' 
}: { 
  text: string
  className?: string 
}) {
  const letters = text.split('')

  return (
    <motion.div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: 'easeOut'
          }}
          whileHover={{
            y: -10,
            color: '#FF8C00',
            transition: { duration: 0.2 }
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function GlitchText({ 
  text, 
  className = '' 
}: { 
  text: string
  className?: string 
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 text-orange-500 opacity-70"
        animate={{
          x: [0, -2, 2, -2, 0],
          y: [0, 2, -2, 2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-yellow-500 opacity-70"
        animate={{
          x: [0, 2, -2, 2, 0],
          y: [0, -2, 2, -2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}

export function Text3D({ 
  text, 
  className = '' 
}: { 
  text: string
  className?: string 
}) {
  return (
    <div className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        className="relative"
        whileHover={{
          rotateX: 10,
          rotateY: 10,
          scale: 1.05,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          textShadow: '2px 2px 0 rgba(255,140,0,0.3), 4px 4px 0 rgba(255,140,0,0.2), 6px 6px 0 rgba(255,140,0,0.1)'
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}

export function LetterReveal({ 
  text, 
  className = '' 
}: { 
  text: string
  className?: string 
}) {
  const letters = text.split('')

  return (
    <motion.div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, rotateY: 90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
            ease: 'easeOut'
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function TypewriterText({ 
  text, 
  className = '',
  speed = 50
}: { 
  text: string
  className?: string
  speed?: number
}) {
  const letters = text.split('')

  return (
    <motion.div className={`${className} font-mono`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * (speed / 1000),
          }}
        >
          {letter}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-orange-500 ml-1"
      />
    </motion.div>
  )
}
