'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ImageMagnifierProps {
  src: string
  alt: string
  width: number
  height: number
  magnifierSize?: number
  zoomLevel?: number
  className?: string
}

export default function ImageMagnifier({
  src,
  alt,
  width,
  height,
  magnifierSize = 150,
  zoomLevel = 2.5,
  className = ''
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return

    const elem = imgRef.current
    const { top, left, width, height } = elem.getBoundingClientRect()

    const x = e.clientX - left
    const y = e.clientY - top

    setMagnifierPosition({ x, y })
    setImgPosition({
      x: (x / width) * 100,
      y: (y / height) * 100,
    })
  }

  return (
    <div
      ref={imgRef}
      className={`relative ${className}`}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />

      {showMagnifier && (
        <motion.div
          className="absolute border-4 border-orange-500 rounded-full pointer-events-none shadow-2xl"
          style={{
            width: magnifierSize,
            height: magnifierSize,
            left: magnifierPosition.x - magnifierSize / 2,
            top: magnifierPosition.y - magnifierSize / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
            backgroundPosition: `${imgPosition.x}% ${imgPosition.y}%`,
            backgroundRepeat: 'no-repeat',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  )
}
