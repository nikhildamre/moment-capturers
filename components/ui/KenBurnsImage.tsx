'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface KenBurnsImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  duration?: number
}

export default function KenBurnsImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  duration = 10
}: KenBurnsImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        animate={isLoaded ? {
          scale: [1, 1.15],
          x: [0, -20],
          y: [0, -10],
        } : {}}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="w-full h-full"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none" />
    </div>
  )
}
