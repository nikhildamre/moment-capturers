'use client'

import { motion } from 'framer-motion'

interface SoundWaveProps {
  bars?: number
  className?: string
  color?: string
}

export default function SoundWave({ 
  bars = 5, 
  className = '',
  color = '#FFC50F'
}: SoundWaveProps) {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: ['8px', '24px', '8px'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

/**
 * Circular sound wave animation
 */
export function CircularSoundWave({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-16 h-16 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-accentYellow rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 2],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-accentYellow rounded-full" />
      </div>
    </div>
  )
}
