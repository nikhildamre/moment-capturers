'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

interface Gallery3DProps {
  images: Array<{
    src: string
    alt: string
    title: string
  }>
  className?: string
}

export default function Gallery3D({ images, className = '' }: Gallery3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const rotateY = useTransform(springX, [-200, 200], [25, -25])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(nextImage, 4000)
      return () => clearInterval(interval)
    }
  }, [isDragging, images.length])

  return (
    <div ref={containerRef} className={`relative w-full h-[600px] perspective-1000 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false)
            if (info.offset.x > 100) prevImage()
            else if (info.offset.x < -100) nextImage()
            x.set(0)
          }}
          style={{ x: springX, rotateY }}
          className="relative w-full max-w-4xl h-96 cursor-grab active:cursor-grabbing"
        >
          {images.map((image, index) => {
            const offset = (index - currentIndex + images.length) % images.length
            const isActive = offset === 0
            
            return (
              <motion.div
                key={index}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                initial={false}
                animate={{
                  x: `${offset * 100}%`,
                  scale: isActive ? 1 : 0.8,
                  opacity: isActive ? 1 : 0.5,
                  zIndex: isActive ? 10 : 0,
                  rotateY: offset * 15,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{image.title}</h3>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <svg className="w-6 h-6 text-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <svg className="w-6 h-6 text-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-orange-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
